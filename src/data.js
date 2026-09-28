// LearnPath Pro - Enterprise Learning & Corporate Training Data Model
// Engineered by QuolyTech Learning Architecture

export const CURRENT_LEARNER = {
  id: "EMP-9041",
  name: "Alex Rivera",
  role: "Senior Cloud Infrastructure Engineer",
  department: "Platform Engineering",
  email: "alex.rivera@novatech.io",
  avatarInitials: "AR",
  completedHours: 38.5,
  earnedCertificates: 4,
  currentStreakDays: 14,
  complianceScore: 98
};

export const CURRENT_MANAGER = {
  id: "MGR-1020",
  name: "Elena Vance",
  role: "Director of Learning & Organizational Development",
  department: "People & Talent Operations",
  email: "elena.vance@novatech.io",
  avatarInitials: "EV",
  teamSize: 42,
  departmentCompliance: 94.2
};

export const ACTIVE_COURSES = [
  {
    id: "CRS-SOC2-2026",
    code: "SEC-401",
    title: "SOC2 Security, Zero Trust & Data Privacy 2026",
    category: "Compliance & Security",
    tier: "Mandatory",
    department: "All Company",
    instructor: "David Kim, CISO",
    duration: "3h 45m",
    dueDays: 5,
    dueDate: "2026-10-03",
    progress: 75,
    status: "in_progress",
    color: "#007AFF", // Apple System Blue
    badge: "Due in 5 Days",
    rating: 4.9,
    enrolledCount: 384,
    description: "Annual mandatory certification covering Zero-Trust access control, customer encryption, incident response escalation protocols, and GDPR/CCPA consumer data safeguards.",
    modules: [
      {
        id: "MOD-1",
        title: "Module 1: Principles of Zero-Trust Architecture",
        duration: "45m",
        completed: true,
        type: "video",
        videoLength: "14:20",
        lessons: [
          { id: "L-1", title: "1.1 Identity Verification & MFA Standards", completed: true, duration: "6:15", type: "video" },
          { id: "L-2", title: "1.2 Least-Privilege Role Based Access Control", completed: true, duration: "8:05", type: "video" }
        ]
      },
      {
        id: "MOD-2",
        title: "Module 2: Customer Data Encryption in Transit & Rest",
        duration: "55m",
        completed: true,
        type: "document",
        lessons: [
          { id: "L-3", title: "2.1 AES-256 & TLS 1.3 Protocol Enforcement", completed: true, duration: "7:40", type: "video" },
          { id: "L-4", title: "2.2 Secret Management & Vault Rotations", completed: true, duration: "9:20", type: "document" }
        ]
      },
      {
        id: "MOD-3",
        title: "Module 3: Security Incident Response & Escalation",
        duration: "50m",
        completed: true,
        type: "video",
        lessons: [
          { id: "L-5", title: "3.1 P0 vs P1 Security Breach Classifications", completed: true, duration: "11:10", type: "video" },
          { id: "L-6", title: "3.2 SEC 4-Day Regulatory Notification Rules", completed: false, duration: "8:30", type: "video" }
        ]
      },
      {
        id: "MOD-4",
        title: "Module 4: 2026 Annual Certification Knowledge Exam",
        duration: "30m",
        completed: false,
        type: "quiz",
        passingScore: 80,
        questionsCount: 3
      }
    ],
    certificateId: "CERT-SOC2-2026-AR"
  },
  {
    id: "CRS-AI-2026",
    code: "ENG-502",
    title: "Enterprise Generative AI & Secure LLM Engineering",
    category: "Technical Elective",
    tier: "Advanced",
    department: "Engineering & Product",
    instructor: "Dr. Maya Lin, Head of AI Research",
    duration: "5h 15m",
    dueDays: 28,
    dueDate: "2026-10-26",
    progress: 40,
    status: "in_progress",
    color: "#5856D6", // Apple System Indigo
    badge: "In Progress",
    rating: 4.95,
    enrolledCount: 192,
    description: "Production architectural blueprints for retrieval-augmented generation (RAG), context management, prompt injection guardrails, and model evaluation telemetry.",
    modules: [
      {
        id: "MOD-AI-1",
        title: "Module 1: Production Prompt Defenses & Jailbreak Prevention",
        duration: "1h 10m",
        completed: true,
        type: "video"
      },
      {
        id: "MOD-AI-2",
        title: "Module 2: High-Density Hybrid Search & Vector Reranking",
        duration: "1h 35m",
        completed: false,
        type: "video"
      },
      {
        id: "MOD-AI-3",
        title: "Module 3: Structured Outputs & Function Calling Orchestration",
        duration: "1h 15m",
        completed: false,
        type: "document"
      },
      {
        id: "MOD-AI-4",
        title: "Module 4: AI Architecture Practical Capstone Project",
        duration: "1h 15m",
        completed: false,
        type: "quiz",
        passingScore: 80
      }
    ]
  },
  {
    id: "CRS-LEAD-2026",
    code: "MGT-301",
    title: "Inclusive Engineering Leadership & High-Output 1-on-1s",
    category: "Leadership & Growth",
    tier: "Recommended",
    department: "People Ops & Management",
    instructor: "Elena Vance, Org Development",
    duration: "2h 40m",
    dueDays: 45,
    dueDate: "2026-11-12",
    progress: 10,
    status: "in_progress",
    color: "#34C759", // Apple System Green
    badge: "Recommended",
    rating: 4.88,
    enrolledCount: 145,
    description: "Frameworks for building psychological safety, facilitating high-leverage feedback loops, mitigating unconscious bias, and scaling engineering culture.",
    modules: [
      { id: "MOD-L-1", title: "Module 1: Psychological Safety in Code Reviews", duration: "50m", completed: true, type: "video" },
      { id: "MOD-L-2", title: "Module 2: Structured Career Ladder Frameworks", duration: "55m", completed: false, type: "document" },
      { id: "MOD-L-3", title: "Module 3: Difficult Conversations & Resolution", duration: "55m", completed: false, type: "quiz", passingScore: 80 }
    ]
  }
];

