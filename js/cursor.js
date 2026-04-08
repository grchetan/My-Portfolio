// ══ LIVE CLOCK ══
const timeElement = document.getElementById('live-time');
if (timeElement) {
  const now = new Date();
  const fullDateString = now.toString();
  const tzMatch = fullDateString.match(/\(([^)]+)\)/);
  let tzAbbr = 'IST';
  if (tzMatch) {
    const tzName = tzMatch[1];
    tzAbbr = tzName.includes(' ')
      ? tzName
          .split(' ')
          .map((w) => w[0])
          .join('')
      : tzName;
  }
  function updateTime() {
    const n = new Date();
    const t = n.toLocaleTimeString('en-US', {
      hour12: true,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
    timeElement.innerHTML = `${tzAbbr} ${t}`;
  }
  setInterval(updateTime, 1000);
  updateTime();
}

// ══ NAV SCROLL ══
const nav = document.getElementById('main-nav');
const topBtn = document.getElementById('top-btn');
window.addEventListener('scroll', () => {
  if (nav) nav.classList.toggle('scrolled', window.scrollY > 50);
  if (topBtn) topBtn.classList.toggle('show', window.scrollY > 350);
});

// ══ THEME TOGGLE ══
const themeBtn = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const sunPath = `<circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>`;
const moonPath = `<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>`;

if (themeBtn && themeIcon) {
  themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('light-theme');
    themeIcon.innerHTML = document.body.classList.contains('light-theme')
      ? moonPath
      : sunPath;
  });
}

// ══ HAMBURGER / MOBILE MENU ══
const ham = document.getElementById('hamburger');
const mob = document.getElementById('mob-menu');
const mobClose = document.getElementById('mob-close');

function closeMob() {
  if (!ham || !mob) return;
  ham.classList.remove('open');
  mob.classList.remove('open');
  document.body.style.overflow = '';
}

if (ham && mob) {
  ham.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = mob.classList.toggle('open');
    ham.classList.toggle('open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });
  document.addEventListener('click', (e) => {
    if (
      mob.classList.contains('open') &&
      !mob.contains(e.target) &&
      !ham.contains(e.target)
    )
      closeMob();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMob();
  });
}
if (mobClose) mobClose.addEventListener('click', closeMob);

// ══ AMBIENT GLOW ══
const glow = document.querySelector('.ambient-glow');
if (glow) {
  window.addEventListener('mousemove', (e) => {
    glow.style.setProperty('--mouse-x', `${e.clientX}px`);
    glow.style.setProperty('--mouse-y', `${e.clientY}px`);
  });
}

// ══ CUSTOM CURSOR (outline follow + rainbow canvas trail) ══
const dot = document.getElementById('cursor-dot');
const outline = document.getElementById('cursor-outline');
const canvas = document.getElementById('cursor-canvas');

if (dot && outline) {
  let mouseX = 0,
    mouseY = 0,
    outX = 0,
    outY = 0;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left = mouseX + 'px';
    dot.style.top = mouseY + 'px';
  });

  function animateOutline() {
    outX += (mouseX - outX) * 0.11;
    outY += (mouseY - outY) * 0.11;
    outline.style.left = outX + 'px';
    outline.style.top = outY + 'px';
    requestAnimationFrame(animateOutline);
  }
  animateOutline();

  document.querySelectorAll('a, button, .card, .cert-card').forEach((el) => {
    el.addEventListener('mouseenter', () => {
      outline.style.width = '58px';
      outline.style.height = '58px';
      outline.style.backgroundColor = 'rgba(111,191,31,0.08)';
    });
    el.addEventListener('mouseleave', () => {
      outline.style.width = '40px';
      outline.style.height = '40px';
      outline.style.backgroundColor = 'transparent';
    });
  });
}

