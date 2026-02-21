// ========================
// Neural Network Background
// ========================
const canvas = document.getElementById('neural-bg');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let nodes = [];
    const nodeCount = 60;
    const connectionDistance = 150;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', () => {
        resizeCanvas();
        initNodes();
    });

    function initNodes() {
        nodes = [];
        for (let i = 0; i < nodeCount; i++) {
            nodes.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.4,
                vy: (Math.random() - 0.5) * 0.4,
                radius: Math.random() * 2 + 1,
                pulse: Math.random() * Math.PI * 2
            });
        }
    }
    initNodes();

    function drawNetwork() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw connections
        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                const dx = nodes[i].x - nodes[j].x;
                const dy = nodes[i].y - nodes[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < connectionDistance) {
                    const opacity = (1 - dist / connectionDistance) * 0.15;
                    ctx.beginPath();
                    ctx.moveTo(nodes[i].x, nodes[i].y);
                    ctx.lineTo(nodes[j].x, nodes[j].y);
                    ctx.strokeStyle = `rgba(99, 102, 241, ${opacity})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }

        // Draw nodes
        for (const node of nodes) {
            node.pulse += 0.02;
            const pulseSize = Math.sin(node.pulse) * 0.5 + 0.5;

            // Glow
            ctx.beginPath();
            ctx.arc(node.x, node.y, node.radius * 3, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(99, 102, 241, ${0.03 * pulseSize})`;
            ctx.fill();

            // Node
            ctx.beginPath();
            ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(129, 140, 248, ${0.3 + 0.2 * pulseSize})`;
            ctx.fill();

            // Move
            node.x += node.vx;
            node.y += node.vy;

            // Wrap around edges
            if (node.x < 0) node.x = canvas.width;
            if (node.x > canvas.width) node.x = 0;
            if (node.y < 0) node.y = canvas.height;
            if (node.y > canvas.height) node.y = 0;
        }

        requestAnimationFrame(drawNetwork);
    }

    drawNetwork();
}

// ========================
// Typing Animation
// ========================
function typeText(element, text, speed, callback) {
    if (!element) return;
    let i = 0;
    element.textContent = '';
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else if (callback) {
            callback();
        }
    }
    type();
}

window.addEventListener('load', () => {
    const heroGreeting = document.getElementById('hero-greeting');
    const heroName = document.getElementById('hero-name');
    const heroRole = document.getElementById('hero-role');
    const heroLocation = document.getElementById('hero-location');

    setTimeout(() => {
        typeText(heroGreeting, 'Hello, I\'m', 60, () => {
            setTimeout(() => {
                typeText(heroName, 'Bogdan Voloshyn', 65, () => {
                    setTimeout(() => {
                        typeText(heroRole, 'Python AI Engineer', 50, () => {
                            setTimeout(() => {
                                typeText(heroLocation, 'Lviv, Ukraine', 50);
                            }, 200);
                        });
                    }, 200);
                });
            }, 200);
        });
    }, 400);
});

// ========================
// Mobile Nav Toggle
// ========================
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('open');
    });

    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('open');
        });
    });
}

// ========================
// Active Nav Highlight
// ========================
const sections = document.querySelectorAll('section[id]');

function highlightNav() {
    const scrollY = window.scrollY + 100;

    sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');
        const link = document.querySelector('.nav-links a[href="#' + id + '"]');

        if (link) {
            if (scrollY >= top && scrollY < top + height) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        }
    });
}

window.addEventListener('scroll', highlightNav);

// ========================
// Scroll Reveal Animation
// ========================
function setupReveal() {
    const revealSelectors = [
        '.section-header',
        '.about-grid',
        '.skill-category',
        '.project-card',
        '.edu-card',
        '.contact-text',
        '.contact-card',
        '.code-preview'
    ];

    const revealElements = document.querySelectorAll(revealSelectors.join(', '));

    revealElements.forEach((el, i) => {
        el.classList.add('reveal');
        el.style.transitionDelay = `${(i % 4) * 0.1}s`;
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
    });

    document.querySelectorAll('.reveal').forEach(el => {
        observer.observe(el);
    });
}

window.addEventListener('load', setupReveal);
