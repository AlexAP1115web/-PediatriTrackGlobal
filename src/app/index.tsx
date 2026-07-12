import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useRef, useState } from "react";
import { ActivityIndicator, Alert, Text, View } from "react-native";

import { auth } from "../firebase/firebaseConfig";
import {
  cerrarSesionFirebase,
  obtenerUltimoBebeFirebase,
} from "../firebase/firebaseService";
import BabyRegisterScreen from "../screens/BabyRegisterScreen";
import DocumentsScreen from "../screens/DocumentsScreen";
import FoodScreen from "../screens/FoodScreen";
import InfoScreen from "../screens/InfoScreen";
import LoginScreen from "../screens/LoginScreen";
import PrivacyPolicyScreen from "../screens/PrivacyPolicyScreen";
import VaccinationScreen from "../screens/VaccinationScreen";
import VitaminsScreen from "../screens/VitaminsScreen";
import { globalStyles } from "../styles/globalStyles";

type ScreenName =
  | "login"
  | "registro"
  | "dashboard"
  | "documentos"
  | "vitaminas"
  | "alimentacion"
  | "info"
  | "privacidad";

// Seguridad: tiempo máximo de sesión inactiva antes de cerrarla automáticamente.
const TIEMPO_MAXIMO_INACTIVIDAD_MS = 30 * 60 * 1000; // 30 minutos
const INTERVALO_REVISION_MS = 30 * 1000; // revisa cada 30 segundos

export default function Index() {
  const [pantalla, setPantalla] = useState<ScreenName>("login");
  const [verificando, setVerificando] = useState(true);
  const ultimaActividadRef = useRef<number>(Date.now());

  const registrarActividad = () => {
    ultimaActividadRef.current = Date.now();
  };

  useEffect(() => {
    const cancelarSuscripcion = onAuthStateChanged(auth, async (usuario) => {
      if (!usuario) {
        setPantalla("login");
        setVerificando(false);
        return;
      }

      registrarActividad();
      await irAPantallaSegunBebe();
      setVerificando(false);
    });

    return cancelarSuscripcion;
  }, []);

  // Seguridad: cierra la sesión automáticamente si el usuario autenticado
  // pasa 30 minutos sin interactuar con la app (sin tocar la pantalla ni
  // cambiar de módulo).
  useEffect(() => {
    const intervalo = setInterval(async () => {
      if (!auth.currentUser) return;

      const inactivo = Date.now() - ultimaActividadRef.current;
      if (inactivo >= TIEMPO_MAXIMO_INACTIVIDAD_MS) {
        try {
          await cerrarSesionFirebase();
          Alert.alert(
            "Sesión expirada",
            "Por seguridad, cerramos tu sesión después de 30 minutos sin actividad. Inicia sesión de nuevo."
          );
        } catch (error) {
          console.log("Error al cerrar sesión por inactividad:", error);
        }
      }
    }, INTERVALO_REVISION_MS);

    return () => clearInterval(intervalo);
  }, []);

  const irAPantallaSegunBebe = async () => {
    try {
      const bebe = await obtenerUltimoBebeFirebase();
      setPantalla(bebe ? "dashboard" : "registro");
    } catch (error) {
      console.log("Error al verificar sesión guardada:", error);
      setPantalla("registro");
    }
  };

  const navegar = (screen: string) => {
    registrarActividad();
    setPantalla(screen as ScreenName);
  };

  const alIniciarSesion = async () => {
    registrarActividad();
    setVerificando(true);
    await irAPantallaSegunBebe();
    setVerificando(false);
  };

  const renderizarPantallaActual = () => {
    if (verificando) {
      return (
        <View
          style={[
            globalStyles.screen,
            { alignItems: "center", justifyContent: "center" },
          ]}
        >
          <ActivityIndicator size="large" color="#00843D" />
          <Text style={[globalStyles.subtitle, { marginTop: 12 }]}>
            Verificando sesión...
          </Text>
        </View>
      );
    }

    if (pantalla === "login") {
      return <LoginScreen onLogin={alIniciarSesion} />;
    }

    if (pantalla === "registro") {
      return <BabyRegisterScreen onGo={navegar} />;
    }

    if (pantalla === "dashboard") {
      return <VaccinationScreen onGo={navegar} />;
    }

    if (pantalla === "vitaminas") {
      return <VitaminsScreen onGo={navegar} />;
    }

    if (pantalla === "documentos") {
      return <DocumentsScreen onGo={navegar} />;
    }

    if (pantalla === "alimentacion") {
      return <FoodScreen onGo={navegar} />;
    }

    if (pantalla === "info") {
      return <InfoScreen onGo={navegar} />;
    }

    if (pantalla === "privacidad") {
      return <PrivacyPolicyScreen onGo={navegar} />;
    }

    return <LoginScreen onLogin={alIniciarSesion} />;
  };

  // Envolver todo en una View que registra actividad al primer toque
  // permite reiniciar el temporizador de inactividad (seguridad de sesión)
  // sin tener que tocar cada pantalla individual.
  return (
    <View style={{ flex: 1 }} onTouchStart={registrarActividad}>
      {renderizarPantallaActual()}
    </View>
  );
}
