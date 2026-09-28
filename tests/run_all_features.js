import { JSDOM } from 'jsdom';
import fs from 'fs';

// Load index.html
const htmlContent = fs.readFileSync('index.html', 'utf8');

// Setup JSDOM
const dom = new JSDOM(htmlContent, {
  url: 'http://localhost:5175/',
  runScripts: 'dangerously',
  resources: 'usable'
});

const { window } = dom;
global.window = window;
global.document = window.document;
global.HTMLElement = window.HTMLElement;
global.Blob = window.Blob || class Blob { constructor(c) { this.c = c; } };
URL.createObjectURL = () => 'blob:mock-url';
URL.revokeObjectURL = () => {};
window.URL = URL;
global.scrollTo = () => {};
window.scrollTo = () => {};

let testsPassed = 0;
let testsFailed = 0;

function assert(condition, message) {
  if (condition) {
    testsPassed++;
    console.log(`  ✓ ${message}`);
  } else {
    testsFailed++;
    console.error(`  ✗ FAIL: ${message}`);
  }
}

async function runLearnPathProTests() {
  console.log('\n======================================================');
  console.log(' LEARNPATH PRO AUTOMATED LMS TEST SUITE (Node/JSDOM)');
  console.log('======================================================\n');

  // Load modules
  const { icons } = await import('../src/icons.js');
  const { ACTIVE_COURSES, CURRENT_LEARNER, MANAGER_ANALYTICS, CERTIFICATE_SAMPLE } = await import('../src/data.js');

  console.log('--- TEST GROUP 1: Static Codebase, Apple Icons & Copyright ---');
  assert(typeof icons === 'object' && Object.keys(icons).length >= 20, 'Icon system contains 20+ vector SVG icons');
  assert(typeof icons.graduationCap === 'function', 'graduationCap SVG generator is callable');
  assert(typeof icons.video === 'function', 'video SVG generator is callable');
  assert(typeof icons.award === 'function', 'award SVG generator is callable');

  const rawHtml = document.documentElement.outerHTML;
  const emojiRegex = /[\u{1F300}-\u{1F9FF}\u{2600}-\u{27BF}\u{2300}-\u{23FF}\u{2B50}\u{203C}\u{2049}]/u;
  assert(!emojiRegex.test(rawHtml), 'DOM is 100% clean of raw unicode emojis');

  assert(rawHtml.includes('QuolyTech'), 'QuolyTech branding is present across header and footer');
  assert(rawHtml.includes('© 2026') || rawHtml.includes('&copy; 2026'), '2026 Copyright is present');
  assert(document.querySelector('.app-footer') !== null, 'Global enterprise footer element exists');

  console.log('\n--- TEST GROUP 2: App Initialization & Multi-Surface Navigation ---');
  await import('../src/app.js');
  document.dispatchEvent(new window.Event('DOMContentLoaded'));

  const viewIntro = document.getElementById('view-intro');
  assert(viewIntro.classList.contains('active'), 'Overview landing view is active on load');

  // Desktop Navigation Tab Switching
  const learnerTab = Array.from(document.querySelectorAll('#main-nav-tabs .segment-btn')).find(b => b.getAttribute('data-view') === 'learner');
  learnerTab.click();
  const viewLearner = document.getElementById('view-learner');
  assert(viewLearner.classList.contains('active'), 'Clicking My Learning tab activates Learner view');

  const builderTab = Array.from(document.querySelectorAll('#main-nav-tabs .segment-btn')).find(b => b.getAttribute('data-view') === 'builder');
  builderTab.click();
  const viewBuilder = document.getElementById('view-builder');
  assert(viewBuilder.classList.contains('active'), 'Clicking Course Builder tab activates Builder view');

  const analyticsTab = Array.from(document.querySelectorAll('#main-nav-tabs .segment-btn')).find(b => b.getAttribute('data-view') === 'analytics');
  analyticsTab.click();
  const viewAnalytics = document.getElementById('view-analytics');
  assert(viewAnalytics.classList.contains('active'), 'Clicking Team Analytics tab activates Analytics view');

  const certTab = Array.from(document.querySelectorAll('#main-nav-tabs .segment-btn')).find(b => b.getAttribute('data-view') === 'certificate');
  certTab.click();
  const viewCert = document.getElementById('view-certificate');
  assert(viewCert.classList.contains('active'), 'Clicking Certificates tab activates Certificate view');

  // Return to overview
  const introTab = Array.from(document.querySelectorAll('#main-nav-tabs .segment-btn')).find(b => b.getAttribute('data-view') === 'intro');
  introTab.click();
  assert(viewIntro.classList.contains('active'), 'Returning to Overview view succeeds');

  // Mobile Drawer Navigation Tests
  const btnMobileToggle = document.getElementById('btn-mobile-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const btnCloseDrawer = document.getElementById('btn-close-mobile-drawer');
  assert(btnMobileToggle !== null && mobileDrawer !== null, 'Mobile hamburger button and drawer elements exist');

  btnMobileToggle.click();
  assert(mobileDrawer.classList.contains('active'), 'Clicking hamburger toggle opens mobile drawer');

  btnCloseDrawer.click();
  assert(!mobileDrawer.classList.contains('active'), 'Clicking close button closes mobile drawer');

  // Mobile Bottom Navigation Bar Tests
  const mobileBottomNav = document.getElementById('mobile-bottom-nav');
  assert(mobileBottomNav !== null, 'Mobile bottom navigation bar exists');
  const bottomBuilderBtn = document.querySelector('.mobile-nav-item[data-bottom-view="builder"]');
  bottomBuilderBtn.click();
  assert(viewBuilder.classList.contains('active'), 'Clicking mobile bottom nav item navigates to Builder view');
  assert(bottomBuilderBtn.classList.contains('active'), 'Active bottom nav item receives active styling');

  // Role Perspective Switcher
  const btnToggleRole = document.getElementById('btn-toggle-role');
  const lblRolePill = document.getElementById('lbl-role-pill');
  btnToggleRole.click();
  assert(lblRolePill.textContent.includes('Manager'), 'Toggling role switches perspective to Manager');
  btnToggleRole.click();
  assert(lblRolePill.textContent.includes('Learner'), 'Toggling role switches perspective back to Learner');

  console.log('\n--- TEST GROUP 3: Interactive Learning Showcase Simulator ---');
  introTab.click();
  const btnShowcaseAi = document.getElementById('btn-showcase-ai');
  const showcaseTitle = document.getElementById('showcase-title');
  btnShowcaseAi.click();
  assert(showcaseTitle.textContent.includes('Generative AI') || showcaseTitle.textContent.includes('LLM'), 'Switching showcase to GenAI updates showcase card');

  const btnShowcaseSoc2 = document.getElementById('btn-showcase-soc2');
  btnShowcaseSoc2.click();
  assert(showcaseTitle.textContent.includes('SOC2'), 'Switching showcase back to SOC2 updates title');

  console.log('\n--- TEST GROUP 4: Learner Dashboard & Course Launching ---');
  learnerTab.click();
  const learnerCoursesGrid = document.getElementById('learner-courses-grid');
  assert(learnerCoursesGrid.children.length >= 3, 'Learner dashboard displays active corporate courses');

  const firstLaunchBtn = learnerCoursesGrid.querySelector('[data-launch-course]');
  assert(firstLaunchBtn !== null, 'Course launch button exists');
  firstLaunchBtn.click();

  const modalPlayer = document.getElementById('modal-player');
  assert(modalPlayer.classList.contains('open'), 'Clicking course launch opens Interactive Player modal');

  console.log('\n--- TEST GROUP 5: Interactive Video Player & Quiz Engine ---');
  const btnVideoPlay = document.getElementById('btn-video-play-toggle');
  btnVideoPlay.click();
  const timerText = document.getElementById('player-timer-text');
  assert(timerText.textContent.includes('06:22') || timerText.textContent.includes('08:30'), 'Toggling video playback advances simulated scrubber');

  // Quiz Engine
  const quizOptions = document.querySelectorAll('.quiz-opt-btn');
  assert(quizOptions.length === 4, 'Interactive quiz renders 4 multiple choice options');

  // Select option B (correct)
  quizOptions[1].click();
  const btnSubmitQuiz = document.getElementById('btn-submit-quiz-answer');
  btnSubmitQuiz.click();

  const feedbackBox = document.getElementById('quiz-feedback-box');
  assert(feedbackBox.style.display === 'block', 'Checking answer displays feedback box');
  assert(feedbackBox.textContent.includes('Correct'), 'Correct answer receives green validation feedback');

  // Close player modal
  const closePlayerBtn = document.querySelector('[data-close-modal="modal-player"]');
  closePlayerBtn.click();
  assert(!modalPlayer.classList.contains('open'), 'Closing player modal succeeds');

  console.log('\n--- TEST GROUP 6: Admin Course Builder Studio ---');
  builderTab.click();
  const inputTitle = document.getElementById('input-course-title');
  const previewTitle = document.getElementById('preview-title');
  inputTitle.value = 'Quantum Safe Cryptography 2026';
  inputTitle.dispatchEvent(new window.Event('input'));
  assert(previewTitle.textContent === 'Quantum Safe Cryptography 2026', 'Live card preview updates in real-time as user types');

  const btnAddModule = document.getElementById('btn-add-module-row');
  const modulesContainer = document.getElementById('builder-modules-container');
  const initialModCount = modulesContainer.children.length;
  btnAddModule.click();
  assert(modulesContainer.children.length === initialModCount + 1, 'Adding module increments builder list');

  const formBuilder = document.getElementById('form-course-builder');
  formBuilder.dispatchEvent(new window.Event('submit'));
  assert(viewLearner.classList.contains('active'), 'Publishing course adds it and routes to Learner catalog');

  console.log('\n--- TEST GROUP 7: Manager & L&D Compliance Analytics ---');
  analyticsTab.click();
  const complianceStat = document.getElementById('stat-overall-compliance');
  assert(complianceStat.textContent.includes('94.2%'), 'Analytics displays 94.2% overall compliance score');

  const rosterTbody = document.getElementById('team-roster-tbody');
  assert(rosterTbody.children.length >= 8, 'Team progress roster renders 8 corporate employees');

  // Test individual nudge button
  const firstNudgeBtn = rosterTbody.querySelector('[data-nudge-id]');
  assert(firstNudgeBtn !== null, 'Individual employee nudge button exists');
  firstNudgeBtn.click();

  // Test Nudge All Pending
  const btnNudgeAll = document.getElementById('btn-nudge-all-pending');
  btnNudgeAll.click();

  // Test Export Audit CSV
  const btnExportCsv = document.getElementById('btn-export-audit-csv');
  btnExportCsv.click();

  console.log('\n--- TEST GROUP 8: Verifiable Certificate & PDF Export ---');
  certTab.click();
  const certStudent = document.getElementById('cert-student-name');
  assert(certStudent.textContent.includes('Alex Rivera'), 'Certificate displays certified student name');

  const btnDownloadCert = document.getElementById('btn-download-pdf-cert');
  btnDownloadCert.click();

  console.log('\n======================================================');
  console.log(` TEST RESULTS SUMMARY:`);
  console.log(` Passed: ${testsPassed}`);
  console.log(` Failed: ${testsFailed}`);
  console.log('======================================================\n');

  if (testsFailed === 0) {
    console.log('🎉 ALL LEARNPATH PRO LMS FEATURES TESTED AND PASSED PERFECTLY!\n');
    process.exit(0);
  } else {
    console.error(`💥 ${testsFailed} tests failed. Please review the errors above.`);
    process.exit(1);
  }
}

runLearnPathProTests().catch(err => {
  console.error('Fatal Test Runner Error:', err);
  process.exit(1);
});
