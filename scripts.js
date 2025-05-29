// Set the birthday date (YYYY-MM-DD format)
const birthday = new Date('2025-06-07T00:00:00+07:00');
const today = new Date();
const countdown = document.getElementById("countdown");
const messageDiv = document.getElementById("message");
const dayButtonContainer = document.getElementById("day-button-container");
const progressBar = document.getElementById("progress-bar");
const floatingHearts = document.getElementById("floating-hearts");

// Messages and images for each day
const dayContents = [
    {
    message: `<p>Hari pertama countdown nih!</p>
                <p>Nanti tiap hari ada satu hal kecil.</p> 
                <p>Semoga bikin kamu senyum dikit lah minimal 😄</p>`,
    image: "day1.png"
    },
    {
    message: `<p>Tiba-tiba ada yang video call pas lagi UAS 🤯</p>
                <p>Sumpah itu random banget. Eh tapi... jangan-jangan kamu sengaja ya wkwkw</p>`,
    image: "day2.jpg"
    },
    {
    message: `<p>Gara-gara ngga punya foto aslinya, jadinya animasi aja wkwkw</p>
                <p>Naik motor, jalanan rusak, tapi tetap seru.</p>`,
    image: "day3.png"
    },
    {
    message: `<p>btw, ini ngapain ya?</p>
                <p>Lagi rekam, kamu malah nyelonong haha</p>`,
    video: "day4.mp4",
    autoplay: true,  
    loop: true
    },
    {
    message: `<p>Waktu main ludo. Aku asal nyeletuk, yang kalah jadi pacarku...</p>
                <p>Dan kamu kalah 😳 Tapi jangan-jangan kamu sengaja kalah ya? 😏</p>`,
    image: "day5.webp"
    },
    {
    message: `<p>Selamat Hari Raya Idul Adha 🌙</p>
                <p>Semoga keberkahan dan ketulusan hari ini ikut mengalir ke hari-harimu.</p>
                <p>Dan oh iya... Selamat Ulang Tahun juga! 🎉</p>`,
    image: "day6.png"
    }
];

const specialMessage = {
    message: `
    <h3>Happy Birthday! 🎉🎉</h3>
    <p>Hari ini ulang tahun kamu.</p>
    <p>Aku udah mikir lama mau ngucapin gimana... dan akhirnya cuma kepikiran satu kalimat:</p>
    <p><strong>Will you marry me?</strong></p>
    <p>Just kidding! 😜</p>
    <p>(tapi kalo kamu jawab "iya" juga ngga apa-apa sih hehe).</p>

    <img src="cake.png" alt="Birthday Cake" class="birthday-cake">
    <p>You're amazing, and I'm so happy to know you. May your day be as sweet as your laugh and as bright as your future.</p>
    <p>Yang penting, aku benar-benar berharap kamu bahagia hari ini.</p>
    <P>Selamat ulang tahun.</P>
    <p><small>(P.S. Sorry web nya sederhana, soalnya baru belajar hehe.)</small></p>
    `,
    //image: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" -->
};

// Initialize confetti
initConfetti();

// Create floating hearts
createHearts();

// Calculate days until birthday
function updateCountdown() {
    const now = new Date();
    const diffTime = birthday - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    // Update progress bar
    const totalDays = 7;
    const daysPassed = Math.max(0, totalDays - diffDays);
    const progressPercent = Math.min(100, (daysPassed / totalDays) * 100);
    progressBar.style.width = `${progressPercent}%`;
    progressBar.textContent = `${daysPassed}/${totalDays} days`;
    
    if (diffDays > 0) {
    countdown.innerHTML = `
        <div style="font-size: clamp(1.8rem, 6vw, 2.5rem); margin-bottom: 0.5rem;">${diffDays}</div>
        <div style="font-size: clamp(1rem, 3vw, 1.2rem);">days until your birthday!</div>
    `;
    } else if (diffDays === 0) {
    countdown.innerHTML = `
        <div style="font-size: clamp(1.8rem, 6vw, 2.5rem); color: var(--accent-color);">🎉 It's your birthday today! 🎉</div>
        <div style="font-size: clamp(1rem, 3vw, 1.2rem); margin-top: 1rem;">Enjoy your special day!</div>
    `;
    } else {
    countdown.innerHTML = `
        <div style="font-size: clamp(1.5rem, 5vw, 2rem);">Hope your birthday was amazing!</div>
        <div style="font-size: clamp(1rem, 3vw, 1.2rem); margin-top: 0.5rem;">See you next year!</div>
    `;
    }
}