export const COMPLETED_COURSES = [
  {
    id: "CRS-ETHICS-2025",
    code: "GOV-101",
    title: "Global Business Ethics, Anti-Bribery & FCPA Compliance",
    completedDate: "2026-08-14",
    score: 96,
    instructor: "Legal & Regulatory Affairs",
    certificateHash: "QLY-LMS-2026-ETH-9014",
    badgeColor: "#FF9500"
  },
  {
    id: "CRS-CLOUD-2025",
    code: "ARC-601",
    title: "Distributed Systems Resiliency & Disaster Recovery",
    completedDate: "2026-07-22",
    score: 100,
    instructor: "Cloud Infrastructure Guild",
    certificateHash: "QLY-LMS-2026-ARC-8812",
    badgeColor: "#007AFF"
  }
];

export const COURSE_QUIZ_QUESTIONS = [
  {
    id: "Q1",
    question: "Under SOC2 Type II guidelines, what is the mandatory requirement for storing customer PII in cloud datastores?",
    options: [
      "Plaintext storage is acceptable if behind a VPC firewall",
      "Cryptographic AES-256 encryption at rest with automated key rotation",
      "Base64 encoding with salted hash digests",
      "Manual encryption applied only on archive backup drives"
    ],
    correctAnswer: 1,
    explanation: "SOC2 Type II requires strong encryption at rest (such as AES-256) with documented automated cryptographic key management and vault rotation policies."
  },
  {
    id: "Q2",
    question: "What is the maximum permissible window to notify the Security Operations Center upon identifying a confirmed P0 breach?",
    options: [
      "Within 7 business days following internal review",
      "Within 1 hour via automated pager escalation and war room activation",
      "At the conclusion of the monthly sprint retrospective",
      "Within 72 hours via standard support ticket"
    ],
    correctAnswer: 1,
    explanation: "P0 critical security incidents require immediate incident response activation within 1 hour to contain data exposure and satisfy regulatory compliance."
  },
  {
    id: "Q3",
    question: "Which of the following embodies the core tenet of Zero-Trust Network Architecture?",
    options: [
      "Implicitly trusting all network requests originating inside the internal corporate VPN",
      "Never trust, always verify: continuous authentication, explicit authorization, and contextual least-privilege",
      "Relying solely on perimeter firewall rules without per-service mTLS",
      "Granting wildcard administrator permissions to all engineering staff"
    ],
    correctAnswer: 1,
    explanation: "'Never trust, always verify' requires continuous mutual authentication (mTLS) and contextual authorization regardless of device network locality."
  }
];

