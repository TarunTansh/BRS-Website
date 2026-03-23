// Tab switching functionality
document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Show corresponding content
            const tabId = button.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add scroll animation for stats
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease-out';
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.stat-card').forEach(card => {
        observer.observe(card);
    });
    
    // WhatsApp link tracking (optional - for analytics)
    document.querySelectorAll('a[href^="https://wa.me"]').forEach(link => {
        link.addEventListener('click', () => {
            console.log('WhatsApp link clicked');
            // Add analytics tracking here if needed
        });
    });

    // Language toggle only applies if bilingual spans are present (.lang-en / .lang-hi)
    if (document.querySelector('.lang-en') || document.querySelector('.lang-hi')) {
        // Language toggle (default: English)
        const btnEn = document.getElementById('btn-en');
        const btnHi = document.getElementById('btn-hi');

        function setLanguage(lang) {
            if (lang === 'en') {
                document.querySelectorAll('.lang-en').forEach(e => e.style.display = 'inline');
                document.querySelectorAll('.lang-hi').forEach(e => e.style.display = 'none');
                if (btnEn) btnEn.classList.add('active');
                if (btnHi) btnHi.classList.remove('active');
                document.documentElement.lang = 'en';
            } else {
                document.querySelectorAll('.lang-en').forEach(e => e.style.display = 'none');
                document.querySelectorAll('.lang-hi').forEach(e => e.style.display = 'inline');
                if (btnEn) btnEn.classList.remove('active');
                if (btnHi) btnHi.classList.add('active');
                document.documentElement.lang = 'hi';
            }
        }

        if (btnEn) btnEn.addEventListener('click', () => setLanguage('en'));
        if (btnHi) btnHi.addEventListener('click', () => setLanguage('hi'));

        // initialize default language
        setLanguage('en');
    }

    // Ensure hero top video attempts to play on load (some browsers require a programmatic play call)
    const heroVideo = document.querySelector('.hero-top-video');
    if (heroVideo) {
        // Video is muted in markup to allow autoplay in most browsers
        heroVideo.muted = true;
        heroVideo.playsInline = true;
        // Attempt to play; catch any promise rejection
        const p = heroVideo.play();
        if (p && typeof p.then === 'function') {
            p.then(() => {
                // playing
            }).catch(err => {
                // Autoplay was prevented by the browser; will still be visible and user can tap to play
                console.log('Hero demo video autoplay prevented:', err);
            });
        }
    }

    // Show hero brand text fallback if hero-brand image fails to load
    const heroImg = document.querySelector('.hero-brand-logo');
    const heroText = document.querySelector('.hero-brand-text');
    if (heroImg && heroText) {
        // If image loads successfully, keep text hidden
        heroImg.addEventListener('load', () => {
            heroText.style.display = 'none';
            heroImg.style.display = '';
        });
        // If image errors (missing file), hide img and show text
        heroImg.addEventListener('error', () => {
            heroImg.style.display = 'none';
            heroText.style.display = 'block';
        });
        // If the browser already attempted to load it and it's complete but errored
        if (heroImg.complete && heroImg.naturalWidth === 0) {
            heroImg.style.display = 'none';
            heroText.style.display = 'block';
        }
    }
});