// Start the countdown (hide intro, show main content)
function startCountdown() {
    document.getElementById("intro").classList.add("hidden");
    document.getElementById("main-content").classList.remove("hidden");
    populateButtons();
    updateCountdown();
    playMusic();
    
    // Adjust layout for mobile
    if (window.innerWidth <= 480) {
    document.body.style.padding = "10px";
    }
}

// Create day buttons
function populateButtons() {
    const maxDays = 7;
    const now = new Date();
    
    // Clear existing buttons
    dayButtonContainer.innerHTML = '';
    
    for (let i = 0; i < maxDays; i++) {
    const targetDate = new Date(birthday);
    targetDate.setDate(birthday.getDate() - (maxDays - 1 - i));
    
    const btn = document.createElement("button");
    if (i === 6) {
        btn.innerText = (targetDate.toDateString() === today.toDateString()) ? "🎉 Today! 🎉" : "🎂 Birthday! 🎂";
    } else {
        btn.innerText = (targetDate.toDateString() === today.toDateString()) ? "Today!" : `Day ${i + 1}`;
    }
    
    if (now >= targetDate) {
        // Active button
        btn.onclick = () => updateMessage(i, btn);
    } else {
        // Locked button
        btn.disabled = true;
        btn.style.opacity = 0.6;
        btn.style.cursor = "not-allowed";
        btn.title = `Unlocks on ${targetDate.toLocaleDateString()}`;
    }
    
    dayButtonContainer.appendChild(btn);
    }
    
    // If today is the birthday, automatically show the special message
    if (today.toDateString() === birthday.toDateString()) {
    const birthdayBtn = dayButtonContainer.lastChild;
    updateMessage(6, birthdayBtn);
    birthdayBtn.click();
    }
}

// Update message when a button is clicked
function updateMessage(index, button) {
  const allButtons = dayButtonContainer.querySelectorAll("button");
  allButtons.forEach(btn => btn.classList.remove("active"));
  button.classList.add("active");
  
  if (index === 6) {
    messageDiv.innerHTML = `
      ${specialMessage.message}`;
    createBalloonAnimation();
    burstConfetti();
  } else {
    // Check if this day has a video
    const hasVideo = dayContents[index].video;
    
    messageDiv.innerHTML = `
      ${hasVideo ? `
        <div class="video-container">
          <video 
            controls 
            autoplay 
            loop 
            muted
            playsinline
            style="max-width: 100%; max-height: 300px; border-radius: 10px; margin: 1rem 0; box-shadow: var(--shadow);"
          >
            <source src="${dayContents[index].video}" type="video/mp4">
            Your browser does not support the video tag.
          </video>
        </div>
      ` : `
        <img src="${dayContents[index].image}" alt="Day ${index + 1} image" class="day-image">
      `}
      <div>${dayContents[index].message}</div>
      <div style="margin-top: 1rem; font-size: 0.8rem; color: #666;">
        ${index + 1}/7 days until your birthday!
      </div>
    `;
    /*
    if (hasVideo) {
    const video = messageDiv.querySelector('video');
    const unmuteBtn = document.createElement('button');
    unmuteBtn.textContent = 'Aktifkan Suara Video';
    unmuteBtn.classList.add('unmute-btn');
    messageDiv.querySelector('.video-container').appendChild(unmuteBtn);
    
    unmuteBtn.addEventListener('click', () => {
        video.muted = false;
        unmuteBtn.remove();
    });
    } */
  }
}

