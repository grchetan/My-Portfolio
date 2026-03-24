(function () {
  const canvas = document.getElementById('cursor-canvas');
  const ctx = canvas.getContext('2d');
  const dot = document.getElementById('cursor-dot');
  let W, H;

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const mouse = { x: -999, y: -999 };
  const DOTS = 18;
  const trail = Array.from({ length: DOTS }, () => ({ x: -999, y: -999 }));
  const MAX_P = 40;
  const parts = [];
  let hue = 0,
    frame = 0;

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    dot.style.left = e.clientX + 'px';
    dot.style.top = e.clientY + 'px';
    if (trail[0].x === -999)
      trail.forEach((t) => {
        t.x = e.clientX;
        t.y = e.clientY;
      });
  });
  window.addEventListener(
    'touchmove',
    (e) => {
      mouse.x = e.touches[0].clientX;
      mouse.y = e.touches[0].clientY;
    },
    { passive: true },
  );
  window.addEventListener('mousedown', (e) => {
    for (let i = 0; i < 12; i++) parts.push(newDot(e.clientX, e.clientY));
  });

  function newDot(x, y) {
    const a = Math.random() * Math.PI * 2;
    const s = 0.8 + Math.random() * 1.8;
    return {
      x,
      y,
      vx: Math.cos(a) * s,
      vy: Math.sin(a) * s - 0.5,
      life: 1,
      decay: 0.028 + Math.random() * 0.02,
      r: 1.5 + Math.random() * 2,
      hue: hue + Math.random() * 40 - 20,
    };
  }

  function render() {
    requestAnimationFrame(render);
    hue = (hue + 0.8) % 360;
    frame++;

    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = 'rgba(0,0,0,0.2)';
    ctx.fillRect(0, 0, W, H);

    // Trail update
    trail[0].x += (mouse.x - trail[0].x) * 0.5;
    trail[0].y += (mouse.y - trail[0].y) * 0.5;
    for (let i = 1; i < DOTS; i++) {
      trail[i].x += (trail[i - 1].x - trail[i].x) * 0.45;
      trail[i].y += (trail[i - 1].y - trail[i].y) * 0.45;
    }

    // Draw ribbon
    ctx.globalCompositeOperation = 'lighter';
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    for (let i = 1; i < DOTS; i++) {
      const t = 1 - i / DOTS;
      const h = (hue + i * 8) % 360;
      ctx.beginPath();
      ctx.moveTo(trail[i - 1].x, trail[i - 1].y);
      ctx.lineTo(trail[i].x, trail[i].y);
      ctx.strokeStyle = `hsla(${h},100%,65%,${t * 0.6})`;
      ctx.lineWidth = t * 5;
      ctx.shadowColor = `hsla(${h},100%,70%,0.5)`;
      ctx.shadowBlur = 6;
      ctx.stroke();
    }

    // Emit particle
    const dx = trail[0].x - trail[1].x;
    const dy = trail[0].y - trail[1].y;
    if (
      Math.sqrt(dx * dx + dy * dy) > 2 &&
      parts.length < MAX_P &&
      frame % 2 === 0
    )
      parts.push(newDot(mouse.x, mouse.y));

    // Draw particles
    ctx.shadowBlur = 0;
    for (let i = parts.length - 1; i >= 0; i--) {
      const p = parts[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.04;
      p.vx *= 0.98;
      p.life -= p.decay;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r * p.life, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${p.hue},100%,70%,${p.life * 0.8})`;
      ctx.fill();
      if (p.life <= 0) parts.splice(i, 1);
    }
    ctx.shadowBlur = 0;
  }

  render();
})();
