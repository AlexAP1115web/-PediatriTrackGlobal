import { ScrollView, Text, View } from "react-native";
import { globalStyles } from "../styles/globalStyles";

export default function ExploreScreen() {
  return (
    <View style={globalStyles.screen}>
      <ScrollView
        style={globalStyles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* Encabezado */}
        <View style={globalStyles.headerCard}>
          <Text style={globalStyles.title}>
            📱 PediatriTrack Global
          </Text>

          <Text style={globalStyles.subtitle}>
            Sistema móvil para el seguimiento pediátrico,
            control de vacunas, documentos médicos,
            vitaminas, crecimiento y alimentación infantil.
          </Text>
        </View>

        {/* Resumen */}
        <View style={globalStyles.summaryRow}>
          <View style={globalStyles.summaryCard}>
            <Text style={globalStyles.summaryNumber}>8</Text>
            <Text style={globalStyles.summaryText}>
              Módulos
            </Text>
          </View>

          <View style={globalStyles.summaryCard}>
            <Text style={globalStyles.summaryNumber}>📊</Text>
            <Text style={globalStyles.summaryText}>
              Seguimiento
            </Text>
          </View>

          <View style={globalStyles.summaryCard}>
            <Text style={globalStyles.summaryNumber}>💾</Text>
            <Text style={globalStyles.summaryText}>
              SQLite
            </Text>
          </View>
        </View>

        {/* Proyecto */}
        <Text style={globalStyles.sectionTitle}>
          Información del proyecto
        </Text>

        <View style={globalStyles.moduleCard}>
          <View style={globalStyles.moduleIconBox}>
            <Text style={globalStyles.moduleIcon}>👶</Text>
          </View>

          <View style={globalStyles.moduleInfo}>
            <Text style={globalStyles.moduleTitle}>
              Registro del bebé
            </Text>

            <Text style={globalStyles.moduleDescription}>
              Captura información médica y personal.
            </Text>
          </View>
        </View>

        <View style={globalStyles.moduleCard}>
          <View style={globalStyles.moduleIconBox}>
            <Text style={globalStyles.moduleIcon}>💉</Text>
          </View>

          <View style={globalStyles.moduleInfo}>
            <Text style={globalStyles.moduleTitle}>
              Control de vacunas
            </Text>

            <Text style={globalStyles.moduleDescription}>
              Seguimiento del esquema de vacunación.
            </Text>
          </View>
        </View>

        <View style={globalStyles.moduleCard}>
          <View style={globalStyles.moduleIconBox}>
            <Text style={globalStyles.moduleIcon}>📄</Text>
          </View>

          <View style={globalStyles.moduleInfo}>
            <Text style={globalStyles.moduleTitle}>
              Documentos
            </Text>

            <Text style={globalStyles.moduleDescription}>
              Administración de recetas y estudios médicos.
            </Text>
          </View>
        </View>

        <View style={globalStyles.moduleCard}>
          <View style={globalStyles.moduleIconBox}>
            <Text style={globalStyles.moduleIcon}>💊</Text>
          </View>

          <View style={globalStyles.moduleInfo}>
            <Text style={globalStyles.moduleTitle}>
              Vitaminas
            </Text>

            <Text style={globalStyles.moduleDescription}>
              Control de suplementos y tratamientos.
            </Text>
          </View>
        </View>

        <View style={globalStyles.moduleCard}>
          <View style={globalStyles.moduleIconBox}>
            <Text style={globalStyles.moduleIcon}>📈</Text>
          </View>

          <View style={globalStyles.moduleInfo}>
            <Text style={globalStyles.moduleTitle}>
              Crecimiento
            </Text>

            <Text style={globalStyles.moduleDescription}>
              Registro de peso, talla y percentiles.
            </Text>
          </View>
        </View>

        <View style={globalStyles.moduleCard}>
          <View style={globalStyles.moduleIconBox}>
            <Text style={globalStyles.moduleIcon}>🍎</Text>
          </View>

          <View style={globalStyles.moduleInfo}>
            <Text style={globalStyles.moduleTitle}>
              Alimentación
            </Text>

            <Text style={globalStyles.moduleDescription}>
              Seguimiento nutricional del bebé.
            </Text>
          </View>
        </View>

        <View style={globalStyles.moduleCard}>
          <View style={globalStyles.moduleIconBox}>
            <Text style={globalStyles.moduleIcon}>📅</Text>
          </View>

          <View style={globalStyles.moduleInfo}>
            <Text style={globalStyles.moduleTitle}>
              Calendario
            </Text>

            <Text style={globalStyles.moduleDescription}>
              Recordatorios de vacunas y consultas.
            </Text>
          </View>
        </View>

        {/* Tecnologías */}
        <Text style={globalStyles.sectionTitle}>
          Tecnologías utilizadas
        </Text>

        <View style={globalStyles.helpCard}>
          <Text style={globalStyles.helpTitle}>
            ⚙️ Stack Tecnológico
          </Text>

          <Text style={globalStyles.helpText}>
            React Native + Expo Router + TypeScript +
            SQLite + Expo SQLite + Global Styles.
          </Text>
        </View>

        {/* Autor */}
        <View style={globalStyles.helpCard}>
          <Text style={globalStyles.helpTitle}>
            👨‍💻 Desarrollador
          </Text>

          <Text style={globalStyles.helpText}>
            Alejandro Pérez Alcántara
          </Text>

          <Text style={globalStyles.helpText}>
            Ingeniería en Desarrollo de Software
            Multiplataforma
          </Text>

          <Text style={globalStyles.helpText}>
            Universidad Tecnológica de Puebla
          </Text>
        </View>

        <View style={globalStyles.bottomSpace} />
      </ScrollView>
    </View>
  );
}