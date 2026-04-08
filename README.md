# Chetan Prajapat — Portfolio v2.0

A premium, highly interactive personal portfolio built with **vanilla HTML, CSS, and JavaScript** — no frameworks, no build tools required.

---

## 📁 File Structure

```
portfolio/
├── index.html        ← Main portfolio page
├── style.css         ← All styles + theme variables
├── script.js         ← All JS interactions
├── Images/           ← Your images & certificates
│   ├── profilepic.png
│   ├── Web Development.jpg
│   ├── cursor Ai.png
│   ├── git or github.png
│   ├── c programming certificate.pdf
│   ├── Linux Privilege Escalation.jpg
│   ├── chetan-prajapat-canva-essentials-certificate.pdf
│   └── doc.pdf
└── README.md
```

---

## ✨ Features

### 🎨 Design

- **Dark / Light theme toggle** — CSS variables swap instantly
- **Lime green accent** (`#6fbf1f`) — professional, distinct from orange Hemanth portfolio
- **Syne + Space Grotesk** font pairing — editorial display + clean body
- **Noise grain overlay** — adds premium texture to backgrounds
- **Hero background word** — large ghost text "DEVELOPER"

### 🖱️ Cursor Effects

- **Custom cursor dot** — 8px green dot (mix-blend-mode: difference)
- **Cursor outline ring** — smooth lagging ring that follows mouse
- **Rainbow canvas trail** — colorful ribbon + particle effect on mouse move (canvas element)
- Automatically hidden on touch devices (`pointer: coarse`)

### 🃏 Animations

- **Hacker text scramble** — hover the tagline text in hero to see letter scramble
- **3D tilt cards** — project cards tilt on mouse move (GPU-accelerated, mouse-only)
- **Scroll reveal** — all sections fade + slide up when entering viewport
- **Ambient glow** — radial gradient that follows cursor position
- **Blinking green dot** in live clock

### ⏱️ Live Clock

- Shows your local timezone abbreviation + real-time HH:MM:SS in the navbar

### 📬 Contact Form

- Sends to **Google Sheets** via your existing Apps Script URL
- Purpose dropdown: Hiring / Freelance / Collab / Internship / Other
- Loading spinner + toast notification on success/error

### 📱 Responsive

- Hamburger menu on mobile (≤900px)
- Full-screen mobile nav overlay
- Cards switch to single column on small screens
- Cursor hidden on touch devices

---

## 🚀 How to Deploy (GitHub Pages)

1. Make sure your repo is `grchetan.github.io`
2. Put all files in root (index.html, style.css, script.js, Images/)
3. Push to `main` branch
4. Go to **Settings → Pages → Branch: main → Save**
5. Live at: `https://grchetan.github.io/`

---

## 🛠️ Customization

### Change Accent Color

In `style.css`, find `:root` and change:

```css
--neon: #6fbf1f; /* main accent */
--neon-alt: #a8e63d; /* hover/highlight */
```

### Add a Project Card

In `index.html`, copy any `.tilt-card` block inside `#projects .grid`:

```html
<a href="YOUR_LINK" target="_blank" class="project-link tilt-card reveal">
  <div class="card">
    <div class="proj-num">007</div>
    <h3>Project Name</h3>
    <p>Short description of what you built.</p>
    <div class="tech-stack"><span>React</span><span>Node.js</span></div>
  </div>
</a>
```

### Add a Certificate

In `#certs .cert-grid`:

```html
<div class="cert-card reveal">
  <div class="cert-ico"><i class="fa-solid fa-star"></i></div>
  <div class="cert-name">Certificate Name</div>
  <div class="cert-by">Issued by Platform</div>
  <div class="cert-date">Month Year</div>
  <a href="Images/your-cert.pdf" class="cert-link"
    >View Cert <i class="fa-solid fa-arrow-right"></i
  ></a>
</div>
```

### Update Google Sheet URL

In `script.js`, line 1:

```js
const SHEET_URL = 'YOUR_APPS_SCRIPT_URL_HERE';
```

### Favicon

Currently uses an inline SVG favicon (green "C" on dark background). To use a custom PNG:

```html
<link rel="icon" type="image/png" href="Images/favicon.png" />
```

---

## 📦 Dependencies (CDN — no install needed)

| Package                      | Version | Use                  |
| ---------------------------- | ------- | -------------------- |
| Google Fonts — Syne          | latest  | Display/heading font |
| Google Fonts — Space Grotesk | latest  | Body font            |
| Font Awesome                 | 6.5.0   | Icons everywhere     |

No npm, no bundler, no build step. Just open `index.html`.

---

## 🔗 Your Links (update these in index.html)

| Platform  | Handle                                      |
| --------- | ------------------------------------------- |
| GitHub    | `github.com/grchetan`                       |
| LinkedIn  | `linkedin.com/in/chetan-prajapat-58350b285` |
| Twitter   | `@grchetann`                                |
| Instagram | `@chetanprajapat_`                          |
| Email     | `contact.chetanprajapat@gmail.com`          |

---

Made with 🟢 by Chetan Prajapat · Mumbai, India
