import { useState } from "react";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import {
  iniciarSesionFirebase,
  registrarUsuarioFirebase,
  traducirErrorAuthFirebase,
} from "../firebase/firebaseService";
import { globalStyles } from "../styles/globalStyles";

type Props = {
  onLogin: () => void;
};

type Modo = "iniciarSesion" | "crearCuenta";

export default function LoginScreen({ onLogin }: Props) {
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [pais, setPais] = useState<"México" | "Estados Unidos">("México");
  const [modo, setModo] = useState<Modo>("iniciarSesion");
  const [cargando, setCargando] = useState(false);

  const validarCorreo = (valor: string) => /\S+@\S+\.\S+/.test(valor);

  const continuar = async () => {
    if (!correo.trim() || !password.trim()) {
      Alert.alert(
        "Campos incompletos",
        "Ingresa tu correo y contraseña."
      );
      return;
    }

    if (!validarCorreo(correo.trim())) {
      Alert.alert(
        "Correo inválido",
        "Ingresa un correo electrónico válido."
      );
      return;
    }

    if (password.trim().length < 6) {
      Alert.alert(
        "Contraseña muy corta",
        "La contraseña debe tener al menos 6 caracteres."
      );
      return;
    }

    setCargando(true);

    try {
      if (modo === "iniciarSesion") {
        await iniciarSesionFirebase(correo.trim(), password);
      } else {
        await registrarUsuarioFirebase(correo.trim(), password);
      }

      onLogin();
    } catch (error) {
      console.log("Error de autenticación:", error);
      Alert.alert("No se pudo continuar", traducirErrorAuthFirebase(error));
    } finally {
      setCargando(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={globalStyles.loginContainer}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={globalStyles.loginCard}>
        <Image
          source={require("../../assets/images/logo-icon.png")}
          style={globalStyles.loginLogoImage}
          resizeMode="contain"
        />

        <Text style={globalStyles.loginTitle}>
          PediatriTrack Global
        </Text>

        <Text style={globalStyles.loginSubtitle}>
          Plataforma inteligente para el seguimiento pediátrico,
          vacunación, vitaminación, alimentación complementaria,
          documentos médicos e información preventiva.
        </Text>

        <View style={globalStyles.optionRow}>
          <TouchableOpacity
            style={[
              globalStyles.optionButton,
              modo === "iniciarSesion" && globalStyles.optionActive,
            ]}
            onPress={() => setModo("iniciarSesion")}
          >
            <Text
              style={[
                globalStyles.optionText,
                modo === "iniciarSesion" && globalStyles.optionTextActive,
              ]}
            >
              Iniciar sesión
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              globalStyles.optionButton,
              modo === "crearCuenta" && globalStyles.optionActive,
            ]}
            onPress={() => setModo("crearCuenta")}
          >
            <Text
              style={[
                globalStyles.optionText,
                modo === "crearCuenta" && globalStyles.optionTextActive,
              ]}
            >
              Crear cuenta
            </Text>
          </TouchableOpacity>
        </View>

        <Text style={globalStyles.label}>
          País del esquema de vacunación
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

        <Text style={globalStyles.label}>
          Correo electrónico
        </Text>

        <TextInput
          placeholder="ejemplo@correo.com"
          placeholderTextColor="#90A4AE"
          value={correo}
          onChangeText={setCorreo}
          keyboardType="email-address"
          autoCapitalize="none"
          style={globalStyles.input}
        />

        <Text style={globalStyles.label}>
          Contraseña
        </Text>

        <TextInput
          placeholder="••••••••"
          placeholderTextColor="#90A4AE"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={globalStyles.input}
        />

        <TouchableOpacity
          style={globalStyles.loginButton}
          onPress={continuar}
          disabled={cargando}
        >
          <Text style={globalStyles.loginButtonText}>
            {cargando
              ? "Procesando..."
              : modo === "iniciarSesion"
              ? "Iniciar Sesión"
              : "Crear Cuenta"}
          </Text>
        </TouchableOpacity>

        <View style={globalStyles.versionCard}>
          <Text style={globalStyles.versionText}>
            Firebase Authentication • Versión 2.0
          </Text>
        </View>

        <Text style={globalStyles.footer}>
          © 2026 PediatriTrack Global
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
}
