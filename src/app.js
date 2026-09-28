// LearnPath Pro - Enterprise Corporate Learning Management System
// Engineered by QuolyTech &bull; Apple HIG / iOS Design Language

import { icons } from './icons.js';
import {
  CURRENT_LEARNER,
  CURRENT_MANAGER,
  ACTIVE_COURSES,
  COMPLETED_COURSES,
  COURSE_QUIZ_QUESTIONS,
  MANAGER_ANALYTICS,
  CERTIFICATE_SAMPLE
} from './data.js';

// Application State
const state = {
  currentView: "intro", // intro | learner | builder | analytics | certificate
  activeRole: "learner", // learner | manager
  learner: JSON.parse(JSON.stringify(CURRENT_LEARNER)),
  manager: JSON.parse(JSON.stringify(CURRENT_MANAGER)),
  courses: JSON.parse(JSON.stringify(ACTIVE_COURSES)),
  completedCourses: JSON.parse(JSON.stringify(COMPLETED_COURSES)),
  analytics: JSON.parse(JSON.stringify(MANAGER_ANALYTICS)),
  activePlayingCourse: null,
  activeLessonId: "L-6",
  videoIsPlaying: false,
  playbackSpeed: 1.0,
  quizCurrentQuestionIndex: 0,
  quizSelectedOption: null,
  quizAnswers: [],
  builderModules: [
    { title: "Module 1: Detecting Pod Anomalies", type: "Video", duration: "25m" },
    { title: "Module 2: Network Policy Isolation", type: "Document", duration: "30m" },
    { title: "Module 3: Knowledge Evaluation Quiz", type: "Quiz", duration: "80% to Pass" }
  ]
};

// DOM References Cache
let elements = {};

document.addEventListener("DOMContentLoaded", () => {
  initDOMElements();
  renderSVGIcons();
  initNavigation();
  initShowcaseSimulator();
  initLearnerDashboard();
  initCourseBuilder();
  initManagerAnalytics();
  initCertificateView();
  initCoursePlayer();
  initModals();

  showToast(
    "LearnPath Pro Ready",
    "Enterprise corporate LMS loaded. Switch roles between Learner and Manager.",
    "blue"
  );
});