// Rainbow canvas trail
if (canvas) {
  const ctx = canvas.getContext('2d');
  let W, H;
  function resizeCanvas() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  const mouse = { x: -999, y: -999 };
  const DOTS = 16;
  const trail = Array.from({ length: DOTS }, () => ({ x: -999, y: -999 }));
  let hue = 100,
    frame = 0;

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    if (trail[0].x === -999)
      trail.forEach((t) => {
        t.x = e.clientX;
        t.y = e.clientY;
      });
  });

  function render() {
    requestAnimationFrame(render);
    hue = (hue + 0.6) % 360;
    frame++;
    ctx.clearRect(0, 0, W, H);

    trail[0].x += (mouse.x - trail[0].x) * 0.5;
    trail[0].y += (mouse.y - trail[0].y) * 0.5;
    for (let i = 1; i < DOTS; i++) {
      trail[i].x += (trail[i - 1].x - trail[i].x) * 0.42;
      trail[i].y += (trail[i - 1].y - trail[i].y) * 0.42;
    }

    ctx.globalCompositeOperation = 'source-over';
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    for (let i = 1; i < DOTS; i++) {
      const t = 1 - i / DOTS;
      const h = (hue + i * 10) % 360;
      ctx.beginPath();
      ctx.moveTo(trail[i - 1].x, trail[i - 1].y);
      ctx.lineTo(trail[i].x, trail[i].y);
      ctx.strokeStyle = `hsla(${h},90%,65%,${t * 0.7})`;
      ctx.lineWidth = t * 4;
      ctx.shadowColor = `hsla(${h},100%,70%,0.4)`;
      ctx.shadowBlur = 6;
      ctx.stroke();
    }
    ctx.shadowBlur = 0;
  }
  render();
}

// ══ HACKER TEXT SCRAMBLE ══
const hackerText = document.querySelector('.hacker-text');
if (hackerText) {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ.·';
  hackerText.addEventListener('mouseover', (event) => {
    let iterations = 0;
    const interval = setInterval(() => {
      event.target.innerText = event.target.innerText
        .split('')
        .map((letter, index) => {
          if (index < iterations) return event.target.dataset.value[index];
          return letters[Math.floor(Math.random() * letters.length)];
        })
        .join('');
      if (iterations >= event.target.dataset.value.length)
        clearInterval(interval);
      iterations += 1 / 3;
    }, 30);
  });
}

// ══ 3D TILT CARDS ══
const tiltCards = document.querySelectorAll('.tilt-card');
if (tiltCards.length > 0 && window.matchMedia('(pointer: fine)').matches) {
  tiltCards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const rX = ((y - cy) / cy) * -12;
      const rY = ((x - cx) / cx) * 12;
      card.style.transform = `perspective(1000px) rotateX(${rX}deg) rotateY(${rY}deg) scale3d(1.02,1.02,1.02)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform =
        'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)';
      card.style.transition = 'transform 0.5s ease';
    });
    card.addEventListener('mouseenter', () => {
      card.style.transition = 'none';
    });
  });
}

// ══ SCROLL REVEAL ══
const reveals = document.querySelectorAll(
  '.reveal, .section-title, .timeline-item, .cert-card, .card',
);
if (reveals.length > 0) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    },
    { threshold: 0.08 },
  );

  reveals.forEach((el) => {
    if (!el.classList.contains('reveal')) el.classList.add('reveal');
    observer.observe(el);
  });
}

// ══ FOOTER YEAR ══
const yr = document.getElementById('yr');
if (yr) yr.textContent = new Date().getFullYear();

// ══ CONTACT FORM → GOOGLE SHEET ══
const SHEET_URL =
  'https://script.google.com/macros/s/AKfycbyZd1whs9lwiH2rWKS8SJ6re6EdkSGrnPChJUFSfiFmVAtQOqDenLHKSxuro1ssbGEjxA/exec';

function toast(msg, type = 's') {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.className = 'toast ' + type;
  setTimeout(() => t.classList.add('show'), 10);
  setTimeout(() => t.classList.remove('show'), 3800);
}

const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', async function (e) {
    e.preventDefault();
    const btn = document.getElementById('f-btn');
    const btnTxt = document.getElementById('btn-txt');
    const spin = document.getElementById('btn-spin');

    const payload = {
      name: document.getElementById('f-name').value.trim(),
      email: document.getElementById('f-email').value.trim(),
      purpose: document.getElementById('f-purpose').value.trim(),
      message: document.getElementById('f-message').value.trim(),
    };

    if (
      !payload.name ||
      !payload.email ||
      !payload.purpose ||
      !payload.message
    ) {
      toast('⚠️ Please fill all required fields!', 'e');
      return;
    }

    btn.disabled = true;
    if (btnTxt) btnTxt.textContent = 'Sending...';
    if (spin) spin.style.display = 'block';

    try {
      await fetch(SHEET_URL, {
        method: 'POST',
        mode: 'no-cors',
        body: new URLSearchParams(payload),
      });
      toast('✅ Message sent! Will reply soon.', 's');
      contactForm.reset();
    } catch (err) {
      toast('❌ Network error! Try again.', 'e');
    } finally {
      btn.disabled = false;
      if (btnTxt) btnTxt.textContent = 'Send Message →';
      if (spin) spin.style.display = 'none';
    }
  });
}
