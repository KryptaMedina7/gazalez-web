export const intentLabels = {
  subproducto: "Evaluar un subproducto",
  formulacion: "Solución nutricional y formulación",
  colaboracion: "Colaboración e investigación",
  general: "Consulta técnica o comercial",
};
export function normalizeIntent(value) {
  return Object.hasOwn(intentLabels, value) ? value : "general";
}
export function formatEnquiry(intent, entries) {
  return [
    "CONSULTA TÉCNICA · GAZALEZ",
    intentLabels[normalizeIntent(intent)],
    "",
    ...Object.entries(entries)
      .filter(
        ([key, value]) =>
          !["consent", "attachment"].includes(key) && String(value).trim(),
      )
      .map(([key, value]) => `${key}: ${String(value).trim()}`),
    "",
    "Este resumen fue preparado por el visitante. No constituye aceptación técnica ni propuesta comercial.",
  ].join("\n");
}
export function buildMailto(email, intent, body) {
  return `mailto:${email}?subject=${encodeURIComponent(`GAZALEZ · ${intentLabels[normalizeIntent(intent)]}`)}&body=${encodeURIComponent(body)}`;
}
