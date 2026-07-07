import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
} from "firebase/auth";
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDocs,
    orderBy,
    query,
    serverTimestamp,
    updateDoc,
    where,
} from "firebase/firestore";
import {
    deleteObject,
    getDownloadURL,
    ref,
    uploadBytes,
} from "firebase/storage";

import { auth, db, storage } from "./firebaseConfig";

export type Pais = "México" | "Estados Unidos";

function obtenerUidActual(): string {
  return auth.currentUser?.uid || "";
}

export type BebeFirebase = {
  id?: string;
  uid?: string;
  activo?: boolean;
  nombre: string;
  fechaNacimiento: string;
  sexo: string;
  pais: Pais;
  alergias: string;
  alergiasAlimentarias: string;
  condiciones: string;
  creadoEn?: any;
};

export type VitaminaFirebase = {
  id?: string;
  uid?: string;
  nombre: string;
  dosis: string;
  frecuencia: string;
  duracion: string;
  indicaciones?: string;
  estado?: string;
  ultimaToma?: string;
  creadoEn?: any;
};

export type DocumentoFirebase = {
  id?: string;
  uid?: string;
  tipo: string;
  nombre: string;
  fecha: string;
  descripcion: string;
  nombreArchivo: string;
  estado: string;
  urlArchivo?: string;
  rutaStorage?: string;
  creadoEn?: any;
};

export type AlimentoFirebase = {
  id?: string;
  uid?: string;
  mes: string;
  alimento: string;
  textura: "Molido" | "En trozos" | "Papilla" | "Otro";
  categoria: string;
  esAlergeno: boolean;
  recomendado: boolean;
  observaciones?: string;
  creadoEn?: any;
};

export type VacunaAplicadaFirebase = {
  id?: string;
  uid?: string;
  pais: Pais;
  nombre: string;
  dosis: string;
  edad: string;
  fechaAplicacion: string;
  creadoEn?: any;
};

export async function guardarBebeFirebase(bebe: BebeFirebase) {
  const referencia = await addDoc(collection(db, "bebes"), {
    ...bebe,
    uid: obtenerUidActual(),
    activo: true,
    creadoEn: serverTimestamp(),
  });

  await establecerBebeActivoFirebase(referencia.id);

  return referencia.id;
}

export async function obtenerBebesFirebase() {
  const consulta = query(
    collection(db, "bebes"),
    where("uid", "==", obtenerUidActual()),
    orderBy("creadoEn", "desc")
  );

  const resultado = await getDocs(consulta);

  return resultado.docs.map((documento) => ({
    id: documento.id,
    ...documento.data(),
  })) as BebeFirebase[];
}

export async function establecerBebeActivoFirebase(idBebeActivo: string) {
  const uid = obtenerUidActual();

  const consulta = query(collection(db, "bebes"), where("uid", "==", uid));
  const resultado = await getDocs(consulta);

  await Promise.all(
    resultado.docs.map((documento) =>
      updateDoc(doc(db, "bebes", documento.id), {
        activo: documento.id === idBebeActivo,
      })
    )
  );
}

export async function obtenerUltimoBebeFirebase() {
  const uid = obtenerUidActual();

  // Primero busca el bebé marcado explícitamente como activo.
  const consultaActivo = query(
    collection(db, "bebes"),
    where("uid", "==", uid),
    where("activo", "==", true)
  );

  const resultadoActivo = await getDocs(consultaActivo);

  if (!resultadoActivo.empty) {
    const documento = resultadoActivo.docs[0];
    return {
      id: documento.id,
      ...documento.data(),
    } as BebeFirebase;
  }

  // Si no hay ninguno marcado (cuentas creadas antes de esta función),
  // usa el bebé registrado más reciente como respaldo.
  const consulta = query(
    collection(db, "bebes"),
    where("uid", "==", uid),
    orderBy("creadoEn", "desc")
  );
  const resultado = await getDocs(consulta);

  if (resultado.empty) return null;

  const documento = resultado.docs[0];

  return {
    id: documento.id,
    ...documento.data(),
  } as BebeFirebase;
}

export async function guardarVitaminaFirebase(vitamina: VitaminaFirebase) {
  await addDoc(collection(db, "vitaminas"), {
    ...vitamina,
    uid: obtenerUidActual(),
    estado: vitamina.estado || "Activa",
    creadoEn: serverTimestamp(),
  });
}

export async function obtenerVitaminasFirebase() {
  const consulta = query(
    collection(db, "vitaminas"),
    where("uid", "==", obtenerUidActual()),
    orderBy("creadoEn", "desc")
  );

  const resultado = await getDocs(consulta);

  return resultado.docs.map((documento) => ({
    id: documento.id,
    ...documento.data(),
  })) as VitaminaFirebase[];
}

export async function actualizarVitaminaFirebase(
  id: string,
  cambios: Partial<VitaminaFirebase>
) {
  await updateDoc(doc(db, "vitaminas", id), cambios);
}

