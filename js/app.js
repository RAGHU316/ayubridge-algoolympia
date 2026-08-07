/**
 * AyurBridge ICD-11 AI Translator
 * Controller managing Navigation, Search Engine, 3D Hologram, Nadi Pulse Sensor, and Symptoms Exporter.
 */

class AyurBridgeApp {
  constructor() {
    this.currentTab = 'translator';
    this.systemFilter = 'all';
    this.currentResult = null;
    
    // Nadi Sensor State
    this.nadiActive = false;
    this.nadiTaps = [];
    this.nadiInterval = null;
    this.nadiBpm = 72;
    this.nadiVata = 33;
    this.nadiPitta = 34;
    this.nadiKapha = 33;
    this.nadiMatchItem = null;

    // 3D Hologram Rotation State
    this.hologramRotation = 0;
    this.hologramInterval = null;
    this.isDraggingHologram = false;
    this.previousMouseX = 0;

    this.patientRegistry = [
      {
        id: "PAT-2026-801",
        name: "Ramesh Sharma",
        age: 48,
        gender: "Male",
        doctor: "Dr. V. Sharma (BAMS)",
        traditionalTerm: "Jwara",
        system: "Ayurveda",
        icd11Code: "1C62",
        icd11Title: "Fever of unknown origin",
        tm2Code: "SP51",
        confidence: 91,
        date: "2026-08-07",
        insuranceStatus: "Approved"
      }
    ];

    this.init();
  }

  init() {
    this.sbctActive = false;
    this.sbctInterval = null;
    this.sbctCount = 0;
    this.renderEhrBadgeCount();
    this.populatePatientDiagSelect();
    this.renderTmdbTable();
    const container = document.getElementById('translation-result-container');
    if (container) container.innerHTML = '';
  }

  // --- NAVIGATION ---
  switchTab(tabId) {
    this.currentTab = tabId;
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.classList.remove('active', 'bg-emerald-600', 'text-white');
    });

    const activeBtn = document.getElementById(`tab-${tabId}`);
    if (activeBtn) {
      activeBtn.classList.add('active');
    }

    document.querySelectorAll('.view-section').forEach(v => v.classList.add('hidden'));
    const targetView = document.getElementById(`view-${tabId}`);
    if (targetView) targetView.classList.remove('hidden');

    if (tabId === 'ehr') this.renderEhrTable();
    else if (tabId === 'tmdb') this.renderTmdbTable();
    else if (tabId === 'nadi') this.initNadiOscilloscope();
  }

  showToast(message, type = 'success') {
    const container = document.getElementById('toast-container');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = `px-4 py-2.5 rounded-xl border text-xs font-semibold shadow-xl flex items-center gap-2 transition-all ${
      type === 'success' ? 'bg-white border-emerald-300 text-emerald-800' : 'bg-white border-amber-300 text-amber-800'
    }`;
    toast.innerHTML = `<i data-lucide="${type === 'success' ? 'check-circle' : 'info'}" class="w-4 h-4 text-emerald-600"></i><span>${message}</span>`;
    container.appendChild(toast);
    lucide.createIcons();
    setTimeout(() => toast.remove(), 3000);
  }

  // --- 3D HOLOGRAPHIC BODY SCANNER ---
  init3DHologram(targetOrgan = 'General') {
    const canvas = document.getElementById('3d-hologram-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (this.hologramInterval) clearInterval(this.hologramInterval);

    this.hologramInterval = setInterval(() => {
      if (!this.isDraggingHologram) this.hologramRotation += 0.02;
      this.draw3DBodyHologram(ctx, canvas.width, canvas.height, targetOrgan);
    }, 30);
  }

  draw3DBodyHologram(ctx, w, h, targetOrgan) {
    ctx.clearRect(0, 0, w, h);
    const cx = w / 2;
    const cy = h / 2;
    const angle = this.hologramRotation;

    const points3D = [
      { x: 0, y: -90, z: 0, organ: 'Head' },
      { x: -18, y: -45, z: 10, organ: 'Lungs' },
      { x: 18, y: -45, z: 10, organ: 'Lungs' },
      { x: -4, y: -40, z: 15, organ: 'Heart' },
      { x: 15, y: -20, z: 10, organ: 'Liver' },
      { x: -10, y: -15, z: 10, organ: 'Pancreas' },
      { x: 0, y: 20, z: -5, organ: 'Spine' },
      { x: -20, y: 65, z: 0, organ: 'Knees' },
      { x: 20, y: 65, z: 0, organ: 'Knees' }
    ];

    points3D.forEach(p => {
      const rotX = p.x * Math.cos(angle) - p.z * Math.sin(angle);
      const rotZ = p.x * Math.sin(angle) + p.z * Math.cos(angle);
      const scale = 200 / (200 + rotZ);
      const px = cx + rotX * scale;
      const py = cy + p.y * scale;

      const isTarget = targetOrgan && p.organ && targetOrgan.toLowerCase().includes(p.organ.toLowerCase());
      ctx.beginPath();
      ctx.arc(px, py, isTarget ? 7.5 : 3.5, 0, Math.PI * 2);
      ctx.fillStyle = isTarget ? '#ef4444' : '#10b981';
      ctx.fill();
    });
  }

  // --- SEARCH ENGINE ---
  executeSearch() {
    const rawVal = document.getElementById('search-input').value.trim();
    if (!rawVal || rawVal.length < 2) return;

    const query = rawVal.toLowerCase();
    let bestMatch = window.TRAD_MED_DATABASE.find(item => {
      const terms = [item.term, ...(item.aliases || []), item.icd11.title, item.icd11.code].map(t => t.toLowerCase());
      return terms.some(t => t === query || t.includes(query));
    });

    if (bestMatch) {
      this.currentResult = bestMatch;
      this.renderTranslationResult(bestMatch);
    }
  }

  renderTranslationResult(item) {
    const container = document.getElementById('translation-result-container');
    if (!container || !item) return;

    let targetOrgan = "General";
    const fullText = (item.term + " " + (item.aliases || []).join(" ") + " " + item.icd11.title).toLowerCase();
    if (fullText.includes('chest') || fullText.includes('heart') || fullText.includes('angina') || fullText.includes('hrid')) targetOrgan = "Heart";
    else if (fullText.includes('asthma') || fullText.includes('shwasa') || fullText.includes('cough')) targetOrgan = "Lungs";

    container.innerHTML = `
      <div class="bg-white border border-slate-200 rounded-3xl p-6 space-y-6 shadow-sm">
        <div class="flex items-center justify-between border-b pb-4">
          <div>
            <span class="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold">${item.system}</span>
            <h2 class="text-2xl font-extrabold text-slate-900 mt-1">${item.term}</h2>
          </div>
          <button onclick="app.openSymptomAssessmentModal()" class="px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold text-xs rounded-xl shadow-md">
            Assess Symptoms & Generate PDF Report
          </button>
        </div>

        <div class="bg-slate-950 p-4 rounded-2xl text-white flex items-center justify-between">
          <canvas id="3d-hologram-canvas" width="200" height="220"></canvas>
          <div class="space-y-2">
            <div class="text-xs text-emerald-400 font-mono font-bold">PRIMARY ICD-11: ${item.icd11.code} — ${item.icd11.title}</div>
            <div class="text-xs text-amber-400 font-mono font-bold">WHO TM2: ${item.whoTm2.code} — ${item.whoTm2.title}</div>
          </div>
        </div>
      </div>
    `;

    lucide.createIcons();
    setTimeout(() => this.init3DHologram(targetOrgan), 50);
  }
}

window.app = new AyurBridgeApp();