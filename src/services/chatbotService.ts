// ==========================================================================
// Chatbot pediátrico (Asistente Virtual) — src/services/chatbotService.ts
//
// Aquí NO entreno un modelo desde cero, eso necesita muchísima
// infraestructura de machine learning que no tengo para este proyecto de
// escuela. Lo que hago es conectarme a un modelo que Google ya entrenó
// (Gemini) y le doy instrucciones fijas (un "system prompt") para que se
// comporte como un asistente pediátrico responsable y no se salga del
// tema. A esto se le llama prompt engineering, y así funcionan casi todos
// los chatbots que uno usa en la vida real.
//
// Para que funcione hay que hacer esto una sola vez y es gratis, sin
// tarjeta:
//   1. Entrar a https://aistudio.google.com con una cuenta de Google.
//   2. Crear una API key gratuita.
//   3. Pegarla en el archivo .env.local (en la raíz del proyecto), así:
//      EXPO_PUBLIC_GEMINI_API_KEY=tu_llave_aqui
//
// OJO: la llave YA NO va escrita aquí en el código. GitHub bloqueó mi
// primer intento de subir el proyecto porque detectó la llave real
// dentro de este archivo (con justa razón: subir una llave a un repo es
// mala práctica, aunque el repo sea privado). Por eso la muevo a
// .env.local, que está en .gitignore y nunca se sube a GitHub.
//
// Si no está la llave configurada, el chatbot avisa claro que falta
// configurarse en vez de tronar sin explicación (mismo patrón que uso en
// el resto de la app: si algo falla, avisar bonito y no romper la
// pantalla).
// ==========================================================================

const GEMINI_API_KEY = process.env.EXPO_PUBLIC_GEMINI_API_KEY || "";

// uso el alias "gemini-flash-latest" en vez de un nombre de versión fija,
// así Google se encarga de apuntarlo siempre al modelo flash gratuito más
// reciente y no se rompe si retiran una versión vieja (ver
// https://ai.google.dev/gemini-api/docs/models)
const GEMINI_MODELO = "gemini-flash-latest";
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODELO}:generateContent`;

// aquí van las instrucciones fijas para que el chatbot se comporte como
// asistente pediátrico responsable y no se ponga a dar diagnósticos
const INSTRUCCIONES_SISTEMA = `
Eres el Asistente Virtual de PediatriTrack Global, una app de seguimiento
pediátrico para padres y tutores. Debes seguir SIEMPRE estas reglas:

1. Solo respondes dudas generales sobre cuidado infantil, vacunación,
   vitaminación, alimentación complementaria y desarrollo del bebé.
2. NUNCA das un diagnóstico médico. Si describen síntomas, orienta de forma
   general y SIEMPRE recomienda consultar a un pediatra de confianza.
3. Si detectas señales de urgencia (dificultad para respirar, fiebre muy
   alta, convulsiones, deshidratación severa, golpe fuerte en la cabeza,
   etc.), indica de inmediato acudir a urgencias o llamar a un número de
   emergencia local, antes que cualquier otra cosa.
4. Si preguntan algo fuera del cuidado infantil, indica amablemente que solo
   puedes ayudar con temas relacionados al bebé o niño.
5. Responde en español de México, de forma breve, cálida y clara (máximo
   unas 4-5 líneas por respuesta).
`.trim();

export type MensajeChat = {
  rol: "usuario" | "asistente";
  texto: string;
};

// mando el historial del chat + el mensaje nuevo a Gemini y regreso la
// respuesta en texto. Nunca dejo que truene hacia la pantalla: si algo
// falla, regreso un mensaje de error que se entienda
// pequeña pausa para el reintento automático de abajo
function esperar(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function preguntarAlChatbot(
  historial: MensajeChat[],
  nuevoMensaje: string
): Promise<string> {
  if (!GEMINI_API_KEY) {
    return (
      "El asistente todavía no está configurado. Falta agregar la llave " +
      "gratuita de Gemini en src/services/chatbotService.ts (variable " +
      "GEMINI_API_KEY)."
    );
  }

  try {
    const contenidoHistorial = historial.map((mensaje) => ({
      role: mensaje.rol === "usuario" ? "user" : "model",
      parts: [{ text: mensaje.texto }],
    }));

    const cuerpoPeticion = JSON.stringify({
      systemInstruction: { parts: [{ text: INSTRUCCIONES_SISTEMA }] },
      contents: [
        ...contenidoHistorial,
        { role: "user", parts: [{ text: nuevoMensaje }] },
      ],
      generationConfig: {
        temperature: 0.4,
        maxOutputTokens: 400,
      },
    });

    let respuesta = await fetch(`${GEMINI_URL}?key=${GEMINI_API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: cuerpoPeticion,
    });

    // el plan gratuito a veces tiene un pico de tráfico (429) o un
    // hiccup pasajero del servidor (503). En vez de tronar de una vez,
    // espero 2 segundos y lo intento una sola vez más antes de avisar
    if (!respuesta.ok && (respuesta.status === 429 || respuesta.status === 503)) {
      await esperar(2000);
      respuesta = await fetch(`${GEMINI_URL}?key=${GEMINI_API_KEY}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: cuerpoPeticion,
      });
    }

    if (!respuesta.ok) {
      const textoError = await respuesta.text();
      console.log("Error de la API de Gemini:", respuesta.status, textoError);

      // el plan gratuito de Gemini tiene un límite de mensajes por minuto,
      // si mandas varios muy seguido puede tronar con 429 (esto no es un
      // bug, nada más hay que esperar un poco)
      if (respuesta.status === 429) {
        return "Estoy recibiendo muchos mensajes ahora mismo (límite del plan gratuito). Espera unos segundos e intenta de nuevo.";
      }

      return `No se pudo conectar con el asistente en este momento (código ${respuesta.status}). Intenta de nuevo más tarde.`;
    }

    const datos = await respuesta.json();
    const texto: string | undefined =
      datos?.candidates?.[0]?.content?.parts?.[0]?.text;

    return (
      texto?.trim() ||
      "No obtuve una respuesta clara. ¿Puedes reformular tu pregunta?"
    );
  } catch (error) {
    console.log("Error al conectar con el chatbot:", error);
    return "Hubo un problema de conexión. Revisa tu internet e intenta de nuevo.";
  }
}