export const MANAGER_ANALYTICS = {
  departmentMetrics: [
    { department: "Platform Engineering", enrolled: 48, completed: 46, complianceRate: 95.8, pending: 2, avgScore: 94.2 },
    { department: "Security & Governance", enrolled: 18, completed: 18, complianceRate: 100.0, pending: 0, avgScore: 98.6 },
    { department: "Product Design", enrolled: 24, completed: 22, complianceRate: 91.6, pending: 2, avgScore: 92.4 },
    { department: "Enterprise Sales", enrolled: 62, completed: 54, complianceRate: 87.1, pending: 8, avgScore: 89.0 },
    { department: "People Operations", enrolled: 16, completed: 16, complianceRate: 100.0, pending: 0, avgScore: 96.5 }
  ],
  auditReadiness: {
    overallRate: 94.2,
    certifiedHeadcount: 156,
    totalRequiredHeadcount: 168,
    daysUntilAudit: 19,
    status: "Audit Ready (Gold Tier)"
  },
  teamMembers: [
    { id: "TM-1", name: "Alex Rivera", role: "Senior Cloud Engineer", department: "Platform Engineering", course: "SOC2 Security 2026", progress: 75, score: 96, status: "in_progress", lastActive: "2 hours ago" },
    { id: "TM-2", name: "Sophia Chen", role: "Staff Data Engineer", department: "Platform Engineering", course: "SOC2 Security 2026", progress: 100, score: 98, status: "certified", lastActive: "Yesterday" },
    { id: "TM-3", name: "Marcus Bradley", role: "DevOps Specialist", department: "Platform Engineering", course: "SOC2 Security 2026", progress: 100, score: 94, status: "certified", lastActive: "3 days ago" },
    { id: "TM-4", name: "Jordan Taylor", role: "Account Executive", department: "Enterprise Sales", course: "SOC2 Security 2026", progress: 20, score: 82, status: "overdue", lastActive: "6 days ago" },
    { id: "TM-5", name: "Aisha Patel", role: "Senior Frontend Engineer", department: "Platform Engineering", course: "Enterprise GenAI", progress: 90, score: 97, status: "in_progress", lastActive: "Today" },
    { id: "TM-6", name: "Carlos Mendez", role: "Product Manager", department: "Product Design", course: "SOC2 Security 2026", progress: 100, score: 92, status: "certified", lastActive: "4 days ago" },
    { id: "TM-7", name: "Jessica Taylor", role: "HR Business Partner", department: "People Operations", course: "Inclusive Leadership", progress: 100, score: 100, status: "certified", lastActive: "1 day ago" },
    { id: "TM-8", name: "Ryan Zhang", role: "Security Analyst", department: "Security & Governance", course: "SOC2 Security 2026", progress: 100, score: 99, status: "certified", lastActive: "Today" }
  ]
};

export const CERTIFICATE_SAMPLE = {
  id: "QLY-CERT-2026-SOC2-9041",
  studentName: "Alex Rivera",
  studentRole: "Senior Cloud Infrastructure Engineer",
  company: "Novatech Enterprise Systems",
  courseName: "SOC2 Type II Security, Zero Trust & Data Privacy 2026",
  issueDate: "September 28, 2026",
  expirationDate: "September 28, 2027",
  grade: "96% (Distinction Honors)",
  credentialId: "LP-2026-SOC2-9841-QLY",
  verificationUrl: "https://verify.quolytech.com/certs/LP-2026-SOC2-9841-QLY",
  accreditedBy: "QuolyTech Corporate Learning Academy",
  authorizedSigner: "Dr. Elena Vance, Ed.D.",
  signerTitle: "Chief Learning Officer, QuolyTech LMS Systems"
};