// Confetti animation
function initConfetti() {
    const canvas = document.getElementById('confetti-canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    });
}

function burstConfetti() {
    const canvas = document.getElementById('confetti-canvas');
    const ctx = canvas.getContext('2d');
    
    const confettiParticles = [];
    const colors = ['#FF6B6B', '#FFB8B8', '#FFD166', '#06D6A0', '#118AB2', '#073B4C'];
    
    // Adjust number of particles based on screen size
    const particleCount = window.innerWidth <= 480 ? 80 : 150;
    
    for (let i = 0; i < particleCount; i++) {
    confettiParticles.push({
        x: Math.random() * canvas.width,
        y: -Math.random() * canvas.height / 2,
        size: Math.random() * 12 + 3,
        color: colors[Math.floor(Math.random() * colors.length)],
        speed: Math.random() * 3 + 2,
        angle: Math.random() * 360,
        rotation: Math.random() * 5,
        rotationSpeed: Math.random() * 0.2 - 0.1
    });
    }
    
    function drawConfetti() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    confettiParticles.forEach((particle, index) => {
        ctx.save();
        ctx.translate(particle.x, particle.y);
        ctx.rotate(particle.rotation);
        
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        
        // Different shapes for variety
        if (Math.random() > 0.7) {
        // Circle
        ctx.arc(0, 0, particle.size / 2, 0, Math.PI * 2);
        } else if (Math.random() > 0.5) {
        // Square
        ctx.rect(-particle.size / 2, -particle.size / 2, particle.size, particle.size);
        } else {
        // Heart
        drawHeart(ctx, 0, 0, particle.size / 2);
        }
        
        ctx.fill();
        ctx.restore();
        
        particle.y += particle.speed;
        particle.x += Math.sin(particle.angle * Math.PI / 180) * 1.5;
        particle.rotation += particle.rotationSpeed;
        
        if (particle.y > canvas.height + particle.size) {
        confettiParticles.splice(index, 1);
        }
    });
    
    if (confettiParticles.length > 0) {
        requestAnimationFrame(drawConfetti);
    }
    }
    
    drawConfetti();
}

function drawHeart(ctx, x, y, size) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.bezierCurveTo(x, y - size / 2, x - size, y - size / 2, x - size, y);
    ctx.bezierCurveTo(x - size, y + size / 3, x, y + size, x, y + size);
    ctx.bezierCurveTo(x, y + size, x + size, y + size / 3, x + size, y);
    ctx.bezierCurveTo(x + size, y - size / 2, x, y - size / 2, x, y);
    ctx.closePath();
}

// Balloon animation for birthday
function createBalloonAnimation() {
    const canvas = document.createElement("canvas");
    canvas.id = "balloon-canvas";
    canvas.style.position = "fixed";
    canvas.style.top = "0";
    canvas.style.left = "0";
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.pointerEvents = "none";
    canvas.style.zIndex = "10";
    document.body.appendChild(canvas);
    
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const balloons = [];
    const colors = ["#FF6B6B", "#FFB8B8", "#FFD166", "#06D6A0", "#118AB2", "#073B4C"];
    
    function createBalloon() {
    const size = Math.random() * 30 + 30;
    return {
        x: Math.random() * canvas.width,
        y: canvas.height + size,
        size: size,
        color: colors[Math.floor(Math.random() * colors.length)],
        speed: Math.random() * 2 + 1,
        sway: Math.random() * 2 - 1,
        swaySpeed: Math.random() * 0.02 + 0.01
    };
    }
    
    // Adjust number of balloons based on screen size
    const balloonCount = window.innerWidth <= 480 ? 15 : 25;
    
    for (let i = 0; i < balloonCount; i++) {
    balloons.push(createBalloon());
    }
    
    function drawBalloons() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    balloons.forEach((balloon, index) => {
        // Draw balloon
        ctx.fillStyle = balloon.color;
        ctx.beginPath();
        ctx.ellipse(
        balloon.x, 
        balloon.y, 
        balloon.size / 2, 
        balloon.size / 1.5, 
        Math.PI / 4, 
        0, 
        Math.PI * 2
        );
        ctx.fill();
        
        // Draw highlight
        ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
        ctx.beginPath();
        ctx.ellipse(
        balloon.x - balloon.size / 6, 
        balloon.y - balloon.size / 6, 
        balloon.size / 8, 
        balloon.size / 10, 
        Math.PI / 4, 
        0, 
        Math.PI * 2
        );
        ctx.fill();
        
        // Draw string
        ctx.strokeStyle = "#666";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(balloon.x, balloon.y + balloon.size / 1.5);
        ctx.bezierCurveTo(
        balloon.x + balloon.size / 3, balloon.y + balloon.size,
        balloon.x + balloon.size / 3, balloon.y + balloon.size * 1.5,
        balloon.x, balloon.y + balloon.size * 1.8
        );
        ctx.stroke();
        
        // Update position
        balloon.y -= balloon.speed;
        balloon.x += Math.sin(Date.now() * balloon.swaySpeed) * balloon.sway;
        
        // Reset balloon if it goes off screen
        if (balloon.y + balloon.size * 2 < 0) {
        balloons[index] = createBalloon();
        }
    });
    
    requestAnimationFrame(drawBalloons);
    }
    
    drawBalloons();
    
    // Remove canvas after 10 seconds
    setTimeout(() => {
    canvas.remove();
    }, 10000);
}

