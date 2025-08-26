![Project Screenshot](img/thumbnail.png)  
# Modern Gaming Website — Cinematic, Awwwards-style Landing (HTML + CSS + JS)

Build a visually captivating website inspired by Zentry, integrating scroll-triggered animations, geometric transitions, and immersive video storytelling. The project emphasizes delivering a refined, modern aesthetic with seamless responsiveness and intuitive UI/UX, embodying the qualities that define an award-winning digital experience.

---

## ✨ Highlights

- **Scroll-Based Animations** for dynamic, engaging sections.
- **Clip-Path & 3D Hover Effects** for modern depth and movement.
- **Video Transitions** with cinematic **fade** and **portal zoom**.
- **Next-Video Preview** appears only when the cursor is near the center of the hero — click to jump to the next video.
- **Auto-Generated Thumbnails** (no manual images) from the *first frame* of each video.
- **Responsive Layout** with CSS Grid/Flexbox, neon-on-dark vibe.
- **Performance-minded** transitions and interaction patterns.

> Built with just **HTML, CSS, and vanilla JavaScript**.

---

## 🗂️ Project Structure


.
├─ index.html
├─ style.css
├─ script.js
├─ img/
│  ├─ logo.png
│  ├─ stones.png
│  ├─ about.webp
│  ├─ swordman.webp
│  ├─ contact-1.webp
│  └─ contact-2.webp
├─ videos/
│  ├─ hero-1.mp4
│  ├─ hero-2.mp4
│  ├─ hero-3.mp4
│  └─ hero-4.mp4
└─ audio/
   └─ loop.mp3

   
```

**Important:** keep folder names and paths exactly as above to avoid 404s and CORS issues when generating thumbnails from videos.

---

## 🚀 Getting Started (Local)

1. Download/clone the project
2. Open `index.html` in a modern browser

For best results, run a local server (prevents CORS errors during video-frame capture):

```

## 🌐 Deploy (GitHub Pages)

1. Push this repo to GitHub
2. Settings → Pages → Source: **Deploy from a branch**
3. Branch: **main**, Folder: **/root**
4. Open the published URL

Tip: If using a custom domain or CDN, ensure the site and video files share the **same origin** (or correct CORS headers) so the canvas can read video frames.

---

## 🧠 Implementation Notes

* **CSS**

  * Use `transform: translate3d(...)` and `will-change: transform, opacity` for GPU-friendly motion
  * 3D hover cards via small `rotateX/rotateY` on parent with `perspective`
  * Clip-path masks for reveals; prefer simple polygons for performance

* **JS Patterns**

  * Throttle mouse/scroll handlers; batch DOM writes inside `requestAnimationFrame`
  * `IntersectionObserver` for section activation and video fade timing
  * State machine for video index, preview availability, and transition locks (prevents double-click mishaps)

* **Portal Zoom Transition**

  * Snapshot the preview tile’s client rect
  * Create a transient overlay element at the same rect
  * Animate scale/opacity with `transform-origin: center` while crossfading videos
  * Remove overlay after transition to keep DOM clean

---

## 📱 Responsive Strategy

* Grid/Flex layout with clamp-based typography (`clamp(min, vw, max)`)
* Hover effects degrade gracefully to tap highlights on touch devices
* Mobile video uses `playsinline muted autoplay` for reliable behavior
* Reduced motion: respect `prefers-reduced-motion` with toned-down animation distances and durations

---

## 🔊 Audio Loop

* `audio/loop.mp3` can autoplay muted; unmute after user interaction (click/tap) to meet browser policies
* Provide a simple toggle UI; remember preference in `localStorage`

---

## ⚙️ Performance Checklist

* Compress `.mp4` (H.264) with sensible bitrates for fast start
* Optionally `<link rel="preload" as="video" href="/videos/hero-1.mp4">` for the first hero video
* Lazy-load non-critical imagery with `loading="lazy"`
* Use `decode="async"` on images where appropriate
* Consolidate shadows/blur; avoid heavy filters on large layers

---

## 🧪 Browser Support

* Latest Chrome, Edge, Firefox, and Safari
* Mobile Safari/Chrome with `playsinline` and muted autoplay
* Graceful fallback when canvas capture is blocked: preview uses a static poster frame (optional)

---

## 🧰 Configuration (Quick Reference)

* Center activation radius: adjustable in `script.js` (e.g., percentage of viewport min-dimension)
* Transition timings: CSS custom properties (durations/easings) in `style.css`
* Video order: `const videos = [...]` array in `script.js`
* Fallback poster: optional `poster` attribute on `<video>`

---

## 📝 Roadmap (Optional Enhancements)

* Scrubbable timeline micro-interaction on the preview tile
* Haptics/vibration on supported mobile devices
* Dynamic color grading via CSS filters during transitions
* WebGL particles synced to audio peaks

---

## 🙌 Credits

Design & build by **Vishuddhi**

Concepts: Awwwards-style interactions, modern motion, and playful UX

---
