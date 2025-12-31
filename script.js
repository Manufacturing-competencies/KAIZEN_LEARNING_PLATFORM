// =====================================================
// script.js (CLEAN) — Index + Popup + Contact drag + Safe init
// =====================================================

document.addEventListener("DOMContentLoaded", () => {
  // ✅ tampilkan popup info (index saja)
  initInfoPopup();

  // ✅ contact slider drag (kalau ada)
  initContactSlider();

  console.log("✅ script.js jalan:", window.location.pathname);
});

/* =====================================================
   POPUP INFORMASI (index.html)
   - muncul otomatis
   - bisa close X / klik luar / ESC
   - active slide auto (timbul)
===================================================== */
function initInfoPopup() {
  const popup = document.getElementById("infoPopup");
  const closeBtn = document.getElementById("infoClose");
  const slider = document.querySelector(".info-slider");
  const slides = slider ? Array.from(slider.querySelectorAll(".info-slide")) : [];

  // hanya jalan kalau elemen ada
  if (!popup || !closeBtn || !slider || slides.length === 0) return;

  // tampil otomatis (bisa ubah delay)
  setTimeout(() => popup.classList.add("active"), 300);

  // close
  closeBtn.addEventListener("click", () => popup.classList.remove("active"));
  popup.addEventListener("click", (e) => {
    if (e.target === popup) popup.classList.remove("active");
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") popup.classList.remove("active");
  });

  // aktifkan slide yang paling tengah
  const setActiveByCenter = () => {
    const rect = slider.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;

    let bestIdx = 0;
    let bestDist = Infinity;

    slides.forEach((s, idx) => {
      const r = s.getBoundingClientRect();
      const mid = r.left + r.width / 2;
      const dist = Math.abs(mid - centerX);
      if (dist < bestDist) { bestDist = dist; bestIdx = idx; }
    });

    slides.forEach((s, idx) => {
      s.classList.toggle("active", idx === bestIdx);
      s.classList.toggle("inactive", idx !== bestIdx);
    });
  };

  setActiveByCenter();
  slider.addEventListener("scroll", () => requestAnimationFrame(setActiveByCenter), { passive: true });
}

/* =====================================================
   CONTACT SLIDER (drag) — jalan kalau ada #contactGrid
   Catatan: di HTML kamu sekarang contact-grid class,
   jadi bikin id="contactGrid" kalau mau fitur ini aktif.
===================================================== */
function initContactSlider() {
  const grid = document.getElementById("contactGrid");
  if (!grid) return;

  let isDown = false;
  let startX = 0;
  let scrollLeft = 0;

  grid.addEventListener("mousedown", (e) => {
    isDown = true;
    grid.classList.add("dragging");
    startX = e.pageX - grid.offsetLeft;
    scrollLeft = grid.scrollLeft;
  });

  window.addEventListener("mouseup", () => {
    isDown = false;
    grid.classList.remove("dragging");
  });

  grid.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - grid.offsetLeft;
    const walk = (x - startX) * 1.2;
    grid.scrollLeft = scrollLeft - walk;
  });
}
