# 🏆 AyurBridge — WHO ICD-11 & TM2 AI Diagnostic Engine

**AyurBridge** is an AI-powered diagnostic interoperability platform that translates traditional medicine concepts (Ayurveda, Siddha, Unani) into standardized **WHO ICD-11** biomedical codes and **Chapter 26 TM2** traditional medicine codes.

---

## 🎯 Hackathon Bounty Tracks & Command Compliance Summary

All **3 Main Hackathon Bounties** and **9 Specific Sub-Commands** specified in the competition rubric have been fully implemented:

### 🏆 Bounty Track 1: Health Record Evidence Attachments
- **Command 1 (Attachment Input)**: File attachment input (`#np-file-input`) integrated into the Add Health Record modal.
- **Command 2 (Preview & Link Display)**: Clickable evidence badges (`Lab_Report_CBC_ECG.pdf`, `Thermal_PPG_Pulse_Scan.png`) opening an interactive **Evidence Attachment Preview Modal**.
- **Command 3 (Persistence & Pre-Populated Sample)**: All patient records persist attachment metadata; 4 pre-populated sample records loaded with lab evidence files.

### 🏆 Bounty Track 2: Role-Aware Health Record Filters
- **Command 4 (Role Filter Tabs)**: Interactive role tabs (`User / Patient`, `Hospital / Doctor`, `Health Authority`, `Investigator / Reviewer`).
- **Command 5 (Scoped Results & Count Indicator)**: Real-time scoped table filtering with visible count indicator (`Showing X Health Records for Role: Hospital`).
- **Command 6 (Multi-Role Demo Data)**: Pre-loaded records with active role statuses (*Verified by Hospital*, *Approved by Authority*, *Submitted by Patient*, *Audited by Investigator*).

### 🏆 Bounty Track 3: Judge-Ready Patient Summary Report Exporter
- **Command 7 (Combined Summary Data)**: Comprehensive summary modal combining patient details, confirmed symptoms matrix, ICD-11 & TM2 predictions, and clinical next steps.
- **Command 8 (Calculated Risk Level Indicator)**: Visual color-coded risk assessment badge (`🔴 HIGH RISK`, `🟡 MODERATE RISK`, `🟢 LOW RISK`).
- **Command 9 (Judge-Ready Export & Disclaimer)**: One-click HTML/PDF Summary Export with standardized official medical and legal disclaimers.
