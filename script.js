// Typewriter effect for hero subtitle
const lines = [
  "building fast, secure web things…",
  "cybersecurity & pixel-art aesthetics.",
  "available for collabs — say hi."
];
const el = document.getElementById("typewriter");
let li = 0,
  ci = 0,
  deleting = false;

function typeLoop() {
  const current = lines[li];
  if (!deleting) {
    el.textContent = current.slice(0, ++ci) + "▋";
    if (ci === current.length) {
      deleting = true;
      setTimeout(typeLoop, 900);
      return;
    }
  } else {
    el.textContent = current.slice(0, --ci) + "▋";
    if (ci === 0) {
      deleting = false;
      li = (li + 1) % lines.length;
    }
  }
  setTimeout(typeLoop, deleting ? 35 : 45);
}
typeLoop();

// Animate skill meters on load
document.querySelectorAll(".meter").forEach((m) => {
  const level = parseInt(m.dataset.level || "0", 10);
  requestAnimationFrame(() => {
    m.querySelector("span").style.width = level + "%";
  });
});

// Theme toggle (dark/light neon)
const themeToggle = document.getElementById("themeToggle");
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light");
  themeToggle.textContent = document.body.classList.contains("light")
    ? "☀"
    : "☾";
  localStorage.setItem(
    "theme",
    document.body.classList.contains("light") ? "light" : "dark"
  );
});

// Persist theme between visits
(function initTheme() {
  const saved = localStorage.getItem("theme");
  if (saved === "light") {
    document.body.classList.add("light");
    themeToggle.textContent = "☀";
  }
})();

// Mobile nav toggle
const navToggle = document.querySelector(".nav-toggle");
const navList = document.querySelector(".nav-list");
navToggle.addEventListener("click", () => {
  const open = navList.classList.toggle("show");
  navToggle.setAttribute("aria-expanded", open ? "true" : "false");
});

// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Accessible smooth-scroll (native smooth via CSS; add focus management)
document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener("click", (e) => {
    const id = a.getAttribute("href").slice(1);
    const target = document.getElementById(id);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      setTimeout(() => target.setAttribute("tabindex", "-1"), 0);
      setTimeout(() => target.focus({ preventScroll: true }), 600);
    }
  });
});