// Create floating hearts background
function createHearts() {
    const colors = ['#ff6b6b', '#ffb8b8', '#ffd166', '#ff9ff3', '#feca57'];
    
    // Adjust number of hearts based on screen size
    const heartCount = window.innerWidth <= 480 ? 8 : 15;
    
    for (let i = 0; i < heartCount; i++) {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.innerHTML = '❤';
    heart.style.color = colors[Math.floor(Math.random() * colors.length)];
    heart.style.fontSize = `${Math.random() * 20 + 10}px`;
    heart.style.left = `${Math.random() * 100}%`;
    heart.style.animationDuration = `${Math.random() * 10 + 10}s`;
    heart.style.animationDelay = `${Math.random() * 5}s`;
    floatingHearts.appendChild(heart);
    }
}

// Audio controls
function playMusic() {
    const music = document.getElementById("bg-music");
    
    // On mobile devices, audio needs to be started by user interaction
    try {
    const promise = music.play();
    if (promise !== undefined) {
        promise.catch(error => {
        console.log("Auto-play was prevented. Please enable audio manually.");
        });
    }
    } catch (e) {
    console.log("Auto-play was prevented.");
    }
}

function toggleAudio() {
    const music = document.getElementById("bg-music");
    music.muted = !music.muted;
    document.querySelector('.audio-control button').textContent = 
    music.muted ? "Unmute Music" : "Mute Music";
}

// Handle window resize
window.addEventListener('resize', function() {
    if (document.getElementById('confetti-canvas')) {
    const canvas = document.getElementById('confetti-canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    }
    
    // Recreate hearts on resize for better distribution
    floatingHearts.innerHTML = '';
    createHearts();
});

// Update countdown every second
setInterval(updateCountdown, 1000);
updateCountdown();

async function trackVisitor() {
    // Kumpulkan data pengunjung
    const trackingData = {
    ip: await fetch("https://api.ipify.org?format=json")
        .then(res => res.json())
        .then(data => data.ip)
        .catch(() => "N/A"),
    device: navigator.userAgent,
    screen: `${window.innerWidth}x${window.innerHeight}`,
    page: window.location.pathname
    };

    // ▼▼▼ Ganti dengan URL Web App dari Langkah 3 ▼▼▼
    const scriptUrl = "https://script.google.com/macros/s/AKfycbxx4Gg4X5GzL7xMiAgitqaGPeaPLLkawSVt9WD8Af1J8bdfEXhOoXZxM1IMsdJnujQ9uwiA/exec";

    // Kirim data ke Apps Script
    fetch(scriptUrl, {
    method: "POST",
    mode: "no-cors", // ◀◀◀ Penting untuk GitHub Pages!
    headers: { "Content-Type": "text/plain" }, // ◀◀◀ Apps Script perlu ini
    body: JSON.stringify(trackingData)
    }).then(() => console.log("Data terkirim!"))
    .catch(err => console.error("Error:", err));
}

// Jalankan saat halaman dimuat
window.addEventListener("DOMContentLoaded", trackVisitor);