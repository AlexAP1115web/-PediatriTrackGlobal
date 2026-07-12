import { useRef, useState } from "react";
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
  contrasenaFiltradaPublicamente,
  iniciarSesionFirebase,
  recuperarContrasenaFirebase,
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

  // Seguridad: bloqueo temporal tras varios intentos fallidos de inicio de
  // sesión seguidos, para dificultar ataques de fuerza bruta.
  const INTENTOS_MAXIMOS = 5;
  const BLOQUEO_MS = 60 * 1000;
  const intentosFallidosRef = useRef(0);
  const bloqueadoHastaRef = useRef<number | null>(null);

  const validarCorreo = (valor: string) => /\S+@\S+\.\S+/.test(valor);

  // Política de contraseña más estricta para cuentas nuevas: 8+ caracteres,
  // con al menos una letra y un número.
  const validarPasswordFuerte = (valor: string) =>
    valor.length >= 8 && /[A-Za-z]/.test(valor) && /[0-9]/.test(valor);

  const continuar = async () => {
    if (bloqueadoHastaRef.current && Date.now() < bloqueadoHastaRef.current) {
      const segundos = Math.ceil(
        (bloqueadoHastaRef.current - Date.now()) / 1000
      );
      Alert.alert(
        "Demasiados intentos",
        `Por seguridad, espera ${segundos} segundos antes de intentar de nuevo.`
      );
      return;
    }

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

    if (modo === "crearCuenta") {
      if (!validarPasswordFuerte(password)) {
        Alert.alert(
          "Contraseña débil",
          "Para crear tu cuenta, la contraseña debe tener al menos 8 caracteres e incluir letras y números."
        );
        return;
      }
    } else if (password.trim().length < 6) {
      Alert.alert(
        "Contraseña muy corta",
        "La contraseña debe tener al menos 6 caracteres."
      );
      return;
    }

    setCargando(true);

    try {
      if (modo === "crearCuenta") {
        const filtrada = await contrasenaFiltradaPublicamente(password);
        if (filtrada) {
          Alert.alert(
            "Contraseña no segura",
            "Esta contraseña ha aparecido en filtraciones de datos conocidas. Por tu seguridad, elige una diferente."
          );
          setCargando(false);
          return;
        }

        await registrarUsuarioFirebase(correo.trim(), password);
      } else {
        await iniciarSesionFirebase(correo.trim(), password);
      }

      intentosFallidosRef.current = 0;
      bloqueadoHastaRef.current = null;
      onLogin();
    } catch (error) {
      console.log("Error de autenticación:", error);

      if (modo === "iniciarSesion") {
        intentosFallidosRef.current += 1;

        if (intentosFallidosRef.current >= INTENTOS_MAXIMOS) {
          bloqueadoHastaRef.current = Date.now() + BLOQUEO_MS;
          intentosFallidosRef.current = 0;
          Alert.alert(
            "Demasiados intentos",
            "Por seguridad, bloqueamos los intentos de inicio de sesión por 60 segundos."
          );
          setCargando(false);
          return;
        }
      }

      Alert.alert("No se pudo continuar", traducirErrorAuthFirebase(error));
    } finally {
      setCargando(false);
    }
  };

  const recuperarContrasena = async () => {
    if (!correo.trim() || !validarCorreo(correo.trim())) {
      Alert.alert(
        "Correo requerido",
        "Escribe tu correo electrónico arriba y luego toca \"¿Olvidaste tu contraseña?\" para recibir el enlace de recuperación."
      );
      return;
    }

    setCargando(true);

    try {
      await recuperarContrasenaFirebase(correo.trim());
      Alert.alert(
        "Correo enviado",
        `Te enviamos un enlace para restablecer tu contraseña a ${correo.trim()}. Revisa tu bandeja de entrada (y spam).`
      );
    } catch (error) {
      console.log("Error al recuperar contraseña:", error);
      Alert.alert("No se pudo enviar el correo", traducirErrorAuthFirebase(error));
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

        {modo === "crearCuenta" && (
          <Text style={globalStyles.passwordHint}>
            Mínimo 8 caracteres, con letras y números.
          </Text>
        )}

        {modo === "iniciarSesion" && (
          <TouchableOpacity onPress={recuperarContrasena} disabled={cargando}>
            <Text style={globalStyles.privacyLinkText}>
              ¿Olvidaste tu contraseña?
            </Text>
          </TouchableOpacity>
        )}

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
