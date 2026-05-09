// ============================================================
// CONOR GRIFFIN — PORTFOLIO JS
// ============================================================

// ── Theme Toggle ────────────────────────────────────────────
const themeToggle = document.getElementById('theme-toggle');
const savedTheme = localStorage.getItem('theme');

if (savedTheme === 'light') document.body.classList.add('light');

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light');
    localStorage.setItem('theme', document.body.classList.contains('light') ? 'light' : 'dark');
});

// ── Smooth Scroll ────────────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (!target) return;
        e.preventDefault();
        const navH = document.getElementById('navbar').offsetHeight;
        const top = target.getBoundingClientRect().top + window.scrollY - navH - 16;
        window.scrollTo({ top, behavior: 'smooth' });
    });
});

// ── Scroll Reveal ────────────────────────────────────────────
const revealEls = document.querySelectorAll('section, .project-card, .project-featured, .timeline-item, .skill-group, .edu-card');

revealEls.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add('visible'), i * 60);
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.08 });

revealEls.forEach(el => observer.observe(el));

// ── Scroll to Top ────────────────────────────────────────────
const scrollTopBtn = document.createElement('button');
scrollTopBtn.id = 'scroll-top';
scrollTopBtn.setAttribute('aria-label', 'Scroll to top');
scrollTopBtn.innerHTML = '↑';
document.body.appendChild(scrollTopBtn);

window.addEventListener('scroll', () => {
    scrollTopBtn.classList.toggle('visible', window.scrollY > 400);
});

scrollTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// ── Modal Data ───────────────────────────────────────────────
const projects = {
    'scriptdojo': {
        tag: 'Personal Project · Featured',
        title: 'ScriptDojo',
        description: 'A real-time collaborative Java IDE for the browser — like Google Docs, but for code. Multiple users can write, compile, and run Java simultaneously, see each other\'s cursors live, and get syntax errors as they type. The one I built because I wanted to, not because anyone asked.',
        bullets: [
            'React (Vite) frontend with live Monaco editor — multi-cursor presence, room-based sessions, shareable invite links, and host-controlled guest permissions.',
            'Spring Boot (Java) backend using WebSockets and STOMP protocol for real-time sync, with live Java compilation via javax.tools.JavaCompiler and execution output broadcast to all users.',
            'ANTLR v4 grammar-based parser for continuous syntax analysis, providing live error highlighting and an Abstract Syntax Tree (AST) view as users type.',
            'Spring Security with BCrypt password hashing, session-based authentication, and route-level access control.',
            'Full stack containerised with Docker and Docker Compose, with a JDK-based image to support runtime Java compilation in deployment.',
            'MySQL database for persistent storage of user accounts, rooms, and session data.'
        ],
        stack: ['React', 'Vite', 'Spring Boot', 'Java', 'WebSockets', 'STOMP', 'ANTLR v4', 'Docker', 'MySQL', 'Spring Security']
    },
    'hollow-descent': {
        tag: 'Personal Project · Active Development',
        title: 'The Hollow Descent',
        description: 'A dark fantasy roguelike dungeon crawler built in Python with Pygame. A young man descends into a mysterious underground structure searching for his missing father — uncovering a larger fantasy world that lies beyond. Procedurally generated, permanently deadly, and currently in active development.',
        bullets: [
            'Procedurally generated 10-floor dungeon — layouts, enemy placement, and encounters are all generated at runtime, ensuring no two runs are the same.',
            'Turn-based combat system with tile-based rendering, built on an entity/component OOP architecture to keep game logic modular and extensible.',
            'Permanent death (roguelike) — every decision matters; there are no saves to reload.',
            'Tested with pytest throughout development; version controlled with Git/GitHub as a solo project from the ground up.',
            'Narrative-driven — the descent into the dungeon reveals a larger connected fantasy world, drawing on the same worldbuilding traditions as the books I read.'
        ],
        stack: ['Python', 'Pygame', 'pytest', 'Git/GitHub', 'OOP / Entity-Component Architecture']
    },
    'chaos-monkey': {
        tag: 'Personal Project · Research Phase',
        title: 'QA Chaos Monkey',
        description: 'An automated REST API fuzzer that hammers endpoints with malformed, boundary-busting, and unexpected inputs — then logs everything that breaks. Born directly from my frustration during the DAFM internship with how much manual effort goes into negative-path API testing.',
        bullets: [
            'Systematically explores edge cases human testers miss: null values, type mismatches, oversized payloads, malformed JSON, unexpected HTTP methods, and boundary values.',
            'Designed to require minimal configuration — point it at an API, let it run, and get a structured report of everything that broke.',
            'Currently in the research and design phase — architecture planned, core fuzzing engine in early development.',
            'Inspired by real pain felt on a large API surface at DAFM, where RESTassured covered the happy path well but negative testing was largely manual and incomplete.'
        ],
        stack: ['Python', 'REST APIs', 'pytest']
    },
    'myagfood': {
        tag: 'Professional · Live Production',
        title: 'MyAgFood',
        description: 'A national agricultural platform serving Irish farmers — covering animal tracking, nitrates management, land administration, and more. Built by the Department of Agriculture, Food and the Marine (DAFM) in partnership with Version 1. I was embedded in the QA team for eight months, owning the automation layer.',
        bullets: [
            'Designed and maintained the full Playwright (TypeScript) automation test suite, covering end-to-end UI workflows across the entire application.',
            'Validated REST API correctness using RESTassured (Java) — covering integration points across multiple external teams and services.',
            'Created and maintained Xray test cases with full traceability from requirements through to defect reports in Jira.',
            'Managed an external UAT test team — scoping tests, communicating plans, and consolidating feedback for the engineering team.',
            'Operated in a two-week Agile sprint cycle: stand-ups, planning, refinement, retrospectives, and deployments.',
            'Contributed to branch management and merge workflows on GitLab as part of the broader team CI/CD pipeline.'
        ],
        stack: ['Playwright', 'TypeScript', 'RESTassured', 'Java', 'Angular.js', 'Quarkus', 'Jira', 'Xray', 'Confluence', 'GitLab']
    }
};

// ── Modal Open/Close ─────────────────────────────────────────
const overlay = document.getElementById('modal-overlay');
const modalBody = document.getElementById('modal-body');

function openModal(id) {
    const p = projects[id];
    if (!p) return;

    const bulletsHTML = p.bullets.map(b => `<li>${b}</li>`).join('');
    const stackHTML = p.stack.map(s => `<span>${s}</span>`).join('');

    modalBody.innerHTML = `
        <div class="modal-tag">${p.tag}</div>
        <h3>${p.title}</h3>
        <p>${p.description}</p>
        <ul>${bulletsHTML}</ul>
        <div class="modal-stack-label">Tech Stack</div>
        <div class="tech-stack">${stackHTML}</div>
    `;

    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
}

// Close on Escape
document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal();
});

// ── Nav active highlight on scroll ───────────────────────────
const sections = document.querySelectorAll('section[id], footer[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navLinks.forEach(link => {
                link.style.color = '';
                if (link.getAttribute('href') === '#' + entry.target.id) {
                    link.style.color = 'var(--accent)';
                }
            });
        }
    });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));