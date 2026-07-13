/**
 * script.js
 * Premium Cyberpunk Portfolio - All interactivity & animations
 * Vanilla JavaScript | No frameworks
 * Features: Particles, Typing, Tilt, Counters, Copy, Toast, Terminal sim, etc.
 * Author: Phạm Quang Vương (kingsore)
 */

document.addEventListener('DOMContentLoaded', () => {
    // ==================== CONFIG (Easy to edit) ====================
    const CONFIG = {
        name: "Phạm Quang Vương",
        nickname: "kingsore",
        titles: [
            "MMO Service Provider",
            "Digital Accounts Supplier",
            "Premium VPN & Streaming",
            "Ecommerce Builder",
            "Automation Specialist",
            "Bot Developer",
            "Digital Products Expert"
        ],
        email: "phamquangvuong.dev@gmail.com",
        phone: "0975 868 667",
        zalo: "0975868667",
        telegram: "@kingsore",
        github: "https://github.com/QuangVngPhfdwp",
        discord: "https://discord.gg/phamquangvuong", // Update with real invite
        website: "https://banggiasanpham.vercel.app/",
        facebook: "https://facebook.com/61590422745082",
        tiktok: "https://tiktok.com/@canhcongmeta",
        youtube: "https://youtube.com/@QuangVuongDev",
        instagram: "https://instagram.com/quangvuong.dev",

        // Bank (matches real QR)
        bank: {
            name: "Techcombank",
            account: "1234503028386",
            accountFormatted: "1234 5030 2838 6",
            owner: "PHAM QUANG VUONG",
            branch: "Tỉnh Hưng Yên"
        },

        // Stats targets
        stats: {
            projects: 52,
            clients: 12400,
            experience: 6,
            commits: 2847,
            stars: 187,
            countries: 38
        },

        // Projects data - Chỉ giữ SHOP MMO
        projects: [
            {
                id: 1,
                title: "SHOP MMO - Bảng Giá Sản Phẩm",
                desc: "Nền tảng cung cấp tài khoản số, VPN, Streaming, AI Tools với giao diện hiện đại và trải nghiệm mượt mà.",
                image: "public/shop.jpg",
                tech: ["HTML5", "CSS", "JS", "Node.js", "Vercel"],
                github: "#",
                demo: "https://banggiasanpham.vercel.app/"
            }
        ]
    };

    // ==================== LOADING SCREEN ====================
    const loadingScreen = document.getElementById('loading-screen');
    const loaderText = document.getElementById('loader-text');

    const loadingMessages = [
        "INITIALIZING NEURAL INTERFACE...",
        "LOADING CYBERPUNK ASSETS...",
        "CALIBRATING NEON PARTICLES...",
        "ESTABLISHING SECURE CONNECTION...",
        "WELCOME TO THE GRID, OPERATOR."
    ];

    let msgIndex = 0;
    const msgInterval = setInterval(() => {
        if (loaderText && msgIndex < loadingMessages.length - 1) {
            msgIndex++;
            loaderText.style.opacity = '0';
            setTimeout(() => {
                if (loaderText) loaderText.textContent = loadingMessages[msgIndex];
                loaderText.style.opacity = '1';
            }, 180);
        }
    }, 520);

    // Hide loading after assets ready
    window.addEventListener('load', () => {
        setTimeout(() => {
            clearInterval(msgInterval);
            if (loadingScreen) {
                loadingScreen.style.opacity = '0';
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                }, 600);
            }
            // Trigger initial reveals
            initScrollReveals();
        }, 850);
    });

    // ==================== NAVBAR SCROLL + MOBILE ====================
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 60) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking a link
        navMenu.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // Active nav link on scroll (scrollspy)
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    function updateActiveNav() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
    window.addEventListener('scroll', updateActiveNav);

    // ==================== MOUSE GLOW ====================
    const mouseGlow = document.getElementById('mouse-glow');
    if (mouseGlow) {
        document.addEventListener('mousemove', (e) => {
            mouseGlow.style.left = `${e.clientX}px`;
            mouseGlow.style.top = `${e.clientY}px`;
        });
    }

    // ==================== HERO PARTICLES ====================
    function initHeroParticles() {
        const canvas = document.getElementById('hero-particles');
        if (!canvas) return;

        const ctx = canvas.getContext('2d', { alpha: true });
        let particles = [];
        let w, h;

        function resize() {
            w = canvas.width = window.innerWidth;
            h = canvas.height = window.innerHeight;
        }
        window.addEventListener('resize', resize);
        resize();

        class Particle {
            constructor() {
                this.reset();
            }
            reset() {
                this.x = Math.random() * w;
                this.y = Math.random() * h;
                this.size = Math.random() * 2.2 + 0.6;
                this.speedX = (Math.random() - 0.5) * 0.6;
                this.speedY = (Math.random() - 0.5) * 0.6;
                this.alpha = Math.random() * 0.6 + 0.3;
                this.color = Math.random() > 0.6 ? '#00f3ff' : '#b400ff';
            }
            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                if (this.x < 0 || this.x > w) this.speedX *= -1;
                if (this.y < 0 || this.y > h) this.speedY *= -1;

                // Gentle drift back to center area
                if (Math.random() < 0.015) this.reset();
            }
            draw() {
                ctx.fillStyle = this.color;
                ctx.globalAlpha = this.alpha;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        // Create particles
        for (let i = 0; i < 68; i++) {
            particles.push(new Particle());
        }

        function animateParticles() {
            ctx.clearRect(0, 0, w, h);
            ctx.globalAlpha = 1;

            // Draw connections
            ctx.strokeStyle = 'rgba(0, 243, 255, 0.08)';
            ctx.lineWidth = 0.8;
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 140) {
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }

            particles.forEach(p => {
                p.update();
                p.draw();
            });

            requestAnimationFrame(animateParticles);
        }
        animateParticles();
    }
    initHeroParticles();

    // ==================== TYPING ANIMATION ====================
    function initTypingAnimation() {
        const typingEl = document.getElementById('typing-text');
        if (!typingEl) return;

        let titleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 85;

        function type() {
            const currentTitle = CONFIG.titles[titleIndex];

            if (isDeleting) {
                typingEl.textContent = currentTitle.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 35;
            } else {
                typingEl.textContent = currentTitle.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 85;
            }

            if (!isDeleting && charIndex === currentTitle.length) {
                isDeleting = true;
                typingSpeed = 1600; // pause
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                titleIndex = (titleIndex + 1) % CONFIG.titles.length;
                typingSpeed = 420;
            }

            setTimeout(type, typingSpeed);
        }

        // Start after short delay
        setTimeout(type, 1200);
    }
    initTypingAnimation();

    // ==================== SCROLL PROGRESS ====================
    function initScrollProgress() {
        const progressFill = document.querySelector('.progress-fill');
        if (!progressFill) return;

        window.addEventListener('scroll', () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
            progressFill.style.width = `${Math.min(scrollPercent, 100)}%`;
        });
    }
    initScrollProgress();

    // ==================== SKILL BARS + COUNTERS + REVEALS ====================
    // ==================== SKILL BARS + COUNTERS + REVEALS ====================
