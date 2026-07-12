import { StyleSheet } from "react-native";

// Paleta "MediCore" — reskin verde médico profesional (UTP Edition 2026).
export const colors = {
  background: "#F7FAF8",
  white: "#FFFFFF",

  primary: "#00843D",
  primaryDark: "#006C32",
  primaryLight: "#DFF5E8",

  accent: "#00A651",

  green: "#059669",
  greenLight: "#DCFCE7",

  red: "#DC2626",
  redLight: "#FEE2E2",

  yellow: "#FEF3C7",
  warning: "#B45309",

  text: "#0F172A",
  muted: "#64748B",
  border: "#DBE5DC",

  soft: "#F7FAF8",
  soft2: "#EEF4F0",
};

// Sombra suave reutilizable, estilo Google Fit / Apple Health,
// para darle profundidad a las tarjetas sin StyleSheets nuevos por pantalla.
const sombraSuave = {
  shadowColor: "#006C32",
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.08,
  shadowRadius: 12,
  elevation: 3,
};

const sombraTenue = {
  shadowColor: "#006C32",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.06,
  shadowRadius: 6,
  elevation: 2,
};

export const globalStyles = StyleSheet.create({
  // Pantalla general
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },

  // Contenedor principal
  container: {
    flex: 1,
    padding: 18,
  },

  // Encabezado general
  headerCard: {
    backgroundColor: colors.white,
    padding: 20,
    borderRadius: 24,
    marginBottom: 16,
    borderLeftWidth: 6,
    borderLeftColor: colors.primary,
    ...sombraSuave,
  },

  title: {
    fontSize: 29,
    fontWeight: "900",
    color: colors.primaryDark,
  },

  subtitle: {
    color: colors.muted,
    marginTop: 8,
    lineHeight: 20,
    fontWeight: "600",
  },

  sectionTitle: {
    fontSize: 21,
    fontWeight: "900",
    color: colors.text,
    marginBottom: 12,
  },

  label: {
    fontWeight: "800",
    color: colors.text,
    marginBottom: 8,
    marginTop: 4,
  },

  // Inputs
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
    backgroundColor: colors.soft,
    color: colors.text,
    fontWeight: "600",
  },

  textArea: {
    minHeight: 86,
    textAlignVertical: "top",
  },

  // Botones generales
  buttonPrimary: {
    backgroundColor: colors.primary,
    padding: 15,
    borderRadius: 16,
    ...sombraTenue,
  },

  buttonGreen: {
    backgroundColor: colors.green,
    padding: 15,
    borderRadius: 16,
    ...sombraTenue,
  },

  buttonText: {
    color: colors.white,
    textAlign: "center",
    fontWeight: "900",
    fontSize: 15,
  },

  // Resumen
  summaryRow: {
    flexDirection: "row",
    marginBottom: 18,
  },

  summaryCard: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 14,
    borderRadius: 18,
    alignItems: "center",
    marginRight: 8,
    ...sombraTenue,
  },

  summaryNumber: {
    fontSize: 24,
    fontWeight: "900",
    color: colors.primary,
  },

  summaryText: {
    color: colors.muted,
    fontSize: 12,
    fontWeight: "800",
    marginTop: 4,
  },

  // Dashboard: tarjeta del bebé
  profileCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#BFE8D2",
    padding: 16,
    borderRadius: 24,
    marginTop: 8,
    marginBottom: 16,
    ...sombraSuave,
  },

  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
    ...sombraTenue,
  },

  avatarText: {
    fontSize: 34,
  },

  profileInfo: {
    flex: 1,
  },

  babyName: {
    fontSize: 21,
    fontWeight: "900",
    color: colors.primaryDark,
  },

  babyAge: {
    color: colors.muted,
    fontWeight: "800",
    marginTop: 2,
  },

  countryBadge: {
    backgroundColor: colors.primaryLight,
    paddingVertical: 5,
    paddingHorizontal: 9,
    borderRadius: 12,
    marginTop: 8,
    alignSelf: "flex-start",
  },

  countryText: {
    color: colors.primaryDark,
    fontWeight: "800",
    fontSize: 12,
  },

  configButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
    ...sombraTenue,
  },

  configIcon: {
    fontSize: 22,
  },

  // Dashboard: próxima vacuna
  nextVaccineCard: {
    backgroundColor: colors.primary,
    padding: 20,
    borderRadius: 24,
    marginBottom: 20,
    ...sombraSuave,
  },

  nextTitle: {
    color: colors.white,
    fontSize: 22,
    fontWeight: "900",
  },

  nextSubtitle: {
    color: colors.primaryLight,
    marginTop: 4,
    fontWeight: "800",
  },

  nextDate: {
    color: colors.white,
    marginTop: 8,
    marginBottom: 14,
    fontWeight: "600",
  },

  scheduleButton: {
    backgroundColor: colors.white,
    padding: 13,
    borderRadius: 14,
  },

  scheduleButtonText: {
    color: colors.primaryDark,
    textAlign: "center",
    fontWeight: "900",
  },

  // Dashboard: tabla
  tableCard: {
    backgroundColor: colors.white,
    borderRadius: 20,
    overflow: "hidden",
    marginBottom: 20,
    ...sombraSuave,
  },

  tableHeader: {
    flexDirection: "row",
    backgroundColor: colors.primaryLight,
    paddingVertical: 12,
    paddingHorizontal: 10,
  },

  tableHeaderText: {
    color: colors.primaryDark,
    fontWeight: "900",
    fontSize: 13,
  },

  tableRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 13,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.soft2,
  },

  colLarge: {
    flex: 1.4,
  },

  colMedium: {
    flex: 1,
  },

  colSmall: {
    flex: 1,
    alignItems: "center",
  },

  vaccineName: {
    color: colors.primaryDark,
    fontWeight: "900",
    fontSize: 14,
  },

  vaccineDose: {
    color: colors.muted,
    fontSize: 11,
    marginTop: 2,
  },

  vaccineStage: {
    color: colors.muted,
    fontWeight: "700",
    fontSize: 12,
  },

  statusBadge: {
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 12,
  },

  statusApplied: {
    backgroundColor: colors.greenLight,
  },

  statusNext: {
    backgroundColor: colors.yellow,
  },

  statusPending: {
    backgroundColor: colors.redLight,
  },

  statusText: {
    color: colors.text,
    fontWeight: "900",
    fontSize: 11,
  },

  // Dashboard: módulos
  moduleCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
    padding: 15,
    borderRadius: 18,
    marginBottom: 12,
    ...sombraTenue,
  },

  moduleIconBox: {
    width: 50,
    height: 50,
    borderRadius: 15,
    backgroundColor: colors.primaryLight,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  // Variantes de color para diferenciar módulos de un vistazo (mismo tamaño,
  // solo cambia el tinte de fondo — reutiliza los colores ya definidos).
  moduleIconBoxWarning: {
    backgroundColor: colors.yellow,
  },

  moduleIconBoxGreen: {
    backgroundColor: colors.greenLight,
  },

  moduleIconBoxMuted: {
    backgroundColor: colors.soft2,
  },

  moduleIcon: {
    fontSize: 26,
  },

  moduleInfo: {
    flex: 1,
  },

  moduleTitle: {
    color: colors.primaryDark,
    fontWeight: "900",
    fontSize: 16,
  },

  moduleDescription: {
    color: colors.muted,
    fontSize: 12,
    marginTop: 4,
    fontWeight: "600",
  },

  arrow: {
    fontSize: 32,
    color: colors.primary,
    fontWeight: "900",
  },

  // Documentos: formulario
  formCard: {
    backgroundColor: colors.white,
    padding: 18,
    borderRadius: 22,
    marginBottom: 22,
    ...sombraSuave,
  },

  typesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 14,
  },

  typeButton: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 12,
    backgroundColor: colors.primaryLight,
    marginRight: 8,
    marginBottom: 8,
  },

  typeActive: {
    backgroundColor: colors.primary,
  },

  typeText: {
    color: colors.primaryDark,
    fontWeight: "800",
    fontSize: 12,
  },

  typeTextActive: {
    color: colors.white,
  },

  // Documentos: categorías
  categoryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 18,
  },

  categoryCard: {
    width: "48%",
    backgroundColor: colors.white,
    padding: 15,
    borderRadius: 18,
    marginRight: 8,
    marginBottom: 10,
    ...sombraTenue,
  },

  categoryIcon: {
    fontSize: 28,
  },

  categoryTitle: {
    color: colors.primaryDark,
    fontWeight: "900",
    fontSize: 15,
    marginTop: 8,
  },

  categorySubtitle: {
    color: colors.muted,
    fontSize: 12,
    marginTop: 4,
  },

  // Documentos: tarjetas
  documentCard: {
    backgroundColor: colors.white,
    padding: 16,
    borderRadius: 20,
    marginBottom: 12,
    borderLeftWidth: 6,
    borderLeftColor: colors.green,
    ...sombraSuave,
  },

  documentHeader: {
    flexDirection: "row",
    alignItems: "center",
  },

  documentIconBox: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: colors.primaryLight,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  documentIcon: {
    fontSize: 25,
  },

  documentInfo: {
    flex: 1,
  },

  documentName: {
    fontSize: 16,
    fontWeight: "900",
    color: colors.primaryDark,
  },

  documentType: {
    color: colors.muted,
    marginTop: 2,
    fontSize: 12,
    fontWeight: "700",
  },

  documentDescription: {
    marginTop: 12,
    color: colors.muted,
    lineHeight: 19,
    fontWeight: "600",
  },

  documentActions: {
    flexDirection: "row",
    marginTop: 14,
  },

  viewButton: {
    flex: 1,
    backgroundColor: colors.primaryLight,
    padding: 11,
    borderRadius: 12,
    marginRight: 8,
  },

  viewButtonText: {
    color: colors.primaryDark,
    textAlign: "center",
    fontWeight: "900",
  },

  deleteButton: {
    flex: 1,
    backgroundColor: colors.redLight,
    padding: 11,
    borderRadius: 12,
  },

  deleteButtonText: {
    color: colors.red,
    textAlign: "center",
    fontWeight: "900",
  },

  statusBadgeGreen: {
    backgroundColor: colors.greenLight,
    paddingVertical: 6,
    paddingHorizontal: 9,
    borderRadius: 12,
  },

  statusTextGreen: {
    color: colors.green,
    fontWeight: "900",
    fontSize: 11,
  },

  // Tarjeta de ayuda
  helpCard: {
    backgroundColor: colors.yellow,
    padding: 16,
    borderRadius: 18,
    marginTop: 8,
    ...sombraTenue,
  },

  helpTitle: {
    color: colors.warning,
    fontWeight: "900",
    fontSize: 16,
  },

  helpText: {
    color: "#92400E",
    marginTop: 6,
    lineHeight: 19,
    fontWeight: "600",
  },

  // Alerta
  alertCard: {
    backgroundColor: colors.yellow,
    padding: 16,
    borderRadius: 18,
    marginTop: 8,
    ...sombraTenue,
  },

  alertTitle: {
    color: colors.warning,
    fontWeight: "900",
    fontSize: 16,
  },

  alertText: {
    color: "#92400E",
    marginTop: 6,
    lineHeight: 19,
    fontWeight: "600",
  },

  // Espacio final para que no tape la barra inferior
  bottomSpace: {
    height: 30,
  },

    // Opciones para frecuencia de vitaminas
  optionRow: {
    flexDirection: "row",
    marginBottom: 12,
  },

  optionButton: {
    flex: 1,
    backgroundColor: colors.primaryLight,
    padding: 12,
    borderRadius: 12,
    marginRight: 8,
  },

  optionActive: {
    backgroundColor: colors.primary,
  },

  optionText: {
    textAlign: "center",
    color: colors.primaryDark,
    fontWeight: "800",
  },

  optionTextActive: {
    color: colors.white,
  },

  // Nota dentro del formulario de vitaminas
  noticeCard: {
    backgroundColor: colors.yellow,
    padding: 13,
    borderRadius: 14,
    marginBottom: 14,
  },

  noticeText: {
    color: colors.warning,
    fontWeight: "800",
    textAlign: "center",
  },

  // Tarjetas de vitaminas
  vitaminCard: {
    backgroundColor: colors.white,
    padding: 16,
    borderRadius: 20,
    marginBottom: 12,
    borderLeftWidth: 6,
    borderLeftColor: colors.green,
    ...sombraSuave,
  },

  vitaminHeader: {
    flexDirection: "row",
    alignItems: "center",
  },

  vitaminIconBox: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: colors.primaryLight,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  vitaminIcon: {
    fontSize: 25,
  },

  vitaminInfoBox: {
    flex: 1,
  },

  vitaminName: {
    fontSize: 17,
    fontWeight: "900",
    color: colors.primaryDark,
  },

  vitaminInfo: {
    color: colors.muted,
    marginTop: 4,
    fontWeight: "600",
  },

  vitaminDetails: {
    backgroundColor: colors.soft,
    padding: 12,
    borderRadius: 14,
    marginTop: 14,
  },

    // LOGIN SCREEN

  loginContainer: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: "center",
    padding: 24,
  },

  loginCard: {
    backgroundColor: colors.white,
    borderRadius: 26,
    padding: 24,
    ...sombraSuave,
  },

  loginLogo: {
    fontSize: 54,
    textAlign: "center",
    marginBottom: 8,
  },

  loginLogoImage: {
    width: 92,
    height: 92,
    borderRadius: 22,
    alignSelf: "center",
    marginBottom: 10,
  },

  passwordHint: {
    color: colors.muted,
    fontSize: 12,
    marginTop: -6,
    marginBottom: 12,
  },

  privacyLinkText: {
    textAlign: "center",
    color: colors.primary,
    marginTop: 10,
    fontSize: 13,
    fontWeight: "700",
  },

  loginTitle: {
    fontSize: 28,
    fontWeight: "900",
    textAlign: "center",
    color: colors.primaryDark,
    marginBottom: 8,
  },

  loginSubtitle: {
    fontSize: 14,
    textAlign: "center",
    color: colors.muted,
    marginBottom: 24,
    lineHeight: 20,
  },

  countryContainer: {
    flexDirection: "row",
    marginBottom: 18,
  },

  countryButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#BFE8D2",
    borderRadius: 14,
    padding: 12,
    backgroundColor: "#F3FBF6",
    marginRight: 8,
  },

  countryActive: {
    backgroundColor: "#BFE8D2",
    borderColor: colors.primary,
  },

  loginButton: {
    backgroundColor: colors.primary,
    padding: 16,
    borderRadius: 16,
    marginTop: 8,
    ...sombraTenue,
  },

  loginButtonText: {
    color: colors.white,
    textAlign: "center",
    fontWeight: "900",
    fontSize: 16,
  },

  footer: {
    textAlign: "center",
    color: colors.muted,
    marginTop: 18,
    fontSize: 12,
  },

  versionCard: {
    backgroundColor: colors.primaryLight,
    padding: 12,
    borderRadius: 14,
    marginTop: 16,
  },

  versionText: {
    textAlign: "center",
    color: colors.primaryDark,
    fontWeight: "700",
  },

    // Growth Screen

  growthCard: {
    backgroundColor: colors.white,
    padding: 18,
    borderRadius: 18,
    marginBottom: 12,
    ...sombraTenue,
  },

  growthTitle: {
    color: colors.primaryDark,
    fontWeight: "800",
    fontSize: 16,
  },

  growthValue: {
    fontSize: 28,
    fontWeight: "900",
    color: colors.primary,
    marginTop: 8,
  },

  historyCard: {
    backgroundColor: colors.white,
    padding: 16,
    borderRadius: 18,
    marginBottom: 12,
    ...sombraTenue,
  },

  historyDate: {
    fontSize: 16,
    fontWeight: "900",
    color: colors.primaryDark,
    marginBottom: 8,
  },

  historyText: {
    color: colors.muted,
    marginBottom: 4,
    fontWeight: "600",
  },

    // FOOD SCREEN

  foodCard: {
    backgroundColor: colors.white,
    padding: 18,
    borderRadius: 18,
    marginBottom: 12,
    ...sombraTenue,
  },

  foodTitle: {
    fontSize: 18,
    fontWeight: "900",
    color: colors.primaryDark,
  },

  foodDescription: {
    marginTop: 8,
    color: colors.muted,
    lineHeight: 20,
  },

  scheduleCard: {
    backgroundColor: colors.white,
    padding: 18,
    borderRadius: 18,
    marginBottom: 18,
    ...sombraTenue,
  },

  scheduleText: {
    fontSize: 15,
    color: colors.muted,
    marginBottom: 8,
    fontWeight: "600",
  },

  foodStatusCard: {
    backgroundColor: colors.greenLight,
    padding: 18,
    borderRadius: 18,
    marginBottom: 18,
    ...sombraTenue,
  },

  foodStatusTitle: {
    fontSize: 18,
    fontWeight: "900",
    color: colors.green,
  },

  foodStatusText: {
    marginTop: 8,
    color: colors.green,
    lineHeight: 20,
    fontWeight: "600",
  },

    // CALENDAR SCREEN

  calendarCard: {
    backgroundColor: colors.white,
    padding: 18,
    borderRadius: 18,
    marginBottom: 12,
    ...sombraTenue,
  },

  calendarTitle: {
    fontSize: 18,
    fontWeight: "900",
    color: colors.primaryDark,
  },

  calendarDate: {
    fontSize: 16,
    fontWeight: "800",
    color: colors.primary,
    marginTop: 8,
  },

  calendarDescription: {
    marginTop: 8,
    color: colors.muted,
    lineHeight: 20,
    fontWeight: "600",
  },

  timelineCard: {
    backgroundColor: colors.white,
    padding: 16,
    borderRadius: 18,
    marginBottom: 10,
    borderLeftWidth: 5,
    borderLeftColor: colors.primary,
    ...sombraTenue,
  },

  timelineDate: {
    fontSize: 14,
    fontWeight: "900",
    color: colors.primaryDark,
    marginBottom: 6,
  },

  timelineText: {
    color: colors.muted,
    fontWeight: "600",
  },

    // ==========================
  // BOTTOM NAVIGATION
  // ==========================

  bottomNav: {
    flexDirection: "row",
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingVertical: 12,
    paddingBottom: 14,
    shadowColor: "#006C32",
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 8,
  },

  bottomNavItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  bottomNavIconWrap: {
    width: 42,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },

  bottomNavIconWrapActive: {
    backgroundColor: colors.primaryLight,
  },

  bottomNavText: {
    fontSize: 20,
    color: colors.muted,
  },

  bottomNavLabel: {
    fontSize: 10,
    fontWeight: "700",
    color: colors.muted,
    marginTop: 2,
  },

  bottomNavActive: {
    color: colors.primary,
  },

  // ==========================
  // PROGRESO DE VACUNACIÓN
  // ==========================

  progressBarTrack: {
    height: 14,
    borderRadius: 7,
    backgroundColor: colors.primaryLight,
    overflow: "hidden",
    marginTop: 10,
  },

  progressBarFill: {
    height: "100%",
    borderRadius: 7,
    backgroundColor: colors.green,
  },

  progressLabel: {
    color: colors.white,
    fontWeight: "800",
    fontSize: 12,
    marginTop: 8,
  },

  unmarkButton: {
    flex: 1,
    backgroundColor: colors.redLight,
    padding: 11,
    borderRadius: 12,
    marginTop: 10,
  },

  unmarkButtonText: {
    color: colors.red,
    textAlign: "center",
    fontWeight: "900",
  },

  applyButton: {
    flex: 1,
    backgroundColor: colors.green,
    padding: 11,
    borderRadius: 12,
    marginTop: 10,
    ...sombraTenue,
  },

  applyButtonText: {
    color: colors.white,
    textAlign: "center",
    fontWeight: "900",
  },

  // ==========================
  // MODAL: selector de cuenta / bebé
  // ==========================

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 108, 50, 0.35)",
    justifyContent: "flex-end",
  },

  modalSheet: {
    backgroundColor: colors.white,
    padding: 20,
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
    ...sombraSuave,
  },

  modalCancelText: {
    textAlign: "center",
    color: colors.muted,
    fontWeight: "800",
    marginTop: 14,
  },
});