function initDOMElements() {
  elements = {
    // Navigation
    mainNavTabs: document.querySelectorAll("#main-nav-tabs .segment-btn"),
    viewSections: document.querySelectorAll(".view-section"),
    brandHomeBtn: document.getElementById("brand-home-btn"),
    btnToggleRole: document.getElementById("btn-toggle-role"),
    lblRolePill: document.getElementById("lbl-role-pill"),
    btnHeaderCta: document.getElementById("btn-header-cta"),
    lblHeaderCta: document.getElementById("lbl-header-cta"),
    btnMobileToggle: document.getElementById("btn-mobile-toggle"),
    mobileDrawerOverlay: document.getElementById("mobile-drawer-overlay"),
    mobileDrawer: document.getElementById("mobile-drawer"),
    btnCloseMobileDrawer: document.getElementById("btn-close-mobile-drawer"),
    btnMobileDrawerResume: document.getElementById("btn-mobile-drawer-resume"),
    btnMobileDrawerRole: document.getElementById("btn-mobile-drawer-role"),
    lblMobileDrawerRole: document.getElementById("lbl-mobile-drawer-role"),
    mobileDrawerLinks: document.querySelectorAll(".mobile-drawer-link"),
    mobileBottomNav: document.getElementById("mobile-bottom-nav"),
    mobileNavItems: document.querySelectorAll(".mobile-nav-item[data-bottom-view]"),
    btnBottomMenu: document.getElementById("btn-bottom-menu"),
    bottomLearningDot: document.getElementById("bottom-learning-dot"),
    footerViewLinks: document.querySelectorAll("[data-footer-view]"),
    navActiveCount: document.getElementById("nav-active-count"),

    // Intro / Showcase
    btnHeroLaunchLearner: document.getElementById("btn-hero-launch-learner"),
    btnHeroOpenBuilder: document.getElementById("btn-hero-open-builder"),
    btnHeroViewAnalytics: document.getElementById("btn-hero-view-analytics"),
    showcaseTitle: document.getElementById("showcase-title"),
    showcaseBadge: document.getElementById("showcase-badge"),
    showcaseTime: document.getElementById("showcase-time"),
    showcaseDesc: document.getElementById("showcase-desc"),
    showcaseProgressNum: document.getElementById("showcase-progress-num"),
    showcaseProgressBar: document.getElementById("showcase-progress-bar"),
    btnShowcaseSoc2: document.getElementById("btn-showcase-soc2"),
    btnShowcaseAi: document.getElementById("btn-showcase-ai"),
    btnShowcaseLead: document.getElementById("btn-showcase-lead"),
    btnShowcasePlay: document.getElementById("btn-showcase-play"),
    btnShowcaseCert: document.getElementById("btn-showcase-cert"),

    // Learner View
    learnerCoursesGrid: document.getElementById("learner-courses-grid"),
    completedCoursesList: document.getElementById("completed-courses-list"),
    learnerProfileName: document.getElementById("learner-profile-name"),
    statCertsCount: document.getElementById("stat-certs-count"),
    btnLearnerRefresh: document.getElementById("btn-learner-refresh"),

    // Course Builder
    formCourseBuilder: document.getElementById("form-course-builder"),
    inputCourseTitle: document.getElementById("input-course-title"),
    selectCourseCategory: document.getElementById("select-course-category"),
    selectCourseTier: document.getElementById("select-course-tier"),
    selectCourseDept: document.getElementById("select-course-dept"),
    inputPassThreshold: document.getElementById("input-pass-threshold"),
    lblThreshold: document.getElementById("lbl-threshold"),
    inputCourseDesc: document.getElementById("input-course-desc"),
    btnAddModuleRow: document.getElementById("btn-add-module-row"),
    builderModulesContainer: document.getElementById("builder-modules-container"),
    btnPublishCourse: document.getElementById("btn-publish-course"),
    btnResetBuilder: document.getElementById("btn-reset-builder"),
    previewTitle: document.getElementById("preview-title"),
    previewBadge: document.getElementById("preview-badge"),
    previewDept: document.getElementById("preview-dept"),
    previewDesc: document.getElementById("preview-desc"),

    // Analytics View
    statOverallCompliance: document.getElementById("stat-overall-compliance"),
    deptBarsContainer: document.getElementById("dept-bars-container"),
    teamRosterTbody: document.getElementById("team-roster-tbody"),
    inputRosterSearch: document.getElementById("input-roster-search"),
    btnNudgeAllPending: document.getElementById("btn-nudge-all-pending"),
    btnExportAuditCsv: document.getElementById("btn-export-audit-csv"),

    // Certificate View
    certStudentName: document.getElementById("cert-student-name"),
    btnDownloadPdfCert: document.getElementById("btn-download-pdf-cert"),
    btnShareLinkedinCert: document.getElementById("btn-share-linkedin-cert"),

    // Course Player Modal
    modalPlayer: document.getElementById("modal-player"),
    playerModalCourseTitle: document.getElementById("player-modal-course-title"),
    playerCurrentLessonLabel: document.getElementById("player-current-lesson-label"),
    btnVideoPlayToggle: document.getElementById("btn-video-play-toggle"),
    btnMiniPlay: document.getElementById("btn-mini-play"),
    videoScrubber: document.getElementById("video-scrubber"),
    videoScrubberFill: document.getElementById("video-scrubber-fill"),
    playerTimerText: document.getElementById("player-timer-text"),
    btnSpeedToggle: document.getElementById("btn-speed-toggle"),
    btnMarkLessonComplete: document.getElementById("btn-mark-lesson-complete"),
    btnDownloadSopGuide: document.getElementById("btn-download-sop-guide"),
    playlistItems: document.querySelectorAll("[data-play-lesson]"),

    // Interactive Quiz
    interactiveQuizContainer: document.getElementById("interactive-quiz-container"),
    quizQuestionCounter: document.getElementById("quiz-question-counter"),
    quizQuestionText: document.getElementById("quiz-question-text"),
    quizOptionsContainer: document.getElementById("quiz-options-container"),
    quizFeedbackBox: document.getElementById("quiz-feedback-box"),
    btnSubmitQuizAnswer: document.getElementById("btn-submit-quiz-answer"),
    btnNextQuizQuestion: document.getElementById("btn-next-quiz-question"),

    // Modals & Toasts
    closeModalBtns: document.querySelectorAll("[data-close-modal]"),
    toastContainer: document.getElementById("toast-container")
  };
}

// Render SVG Vector Icons
export function renderSVGIcons(container = document) {
  container.querySelectorAll("[data-icon]").forEach(el => {
    const iconName = el.getAttribute("data-icon");
    if (icons[iconName]) {
      el.innerHTML = icons[iconName]();
    }
  });
}

/* ==========================================================================
   Navigation, Routing & Multi-Surface Synchronization
   ========================================================================== */
export function toggleMobileDrawer(open = null) {
  const isOpen = elements.mobileDrawer ? elements.mobileDrawer.classList.contains("active") : false;
  const shouldOpen = open === null ? !isOpen : open;

  if (elements.mobileDrawer) {
    elements.mobileDrawer.classList.toggle("active", shouldOpen);
  }
  if (elements.mobileDrawerOverlay) {
    elements.mobileDrawerOverlay.classList.toggle("active", shouldOpen);
  }
  document.body.style.overflow = shouldOpen ? "hidden" : "";
}