function initScrollReveals() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // === Skill Progress Bars (Đã fix chạy đúng % ) ===
                if (entry.target.classList.contains('skill-item')) {
                    const progress = entry.target.querySelector('.skill-progress');
                    if (progress) {
                        const percent = parseInt(progress.dataset.percent) || 0;

                        // Reset trước
                        progress.style.transition = 'none';
                        progress.style.width = '0%';

                        // Chạy animation
                        setTimeout(() => {
                            progress.style.transition = 'width 1.6s cubic-bezier(0.23, 1, 0.32, 1)';
                            progress.style.width = `${percent}%`;
                        }, 80);
                    }
                }

                // === Stat Counters ===
                if (entry.target.classList.contains('stat-card')) {
                    const numberEl = entry.target.querySelector('.stat-number');
                    if (numberEl && !numberEl.classList.contains('counted')) {
                        animateCounter(numberEl);
                        numberEl.classList.add('counted');
                    }
                }

                // General reveal
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { 
        threshold: 0.2, 
        rootMargin: "0px 0px -50px 0px" 
    });

    // Observe skill items
    document.querySelectorAll('.skill-item').forEach(el => {
        el.style.opacity = '0.3';
        el.style.transform = 'translateY(25px)';
        el.style.transition = 'all 0.6s cubic-bezier(0.23, 1, 0.32, 1)';
        observer.observe(el);
    });

    // Observe stat cards
    document.querySelectorAll('.stat-card').forEach(el => observer.observe(el));

    // Observe other cards
    document.querySelectorAll('.glass-card, .project-card').forEach(el => {
        el.style.transition = 'all 0.7s cubic-bezier(0.23, 1, 0.32, 1)';
        observer.observe(el);
    });
}

    function animateCounter(element) {
        const target = parseInt(element.dataset.target || element.textContent, 10);
        const duration = 1600;
        const startTime = performance.now();
        const startValue = 0;

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const ease = 1 - Math.pow(1 - progress, 3); // easeOutCubic
            const current = Math.floor(startValue + (target - startValue) * ease);
            
            if (target >= 1000) {
                element.textContent = current.toLocaleString();
            } else {
                element.textContent = current;
            }

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                if (target >= 1000) {
                    element.textContent = target.toLocaleString();
                } else {
                    element.textContent = target;
                }
            }
        }
        requestAnimationFrame(update);
    }

    // ==================== CARD TILT EFFECT ====================
    function initCardTilt() {
        const tiltCards = document.querySelectorAll('[data-tilt]');

        tiltCards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / rect.width) - 0.5;
                const y = ((e.clientY - rect.top) / rect.height) - 0.5;

                const rotateX = y * -14;
                const rotateY = x * 18;

                card.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.015)`;
                card.style.boxShadow = `0 30px 70px rgba(0,0,0,0.55), 
                                        ${x * 25}px ${y * 25}px 40px rgba(0, 243, 255, 0.12)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transition = 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.6s ease';
                card.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg) scale(1)';
                card.style.boxShadow = '';
                
                setTimeout(() => {
                    card.style.transition = 'transform 0.2s ease, box-shadow 0.2s ease';
                }, 600);
            });
        });
    }
    initCardTilt();

    // ==================== PROJECTS RENDER ====================
    function renderProjects() {
        const grid = document.getElementById('projects-grid');
        if (!grid || !CONFIG.projects.length) return;

        grid.innerHTML = '';

        CONFIG.projects.forEach(project => {
            const card = document.createElement('div');
            card.className = 'project-card glass';
            card.setAttribute('data-tilt', '');

            card.innerHTML = `
                <div class="project-image" style="background-image: url('${project.image}')">
                    <div style="position:absolute; inset:0; background: linear-gradient(transparent, rgba(10,10,15,0.75));"></div>
                </div>
                <div class="project-content">
                    <h3>${project.title}</h3>
                    <p>${project.desc}</p>
                    
                    <div class="project-tech">
                        ${project.tech.map(t => `<span class="tech-pill">${t}</span>`).join('')}
                    </div>
                    
                    <div class="project-links">
                        <a href="${project.github}" target="_blank" class="github">
                            <i class="fab fa-github"></i> GitHub
                        </a>
                        <a href="${project.demo}" target="_blank" class="demo">
                            <i class="fas fa-external-link-alt"></i> Live Demo
                        </a>
                    </div>
                </div>
            `;

            grid.appendChild(card);
        });

        // Re-init tilt for new cards
        setTimeout(() => {
            initCardTilt();
        }, 300);
    }
    renderProjects();

    // ==================== COPY TO CLIPBOARD + TOAST ====================
    function showToast(message, type = 'success') {
        const container = document.getElementById('toast-container');
        if (!container) return;

        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <span>${message}</span>
        `;

        container.appendChild(toast);

        setTimeout(() => {
            toast.style.transition = 'all 0.35s ease';
            toast.style.opacity = '0';
            toast.style.transform = 'translate(-50%, 20px)';
            
            setTimeout(() => {
                toast.remove();
            }, 300);
        }, 2800);
    }

    function initCopyButtons() {
        // Single copy buttons
        document.querySelectorAll('.copy-btn').forEach(btn => {
            btn.addEventListener('click', async () => {
                const textToCopy = btn.dataset.copy;
                if (!textToCopy) return;

                try {
                    await navigator.clipboard.writeText(textToCopy);
                    const originalHTML = btn.innerHTML;
                    btn.innerHTML = `<i class="fas fa-check"></i>`;
                    btn.style.background = 'rgba(0, 255, 157, 0.2)';
                    btn.style.borderColor = 'var(--neon-green)';
                    btn.style.color = 'var(--neon-green)';

                    showToast('Đã copy thành công!');

                    setTimeout(() => {
                        btn.innerHTML = originalHTML;
                        btn.style.background = '';
                        btn.style.borderColor = '';
                        btn.style.color = '';
                    }, 1600);
                } catch (err) {
                    // Fallback
                    const textArea = document.createElement('textarea');
                    textArea.value = textToCopy;
                    document.body.appendChild(textArea);
                    textArea.select();
                    document.execCommand('copy');
                    document.body.removeChild(textArea);
                    showToast('Đã copy thành công!');
                }
            });
        });

        // Copy all bank info
        const copyAllBtn = document.getElementById('copy-all-bank');
        if (copyAllBtn) {
            copyAllBtn.addEventListener('click', () => {
                const bank = CONFIG.bank;
                const fullInfo = `Ngân hàng: ${bank.name}\nSố TK: ${bank.account}\nChủ TK: ${bank.owner}\nChi nhánh: ${bank.branch}`;
                
                navigator.clipboard.writeText(fullInfo).then(() => {
                    showToast('Đã copy toàn bộ thông tin ngân hàng!');
                }).catch(() => {
                    showToast('Copy thành công (fallback)');
                });
            });
        }
    }
    initCopyButtons();

    // ==================== BACK TO TOP ====================
    function initBackToTop() {
        const backBtn = document.getElementById('back-to-top');
        if (!backBtn) return;

        window.addEventListener('scroll', () => {
            if (window.scrollY > 680) {
                backBtn.classList.add('visible');
            } else {
                backBtn.classList.remove('visible');
            }
        });

        backBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
    initBackToTop();

    // ==================== VS CODE TERMINAL SIMULATION ====================
    function initCodingTerminal() {
        const terminalBody = document.getElementById('terminal-body');
        const runBtn = document.getElementById('run-code-btn');

        if (!terminalBody || !runBtn) return;

        const commands = [
            { cmd: "node server.js", output: "Server listening on http://localhost:3000" },
            { cmd: "npm run build", output: "✓ Build completed successfully in 1.8s" },
            { cmd: "git status", output: "On branch main\nYour branch is up to date." },
            { cmd: "vercel --prod", output: "Production deployment ready → https://phamquangvuong.dev" }
        ];

        let cmdIndex = 0;

        function typeCommand(cmd, callback) {
            terminalBody.innerHTML = '';
            const line = document.createElement('div');
            line.className = 'terminal-line';
            line.innerHTML = `<span class="prompt">$</span> <span class="typing-cmd"></span>`;
            terminalBody.appendChild(line);

            const typingSpan = line.querySelector('.typing-cmd');
            let i = 0;

            const typeInterval = setInterval(() => {
                if (i < cmd.length) {
                    typingSpan.textContent += cmd[i];
                    i++;
                } else {
                    clearInterval(typeInterval);
                    setTimeout(() => {
                        const out = document.createElement('div');
                        out.className = 'terminal-line output success';
                        out.textContent = commands[cmdIndex % commands.length].output;
                        terminalBody.appendChild(out);

                        const ready = document.createElement('div');
                        ready.className = 'terminal-line output';
                        ready.innerHTML = `Ready for next command... <span class="blink">_</span>`;
                        terminalBody.appendChild(ready);

                        cmdIndex++;
                        if (callback) callback();
                    }, 680);
                }
            }, 38);
        }

        runBtn.addEventListener('click', () => {
            runBtn.disabled = true;
            runBtn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Running...`;

            typeCommand(commands[cmdIndex % commands.length].cmd, () => {
                runBtn.disabled = false;
                runBtn.innerHTML = `<i class="fas fa-play"></i> Run node server.js`;
            });
        });

        // Bonus: click terminal to run random
        terminalBody.addEventListener('click', () => {
            if (!runBtn.disabled) {
                runBtn.click();
            }
        });
    }
    initCodingTerminal();

    // ==================== RIPPLE BUTTONS (Global) ====================
    function initRippleButtons() {
        document.querySelectorAll('.ripple-btn').forEach(button => {
            button.addEventListener('click', function (e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const ripple = document.createElement('span');
                ripple.className = 'ripple';
                ripple.style.left = `${x}px`;
                ripple.style.top = `${y}px`;
                ripple.style.width = ripple.style.height = '120px';

                this.appendChild(ripple);

                setTimeout(() => {
                    ripple.remove();
                }, 650);
            });
        });
    }
    initRippleButtons();

    // ==================== DONATE QR HOVER ENHANCE ====================
    function initDonateEffects() {
        const qrCard = document.getElementById('qr-card');
        const qrImage = document.getElementById('qr-image');

        if (qrCard && qrImage) {
            qrCard.addEventListener('mouseenter', () => {
                qrImage.style.boxShadow = '0 0 80px rgba(0, 243, 255, 0.75), 0 0 120px rgba(180, 0, 255, 0.4)';
            });
            qrCard.addEventListener('mouseleave', () => {
                qrImage.style.boxShadow = '0 0 40px rgba(0, 243, 255, 0.4)';
            });
        }
    }
    initDonateEffects();

    // ==================== SMOOTH SCROLL FOR ANCHORS ====================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href').substring(1);
            const target = document.getElementById(targetId);
            if (target) {
                e.preventDefault();
                const offset = 80;
                const top = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });

    // ==================== KEYBOARD SHORTCUTS (Fun) ====================
    document.addEventListener('keydown', (e) => {
        if (e.key === '/' && document.activeElement.tagName === 'BODY') {
            e.preventDefault();
            const donate = document.getElementById('donate');
            if (donate) donate.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        if (e.metaKey && e.key === 'k') {
            e.preventDefault();
            const contact = document.getElementById('contact');
            if (contact) contact.scrollIntoView({ behavior: 'smooth' });
        }
    });

    // Final: Update some dynamic content from CONFIG if needed
    console.log('%c[Cyberpunk Portfolio] All systems initialized. Welcome, operator.', 'color:#00f3ff; font-family:monospace');
});
