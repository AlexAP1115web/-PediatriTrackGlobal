import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";

import { auth } from "../firebase/firebaseConfig";
import { obtenerUltimoBebeFirebase } from "../firebase/firebaseService";
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

export default function Index() {
  const [pantalla, setPantalla] = useState<ScreenName>("login");
  const [verificando, setVerificando] = useState(true);

  useEffect(() => {
    const cancelarSuscripcion = onAuthStateChanged(auth, async (usuario) => {
      if (!usuario) {
        setPantalla("login");
        setVerificando(false);
        return;
      }

      await irAPantallaSegunBebe();
      setVerificando(false);
    });

    return cancelarSuscripcion;
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
    setPantalla(screen as ScreenName);
  };

  const alIniciarSesion = async () => {
    setVerificando(true);
    await irAPantallaSegunBebe();
    setVerificando(false);
  };

  if (verificando) {
    return (
      <View
        style={[
          globalStyles.screen,
          { alignItems: "center", justifyContent: "center" },
        ]}
      >
        <ActivityIndicator size="large" color="#1976D2" />
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
}
