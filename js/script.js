// ===== GLOBAL VARIABLES =====
let currentTheme = localStorage.getItem('theme') || 'light';
let currentLang = localStorage.getItem('lang') || 'en';
let typedInstance = null;

// ===== DOCUMENT READY =====
document.addEventListener('DOMContentLoaded', function() {
    // Initialize theme
    initTheme();
    
    // Initialize language
    initLanguage();
    
    // Initialize components
    initPreloader();
    initCursor();
    initMobileMenu();
    initHeaderScroll();
    initTypedText();
    initBackToTop();
    initSwiper();
    
    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
});

// ===== THEME SYSTEM =====
function initTheme() {
    const themeToggle = document.getElementById('themeToggle');
    
    // Set initial theme
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeIcon();
    
    // Theme toggle event
    themeToggle.addEventListener('click', toggleTheme);
}

function toggleTheme() {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    localStorage.setItem('theme', currentTheme);
    updateThemeIcon();
}

function updateThemeIcon() {
    const themeToggle = document.getElementById('themeToggle');
    const icon = themeToggle.querySelector('i');
    
    if (currentTheme === 'light') {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    } else {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    }
}

// ===== LANGUAGE SYSTEM =====
function initLanguage() {
    const langButtons = document.querySelectorAll('.language-switcher button');
    
    // Set initial language
    document.documentElement.setAttribute('data-lang', currentLang);
    loadTranslations(currentLang);
    updateActiveLangButton();
    
    // Language switch events
    langButtons.forEach(button => {
        button.addEventListener('click', function() {
            currentLang = this.dataset.lang;
            document.documentElement.setAttribute('data-lang', currentLang);
            localStorage.setItem('lang', currentLang);
            loadTranslations(currentLang);
            updateActiveLangButton();
            reinitializeTypedText();
        });
    });
}

function loadTranslations(lang) {
    const elements = document.querySelectorAll('[data-key]');
    
    elements.forEach(element => {
        const key = element.dataset.key;
        
        if (translations[lang] && translations[lang][key]) {
            // Handle different element types
            if (element.tagName === 'INPUT' && element.hasAttribute('placeholder')) {
                element.placeholder = translations[lang][key];
            } else if (element.tagName === 'IMG' && element.hasAttribute('alt')) {
                element.alt = translations[lang][key];
            } else {
                element.textContent = translations[lang][key];
            }
        }
    });
    
    // Dispatch event for components that need reinitialization
    document.dispatchEvent(new CustomEvent('langChange'));
}

function updateActiveLangButton() {
    const langButtons = document.querySelectorAll('.language-switcher button');
    
    langButtons.forEach(button => {
        button.classList.toggle('active', button.dataset.lang === currentLang);
    });
}

// ===== COMPONENT INITIALIZERS =====
function initPreloader() {
    const preloader = document.querySelector('.preloader');
    
    window.addEventListener('load', function() {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }, 1000);
    });
}

function initCursor() {
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        setTimeout(() => {
            cursorFollower.style.left = e.clientX + 'px';
            cursorFollower.style.top = e.clientY + 'px';
        }, 100);
    });
    
    // Cursor hover effects
    document.querySelectorAll('a, button, .project-card, .icon').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursor.style.opacity = '0.5';
            cursorFollower.style.transform = 'translate(-50%, -50%) scale(1.5)';
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            cursor.style.opacity = '1';
            cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
        });
    });
}