export async function eliminarVitaminaFirebase(id: string) {
  await deleteDoc(doc(db, "vitaminas", id));
}

export async function registrarTomaVitaminaFirebase(
  id: string,
  fecha: string
) {
  await updateDoc(doc(db, "vitaminas", id), { ultimaToma: fecha });
}

export async function guardarDocumentoFirebase(documento: DocumentoFirebase) {
  await addDoc(collection(db, "documentos"), {
    ...documento,
    uid: obtenerUidActual(),
    creadoEn: serverTimestamp(),
  });
}

export async function obtenerDocumentosFirebase() {
  const consulta = query(
    collection(db, "documentos"),
    where("uid", "==", obtenerUidActual()),
    orderBy("creadoEn", "desc")
  );

  const resultado = await getDocs(consulta);

  return resultado.docs.map((documento) => ({
    id: documento.id,
    ...documento.data(),
  })) as DocumentoFirebase[];
}

export async function actualizarDocumentoFirebase(
  id: string,
  cambios: Partial<DocumentoFirebase>
) {
  await updateDoc(doc(db, "documentos", id), cambios);
}

export async function eliminarDocumentoFirebase(id: string) {
  await deleteDoc(doc(db, "documentos", id));
}

// ==========================
// Firebase Storage (archivos PDF)
// ==========================

export async function subirArchivoStorage(uri: string, nombreArchivo: string) {
  const uid = obtenerUidActual() || "sin-usuario";
  const ruta = `documentos/${uid}/${Date.now()}-${nombreArchivo}`;

  const respuesta = await fetch(uri);
  const archivoBlob = await respuesta.blob();

  const referencia = ref(storage, ruta);
  await uploadBytes(referencia, archivoBlob);

  const url = await getDownloadURL(referencia);

  return { url, ruta };
}

export async function eliminarArchivoStorage(ruta: string) {
  const referencia = ref(storage, ruta);
  await deleteObject(referencia);
}

export async function guardarAlimentoFirebase(alimento: AlimentoFirebase) {
  await addDoc(collection(db, "alimentacion"), {
    ...alimento,
    uid: obtenerUidActual(),
    creadoEn: serverTimestamp(),
  });
}

export async function obtenerAlimentosFirebase() {
  const consulta = query(
    collection(db, "alimentacion"),
    where("uid", "==", obtenerUidActual()),
    orderBy("creadoEn", "desc")
  );

  const resultado = await getDocs(consulta);

  return resultado.docs.map((documento) => ({
    id: documento.id,
    ...documento.data(),
  })) as AlimentoFirebase[];
}

export async function guardarVacunaAplicadaFirebase(
  vacuna: VacunaAplicadaFirebase
) {
  await addDoc(collection(db, "vacunas_aplicadas"), {
    ...vacuna,
    uid: obtenerUidActual(),
    creadoEn: serverTimestamp(),
  });
}

export async function obtenerVacunasAplicadasFirebase() {
  const consulta = query(
    collection(db, "vacunas_aplicadas"),
    where("uid", "==", obtenerUidActual()),
    orderBy("creadoEn", "desc")
  );

  const resultado = await getDocs(consulta);

  return resultado.docs.map((documento) => ({
    id: documento.id,
    ...documento.data(),
  })) as VacunaAplicadaFirebase[];
}

export async function eliminarVacunaAplicadaFirebase(id: string) {
  await deleteDoc(doc(db, "vacunas_aplicadas", id));
}

// ==========================
// Autenticación (Firebase Auth)
// ==========================

export async function iniciarSesionFirebase(correo: string, password: string) {
  const credenciales = await signInWithEmailAndPassword(auth, correo, password);
  return credenciales.user;
}

export async function registrarUsuarioFirebase(
  correo: string,
  password: string
) {
  const credenciales = await createUserWithEmailAndPassword(
    auth,
    correo,
    password
  );
  return credenciales.user;
}

export async function cerrarSesionFirebase() {
  await signOut(auth);
}

export function traducirErrorAuthFirebase(error: any): string {
  const codigo = error?.code || "";

  switch (codigo) {
    case "auth/invalid-email":
      return "El correo electrónico no es válido.";
    case "auth/user-not-found":
      return "No existe una cuenta registrada con ese correo.";
    case "auth/wrong-password":
    case "auth/invalid-credential":
      return "Correo o contraseña incorrectos.";
    case "auth/email-already-in-use":
      return "Ya existe una cuenta registrada con ese correo.";
    case "auth/weak-password":
      return "La contraseña debe tener al menos 6 caracteres.";
    case "auth/too-many-requests":
      return "Demasiados intentos. Intenta de nuevo más tarde.";
    case "auth/network-request-failed":
      return "Error de conexión. Revisa tu internet.";
    default:
      return "Ocurrió un error. Intenta nuevamente.";
  }
}