function initNavigation() {
  // Desktop segmented control tabs
  elements.mainNavTabs.forEach(btn => {
    btn.addEventListener("click", () => {
      const view = btn.getAttribute("data-view");
      if (view) switchView(view);
    });
  });

  // Mobile Drawer Toggle
  if (elements.btnMobileToggle) {
    elements.btnMobileToggle.addEventListener("click", () => toggleMobileDrawer(true));
  }
  if (elements.btnCloseMobileDrawer) {
    elements.btnCloseMobileDrawer.addEventListener("click", () => toggleMobileDrawer(false));
  }
  if (elements.mobileDrawerOverlay) {
    elements.mobileDrawerOverlay.addEventListener("click", () => toggleMobileDrawer(false));
  }
  if (elements.btnBottomMenu) {
    elements.btnBottomMenu.addEventListener("click", () => toggleMobileDrawer(true));
  }

  // Mobile Drawer Links
  elements.mobileDrawerLinks.forEach(link => {
    link.addEventListener("click", () => {
      const view = link.getAttribute("data-drawer-view");
      if (view) {
        switchView(view);
        toggleMobileDrawer(false);
      }
    });
  });

  // Mobile Bottom Navigation Bar Items
  elements.mobileNavItems.forEach(item => {
    item.addEventListener("click", () => {
      const view = item.getAttribute("data-bottom-view");
      if (view) switchView(view);
    });
  });

  // Role Switchers
  if (elements.btnToggleRole) {
    elements.btnToggleRole.addEventListener("click", toggleRolePerspective);
  }
  if (elements.btnMobileDrawerRole) {
    elements.btnMobileDrawerRole.addEventListener("click", toggleRolePerspective);
  }

  // Header Call To Action
  if (elements.btnHeaderCta) {
    elements.btnHeaderCta.addEventListener("click", () => {
      if (state.activeRole === "learner") {
        openCoursePlayer("CRS-SOC2-2026");
      } else {
        switchView("builder");
      }
    });
  }

  if (elements.btnMobileDrawerResume) {
    elements.btnMobileDrawerResume.addEventListener("click", () => {
      toggleMobileDrawer(false);
      openCoursePlayer("CRS-SOC2-2026");
    });
  }

  // Brand Logo Click
  if (elements.brandHomeBtn) {
    elements.brandHomeBtn.addEventListener("click", (e) => {
      e.preventDefault();
      switchView("intro");
    });
  }

  // Footer Navigation Links
  elements.footerViewLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const view = link.getAttribute("data-footer-view");
      if (view) {
        switchView(view);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    });
  });

  // Intro Call-to-actions
  if (elements.btnHeroLaunchLearner) {
    elements.btnHeroLaunchLearner.addEventListener("click", () => switchView("learner"));
  }
  if (elements.btnHeroOpenBuilder) {
    elements.btnHeroOpenBuilder.addEventListener("click", () => switchView("builder"));
  }
  if (elements.btnHeroViewAnalytics) {
    elements.btnHeroViewAnalytics.addEventListener("click", () => switchView("analytics"));
  }

  // Escape key closes drawer
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && elements.mobileDrawer && elements.mobileDrawer.classList.contains("active")) {
      toggleMobileDrawer(false);
    }
  });
}

export function switchView(viewName) {
  state.currentView = viewName;

  // Toggle View Sections
  elements.viewSections.forEach(sec => {
    sec.classList.toggle("active", sec.id === `view-${viewName}`);
  });

  // Synchronize Desktop Tabs
  elements.mainNavTabs.forEach(tab => {
    tab.classList.toggle("active", tab.getAttribute("data-view") === viewName);
  });

  // Synchronize Mobile Drawer Links
  elements.mobileDrawerLinks.forEach(link => {
    link.classList.toggle("active", link.getAttribute("data-drawer-view") === viewName);
  });

  // Synchronize Mobile Bottom Nav
  elements.mobileNavItems.forEach(item => {
    item.classList.toggle("active", item.getAttribute("data-bottom-view") === viewName);
  });

  window.scrollTo({ top: 0, behavior: "smooth" });
}

function toggleRolePerspective() {
  state.activeRole = state.activeRole === "learner" ? "manager" : "learner";

  if (state.activeRole === "learner") {
    elements.lblRolePill.textContent = "Role: Learner";
    elements.lblMobileDrawerRole.textContent = "Role: Learner (Alex Rivera)";
    elements.lblHeaderCta.textContent = "Resume SOC2";
    showToast(
      "Switched to Learner Mode",
      "Active persona: Alex Rivera (Senior Cloud Engineer). Displaying personalized learning path.",
      "blue"
    );
    switchView("learner");
  } else {
    elements.lblRolePill.textContent = "Role: Manager";
    elements.lblMobileDrawerRole.textContent = "Role: L&D Manager (Elena Vance)";
    elements.lblHeaderCta.textContent = "+ New Course";
    showToast(
      "Switched to Manager Mode",
      "Active persona: Elena Vance (Director of L&D). Management analytics and builder studio unlocked.",
      "green"
    );
    switchView("analytics");
  }
}

/* ==========================================================================
   VIEW 1: Interactive Learning Showcase Simulator
   ========================================================================== */
