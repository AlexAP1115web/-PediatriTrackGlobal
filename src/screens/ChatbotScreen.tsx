import { useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { MensajeChat, preguntarAlChatbot } from "../services/chatbotService";
import { globalStyles } from "../styles/globalStyles";

type Props = {
  onGo: (screen: string) => void;
};

const MENSAJE_BIENVENIDA: MensajeChat = {
  rol: "asistente",
  texto:
    "Hola, soy el Asistente Virtual de PediatriTrack Global. Puedo ayudarte con dudas generales sobre vacunación, vitaminas, alimentación y cuidados del bebé. No sustituyo a un pediatra: ante síntomas o urgencias, consulta siempre a un profesional de salud. ¿En qué te ayudo?",
};

// nota mía: esta pantalla la armé distinto a las demás. Aquí uso un solo
// View en columna con flex (header fijo arriba, el chat en flex:1 al
// centro, la entrada fija abajo) en vez de meter todo en un ScrollView
// como en las otras pantallas. Lo intenté con un ScrollView anidado
// primero pero no jala bien en React Native (no se expande), así que
// terminé dejando que solo el área de mensajes sea la que hace scroll.
export default function ChatbotScreen({ onGo }: Props) {
  const [mensajes, setMensajes] = useState<MensajeChat[]>([MENSAJE_BIENVENIDA]);
  const [textoEntrada, setTextoEntrada] = useState("");
  const [enviando, setEnviando] = useState(false);
  const scrollRef = useRef<ScrollView>(null);

  const enviarMensaje = async () => {
    const texto = textoEntrada.trim();
    if (!texto || enviando) return;

    const historialPrevio = mensajes;
    const mensajesConUsuario: MensajeChat[] = [
      ...historialPrevio,
      { rol: "usuario", texto },
    ];

    setMensajes(mensajesConUsuario);
    setTextoEntrada("");
    setEnviando(true);

    try {
      const respuesta = await preguntarAlChatbot(historialPrevio, texto);
      setMensajes([
        ...mensajesConUsuario,
        { rol: "asistente", texto: respuesta },
      ]);
    } catch (error) {
      console.log("Error inesperado del chatbot:", error);
      setMensajes([
        ...mensajesConUsuario,
        {
          rol: "asistente",
          texto: "Ocurrió un error inesperado. Intenta de nuevo en un momento.",
        },
      ]);
    } finally {
      setEnviando(false);
      setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 100);
    }
  };

  return (
    <KeyboardAvoidingView
      style={globalStyles.screen}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={[globalStyles.container, { flex: 1 }]}>
        {/* header fijo arriba */}
        <View style={globalStyles.headerCard}>
          <TouchableOpacity
            onPress={() => onGo("dashboard")}
            accessibilityRole="button"
            accessibilityLabel="Volver al inicio"
          >
            <Text style={globalStyles.privacyLinkText}>← Volver al inicio</Text>
          </TouchableOpacity>

          <Text style={[globalStyles.title, { marginTop: 8 }]}>
            🤖 Asistente Virtual
          </Text>

          <Text style={globalStyles.subtitle}>
            Chatbot con IA (Google Gemini) acotado a temas pediátricos. No
            reemplaza una consulta médica real.
          </Text>
        </View>

        {/* este es el único ScrollView de la pantalla: el historial del chat */}
        <ScrollView
          ref={scrollRef}
          style={globalStyles.chatMessagesArea}
          showsVerticalScrollIndicator={false}
          onContentSizeChange={() =>
            scrollRef.current?.scrollToEnd({ animated: true })
          }
        >
          {mensajes.map((mensaje, indice) => (
            <View
              key={indice}
              style={[
                globalStyles.chatBubbleRow,
                mensaje.rol === "usuario"
                  ? globalStyles.chatBubbleRowUsuario
                  : globalStyles.chatBubbleRowAsistente,
              ]}
            >
              <View
                style={[
                  globalStyles.chatBubble,
                  mensaje.rol === "usuario"
                    ? globalStyles.chatBubbleUsuario
                    : globalStyles.chatBubbleAsistente,
                ]}
              >
                <Text
                  style={
                    mensaje.rol === "usuario"
                      ? globalStyles.chatBubbleTextUsuario
                      : globalStyles.chatBubbleTextAsistente
                  }
                >
                  {mensaje.texto}
                </Text>
              </View>
            </View>
          ))}

          {enviando && (
            <View
              style={[
                globalStyles.chatBubbleRow,
                globalStyles.chatBubbleRowAsistente,
              ]}
            >
              <View
                style={[globalStyles.chatBubble, globalStyles.chatBubbleAsistente]}
              >
                <Text style={globalStyles.chatBubbleTextAsistente}>
                  Escribiendo...
                </Text>
              </View>
            </View>
          )}
        </ScrollView>

        {/* input de texto fijo abajo */}
        <View style={globalStyles.chatInputRow}>
          <TextInput
            placeholder="Escribe tu pregunta..."
            placeholderTextColor="#90A4AE"
            value={textoEntrada}
            onChangeText={setTextoEntrada}
            style={globalStyles.chatInput}
            multiline
            accessibilityLabel="Escribe tu pregunta para el asistente virtual"
            onSubmitEditing={enviarMensaje}
          />

          <TouchableOpacity
            style={[
              globalStyles.chatSendButton,
              (enviando || !textoEntrada.trim()) &&
                globalStyles.chatSendButtonDisabled,
            ]}
            onPress={enviarMensaje}
            disabled={enviando || !textoEntrada.trim()}
            accessibilityRole="button"
            accessibilityLabel="Enviar mensaje"
          >
            <Text style={globalStyles.chatSendButtonText}>➤</Text>
          </TouchableOpacity>
        </View>

        <View style={globalStyles.noticeCard}>
          <Text style={globalStyles.noticeText}>
            Este asistente da orientación general y no sustituye una consulta
            médica. Ante síntomas de urgencia, acude de inmediato a un
            servicio de urgencias.
          </Text>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
