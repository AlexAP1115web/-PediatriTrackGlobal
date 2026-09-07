import { Text, TouchableOpacity, View } from "react-native";
import { globalStyles } from "../styles/globalStyles";

type Props = {
  onGo: (screen: string) => void;
  active: string;
};

export default function BottomNav({
  onGo,
  active,
}: Props) {
  return (
    <View
      style={globalStyles.bottomNav}
      accessibilityRole="tablist"
      accessibilityLabel="Navegación principal"
    >

      {/* Vacunas */}
      <TouchableOpacity
        style={globalStyles.bottomNavItem}
        onPress={() => onGo("dashboard")}
        accessibilityRole="tab"
        accessibilityLabel="Vacunas"
        accessibilityHint="Ir al panel de vacunación"
        accessibilityState={{ selected: active === "dashboard" }}
      >
        <View
          style={[
            globalStyles.bottomNavIconWrap,
            active === "dashboard" && globalStyles.bottomNavIconWrapActive,
          ]}
        >
          <Text
            style={[
              globalStyles.bottomNavText,
              active === "dashboard" &&
                globalStyles.bottomNavActive,
            ]}
          >
            💉
          </Text>
        </View>

        <Text
          style={[
            globalStyles.bottomNavLabel,
            active === "dashboard" &&
              globalStyles.bottomNavActive,
          ]}
        >
          Vacunas
        </Text>
      </TouchableOpacity>

      {/* Vitaminas */}
      <TouchableOpacity
        style={globalStyles.bottomNavItem}
        onPress={() => onGo("vitaminas")}
        accessibilityRole="tab"
        accessibilityLabel="Vitaminas"
        accessibilityHint="Ir al panel de vitaminación"
        accessibilityState={{ selected: active === "vitaminas" }}
      >
        <View
          style={[
            globalStyles.bottomNavIconWrap,
            active === "vitaminas" && globalStyles.bottomNavIconWrapActive,
          ]}
        >
          <Text
            style={[
              globalStyles.bottomNavText,
              active === "vitaminas" &&
                globalStyles.bottomNavActive,
            ]}
          >
            💊
          </Text>
        </View>

        <Text
          style={[
            globalStyles.bottomNavLabel,
            active === "vitaminas" &&
              globalStyles.bottomNavActive,
          ]}
        >
          Vitaminas
        </Text>
      </TouchableOpacity>

      {/* Documentos */}
      <TouchableOpacity
        style={globalStyles.bottomNavItem}
        onPress={() => onGo("documentos")}
        accessibilityRole="tab"
        accessibilityLabel="Documentos"
        accessibilityHint="Ir al panel de documentos médicos"
        accessibilityState={{ selected: active === "documentos" }}
      >
        <View
          style={[
            globalStyles.bottomNavIconWrap,
            active === "documentos" && globalStyles.bottomNavIconWrapActive,
          ]}
        >
          <Text
            style={[
              globalStyles.bottomNavText,
              active === "documentos" &&
                globalStyles.bottomNavActive,
            ]}
          >
            📄
          </Text>
        </View>

        <Text
          style={[
            globalStyles.bottomNavLabel,
            active === "documentos" &&
              globalStyles.bottomNavActive,
          ]}
        >
          Docs
        </Text>
      </TouchableOpacity>

      {/* Alimentación */}
      <TouchableOpacity
        style={globalStyles.bottomNavItem}
        onPress={() => onGo("alimentacion")}
        accessibilityRole="tab"
        accessibilityLabel="Alimentación"
        accessibilityHint="Ir al panel de alimentación complementaria"
        accessibilityState={{ selected: active === "alimentacion" }}
      >
        <View
          style={[
            globalStyles.bottomNavIconWrap,
            active === "alimentacion" && globalStyles.bottomNavIconWrapActive,
          ]}
        >
          <Text
            style={[
              globalStyles.bottomNavText,
              active === "alimentacion" &&
                globalStyles.bottomNavActive,
            ]}
          >
            🍎
          </Text>
        </View>

        <Text
          style={[
            globalStyles.bottomNavLabel,
            active === "alimentacion" &&
              globalStyles.bottomNavActive,
          ]}
        >
          Comida
        </Text>
      </TouchableOpacity>

      {/* Información */}
      <TouchableOpacity
        style={globalStyles.bottomNavItem}
        onPress={() => onGo("info")}
        accessibilityRole="tab"
        accessibilityLabel="Información"
        accessibilityHint="Ir al panel de información pediátrica"
        accessibilityState={{ selected: active === "info" }}
      >
        <View
          style={[
            globalStyles.bottomNavIconWrap,
            active === "info" && globalStyles.bottomNavIconWrapActive,
          ]}
        >
          <Text
            style={[
              globalStyles.bottomNavText,
              active === "info" &&
                globalStyles.bottomNavActive,
            ]}
          >
            ℹ️
          </Text>
        </View>

        <Text
          style={[
            globalStyles.bottomNavLabel,
            active === "info" &&
              globalStyles.bottomNavActive,
          ]}
        >
          Info
        </Text>
      </TouchableOpacity>

    </View>
  );
}
