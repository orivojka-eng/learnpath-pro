# LearnPath Pro – Corporate Learning Platform (LMS)
**Enterprise Learning Management System by QuolyTech**

[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?logo=vite)](https://vitejs.dev/)
[![Apple HIG](https://img.shields.io/badge/Design-Apple%20HIG%20%2F%20iOS%20UI-007AFF)](https://developer.apple.com/design/human-interface-guidelines/)
[![Tests](https://img.shields.io/badge/Tests-39%20Passing-34C759)]()
[![Copyright](https://img.shields.io/badge/Copyright-%C2%A9%202026%20QuolyTech-5856D6)]()

---

## 🌟 Overview & Purpose
**LearnPath Pro** is a modern corporate learning management system (LMS) designed for HR, People Operations, L&D managers, and enterprise employees. It eliminates scattered training materials and opaque compliance tracking by unifying course authoring, video streaming, interactive quizzes, automated progress tracking, manager compliance analytics, and verifiable corporate certificates into an **Apple HIG & iOS-inspired interface**.

---

## 🚀 Live Demo & Port
- **Dev Server URL:** [http://localhost:5175/](http://localhost:5175/)
- **Vite Port:** `5175` (DocuMind on 5173, TenantHub on 5174)

---

## 🎨 Apple & iOS Design Language
- **Typography:** Apple SF Pro Display & Inter typography with precise tracking and optical kerning.
- **Glassmorphism:** Frosted acrylic header with `backdrop-filter: blur(20px);` and sub-pixel borders (`rgba(0, 0, 0, 0.08)` / dark mode `rgba(255, 255, 255, 0.12)`).
- **Cupertino Segmented Navigation:** Seamless sliding pill selector with haptic feedback transitions.
- **Apple System Palette:**
  - Cupertino Blue: `#007AFF`
  - Deep Purple: `#5856D6`
  - Success Mint: `#34C759`
  - Compliance Amber: `#FF9500`
  - Coral Rose: `#FF2D55`
  - System Alert: `#FF3B30`
- **Zero Emojis:** 100% custom inline SVG vector icon set based on Apple SF Symbols.

---

## 📱 Mobile-First Optimization
1. **Compact, Non-Wrapping Navbar:** Minimal Apple header with segmented control tabs (`Overview`, `My Learning`, `Course Builder`, `Team Analytics`, `Certificates`) that auto-switch to an iOS slide-out sheet drawer on phones.
2. **Floating Bottom Navigation Bar:** Cupertino-style bottom navigation bar with icons and labels, pinned above the iOS Home Indicator (`env(safe-area-inset-bottom)`).
3. **Touch Ergonomics:** All touch targets are sized at `>= 44px` conforming to Apple Human Interface Guidelines.
4. **No Zoom Glitches:** Form controls are calibrated with `font-size: 16px !important;` under 768px to prevent iOS Safari auto-zooming.
5. **Horizontal Overflow Protection:** Data tables and segmented ribbons feature smooth native inertia touch scrolling (`-webkit-overflow-scrolling: touch;`).

---

## 🔑 Core Features & Portfolios

### 1. Overview & Landing Showcase
- Corporate training hero with animated statistics (4,280+ active learners, 98.4% compliance rate, 142 accredited courses).
- Interactive **Learning Showcase Simulator** letting users toggle between SOC2 Security, Generative AI, and Leadership tracks with live previews.

### 2. Learner Dashboard & Progress Hub
- Real-time progress indicators, hours logged, and certifications earned.
- Multi-role switch toggle (`Learner Alex Rivera` ⇄ `Manager Elena Vance`).
- Course catalog with interactive tags, duration badges, and progress scrubbers.

### 3. Mobile-Friendly Video Player & Interactive Quiz Engine
- Video streaming simulator with play/pause controls, speed toggles (1.0x, 1.25x, 1.5x, 2.0x), and scrub bar.
- Integrated chapter navigator and corporate resource downloads.
- Interactive compliance quiz with instantaneous explanation, score calculation, and completion certification unlock.

### 4. Admin Course Builder Studio
- Course metadata authoring with category tags, difficulty selectors, and estimated completion times.
- Interactive syllabus curriculum builder (add/remove video lessons, quizzes, and policy PDFs).
- **Live Apple Card Preview** that updates in real-time as the author types.
- One-click course publishing directly to the active employee catalog.

### 5. Manager & L&D Compliance Analytics
- High-level KPI summary cards (Total Completion Rate, Compliance Deficit, Skill Gap Index, Active Enrollments).
- Departmental compliance breakdown bars (Platform Engineering, Security, Data Science, etc.).
- Searchable & filterable employee roster with instant "Send Nudge" reminder notifications and CSV export.

### 6. Verifiable Corporate Certificate
- High-fidelity cryptographic certificate accredited by the **QuolyTech Corporate Learning Academy**.
- Official gold foil seal, unique verification hash (`QLY-CERT-2026-SOC2-9041`), credential ID, and instant PDF print download.

---

## 🧪 Testing & Verification
A comprehensive test suite runs in Node/JSDOM verifying all 79 unique element IDs, navigation transitions, quiz evaluations, and responsive structures:

```bash
# Verify all DOM element IDs
npm run test:ids

# Run full automated LMS functional suite (39 tests)
npm test

# Build production bundle
npm run build
```

---

## 🏢 Attribution & Copyright
Developed and accredited by **QuolyTech**.
`© 2026 QuolyTech. All rights reserved.`
