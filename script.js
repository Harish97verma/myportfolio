/**
 * Harish Kumar Verma - Backend Developer Portfolio
 * Interactive Functionality & Modern UX
 */

document.addEventListener('DOMContentLoaded', () => {
    initThemeToggle();
    initMobileNav();
    initTypewriter();
    initArchitectureSimulator();
    initSkillsFilter();
    initProjectModals();
    initContactInteractions();
    initScrollSpyAndBackToTop();
});

/* ==========================================================================
   1. THEME TOGGLE (Dark / Light Mode)
   ========================================================================== */
function initThemeToggle() {
    const themeToggleBtn = document.getElementById('theme-toggle');
    if (!themeToggleBtn) return;

    const savedTheme = localStorage.getItem('harish_theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('harish_theme', newTheme);
        updateThemeIcon(newTheme);
        showToast(`Switched to ${newTheme === 'dark' ? 'Dark' : 'Light'} theme`);
    });

    function updateThemeIcon(theme) {
        const icon = themeToggleBtn.querySelector('i');
        if (!icon) return;
        if (theme === 'dark') {
            icon.className = 'fa-solid fa-sun';
            themeToggleBtn.setAttribute('aria-label', 'Switch to Light Theme');
        } else {
            icon.className = 'fa-solid fa-moon';
            themeToggleBtn.setAttribute('aria-label', 'Switch to Dark Theme');
        }
    }
}

/* ==========================================================================
   2. MOBILE NAVIGATION DRAWER
   ========================================================================== */
function initMobileNav() {
    const mobileToggle = document.getElementById('mobile-toggle');
    const mobileDrawer = document.getElementById('mobile-drawer');
    if (!mobileToggle || !mobileDrawer) return;

    const toggleMenu = () => {
        const isOpen = mobileDrawer.classList.toggle('active');
        mobileToggle.setAttribute('aria-expanded', isOpen);
        mobileToggle.querySelector('i').className = isOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
    };

    mobileToggle.addEventListener('click', toggleMenu);

    // Close on navigation click
    const drawerLinks = mobileDrawer.querySelectorAll('.nav-link, .btn');
    drawerLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileDrawer.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileDrawer.classList.contains('active')) {
            toggleMenu();
        }
    });
}

/* ==========================================================================
   3. TYPEWRITER EFFECT
   ========================================================================== */
