import { useState } from "react";
import {
  Alert,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { guardarBebeFirebase } from "../firebase/firebaseService";
import { globalStyles } from "../styles/globalStyles";

type Props = {
  onGo: (screen: string) => void;
};

export default function BabyRegisterScreen({ onGo }: Props) {
  const [nombre, setNombre] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [sexo, setSexo] = useState("");
  const [pais, setPais] = useState<"México" | "Estados Unidos">("México");
  const [alergias, setAlergias] = useState("");
  const [alergiasAlimentarias, setAlergiasAlimentarias] = useState("");
  const [condiciones, setCondiciones] = useState("");

  const finalizarRegistro = async () => {
    if (
      nombre.trim() === "" ||
      fechaNacimiento.trim() === "" ||
      sexo.trim() === ""
    ) {
      Alert.alert(
        "Datos incompletos",
        "Completa nombre, fecha de nacimiento y sexo del bebé."
      );
      return;
    }

    try {
      await guardarBebeFirebase({
        nombre: nombre.trim(),
        fechaNacimiento: fechaNacimiento.trim(),
        sexo: sexo.trim(),
        pais,
        alergias: alergias.trim() || "Ninguna",
        alergiasAlimentarias:
          alergiasAlimentarias.trim() || "Ninguna",
        condiciones: condiciones.trim() || "Ninguna",
      });

      Alert.alert(
        "Registro completado",
        "La información del bebé fue guardada correctamente en Firebase."
      );

      onGo("dashboard");
    } catch (error) {
      console.log("Error al guardar bebé:", error);

      Alert.alert(
        "Error",
        "No se pudo guardar la información del bebé en Firebase."
      );
    }
  };

  return (
    <View style={globalStyles.screen}>
      <ScrollView
        style={globalStyles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* Encabezado principal */}
        <View style={globalStyles.headerCard}>
          <Text style={globalStyles.title}>
            👶 Registro del Bebé
          </Text>

          <Text style={globalStyles.subtitle}>
            Registra la información principal del bebé para personalizar su
            sistema de vacunación, vitaminación, alimentación complementaria,
            documentos médicos e información preventiva.
          </Text>
        </View>

        {/* Resumen de secciones */}
        <View style={globalStyles.summaryRow}>
          <View style={globalStyles.summaryCard}>
            <Text style={globalStyles.summaryNumber}>💉</Text>
            <Text style={globalStyles.summaryText}>
              Vacunas
            </Text>
          </View>

          <View style={globalStyles.summaryCard}>
            <Text style={globalStyles.summaryNumber}>🍎</Text>
            <Text style={globalStyles.summaryText}>
              Alimentación
            </Text>
          </View>

          <View style={globalStyles.summaryCard}>
            <Text style={globalStyles.summaryNumber}>📄</Text>
            <Text style={globalStyles.summaryText}>
              Documentos
            </Text>
          </View>
        </View>

        {/* Formulario principal */}
        <View style={globalStyles.formCard}>
          <Text style={globalStyles.sectionTitle}>
            Información general
          </Text>

          <Text style={globalStyles.label}>
            Nombre completo del bebé
          </Text>

          <TextInput
            placeholder="Ej. Aurora Evangeline"
            placeholderTextColor="#90A4AE"
            value={nombre}
            onChangeText={setNombre}
            style={globalStyles.input}
          />

          <Text style={globalStyles.label}>
            Fecha de nacimiento
          </Text>

          <TextInput
            placeholder="DD/MM/AAAA"
            placeholderTextColor="#90A4AE"
            value={fechaNacimiento}
            onChangeText={setFechaNacimiento}
            style={globalStyles.input}
          />

          <Text style={globalStyles.label}>
            Sexo
          </Text>

          <TextInput
            placeholder="Masculino / Femenino"
            placeholderTextColor="#90A4AE"
            value={sexo}
            onChangeText={setSexo}
            style={globalStyles.input}
          />

          <Text style={globalStyles.label}>
            Sistema de vacunación
          </Text>

          <View style={globalStyles.countryContainer}>
            <TouchableOpacity
              style={[
                globalStyles.countryButton,
                pais === "México" &&
                  globalStyles.countryActive,
              ]}
              onPress={() => setPais("México")}
            >
              <Text style={globalStyles.countryText}>
                🇲🇽 México
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                globalStyles.countryButton,
                pais === "Estados Unidos" &&
                  globalStyles.countryActive,
              ]}
              onPress={() => setPais("Estados Unidos")}
            >
              <Text style={globalStyles.countryText}>
                🇺🇸 Estados Unidos
              </Text>
            </TouchableOpacity>
          </View>

          <Text style={globalStyles.sectionTitle}>
            Salud y alimentación
          </Text>

          <Text style={globalStyles.label}>
            Alergias médicas detectadas
          </Text>

          <TextInput
            placeholder="Ej. Penicilina, látex, medicamentos..."
            placeholderTextColor="#90A4AE"
            value={alergias}
            onChangeText={setAlergias}
            style={[globalStyles.input, globalStyles.textArea]}
            multiline
          />

          <Text style={globalStyles.label}>
            Alergias alimentarias
          </Text>

          <TextInput
            placeholder="Ej. Huevo, leche, cacahuate, pescado..."
            placeholderTextColor="#90A4AE"
            value={alergiasAlimentarias}
            onChangeText={setAlergiasAlimentarias}
            style={[globalStyles.input, globalStyles.textArea]}
            multiline
          />

          <Text style={globalStyles.label}>
            Condiciones médicas relevantes
          </Text>

          <TextInput
            placeholder="Ej. Asma, reflujo, dermatitis, cardiopatías..."
            placeholderTextColor="#90A4AE"
            value={condiciones}
            onChangeText={setCondiciones}
            style={[globalStyles.input, globalStyles.textArea]}
            multiline
          />

          <TouchableOpacity
            style={globalStyles.buttonPrimary}
            onPress={finalizarRegistro}
          >
            <Text style={globalStyles.buttonText}>
              Guardar perfil del bebé
            </Text>
          </TouchableOpacity>
        </View>

        {/* Aviso profesional */}
        <View style={globalStyles.helpCard}>
          <Text style={globalStyles.helpTitle}>
            ℹ️ Uso de la información
          </Text>

          <Text style={globalStyles.helpText}>
            Los datos registrados permitirán adaptar el esquema de vacunación
            México / Estados Unidos, evitar alimentos marcados como alérgenos
            en alimentación complementaria y organizar documentos médicos del
            bebé.
          </Text>
        </View>

        <View style={globalStyles.alertCard}>
          <Text style={globalStyles.alertTitle}>
            🔐 Firebase Firestore
          </Text>

          <Text style={globalStyles.alertText}>
            La información se almacena en la colección bebes de Firebase
            Firestore para poder consultarla posteriormente dentro de la app.
          </Text>
        </View>

        <View style={globalStyles.bottomSpace} />
      </ScrollView>
    </View>
  );
}