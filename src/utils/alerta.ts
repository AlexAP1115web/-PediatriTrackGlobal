import { Alert as AlertNativo, Platform } from "react-native";

type BotonAlerta = {
  text?: string;
  onPress?: () => void;
  style?: "default" | "cancel" | "destructive";
};

// Hice este archivo porque encontré el bug real de "no me deja cerrar
// sesión" (y de por qué ninguna alerta de la app se veía en el navegador):
// revisé el código fuente de react-native-web y su Alert.alert está
// literalmente vacío -- static alert() {} -- no hace absolutamente nada
// en web. Por eso ni la confirmación de cerrar sesión, ni los errores de
// login, ni "vitamina guardada", ni nada de lo que usa Alert.alert se
// veía cuando probaba la app en el navegador, aunque en el celular sí
// jala normal.
//
// Aquí armo mi propio "Alert" con la misma forma (mismo nombre de función,
// mismos parámetros) para poder cambiar solo la línea del import en cada
// pantalla y que todo el código de abajo (Alert.alert(...)) siga
// funcionando exactamente igual sin tener que reescribir cada llamada.
// En celular esto usa el Alert real de siempre; en web usa alert()/
// confirm() del navegador, que sí funcionan.
function alert(titulo: string, mensaje?: string, botones?: BotonAlerta[]) {
  if (Platform.OS !== "web") {
    AlertNativo.alert(titulo, mensaje, botones as any);
    return;
  }

  const listaBotones: BotonAlerta[] =
    botones && botones.length > 0 ? botones : [{ text: "OK" }];

  const textoCompleto = mensaje ? `${titulo}\n\n${mensaje}` : titulo;

  // si nada más hay un botón (o ninguno definido), es un aviso simple
  if (listaBotones.length <= 1) {
    window.alert(textoCompleto);
    listaBotones[0]?.onPress?.();
    return;
  }

  // si hay 2 o más botones, lo trato como una confirmación de sí/no
  const confirmado = window.confirm(textoCompleto);

  const botonCancelar = listaBotones.find((b) => b.style === "cancel");
  const botonConfirmar =
    listaBotones.find((b) => b.style !== "cancel") ||
    listaBotones[listaBotones.length - 1];

  if (confirmado) {
    botonConfirmar?.onPress?.();
  } else {
    botonCancelar?.onPress?.();
  }
}

export const Alert = { alert };
