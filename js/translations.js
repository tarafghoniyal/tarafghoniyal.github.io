// translations.js
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
        "hero.description": "Specialist in industrial control instrumentation design and implementation and smart IoT solutions.",
        "hero.projects_button": "My Projects",
        "hero.contact_button": "Contact Me",
        "hero.scroll": "Scroll Down"
        // Add all other English translations
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
        "hero.description": "Spesialis dalam desain dan implementasi sistem instrumentasi kendali industri dan solusi IoT cerdas.",
        "hero.projects_button": "Proyek Saya",
        "hero.contact_button": "Hubungi Saya",
        "hero.scroll": "Scroll Ke Bawah"
        // Add all other Indonesian translations
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
        "hero.description": "産業用制御計装システムの設計と実装、およびスマートIoTソリューションの専門家。",
        "hero.projects_button": "私のプロジェクト",
        "hero.contact_button": "お問い合わせ",
        "hero.scroll": "下にスクロール"
        // Add all other Japanese translations
    }
};

const typedStrings = {
    en: ["Control Instrumentation", "IoT Systems", "Hardware Programming"],
    id: ["Instrumentasi Kendali", "Sistem IoT", "Pemrograman Hardware"],
    ja: ["制御計装", "IoTシステム", "ハードウェアプログラミング"]
};

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('lang') || 'en';
    loadTranslations(savedLang);
    initTyped();
});