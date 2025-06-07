document.addEventListener('DOMContentLoaded', function() {
    // Theme Toggle
    const themeToggle = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    if (currentTheme === 'dark') {
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
    
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        if (newTheme === 'dark') {
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        }
    });
    
    // Language Selector
    const languageSelect = document.getElementById('language-select');
    languageSelect.addEventListener('change', function() {
        const lang = this.value;
        loadLanguage(lang);
    });
    
    // Load default language (English)
    loadLanguage('en');
    
    // Project Filter
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
    
    // Animate skills on scroll
    const skills = document.querySelectorAll('.skill');
    
    const animateSkills = () => {
        skills.forEach(skill => {
            const skillPosition = skill.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (skillPosition < screenPosition) {
                const percent = skill.getAttribute('data-percent');
                const progressBar = skill.querySelector('.skill-progress');
                const percentText = skill.querySelector('.percent');
                
                progressBar.style.width = percent + '%';
                percentText.textContent = percent + '%';
            }
        });
    };
    
    window.addEventListener('scroll', animateSkills);
    animateSkills(); // Run once on load
    
    // Smooth scrolling for navigation
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        });
    });
    
    // Language translations
    function loadLanguage(lang) {
        fetch(`languages/${lang}.json`)
            .then(response => response.json())
            .then(data => {
                document.querySelectorAll('[data-i18n]').forEach(element => {
                    const key = element.getAttribute('data-i18n');
                    if (data[key]) {
                        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                            element.setAttribute('placeholder', data[key]);
                        } else {
                            element.textContent = data[key];
                        }
                    }
                });
            })
            .catch(error => console.error('Error loading language file:', error));
    }
    
    // Form submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            const formData = new FormData(this);

            try {
                const response = await fetch('https://formspree.io/f/mwpbvnlw', {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    alert('Pesan berhasil dikirim. Terima kasih!');
                    this.reset();
                } else {
                    alert('Gagal mengirim pesan. Coba lagi nanti.');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Terjadi kesalahan saat mengirim.');
            }
        });
    }

    // Filter Sertifikat
    const certFilters = document.querySelectorAll('.certificate-filters .filter-btn');
    const certItems = document.querySelectorAll('.certificate-card');

    certFilters.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            certFilters.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            const filter = button.getAttribute('data-filter');
            
            certItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Lightbox Configuration
    lightbox.option({
        'resizeDuration': 200,
        'wrapAround': true,
        'albumLabel': 'Certificate %1 of %2'
    });

    // Simulasi status koneksi
    setInterval(() => {
    document.getElementById('iot-status').style.color = 
        Math.random() > 0.1 ? '#4CAF50' : '#F44336';
    }, 3000);

    // Project Filter
    const projectFilters = document.querySelectorAll('.project-filters .filter-btn');
    const projectItems = document.querySelectorAll('.project-card');

    projectFilters.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            projectFilters.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            const filter = button.dataset.filter;
            
            projectItems.forEach(item => {
            if (filter === 'all' || item.dataset.category === filter) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
            });
        });
    });

    // Fungsi toggle header
    function toggleHeader() {
    const header = document.querySelector('header');
    if (window.innerWidth <= 1024) {
        header.style.display = 'none';
    } else {
        header.style.display = 'block';
    }
    }

    // Jalankan saat load dan resize
    window.addEventListener('load', toggleHeader);
    window.addEventListener('resize', toggleHeader);
});