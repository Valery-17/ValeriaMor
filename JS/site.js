/* ============================================
   Valeria Moreno — site.js
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    /* ---- Sidebar toggle (mobile) ------------ */
    const hamburger   = document.getElementById('hamburger');
    const sidebar     = document.getElementById('sidebar');
    const sidebarClose = document.getElementById('sidebarClose');

    function openSidebar() {
        sidebar.classList.add('open');
        document.body.classList.add('sidebar-open');
    }
    function closeSidebar() {
        sidebar.classList.remove('open');
        document.body.classList.remove('sidebar-open');
    }

    if (hamburger) hamburger.addEventListener('click', openSidebar);
    if (sidebarClose) sidebarClose.addEventListener('click', closeSidebar);

    // Close sidebar when clicking overlay
    document.addEventListener('click', (e) => {
        if (
            sidebar && sidebar.classList.contains('open') &&
            !sidebar.contains(e.target) &&
            e.target !== hamburger
        ) {
            closeSidebar();
        }
    });

    /* ---- Nav dropdown (mobile) -------------- */
    const navLinks = document.getElementById('navLinks');
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', (e) => {
            e.stopPropagation();
            // On mobile: toggle sidebar; on desktop: nothing extra
            if (window.innerWidth <= 900) {
                openSidebar();
            }
        });
    }

    /* ---- Scroll Reveal ---------------------- */
    const revealEls = document.querySelectorAll('.reveal');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, i * 100);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    revealEls.forEach(el => observer.observe(el));

    /* ---- Timeline stagger ------------------- */
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, i) => {
        item.style.animationDelay = `${i * 0.12}s`;
    });

    /* ---- Skill card tilt effect ------------- */
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect  = card.getBoundingClientRect();
            const x     = e.clientX - rect.left;
            const y     = e.clientY - rect.top;
            const cx    = rect.width  / 2;
            const cy    = rect.height / 2;
            const rotX  = ((y - cy) / cy) * -6;
            const rotY  = ((x - cx) / cx) *  6;
            card.style.transform = `translateY(-6px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });

    /* ---- Active nav link -------------------- */
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    /* ---- Nav mobile dropdown toggle --------- */
    const ham = document.getElementById('hamburger');
    const nav = document.getElementById('navLinks');
    if (ham && nav && window.innerWidth <= 900) {
        ham.removeEventListener('click', openSidebar);
        ham.addEventListener('click', (e) => {
            e.stopPropagation();
            nav.classList.toggle('open');
        });
        document.addEventListener('click', () => nav.classList.remove('open'));
    }

});