function initTypewriter() {
    const typewriterEl = document.getElementById('typewriter-text');
    if (!typewriterEl) return;

    const phrases = [
        "Node.js & Express Specialist",
        "RESTful API Architect",
        "Slack & MS Teams Bot Integrator",
        "Database & Schema Optimizer",
        "Real-Time Notification Engineer"
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typeSpeed = 80;
    const deleteSpeed = 40;
    const delayBetween = 1800;

    function tick() {
        const currentPhrase = phrases[phraseIndex];

        if (isDeleting) {
            typewriterEl.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typewriterEl.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
        }

        let delta = isDeleting ? deleteSpeed : typeSpeed;

        if (!isDeleting && charIndex === currentPhrase.length) {
            delta = delayBetween;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            delta = 400;
        }

        setTimeout(tick, delta);
    }

    tick();
}

/* ==========================================================================
   4. INTERACTIVE ARCHITECTURE SIMULATOR (SIGNATURE BACKEND FEATURE)
   ========================================================================== */
function initArchitectureSimulator() {
    const triggerBtn = document.getElementById('sim-trigger-btn');
    const resetBtn = document.getElementById('sim-reset-btn');
    const terminalBody = document.getElementById('terminal-logs');
    const nodes = document.querySelectorAll('.pipeline-node');
    const connectors = document.querySelectorAll('.pipeline-connector');

    if (!triggerBtn || !terminalBody) return;

    let isRunning = false;

    const log = (message, type = 'info') => {
        const time = new Date().toISOString().split('T')[1].slice(0, 8);
        const line = document.createElement('div');
        line.className = 'terminal-line';
        
        let colorClass = 'term-info';
        if (type === 'success') colorClass = 'term-success';
        if (type === 'warn') colorClass = 'term-warn';
        
        line.innerHTML = `<span class="term-timestamp">[${time}]</span> <span class="${colorClass}">${message}</span>`;
        terminalBody.appendChild(line);
        terminalBody.scrollTop = terminalBody.scrollHeight;
    };

    const runSimulation = async () => {
        if (isRunning) return;
        isRunning = true;
        triggerBtn.disabled = true;
        triggerBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Processing Event...';

        // Clear active states
        nodes.forEach(n => n.classList.remove('active'));
        connectors.forEach(c => c.classList.remove('pulse'));

        // Step 1: Webhook Ingestion
        log("Incoming Webhook: POST /api/v1/leads/webhook (Payload: 2.4KB)", "info");
        nodes[0].classList.add('active');
        await sleep(700);

        if (connectors[0]) connectors[0].classList.add('pulse');
        // Step 2: API Gateway & Auth
        log("API Gateway: Validating HMAC signature & JWT Bearer token... [VERIFIED]", "info");
        nodes[1].classList.add('active');
        await sleep(800);

        if (connectors[1]) connectors[1].classList.add('pulse');
        // Step 3: MySQL Transaction & Queue
        log("Database Engine: Inserting Lead #84920 into MySQL. Query execution time: 14ms", "info");
        nodes[2].classList.add('active');
        await sleep(800);

        if (connectors[2]) connectors[2].classList.add('pulse');
        // Step 4: Routing & Dispatch
        log("Event Dispatcher: Routing notification to Slack & MS Teams webhook channels", "warn");
        nodes[3].classList.add('active');
        await sleep(900);

        if (connectors[3]) connectors[3].classList.add('pulse');
        // Step 5: External Bot Delivery
        log("Slack Bot API: BlockKit payload delivered to #sales-leads (HTTP 200 OK)", "success");
        log("MS Teams Webhook: AdaptiveCard posted successfully (HTTP 200 OK)", "success");
        log("Nodemailer SMTP: Transactional email alert dispatched to 12 reps", "success");
        nodes[4].classList.add('active');
        await sleep(600);

        log("Pipeline Cycle Finished: Total end-to-end latency: 78ms.", "success");
        showToast("Webhook pipeline simulation completed in 78ms!");

        triggerBtn.disabled = false;
        triggerBtn.innerHTML = '<i class="fa-solid fa-bolt"></i> Trigger Webhook Event';
        isRunning = false;
    };

    const resetSimulation = () => {
        nodes.forEach(n => n.classList.remove('active'));
        connectors.forEach(c => c.classList.remove('pulse'));
        terminalBody.innerHTML = `
            <div class="terminal-line">
                <span class="term-timestamp">[Ready]</span>
                <span class="term-info">Backend event pipeline standby. Click "Trigger Webhook Event" to test lead ingestion & bot routing.</span>
            </div>
        `;
        showToast("Simulator logs reset");
    };

    triggerBtn.addEventListener('click', runSimulation);
    if (resetBtn) resetBtn.addEventListener('click', resetSimulation);
}

/* ==========================================================================
   5. TECHNICAL SKILLS FILTER
   ========================================================================== */
function initSkillsFilter() {
    const filterButtons = document.querySelectorAll('.skills-filter-nav .filter-btn');
    const skillCards = document.querySelectorAll('.skills-grid .skill-category-card');

    if (!filterButtons.length || !skillCards.length) return;

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            skillCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeInModal 0.3s ease-out';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

/* ==========================================================================
   6. PROJECT MODALS (Architecture & Technical Deep Dives)
   ========================================================================== */
const projectData = {
    leadangel: {
        title: "LeadAngel Notification & Bot Platform",
        category: "Enterprise Integration & Real-Time Bots",
        desc: "Designed and implemented the core event routing engine that alerts sales representatives the instant a high-intent lead enters the funnel, reducing response lag from minutes to sub-second delivery.",
        metrics: "Supporting 10,000+ Active Users • Sub-second Latency • 100+ API Endpoints",
        architecture: `
[Incoming Webhook] 
        │ (HMAC Signature & JWT Auth)
        ▼
[Express.js Gateway] ──► [MySQL Event Store & Queue]
        │
        ├─► [Slack Bot Integration (BlockKit API)]
        ├─► [MS Teams Bot Framework (Adaptive Cards)]
        └─► [Nodemailer Dynamic Template Engine]
        `,
        challenges: [
            "Handled rate-limiting and exponential backoff retry logic for Slack and Teams webhooks.",
            "Standardized API payloads across 100+ endpoints to decouple front-end contracts from legacy models.",
            "Engineered dynamic fallback channels: if a webhook fails, transactional email alerting automatically kicks in."
        ],
        stack: ["Node.js", "Express.js", "MySQL", "Slack Web API", "MS Teams Bot", "Twilio", "GitLab"]
    },
    leavemgmt: {
        title: "Employee Leave Management System",
        category: "Core Backend & Business Logic Automation",
        desc: "Architected a full-featured leave tracking and payroll deduction engine for 500+ employees, automating error-prone manual calculations.",
        metrics: "500+ Active Employees • Automated Deduction Logic • Multi-level Approval",
        architecture: `
[Employee / Manager Client]
        │
        ▼
[RESTful API Router] ──► [Auth Middleware (RBAC)]
        │
        ▼
[Leave Balance Engine] ──► [Transactional MySQL DB]
        │
        ▼
[Automated Deduction Calculator & Email Notification]
        `,
        challenges: [
            "Designed relational database schemas with atomic ACID transactions to eliminate concurrency race conditions on leave balance updates.",
            "Implemented role-based access control (RBAC) supporting multi-tier supervisor approvals and HR audits.",
            "Built automated scheduler to accrue monthly leave days and generate end-of-month deduction reports."
        ],
        stack: ["Node.js", "Express.js", "MySQL", "JWT Auth", "REST API", "HTML/CSS"]
    },
    emailengine: {
        title: "Dynamic Transactional Email Engine",
        category: "Micro-Workflows & Messaging Infrastructure",
        desc: "Engineered a centralized, reusable email templating micro-workflow delivering over 50+ branded transactional notifications across LeadAngel products.",
        metrics: "50+ Dynamic Templates • 99.8% Delivery Rate • Standardized Across Products",
        architecture: `
[Application Event Trigger]
        │
        ▼
[Template Registry] ──► [Data Injection & Sanitization]
        │
        ▼
[Responsive HTML Builder] ──► [SMTP Relay / Nodemailer]
        │
        ▼
[Delivery Log & Audit Trail in MySQL]
        `,
        challenges: [
            "Extracted 50+ fragmented hardcoded templates into a unified, modular template engine with shared partials.",
            "Ensured 100% email client compatibility across Outlook, Gmail, Apple Mail, and mobile clients.",
            "Integrated automatic delivery logging and failed-transmission alerts."
        ],
        stack: ["Node.js", "Express.js", "Nodemailer", "MySQL", "HTML5 Email Standards", "Git"]
    }
};

function initProjectModals() {
    const modal = document.getElementById('project-modal');
    const closeBtn = document.getElementById('modal-close-btn');
    const viewButtons = document.querySelectorAll('.view-project-btn');

    if (!modal || !closeBtn) return;

    viewButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const projectId = btn.getAttribute('data-project');
            const data = projectData[projectId];
            if (!data) return;

            document.getElementById('modal-project-title').textContent = data.title;
            document.getElementById('modal-project-category').textContent = data.category;
            document.getElementById('modal-project-desc').textContent = data.desc;
            document.getElementById('modal-project-metrics').textContent = data.metrics;
            document.getElementById('modal-project-arch').textContent = data.architecture.trim();

            const challengeList = document.getElementById('modal-project-challenges');
            challengeList.innerHTML = '';
            data.challenges.forEach(c => {
                const li = document.createElement('li');
                li.textContent = c;
                challengeList.appendChild(li);
            });

            const stackList = document.getElementById('modal-project-stack');
            stackList.innerHTML = '';
            data.stack.forEach(tech => {
                const badge = document.createElement('span');
                badge.className = 'skill-badge';
                badge.textContent = tech;
                stackList.appendChild(badge);
            });

            modal.showModal();
        });
    });

    closeBtn.addEventListener('click', () => modal.close());

    // Close when clicking outside dialog window
    modal.addEventListener('click', (e) => {
        const dialogDimensions = modal.getBoundingClientRect();
        if (
            e.clientX < dialogDimensions.left ||
            e.clientX > dialogDimensions.right ||
            e.clientY < dialogDimensions.top ||
            e.clientY > dialogDimensions.bottom
        ) {
            modal.close();
        }
    });
}