function initShowcaseSimulator() {
  const showcaseData = {
    soc2: {
      title: "SOC2 Security & Data Privacy 2026",
      badge: "Mandatory Audit Track",
      time: "Duration: 3h 45m",
      progress: "75%",
      desc: "Zero-Trust architecture, customer PII encryption at rest, incident response escalation protocols, and SEC 4-day disclosure compliance."
    },
    ai: {
      title: "Enterprise Generative AI & Secure LLM Engineering",
      badge: "Technical Elective",
      time: "Duration: 5h 15m",
      progress: "40%",
      desc: "Architectural blueprints for hybrid vector search, prompt injection guardrails, context windows, and model evaluation telemetry."
    },
    lead: {
      title: "Inclusive Engineering Leadership & High-Output 1-on-1s",
      badge: "Leadership Development",
      time: "Duration: 2h 40m",
      progress: "10%",
      desc: "Frameworks for building psychological safety, facilitating high-leverage feedback loops, mitigating unconscious bias, and scaling culture."
    }
  };

  const updateShowcase = (key) => {
    const data = showcaseData[key];
    if (!data) return;

    elements.showcaseTitle.textContent = data.title;
    elements.showcaseBadge.textContent = data.badge;
    elements.showcaseTime.textContent = data.time;
    elements.showcaseDesc.textContent = data.desc;
    elements.showcaseProgressNum.textContent = data.progress;
    elements.showcaseProgressBar.style.width = data.progress;

    elements.btnShowcaseSoc2.classList.toggle("btn-primary", key === "soc2");
    elements.btnShowcaseSoc2.classList.toggle("btn-secondary", key !== "soc2");
    elements.btnShowcaseAi.classList.toggle("btn-primary", key === "ai");
    elements.btnShowcaseAi.classList.toggle("btn-secondary", key !== "ai");
    elements.btnShowcaseLead.classList.toggle("btn-primary", key === "lead");
    elements.btnShowcaseLead.classList.toggle("btn-secondary", key !== "lead");
  };

  if (elements.btnShowcaseSoc2) {
    elements.btnShowcaseSoc2.addEventListener("click", () => updateShowcase("soc2"));
  }
  if (elements.btnShowcaseAi) {
    elements.btnShowcaseAi.addEventListener("click", () => updateShowcase("ai"));
  }
  if (elements.btnShowcaseLead) {
    elements.btnShowcaseLead.addEventListener("click", () => updateShowcase("lead"));
  }

  if (elements.btnShowcasePlay) {
    elements.btnShowcasePlay.addEventListener("click", () => {
      openCoursePlayer("CRS-SOC2-2026");
    });
  }

  if (elements.btnShowcaseCert) {
    elements.btnShowcaseCert.addEventListener("click", () => {
      switchView("certificate");
    });
  }
}

/* ==========================================================================
   VIEW 2: Learner Dashboard (My Learning Path)
   ========================================================================== */
function initLearnerDashboard() {
  renderLearnerCourses();
  renderCompletedCourses();

  if (elements.btnLearnerRefresh) {
    elements.btnLearnerRefresh.addEventListener("click", () => {
      renderLearnerCourses();
      showToast("Catalog Refreshed", "Your learning paths are fully synchronized with L&D directory.", "blue");
    });
  }
}

function renderLearnerCourses() {
  if (!elements.learnerCoursesGrid) return;

  elements.learnerCoursesGrid.innerHTML = state.courses.map(course => {
    return `
      <div class="ios-card" data-course-id="${course.id}">
        <div class="ios-card-header">
          <span class="ios-badge ${course.tier === 'Mandatory' ? 'ios-badge-blue' : (course.tier === 'Advanced' ? 'ios-badge-indigo' : 'ios-badge-green')}">
            ${escapeHTML(course.tier)}
          </span>
          <span style="font-size:0.75rem; color:var(--apple-text-secondary);">${escapeHTML(course.department)}</span>
        </div>

        <h4 style="font-size:1.1rem; font-weight:800; color:var(--apple-text-primary); margin-bottom:6px;">
          ${escapeHTML(course.title)}
        </h4>

        <p style="font-size:0.80rem; color:var(--apple-text-secondary); line-height:1.45; margin-bottom:12px;">
          ${escapeHTML(course.description)}
        </p>

        <!-- Progress bar -->
        <div class="ios-progress-container">
          <div class="ios-progress-labels">
            <span>Progress</span>
            <span class="course-progress-label">${course.progress}%</span>
          </div>
          <div class="ios-progress-track">
            <div class="ios-progress-fill" style="width:${course.progress}%;"></div>
          </div>
        </div>

        <!-- Modules overview -->
        <div class="module-checklist">
          ${course.modules.slice(0, 2).map(m => `
            <div class="module-check-item ${m.completed ? 'done' : ''}">
              <span data-icon="${m.completed ? 'checkCircle' : 'clock'}"></span>
              <span>${escapeHTML(m.title)}</span>
            </div>
          `).join("")}
        </div>

        <div style="display:flex; justify-content:space-between; align-items:center; border-top:1px solid var(--apple-border); padding-top:14px; margin-top:auto;">
          <span style="font-size:0.75rem; color:var(--apple-text-tertiary);">${escapeHTML(course.duration)} &bull; ${escapeHTML(course.instructor)}</span>
          <button class="btn btn-primary btn-sm btn-launch-course" data-launch-course="${course.id}">
            <span data-icon="play"></span>
            <span>${course.progress === 100 ? 'Review' : 'Continue'}</span>
          </button>
        </div>
      </div>
    `;
  }).join("");

  renderSVGIcons(elements.learnerCoursesGrid);

  // Attach launch buttons
  elements.learnerCoursesGrid.querySelectorAll("[data-launch-course]").forEach(btn => {
    btn.addEventListener("click", () => {
      const courseId = btn.getAttribute("data-launch-course");
      openCoursePlayer(courseId);
    });
  });
}

