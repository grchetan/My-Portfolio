// ══ THEME ══
const savedTheme = localStorage.getItem('cp-theme') || 'dark';
document.documentElement.setAttribute('data-theme', savedTheme);

const themeBtn = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const sunPath = `<circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>`;
const moonPath = `<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>`;
if (savedTheme === 'light' && themeIcon) themeIcon.innerHTML = moonPath;
if (themeBtn && themeIcon) {
  themeBtn.addEventListener('click', () => {
    const next =
      document.documentElement.getAttribute('data-theme') === 'dark'
        ? 'light'
        : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('cp-theme', next);
    themeIcon.innerHTML = next === 'light' ? moonPath : sunPath;
  });
}

// ══ NAV SCROLL ══
const pNav = document.querySelector('.p-nav');
window.addEventListener('scroll', () => {
  if (pNav) pNav.classList.toggle('scrolled', window.scrollY > 50);
});

// ══ CURSOR ══
const dot = document.getElementById('cursor-dot');
const outline = document.getElementById('cursor-outline');
const canvas = document.getElementById('cursor-canvas');
if (dot && outline) {
  let mx = 0,
    my = 0,
    ox = 0,
    oy = 0;
  window.addEventListener('mousemove', (e) => {
    mx = e.clientX;
    my = e.clientY;
    dot.style.left = mx + 'px';
    dot.style.top = my + 'px';
  });
  function animOut() {
    ox += (mx - ox) * 0.11;
    oy += (my - oy) * 0.11;
    outline.style.left = ox + 'px';
    outline.style.top = oy + 'px';
    requestAnimationFrame(animOut);
  }
  animOut();
  document.querySelectorAll('a, button').forEach((el) => {
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
if (canvas) {
  const ctx = canvas.getContext('2d');
  let W, H;
  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);
  const mouse = { x: -999, y: -999 };
  const DOTS = 16;
  const trail = Array.from({ length: DOTS }, () => ({ x: -999, y: -999 }));
  let hue = 100;
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
    ctx.clearRect(0, 0, W, H);
    trail[0].x += (mouse.x - trail[0].x) * 0.5;
    trail[0].y += (mouse.y - trail[0].y) * 0.5;
    for (let i = 1; i < DOTS; i++) {
      trail[i].x += (trail[i - 1].x - trail[i].x) * 0.42;
      trail[i].y += (trail[i - 1].y - trail[i].y) * 0.42;
    }
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

// ══ SCROLL REVEAL ══
const obs = new IntersectionObserver(
  (es) =>
    es.forEach((e) => {
      if (e.isIntersecting) e.target.classList.add('on');
    }),
  { threshold: 0.08 },
);
document
  .querySelectorAll('.rv, .proj-section')
  .forEach((el) => obs.observe(el));

// ══ FOOTER YEAR ══
const yr = document.getElementById('yr');
if (yr) yr.textContent = new Date().getFullYear();
