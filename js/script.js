document.addEventListener('DOMContentLoaded', function() {
  /// Theme Toggle
  const themeToggle = document.getElementById('theme-toggle');
  const currentTheme = localStorage.getItem('theme') || 'light';

  document.documentElement.setAttribute('data-theme', currentTheme);

  themeToggle.innerHTML = currentTheme === 'dark'
    ? '<i class="fas fa-sun"></i>'
    : '<i class="fas fa-moon"></i>';

  themeToggle.addEventListener('click', function() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    themeToggle.innerHTML = newTheme === 'dark'
      ? '<i class="fas fa-sun"></i>'
      : '<i class="fas fa-moon"></i>';
  });

  // Language Selector
  const languageSelect = document.getElementById('language-select');
  
  // Get language from URL parameter or localStorage
  const urlParams = new URLSearchParams(window.location.search);
  let currentLang = urlParams.get('lang') || localStorage.getItem('selectedLanguage') || 'en';
  
  // Set the dropdown to current language
  if (languageSelect) {
    languageSelect.value = currentLang;
  }
  
  // Load current language immediately
  loadLanguage(currentLang);

  if (languageSelect) {
    languageSelect.addEventListener('change', function() {
      const lang = this.value;
      localStorage.setItem('selectedLanguage', lang); // Save to localStorage
      
      // Update URL with language parameter without reloading
      const newUrl = updateQueryStringParameter(window.location.href, 'lang', lang);
      window.history.pushState({ path: newUrl }, '', newUrl);
      
      loadLanguage(lang);
    });
  }

  // Helper function to update URL parameters
  function updateQueryStringParameter(uri, key, value) {
    const re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
    const separator = uri.indexOf('?') !== -1 ? "&" : "?";
    if (uri.match(re)) {
      return uri.replace(re, '$1' + key + "=" + value + '$2');
    }
    return uri + separator + key + "=" + value;
  }

  // Load language JSON
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

  // Filter Projects
  const projectFilters = document.querySelectorAll('.project-filters .filter-btn');
  const projectItems = document.querySelectorAll('.project-card');

  projectFilters.forEach(button => {
    button.addEventListener('click', () => {
      projectFilters.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      const filter = button.dataset.filter;
      projectItems.forEach(item => {
        item.style.display = filter === 'all' || item.dataset.category === filter
          ? 'block' : 'none';
      });
    });
  });

  // Filter Certificates
  const certFilters = document.querySelectorAll('.certificate-filters .filter-btn');
  const certItems = document.querySelectorAll('.certificate-card');

  certFilters.forEach(button => {
    button.addEventListener('click', () => {
      certFilters.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      const filter = button.dataset.filter;
      certItems.forEach(item => {
        item.style.display = filter === 'all' || item.dataset.category === filter
          ? 'block' : 'none';
      });
    });
  });

  // Animate skills on scroll
  const skills = document.querySelectorAll('.skill');
  function animateSkills() {
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
  }
  window.addEventListener('scroll', animateSkills);
  animateSkills();

  // Smooth scroll for internal nav links
  document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({ top: targetElement.offsetTop - 80, behavior: 'smooth' });
      }
    });
  });

  // Form submission
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

  // IoT Status simulation
  setInterval(() => {
    const iotStatus = document.getElementById('iot-status');
    if (iotStatus) {
      iotStatus.style.color = Math.random() > 0.1 ? '#4CAF50' : '#F44336';
    }
  }, 3000);

  // Mobile nav toggle
  const mobileBtn = document.querySelector('.mobile-menu-btn');
  const mobileNav = document.querySelector('.mobile-nav');
  const menuIcon = mobileBtn.querySelector('i');

  mobileBtn.addEventListener('click', () => {
    mobileNav.classList.toggle('active');
    menuIcon.classList.toggle('fa-bars');
    menuIcon.classList.toggle('fa-times');
  });

  document.querySelectorAll('.mobile-nav a').forEach(link => {
    link.addEventListener('click', () => {
      mobileNav.classList.remove('active');
      menuIcon.classList.remove('fa-times');
      menuIcon.classList.add('fa-bars');
    });
  });

  function toggleMenu() {
    const nav = document.getElementById('navMenu');
    nav.classList.toggle('show');
  };

  // Initialize theme from localStorage or system preference
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  
  // Initialize language from URL parameter or localStorage
  let language = urlParams.get('lang') || localStorage.getItem('language') || 'en';
            
});