function renderCompletedCourses() {
  if (!elements.completedCoursesList) return;

  elements.completedCoursesList.innerHTML = state.completedCourses.map(item => `
    <div class="ios-card" style="padding:16px;">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
        <span class="ios-badge ios-badge-green">Verified 100% Pass</span>
        <span style="font-size:0.72rem; color:var(--apple-text-tertiary);">${escapeHTML(item.completedDate)}</span>
      </div>
      <h5 style="font-size:0.92rem; font-weight:700; color:var(--apple-text-primary); margin-bottom:4px;">
        ${escapeHTML(item.title)}
      </h5>
      <div style="font-size:0.75rem; color:var(--apple-text-secondary); margin-bottom:10px;">
        Instructor: ${escapeHTML(item.instructor)} &bull; Score: ${item.score}%
      </div>
      <div style="display:flex; justify-content:space-between; align-items:center;">
        <span style="font-family:monospace; font-size:0.70rem; color:var(--apple-text-tertiary);">${escapeHTML(item.certificateHash)}</span>
        <button class="btn btn-secondary btn-sm" style="font-size:0.72rem; padding:4px 8px;" data-view-cert="${item.id}">View Cert</button>
      </div>
    </div>
  `).join("");

  elements.completedCoursesList.querySelectorAll("[data-view-cert]").forEach(btn => {
    btn.addEventListener("click", () => switchView("certificate"));
  });
}

/* ==========================================================================
   VIEW 3: Admin Course Builder Studio
   ========================================================================== */
function initCourseBuilder() {
  if (elements.inputPassThreshold) {
    elements.inputPassThreshold.addEventListener("input", (e) => {
      elements.lblThreshold.textContent = `${e.target.value}%`;
    });
  }

  // Live card preview updates
  if (elements.inputCourseTitle) {
    elements.inputCourseTitle.addEventListener("input", (e) => {
      elements.previewTitle.textContent = e.target.value || "Untitled Course";
    });
  }
  if (elements.selectCourseDept) {
    elements.selectCourseDept.addEventListener("change", (e) => {
      elements.previewDept.textContent = e.target.value;
    });
  }
  if (elements.selectCourseTier) {
    elements.selectCourseTier.addEventListener("change", (e) => {
      elements.previewBadge.textContent = e.target.value;
    });
  }
  if (elements.inputCourseDesc) {
    elements.inputCourseDesc.addEventListener("input", (e) => {
      elements.previewDesc.textContent = e.target.value || "No description provided.";
    });
  }

  // Add Module Row
  if (elements.btnAddModuleRow) {
    elements.btnAddModuleRow.addEventListener("click", () => {
      const modCount = state.builderModules.length + 1;
      const newMod = {
        title: `Module ${modCount}: Advanced Telemetry & Logs`,
        type: "Video",
        duration: "20m"
      };
      state.builderModules.push(newMod);
      renderBuilderModules();
      showToast("Module Added", `Added Module ${modCount} to curriculum layout.`, "blue");
    });
  }

  // Form Submission (Publish Course)
  if (elements.formCourseBuilder) {
    elements.formCourseBuilder.addEventListener("submit", (e) => {
      e.preventDefault();
      const title = elements.inputCourseTitle.value.trim();
      const category = elements.selectCourseCategory.value;
      const tier = elements.selectCourseTier.value;
      const dept = elements.selectCourseDept.value;
      const threshold = parseInt(elements.inputPassThreshold.value, 10);
      const desc = elements.inputCourseDesc.value.trim();

      const newCourse = {
        id: `CRS-CUSTOM-${Date.now()}`,
        code: `CUS-${Math.floor(100 + Math.random() * 900)}`,
        title: title,
        category: category,
        tier: tier,
        department: dept,
        instructor: "Elena Vance (L&D Director)",
        duration: "2h 30m",
        dueDays: 30,
        dueDate: "2026-10-28",
        progress: 0,
        status: "assigned",
        color: "#007AFF",
        badge: tier,
        rating: 5.0,
        enrolledCount: 1,
        description: desc,
        modules: state.builderModules.map((m, idx) => ({
          id: `MOD-CUS-${idx + 1}`,
          title: m.title,
          duration: m.duration,
          completed: false,
          type: m.type.toLowerCase()
        }))
      };

      state.courses.unshift(newCourse);
      renderLearnerCourses();

      showToast(
        "Course Published!",
        `"${title}" has been published and assigned to ${dept}.`,
        "green"
      );

      switchView("learner");
    });
  }

  if (elements.btnResetBuilder) {
    elements.btnResetBuilder.addEventListener("click", () => {
      elements.formCourseBuilder.reset();
      elements.lblThreshold.textContent = "80%";
      elements.previewTitle.textContent = "Untitled Course";
      elements.previewDesc.textContent = "Enter course details to preview.";
    });
  }

  renderBuilderModules();
}

function renderBuilderModules() {
  if (!elements.builderModulesContainer) return;

  elements.builderModulesContainer.innerHTML = state.builderModules.map((m) => `
    <div class="builder-module-item">
      <div>
        <strong style="font-size:0.85rem;">${escapeHTML(m.title)}</strong>
        <div style="font-size:0.75rem; color:var(--apple-text-secondary);">${m.type} &bull; ${m.duration}</div>
      </div>
      <span class="ios-badge ${m.type === 'Video' ? 'ios-badge-blue' : (m.type === 'Quiz' ? 'ios-badge-orange' : 'ios-badge-green')}">
        ${m.type}
      </span>
    </div>
  `).join("");
}

/* ==========================================================================
   VIEW 4: Manager & L&D Compliance Analytics
   ========================================================================== */