function initMobileMenu() {
    const navToggle = document.querySelector('.nav-toggle');
    const navList = document.querySelector('.nav-list');
    const hamburger = document.querySelector('.hamburger');
    
    navToggle.addEventListener('click', () => {
        navList.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
    
    // Close menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navList.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
}

function initHeaderScroll() {
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

function initTypedText() {
    const typedStrings = {
        en: ["Control Instrumentation", "IoT Systems", "Hardware Programming"],
        id: ["Instrumentasi Kendali", "Sistem IoT", "Pemrograman Hardware"],
        ja: ["制御計装", "IoTシステム", "ハードウェアプログラミング"]
    };
    
    reinitializeTypedText();
}

function reinitializeTypedText() {
    const typedStrings = {
        en: ["Control Instrumentation", "IoT Systems", "Hardware Programming"],
        id: ["Instrumentasi Kendali", "Sistem IoT", "Pemrograman Hardware"],
        ja: ["制御計装", "IoTシステム", "ハードウェアプログラミング"]
    };
    
    if (typedInstance) {
        typedInstance.destroy();
    }
    
    typedInstance = new Typed('.subtitle-typed', {
        strings: typedStrings[currentLang] || typedStrings['en'],
        typeSpeed: 50,
        backSpeed: 30,
        loop: true,
        showCursor: false
    });
}

function initBackToTop() {
    const backToTop = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTop.classList.add('active');
        } else {
            backToTop.classList.remove('active');
        }
    });
    
    backToTop.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

function initSwiper() {
    if (document.querySelector('.projects-slider')) {
        new Swiper('.projects-slider', {
            slidesPerView: 1,
            spaceBetween: 20,
            loop: true,
            grabCursor: true,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            breakpoints: {
                768: {
                    slidesPerView: 2,
                },
                992: {
                    slidesPerView: 3,
                }
            }
        });
    }
}

// ===== TRANSLATIONS DATA =====
const translations = {
    en: {
        "title": "Portfolio - Electrical Engineer",
        "nav.home": "Home",
        "nav.about": "About",
        "nav.projects": "Projects",
        "nav.certificates": "Certificates",
        "nav.contact": "Contact",
        "hero.greeting": "Hi, I'm",
        "hero.profession": "Electrical Engineer",
        "hero.description": "Specialist in industrial control instrumentation design and smart IoT solutions with 5+ years of experience.",
        "hero.projects_button": "View Projects",
        "hero.contact_button": "Contact Me",
        "hero.scroll": "Scroll Down",
        "expertise.title": "My Expertise",
        "expertise.subtitle": "Areas I specialize in and passionate about",
        "expertise.control_title": "Control Instrumentation",
        "expertise.control_desc": "Industrial control systems using PLC, SCADA, DCS, and PID control.",
        "expertise.skill1": "PLC Programming",
        "expertise.skill2": "SCADA/HMI",
        "expertise.skill3": "PID Control",
        "expertise.skill4": "DCS",
        "projects.title": "Featured Projects",
        "projects.subtitle": "Some of my best completed works",
        "projects.view_all": "View All Projects",
        "footer.desc": "Electrical Engineer specializing in Control Instrumentation and IoT with 5+ years of industry experience.",
        "footer.copyright": "All rights reserved",
        "footer.credit": "Made with",
        "loading": "Loading Portfolio...",
        "tooltip.theme": "Toggle Theme",
        "tooltip.english": "English",
        "tooltip.indonesian": "Indonesian",
        "tooltip.japanese": "Japanese"
    },
    id: {
        "title": "Portfolio - Insinyur Elektro",
        "nav.home": "Beranda",
        "nav.about": "Tentang",
        "nav.projects": "Proyek",
        "nav.certificates": "Sertifikat",
        "nav.contact": "Kontak",
        "hero.greeting": "Hai, Saya",
        "hero.profession": "Insinyur Elektro",
        "hero.description": "Spesialis dalam desain sistem instrumentasi kendali industri dan solusi IoT cerdas dengan pengalaman 5+ tahun.",
        "hero.projects_button": "Lihat Proyek",
        "hero.contact_button": "Hubungi Saya",
        "hero.scroll": "Scroll Ke Bawah",
        "expertise.title": "Keahlian Saya",
        "expertise.subtitle": "Bidang yang saya kuasai dan tekuni",
        "expertise.control_title": "Instrumentasi Kendali",
        "expertise.control_desc": "Sistem kendali industri menggunakan PLC, SCADA, DCS, dan kontrol PID.",
        "expertise.skill1": "Pemrograman PLC",
        "expertise.skill2": "SCADA/HMI",
        "expertise.skill3": "Kontrol PID",
        "expertise.skill4": "DCS",
        "projects.title": "Proyek Unggulan",
        "projects.subtitle": "Beberapa karya terbaik yang telah saya selesaikan",
        "projects.view_all": "Lihat Semua Proyek",
        "footer.desc": "Insinyur Elektro spesialis Instrumentasi Kendali dan IoT dengan pengalaman industri 5+ tahun.",
        "footer.copyright": "Hak cipta dilindungi",
        "footer.credit": "Dibuat dengan",
        "loading": "Memuat Portfolio...",
        "tooltip.theme": "Ubah Tema",
        "tooltip.english": "Inggris",
        "tooltip.indonesian": "Indonesia",
        "tooltip.japanese": "Jepang"
    },
    ja: {
        "title": "ポートフォリオ - 電気技師",
        "nav.home": "ホーム",
        "nav.about": "私について",
        "nav.projects": "プロジェクト",
        "nav.certificates": "証明書",
        "nav.contact": "連絡先",
        "hero.greeting": "こんにちは、私は",
        "hero.profession": "電気技師",
        "hero.description": "産業用制御計装システムの設計とスマートIoTソリューションの専門家、5年以上の経験があります。",
        "hero.projects_button": "プロジェクトを見る",
        "hero.contact_button": "お問い合わせ",
        "hero.scroll": "下にスクロール",
        "expertise.title": "私の専門知識",
        "expertise.subtitle": "私が専門とし情熱を注いでいる分野",
        "expertise.control_title": "制御計装",
        "expertise.control_desc": "PLC、SCADA、DCS、PID制御を使用した産業用制御システム。",
        "expertise.skill1": "PLCプログラミング",
        "expertise.skill2": "SCADA/HMI",
        "expertise.skill3": "PID制御",
        "expertise.skill4": "DCS",
        "projects.title": "注目のプロジェクト",
        "projects.subtitle": "私が完成させた最高の作品のいくつか",
        "projects.view_all": "すべてのプロジェクトを見る",
        "footer.desc": "制御計装とIoTを専門とする電気技師で、5年以上の業界経験があります。",
        "footer.copyright": "全著作権所有",
        "footer.credit": "で作られました",
        "loading": "ポートフォリオを読み込み中...",
        "tooltip.theme": "テーマを切り替え",
        "tooltip.english": "英語",
        "tooltip.indonesian": "インドネシア語",
        "tooltip.japanese": "日本語"
    }
};