/* ==========================================================================
   7. CONTACT FORM & ONE-CLICK COPY
   ========================================================================== */
function initContactInteractions() {
    // Copy buttons
    const copyEmailBtn = document.getElementById('copy-email-btn');
    const copyPhoneBtn = document.getElementById('copy-phone-btn');

    if (copyEmailBtn) {
        copyEmailBtn.addEventListener('click', () => {
            copyToClipboard('harish97verma@gmail.com', 'Email copied to clipboard!');
        });
    }

    if (copyPhoneBtn) {
        copyPhoneBtn.addEventListener('click', () => {
            copyToClipboard('+919644473713', 'Phone number copied to clipboard!');
        });
    }

    // Contact Form
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('form-name').value.trim();
            const email = document.getElementById('form-email').value.trim();
            const subject = document.getElementById('form-subject').value.trim();
            const message = document.getElementById('form-message').value.trim();

            if (!name || !email || !message) {
                showToast('Please fill in all required fields.', 'warn');
                return;
            }

            const mailtoLink = `mailto:harish97verma@gmail.com?subject=${encodeURIComponent(subject || 'Portfolio Inquiry from ' + name)}&body=${encodeURIComponent("From: " + name + " (" + email + ")\n\n" + message)}`;
            
            showToast('Opening your email client to send message...', 'success');
            setTimeout(() => {
                window.location.href = mailtoLink;
                contactForm.reset();
            }, 600);
        });
    }
}