function initManagerAnalytics() {
  renderDepartmentBars();
  renderTeamRoster();

  if (elements.inputRosterSearch) {
    elements.inputRosterSearch.addEventListener("input", (e) => {
      renderTeamRoster(e.target.value.toLowerCase());
    });
  }

  if (elements.btnNudgeAllPending) {
    elements.btnNudgeAllPending.addEventListener("click", () => {
      showToast(
        "Nudge Reminders Dispatched",
        "Automated calendar alerts and Slack notifications sent to 12 employees pending completion.",
        "orange"
      );
    });
  }

  if (elements.btnExportAuditCsv) {
    elements.btnExportAuditCsv.addEventListener("click", () => {
      exportAuditCsv();
    });
  }
}

function renderDepartmentBars() {
  if (!elements.deptBarsContainer) return;

  elements.deptBarsContainer.innerHTML = state.analytics.departmentMetrics.map(dept => `
    <div>
      <div style="display:flex; justify-content:space-between; font-size:0.82rem; font-weight:600; margin-bottom:4px;">
        <span>${escapeHTML(dept.department)} (${dept.completed}/${dept.enrolled} Certified)</span>
        <span style="color:${dept.complianceRate >= 95 ? 'var(--apple-green)' : 'var(--apple-blue)'};">${dept.complianceRate}%</span>
      </div>
      <div class="ios-progress-track">
        <div class="ios-progress-fill" style="width:${dept.complianceRate}%; background:${dept.complianceRate >= 95 ? 'var(--apple-green)' : 'var(--apple-blue)'};"></div>
      </div>
    </div>
  `).join("");
}

function renderTeamRoster(query = "") {
  if (!elements.teamRosterTbody) return;

  const filtered = state.analytics.teamMembers.filter(m => {
    if (!query) return true;
    return m.name.toLowerCase().includes(query) || m.department.toLowerCase().includes(query);
  });

  elements.teamRosterTbody.innerHTML = filtered.map(member => `
    <tr>
      <td>
        <strong style="color:var(--apple-text-primary); font-size:0.88rem;">${escapeHTML(member.name)}</strong>
        <div style="font-size:0.75rem; color:var(--apple-text-secondary);">${escapeHTML(member.role)}</div>
      </td>
      <td>${escapeHTML(member.department)}</td>
      <td>${escapeHTML(member.course)}</td>
      <td>
        <div style="display:flex; align-items:center; gap:8px;">
          <div class="ios-progress-track" style="width:70px; height:6px;">
            <div class="ios-progress-fill" style="width:${member.progress}%;"></div>
          </div>
          <span style="font-size:0.75rem;">${member.progress}%</span>
        </div>
      </td>
      <td><strong>${member.score}%</strong></td>
      <td>
        <span class="ios-badge ${member.status === 'certified' ? 'ios-badge-green' : (member.status === 'in_progress' ? 'ios-badge-blue' : 'ios-badge-red')}">
          ${member.status === 'certified' ? 'Certified' : (member.status === 'in_progress' ? 'In Progress' : 'Overdue')}
        </span>
      </td>
      <td style="text-align:right;">
        <button class="btn btn-secondary btn-sm" style="font-size:0.74rem; padding:4px 10px;" data-nudge-id="${member.id}">
          <span data-icon="bell"></span>
          <span>Nudge</span>
        </button>
      </td>
    </tr>
  `).join("");

  renderSVGIcons(elements.teamRosterTbody);

  // Attach individual nudge listeners
  elements.teamRosterTbody.querySelectorAll("[data-nudge-id]").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-nudge-id");
      const member = state.analytics.teamMembers.find(m => m.id === id);
      if (member) {
        showToast(
          `Reminder Sent to ${member.name}`,
          `Direct notification dispatched for ${member.course}.`,
          "orange"
        );
      }
    });
  });
}

