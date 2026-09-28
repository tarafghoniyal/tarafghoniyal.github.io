// ==========================================
// 1. INJEKSI INSTAN (Mencegah Kedipan Tema & Bahasa)
// Logika ini harus jalan secepat mungkin sebelum DOM selesai dibuat
// ==========================================
(function() {
  const currentTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', currentTheme);
})();

document.addEventListener('DOMContentLoaded', function() {
  const urlParams = new URLSearchParams(window.location.search);

  // --- Theme Toggle ---
  const themeToggle = document.getElementById('theme-toggle');
  let currentTheme = localStorage.getItem('theme') || 'light';

  const updateThemeUI = (theme) => {
    if (themeToggle) {
      themeToggle.innerHTML = theme === 'dark' 
        ? '<i class="fas fa-sun"></i>' 
        : '<i class="fas fa-moon"></i>';
    }
  };
  updateThemeUI(currentTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', function() {
      const activeTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = activeTheme === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      updateThemeUI(newTheme);
    });
  }

  // --- Language Selector dengan LocalStorage Cache ---
  const languageSelect = document.getElementById('language-select');
  let currentLang = urlParams.get('lang') || localStorage.getItem('selectedLanguage') || 'en';
  
  if (languageSelect) {
    languageSelect.value = currentLang;
  }
  
  // Eksekusi load bahasa secara instan
  loadLanguage(currentLang);

  if (languageSelect) {
    languageSelect.addEventListener('change', function() {
      const lang = this.value;
      localStorage.setItem('selectedLanguage', lang);
      
      const newUrl = updateQueryStringParameter(window.location.href, 'lang', lang);
      window.history.pushState({ path: newUrl }, '', newUrl);
      
      loadLanguage(lang);
    });
  }

  function updateQueryStringParameter(uri, key, value) {
    const re = new RegExp("([?&])" + key + "=.*?(&|\$)", "i");
    const separator = uri.indexOf('?') !== -1 ? "&" : "?";
    if (uri.match(re)) return uri.replace(re, '\$1' + key + "=" + value + '\$2');
    return uri + separator + key + "=" + value;
  }

  // OPTIMASI: Fetch Language Menggunakan Memori Cache Browser
  function loadLanguage(lang) {
    const cacheKey = `lang_cache_${lang}`;
    const cachedLangData = localStorage.getItem(cacheKey);

    // Jika data bahasa sudah tersimpan di cache, langsung render tanpa fetch ulang
    if (cachedLangData) {
      applyTranslations(JSON.parse(cachedLangData));
    }

    // Tetap fetch di background untuk memastikan data selalu up-to-date (Stale-While-Revalidate)
    fetch(`languages/${lang}.json`)
      .then(response => response.json())
      .then(data => {
        localStorage.setItem(cacheKey, JSON.stringify(data));
        applyTranslations(data);
      })
      .catch(error => console.error('Error loading language file:', error));
  }

  function applyTranslations(data) {
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
  }

  // --- Filter (Projects & Certificates) ---
  function setupFilter(filterContainerClass, itemClass) {
    const filters = document.querySelectorAll(`${filterContainerClass} .filter-btn`);
    const items = document.querySelectorAll(itemClass);

    filters.forEach(button => {
      button.addEventListener('click', () => {
        filters.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        const filter = button.dataset.filter;
        items.forEach(item => {
          item.style.display = filter === 'all' || item.dataset.category === filter ? 'block' : 'none';
        });
      });
    });
  }
  setupFilter('.project-filters', '.project-card');
  setupFilter('.certificate-filters', '.certificate-card');

  // --- OPTIMASI SCROLL: Gunakan Throttling agar Ringan ---
  const skills = document.querySelectorAll('.skill');
  const scrollTopBtn = document.getElementById('scrollTopBtn');
  let isScrolling = false;

  function handleScrollEvents() {
    const scrollY = window.scrollY;

    // 1. Animasi Skills
    skills.forEach(skill => {
      const skillPosition = skill.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.3;
      if (skillPosition < screenPosition) {
        const percent = skill.getAttribute('data-percent');
        const progressBar = skill.querySelector('.skill-progress');
        const percentText = skill.querySelector('.percent');
        
        if (progressBar && percentText) {
          progressBar.style.width = percent + '%';
          percentText.textContent = percent + '%';
        }
      }
    });

    // 2. Tombol Scroll Top
    if (scrollTopBtn) {
      if (scrollY > 300) {
        scrollTopBtn.classList.add('show');
      } else {
        scrollTopBtn.classList.remove('show');
      }
    }

    isScrolling = false;
  }

  window.addEventListener('scroll', () => {
    if (!isScrolling) {
      window.requestAnimationFrame(handleScrollEvents);
      isScrolling = true;
    }
  });
  handleScrollEvents(); // Jalankan sekali saat load awal

  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // --- Smooth Scroll Nav ---
  document.querySelectorAll('nav a, .mobile-nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId.startsWith('#')) {
        e.preventDefault();
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          window.scrollTo({ top: targetElement.offsetTop - 80, behavior: 'smooth' });
        }
      }
    });
  });

  // --- Form Submission ---
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      const formData = new FormData(this);
      try {
        const response = await fetch(this.action, {
          method: 'POST',
          body: formData,
          headers: { 'Accept': 'application/json' }
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

  // --- IoT Status Simulation ---
  const iotStatus = document.getElementById('iot-status');
  if (iotStatus) {
    setInterval(() => {
      iotStatus.style.color = Math.random() > 0.1 ? '#4CAF50' : '#F44336';
    }, 3000);
  }

  // --- Mobile Nav Toggle ---
  const mobileBtn = document.querySelector('.mobile-menu-btn');
  const mobileNav = document.querySelector('.mobile-nav');
  
  if (mobileBtn && mobileNav) {
    const menuIcon = mobileBtn.querySelector('i');
    mobileBtn.addEventListener('click', () => {
      mobileNav.classList.toggle('active');
      if(menuIcon) {
        menuIcon.classList.toggle('fa-bars');
        menuIcon.classList.toggle('fa-times');
      }
    });

    document.querySelectorAll('.mobile-nav a').forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('active');
        if(menuIcon) {
          menuIcon.classList.remove('fa-times');
          menuIcon.classList.add('fa-bars');
        }
      });
    });
  }
});