function copyToClipboard(text, message) {
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(() => {
            showToast(message, 'success');
        }).catch(() => {
            fallbackCopy(text, message);
        });
    } else {
        fallbackCopy(text, message);
    }
}

function fallbackCopy(text, message) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.opacity = '0';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
        document.execCommand('copy');
        showToast(message, 'success');
    } catch (err) {
        showToast('Failed to copy text', 'warn');
    }
    document.body.removeChild(textArea);
}

/* ==========================================================================
   8. TOAST NOTIFICATIONS
   ========================================================================== */
function showToast(message, type = 'info') {
    let container = document.getElementById('toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        container.className = 'toast-container';
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'toast';
    if (type === 'warn') toast.style.borderLeftColor = '#f59e0b';
    
    const icon = type === 'warn' ? 'fa-triangle-exclamation' : 'fa-circle-check';
    toast.innerHTML = `<i class="fa-solid ${icon}"></i> <span>${message}</span>`;
    
    container.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = 'toastSlideOut 0.3s forwards';
        setTimeout(() => toast.remove(), 300);
    }, 3200);
}

/* ==========================================================================
   9. SCROLLSPY & BACK TO TOP BUTTON
   ========================================================================== */
function initScrollSpyAndBackToTop() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links .nav-link, .mobile-drawer .nav-link');
    const backToTopBtn = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;

        // Back to top visibility
        if (backToTopBtn) {
            if (scrollY > 400) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        }

        // ScrollSpy
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 120;
            const sectionId = current.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });

    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