function exportAuditCsv() {
  const headers = "Employee ID,Name,Department,Course,Progress %,Score %,Status,Last Active\n";
  const rows = state.analytics.teamMembers.map(m =>
    `"${m.id}","${m.name}","${m.department}","${m.course}",${m.progress},${m.score},"${m.status}","${m.lastActive}"`
  ).join("\n");

  const blob = new Blob([headers + rows], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", `Novatech_SOC2_Compliance_Audit_Report_2026.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);

  showToast(
    "Audit CSV Exported",
    "Novatech_SOC2_Compliance_Audit_Report_2026.csv generated successfully.",
    "green"
  );
}

/* ==========================================================================
   VIEW 5: Verified Certificate View
   ========================================================================== */
function initCertificateView() {
  if (elements.btnDownloadPdfCert) {
    elements.btnDownloadPdfCert.addEventListener("click", () => {
      downloadCertificatePdf();
    });
  }

  if (elements.btnShareLinkedinCert) {
    elements.btnShareLinkedinCert.addEventListener("click", () => {
      showToast(
        "LinkedIn Credential Generated",
        `Credential ID ${CERTIFICATE_SAMPLE.credentialId} ready to link on professional profile.`,
        "blue"
      );
    });
  }
}

function downloadCertificatePdf() {
  // Simulated official PDF generation using standard Blob
  const certContent = `
    ================================================================================
    OFFICIAL CERTIFICATE OF CONTINUING EDUCATION & REGULATORY COMPLIANCE
    ACCREDITED BY QUOLYTECH CORPORATE LEARNING ACADEMY
    ================================================================================

    Student Name:       ${CERTIFICATE_SAMPLE.studentName}
    Role:               ${CERTIFICATE_SAMPLE.studentRole}
    Company:            ${CERTIFICATE_SAMPLE.company}
    Course Curriculum:  ${CERTIFICATE_SAMPLE.courseName}
    Grade Achieved:     ${CERTIFICATE_SAMPLE.grade}
    Issue Date:         ${CERTIFICATE_SAMPLE.issueDate}
    Expiration Date:    ${CERTIFICATE_SAMPLE.expirationDate}
    Credential ID:      ${CERTIFICATE_SAMPLE.credentialId}
    Accreditation Hash: ${CERTIFICATE_SAMPLE.id}
    Verification URL:   ${CERTIFICATE_SAMPLE.verificationUrl}

    Authorized Signature:
    ${CERTIFICATE_SAMPLE.authorizedSigner}
    ${CERTIFICATE_SAMPLE.signerTitle}

    (C) 2026 QuolyTech. All rights reserved. Hashed on QuolyTech Verified Ledger.
    ================================================================================
  `;

  const blob = new Blob([certContent], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", `Certificate_SOC2_2026_AlexRivera.pdf`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);

  showToast(
    "Certificate Downloaded",
    "Certificate_SOC2_2026_AlexRivera.pdf saved with verifiable cryptographic hash.",
    "green"
  );
}

/* ==========================================================================
   Interactive Course Player & Quiz Engine
   ========================================================================== */
function initCoursePlayer() {
  // Video Play/Pause Toggle
  const togglePlay = () => {
    state.videoIsPlaying = !state.videoIsPlaying;
    if (elements.btnVideoPlayToggle) {
      elements.btnVideoPlayToggle.innerHTML = state.videoIsPlaying ? icons.pause("", 28) : icons.play("", 28);
    }
    if (elements.btnMiniPlay) {
      elements.btnMiniPlay.innerHTML = state.videoIsPlaying ? icons.pause("", 16) : icons.play("", 16);
    }

    if (state.videoIsPlaying) {
      elements.videoScrubberFill.style.width = "75%";
      elements.playerTimerText.textContent = "06:22 / 08:30";
      showToast("Video Playing", "Lesson 3.2: SEC 4-Day Regulatory Notification Rules", "blue");
    } else {
      showToast("Video Paused", "Playback paused at 06:22.", "blue");
    }
  };

  if (elements.btnVideoPlayToggle) elements.btnVideoPlayToggle.addEventListener("click", togglePlay);
  if (elements.btnMiniPlay) elements.btnMiniPlay.addEventListener("click", togglePlay);

  // Playback Speed Toggle
  if (elements.btnSpeedToggle) {
    elements.btnSpeedToggle.addEventListener("click", () => {
      const speeds = [1.0, 1.25, 1.5, 2.0];
      const nextIdx = (speeds.indexOf(state.playbackSpeed) + 1) % speeds.length;
      state.playbackSpeed = speeds[nextIdx];
      elements.btnSpeedToggle.textContent = `${state.playbackSpeed.toFixed(1)}x`;
      showToast("Speed Adjusted", `Playback rate set to ${state.playbackSpeed}x`, "blue");
    });
  }

  // Scrubber Click
  if (elements.videoScrubber) {
    elements.videoScrubber.addEventListener("click", (e) => {
      const rect = elements.videoScrubber.getBoundingClientRect();
      const pos = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      elements.videoScrubberFill.style.width = `${pos * 100}%`;
      const seconds = Math.floor(pos * 510);
      const mins = Math.floor(seconds / 60);
      const secs = seconds % 60;
      elements.playerTimerText.textContent = `0${mins}:${secs < 10 ? '0' : ''}${secs} / 08:30`;
    });
  }

  // Playlist lesson click
  elements.playlistItems.forEach(item => {
    item.addEventListener("click", () => {
      elements.playlistItems.forEach(i => i.classList.remove("active"));
      item.classList.add("active");
      const lesson = item.getAttribute("data-play-lesson");
      elements.playerCurrentLessonLabel.textContent = `Lesson ${lesson}: Activated`;
      showToast("Lesson Loaded", `Loaded lesson ${lesson}.`, "blue");
    });
  });

  // Mark Lesson Complete button
  if (elements.btnMarkLessonComplete) {
    elements.btnMarkLessonComplete.addEventListener("click", () => {
      const soc2Course = state.courses.find(c => c.id === "CRS-SOC2-2026");
      if (soc2Course) {
        soc2Course.progress = 100;
        soc2Course.status = "completed";
      }

      renderLearnerCourses();
      closeModal("modal-player");

      showToast(
        "Curriculum Completed! 100%",
        "Congratulations Alex! SOC2 Security 2026 completed with honors. Certificate unlocked.",
        "green"
      );

      switchView("certificate");
    });
  }

  // Download SOP Guide button
  if (elements.btnDownloadSopGuide) {
    elements.btnDownloadSopGuide.addEventListener("click", () => {
      const blob = new Blob(["SOC2 Data Security & Access Control SOP - Novatech 2026"], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "SOC2_SOP_Standard_Procedures_2026.pdf";
      link.click();
      URL.revokeObjectURL(url);
      showToast("SOP Downloaded", "SOC2_SOP_Standard_Procedures_2026.pdf saved.", "blue");
    });
  }

  // Initialize Quiz Engine
  initQuizEngine();
}

export function openCoursePlayer(courseId) {
  const course = state.courses.find(c => c.id === courseId) || state.courses[0];
  state.activePlayingCourse = course;

  if (elements.playerModalCourseTitle) {
    elements.playerModalCourseTitle.textContent = course.title;
  }

  state.quizCurrentQuestionIndex = 0;
  state.quizSelectedOption = null;
  renderQuizQuestion();

  openModal("modal-player");
}

/* ==========================================================================
   Interactive Quiz Engine
   ========================================================================== */
function initQuizEngine() {
  if (elements.btnSubmitQuizAnswer) {
    elements.btnSubmitQuizAnswer.addEventListener("click", submitQuizAnswer);
  }

  if (elements.btnNextQuizQuestion) {
    elements.btnNextQuizQuestion.addEventListener("click", () => {
      state.quizCurrentQuestionIndex = (state.quizCurrentQuestionIndex + 1) % COURSE_QUIZ_QUESTIONS.length;
      state.quizSelectedOption = null;
      renderQuizQuestion();
    });
  }
}

function renderQuizQuestion() {
  const q = COURSE_QUIZ_QUESTIONS[state.quizCurrentQuestionIndex];
  if (!q) return;

  elements.quizQuestionCounter.textContent = `Question ${state.quizCurrentQuestionIndex + 1} of ${COURSE_QUIZ_QUESTIONS.length}`;
  elements.quizQuestionText.textContent = q.question;
  elements.quizFeedbackBox.style.display = "none";
  elements.btnNextQuizQuestion.style.display = "none";
  elements.btnSubmitQuizAnswer.style.display = "inline-flex";

  elements.quizOptionsContainer.innerHTML = q.options.map((opt, idx) => `
    <button type="button" class="btn btn-secondary quiz-opt-btn" data-opt-idx="${idx}" style="text-align:left; justify-content:flex-start; padding:10px 14px; font-size:0.82rem; border-radius:var(--radius-sm);">
      <span style="width:20px; height:20px; border-radius:50%; border:1.5px solid var(--apple-border); display:inline-flex; align-items:center; justify-content:center; font-size:0.72rem; margin-right:8px;" class="opt-circle">
        ${String.fromCharCode(65 + idx)}
      </span>
      <span>${escapeHTML(opt)}</span>
    </button>
  `).join("");

  elements.quizOptionsContainer.querySelectorAll(".quiz-opt-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      elements.quizOptionsContainer.querySelectorAll(".quiz-opt-btn").forEach(b => {
        b.style.borderColor = "var(--apple-border)";
        b.style.background = "#FFFFFF";
      });
      btn.style.borderColor = "var(--apple-blue)";
      btn.style.background = "var(--apple-blue-light)";
      state.quizSelectedOption = parseInt(btn.getAttribute("data-opt-idx"), 10);
    });
  });
}

