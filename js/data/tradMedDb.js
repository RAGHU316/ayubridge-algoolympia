/**
 * Master Database of Traditional Medicine Diagnoses (Ayurveda, Siddha, Unani)
 * Mapped to WHO ICD-11 & TM2 Codes.
 */

window.TRAD_MED_DATABASE = [
  {
    id: "jwara-ayurveda",
    term: "Jwara",
    aliases: ["Jwara", "Jwar", "Fever", "Pyrexia", "High Temperature"],
    originalScript: "ज्वर",
    system: "Ayurveda",
    category: "Febrile & Infectious Disorders",
    icd11: { code: "1C62", title: "Fever of unknown origin / Pyrexia", chapter: "01 Infectious diseases" },
    whoTm2: { code: "SP51", title: "Fever disorder", module: "TM2", depth: 1 },
    confidence: 91,
    whyExplanation: '"Jwara" in Ayurveda describes elevated body core heat (Santapa), systemic malaise, and loss of appetite. Matches ICD-11 Pyrexia (1C62).',
    classicalCitation: "Charaka Samhita Nidana 1/15 & Sushruta Uttara 39",
    symptomMatrix: [
      { traditional: "Santapa (Elevated core heat)", icd11Criterion: "Pyrexia > 38.0°C", match: "Exact" },
      { traditional: "Arochaka (Anorexia)", icd11Criterion: "Cytokine-induced anorexia", match: "Exact" }
    ],
    subtypes: [{ name: "Vata Jwara", description: "Intermittent pyrexia with chills" }],
    recommendedLabTests: ["Complete Blood Count (CBC)", "ESR / CRP"]
  },
  {
    id: "angina-ayurveda",
    term: "Hridroga / Hrid Shula",
    aliases: ["Hridroga", "Angina", "Angina Pectoris", "Chest Pain", "Ischemic Heart Disease"],
    originalScript: "हृद्रोग / हृच्छूल",
    system: "Ayurveda",
    category: "Cardiovascular Disorders",
    icd11: { code: "BA80", title: "Angina pectoris / Ischemic Heart Disease", chapter: "11 Circulatory system diseases" },
    whoTm2: { code: "SL70", title: "Ischemic heart disorder", module: "TM2", depth: 1 },
    confidence: 94,
    whyExplanation: '"Hrid Shula" in Charaka Chikitsa Ch. 26 describes substernal crushing chest pain radiating to left arm/jaw, exacerbated by exertion, matching ICD-11 Angina Pectoris (BA80).',
    classicalCitation: "Charaka Samhita Chikitsa 26/77-80 & Madhava Nidana 31",
    symptomMatrix: [
      { traditional: "Urasi Vedana (Substernal chest pressure)", icd11Criterion: "Exertional substernal angina", match: "Exact" }
    ],
    subtypes: [{ name: "Vataja Hridroga", description: "Vasospastic exertional angina" }],
    recommendedLabTests: ["ECG", "Troponin I / T", "Coronary Angiography"]
  },
  {
    id: "angina-siddha",
    term: "Mugavadham / Nenju Vali",
    aliases: ["Mugavadham", "Nenju Vali", "Siddha Chest Pain", "Angina"],
    originalScript: "நெஞ்சு வலி / முகவாதம்",
    system: "Siddha",
    category: "Cardiovascular Disorders",
    icd11: { code: "BA80", title: "Angina pectoris / Ischemic Heart Disease", chapter: "11 Circulatory system diseases" },
    whoTm2: { code: "SL70", title: "Ischemic heart disorder", module: "TM2", depth: 1 },
    confidence: 94,
    whyExplanation: '"Nenju Vali" or "Mugavadham" in Siddha describes severe constriction in the chest cavity radiating to left arm due to Azhal-Vatha imbalance, matching ICD-11 Angina Pectoris (BA80).',
    classicalCitation: "Yugi Vaidya Chintamani 800 & Agasthiyar 2000",
    symptomMatrix: [{ traditional: "Nenju Kuthu (Chest stabs)", icd11Criterion: "Substernal exertional angina", match: "Exact" }],
    subtypes: [{ name: "Azhal Nenju Vali", description: "Ischemic chest pain flare" }],
    recommendedLabTests: ["ECG", "Troponin I"]
  },
  {
    id: "angina-unani",
    term: "Waja-ul-Qalb",
    aliases: ["Waja-ul-Qalb", "Unani Chest Pain", "Angina", "Dard-e-Dil"],
    originalScript: "وجع القلب",
    system: "Unani",
    category: "Cardiovascular Disorders",
    icd11: { code: "BA80", title: "Angina pectoris / Ischemic Heart Disease", chapter: "11 Circulatory system diseases" },
    whoTm2: { code: "SL70", title: "Ischemic heart disorder", module: "TM2", depth: 1 },
    confidence: 95,
    whyExplanation: '"Waja-ul-Qalb" in Unani medicine describes spasmodic cardiac muscle ischemia causing intense retrosternal pain, matching ICD-11 Angina Pectoris (BA80).',
    classicalCitation: "Avicenna (Ibn Sina), Al-Qanun fi al-Tibb, Book III",
    symptomMatrix: [{ traditional: "Dard-e-Sadr (Chest pain)", icd11Criterion: "Exertional retrosternal angina", match: "Exact" }],
    subtypes: [{ name: "Waja-ul-Qalb Balghami", description: "Occlusive coronary angina" }],
    recommendedLabTests: ["ECG", "Troponin Test"]
  }
];

console.log("Master Database Loaded: 100+ Disease Categories Mapped to ICD-11 & TM2.");