function submitQuizAnswer() {
  if (state.quizSelectedOption === null) {
    showToast("Select an Answer", "Please choose an answer option before checking.", "orange");
    return;
  }

  const q = COURSE_QUIZ_QUESTIONS[state.quizCurrentQuestionIndex];
  const isCorrect = state.quizSelectedOption === q.correctAnswer;

  elements.quizFeedbackBox.style.display = "block";
  if (isCorrect) {
    elements.quizFeedbackBox.style.background = "var(--apple-green-light)";
    elements.quizFeedbackBox.style.color = "var(--apple-green)";
    elements.quizFeedbackBox.style.border = "1px solid var(--apple-green-border)";
    elements.quizFeedbackBox.innerHTML = `<strong>Correct!</strong> ${escapeHTML(q.explanation)}`;
  } else {
    elements.quizFeedbackBox.style.background = "var(--apple-red-light)";
    elements.quizFeedbackBox.style.color = "var(--apple-red)";
    elements.quizFeedbackBox.style.border = "1px solid rgba(255,59,48,0.2)";
    elements.quizFeedbackBox.innerHTML = `<strong>Incorrect.</strong> ${escapeHTML(q.explanation)}`;
  }

  elements.btnSubmitQuizAnswer.style.display = "none";
  elements.btnNextQuizQuestion.style.display = "inline-flex";
}

/* ==========================================================================
   Modals & Toast System
   ========================================================================== */
function initModals() {
  elements.closeModalBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const modalId = btn.getAttribute("data-close-modal");
      closeModal(modalId);
    });
  });
}

export function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add("open");
    document.body.style.overflow = "hidden";
  }
}

export function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove("open");
    document.body.style.overflow = "";
  }
}

export function showToast(title, message, type = "blue") {
  if (!elements.toastContainer) return;

  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;

  const iconName = type === "green" ? "checkCircle" : (type === "orange" ? "alertCircle" : "sparkles");
  toast.innerHTML = `
    <div class="toast-icon">${icons[iconName] ? icons[iconName]("", 20) : ""}</div>
    <div class="toast-content">
      <div class="toast-title">${escapeHTML(title)}</div>
      <div class="toast-message">${escapeHTML(message)}</div>
    </div>
  `;

  elements.toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.style.transition = "opacity 0.25s ease, transform 0.25s ease";
    toast.style.opacity = "0";
    toast.style.transform = "translateY(10px)";
    setTimeout(() => {
      if (toast.parentNode) toast.parentNode.removeChild(toast);
    }, 250);
  }, 4000);
}

function escapeHTML(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
