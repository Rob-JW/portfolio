// Ensure the footer year stays current
document.addEventListener("DOMContentLoaded", () => {
	const yearSpan = document.getElementById("year");
	if (yearSpan) {
		yearSpan.textContent = new Date().getFullYear();
	}

	initThemeSelector();
	initMobileNav();
	initRadarChart();
	initHoverCards();
});

/**
 * THEME SELECTOR (light / dark / system)
 */
function initThemeSelector() {
	const select = document.getElementById("theme-select");
	if (!select) return;

	const root = document.documentElement;
	const stored = localStorage.getItem("theme-preference");

	function applyTheme(theme) {
		if (theme === "light") {
			root.setAttribute("data-theme", "light");
		} else if (theme === "dark") {
			root.setAttribute("data-theme", "dark");
		} else {
			// system: remove explicit theme and rely on prefers-color-scheme
			root.removeAttribute("data-theme");
		}
		localStorage.setItem("theme-preference", theme);
	}

	// On load: apply stored preference or default to system
	const initialTheme = stored || "system";
	applyTheme(initialTheme);
	select.value = initialTheme;

	select.addEventListener("change", (e) => {
		const value = e.target.value;
		applyTheme(value);
	});
}

/**
 * MOBILE NAV / HAMBURGER
 */
function initMobileNav() {
	const menuToggle = document.querySelector(".menu-toggle");
	const mainNav = document.querySelector(".main-nav");
	if (!menuToggle || !mainNav) return;

	// Toggle on button click
	menuToggle.addEventListener("click", (event) => {
		event.stopPropagation(); // don't trigger outside-click handler
		const isOpen = mainNav.classList.toggle("open");
		menuToggle.setAttribute("aria-expanded", String(isOpen));
		menuToggle.classList.toggle("open", isOpen);
	});

	// Close when clicking outside the nav / button
	document.addEventListener("click", (event) => {
		const isOpen = mainNav.classList.contains("open");
		if (!isOpen) return;

		const clickedInsideNav = mainNav.contains(event.target);
		const clickedToggle = menuToggle.contains(event.target);

		if (!clickedInsideNav && !clickedToggle) {
			mainNav.classList.remove("open");
			menuToggle.classList.remove("open");
			menuToggle.setAttribute("aria-expanded", "false");
		}
	});

	// Close menu when resizing back to desktop width
	window.addEventListener("resize", () => {
		if (window.innerWidth > 768) {
			mainNav.classList.remove("open");
			menuToggle.classList.remove("open");
			menuToggle.setAttribute("aria-expanded", "false");
		}
	});
}

/**
 * RADAR CHART
 */
function initRadarChart() {
	const canvas = document.getElementById("skillsRadar");
	if (!canvas || typeof Chart === "undefined") return;

	const ctx = canvas.getContext("2d");

const modes = {
  cyber: {
    labels: [
      ["Network", "Fundamentals"],
      ["Linux", "CLI"],
      ["Windows /", "Active Directory"],
      ["Web", "Security"],
      ["Scripting", "(Bash/Python)"],
      ["DFIR &", "Logging"]
    ],
    current: [10, 20, 20, 20, 20, 10],
    target: [40, 40, 40, 30, 30, 30]
  },

  code: {
    labels: [
      ["HTML /", "CSS"],
      ["JavaScript"],
      ["TypeScript /", "React"],
      ["APIs &", "HTTP"],
      ["Automation", "Scripts"],
      ["Git &", "Workflow"]
    ],
    current: [30, 10, 10, 10, 20, 30],
    target: [40, 30, 30, 30, 30, 40]
  }
};


	let currentMode = "cyber";
	let radarChart = null;

	function buildRadar(modeKey) {
		const mode = modes[modeKey];
		if (!mode) return;

		const data = {
			labels: mode.labels,
			datasets: [
				{
					label: "Current level",
					data: mode.current,
					fill: true,
					backgroundColor: "rgba(74, 222, 128, 0.25)",
					borderColor: "rgba(74, 222, 128, 1)",
					pointBackgroundColor: "rgba(74, 222, 128, 1)",
					pointBorderColor: "#020617",
					pointRadius: 2,
					borderWidth: 1
				},
				{
					label: "Target (12 months)",
					data: mode.target,
					fill: true,
					backgroundColor: "rgba(56, 189, 248, 0.18)",
					borderColor: "rgba(56, 189, 248, 1)",
					pointBackgroundColor: "rgba(56, 189, 248, 1)",
					pointBorderColor: "#020617",
					pointRadius: 2,
					borderWidth: 1
				}
			]
		};

		const options = {
			responsive: true,
			maintainAspectRatio: false, // use chart-wrapper height
			plugins: {
				legend: {
					display: false
				},
				tooltip: {
					callbacks: {
						label: function (ctx) {
							return `${ctx.dataset.label}: ${ctx.raw}/100`;
						}
					}
				}
			},
			scales: {
				r: {
					suggestedMin: 0,
					suggestedMax: 100,
					ticks: {
						stepSize: 20,
						showLabelBackdrop: false,
						color: "rgba(148, 163, 184, 0.0)"
					},
					grid: {
						color: "rgba(51, 65, 85, 0.7)"
					},
					angleLines: {
						color: "rgba(51, 65, 85, 0.9)"
					},
					pointLabels: {
						color: "rgba(226, 232, 240, 0.95)",
						font: {
							size: 8
						}
					}
				}
			}
		};

		if (radarChart) {
			radarChart.destroy();
		}

		radarChart = new Chart(ctx, {
			type: "radar",
			data,
			options
		});
	}

	// Build initial chart
	buildRadar(currentMode);

	// Toggle buttons
	const toggleButtons = document.querySelectorAll(".toggle-button");
	toggleButtons.forEach((btn) => {
		btn.addEventListener("click", () => {
			const mode = btn.getAttribute("data-mode");
			if (!mode || mode === currentMode) return;

			currentMode = mode;

			toggleButtons.forEach((b) => b.classList.remove("active"));
			btn.classList.add("active");

			buildRadar(currentMode);
		});
	});
}

/**
 * HOVER CARD MOUSE-EFFECT
 */
function initHoverCards() {
	const container = document.getElementById("cards-matrix");
	if (!container) return;

	container.addEventListener("mousemove", (e) => {
		const cards = container.getElementsByClassName("hover-card");
		for (const card of cards) {
			const rect = card.getBoundingClientRect();
			const x = e.clientX - rect.left;
			const y = e.clientY - rect.top;
			card.style.setProperty("--mouse-x", `${x}px`);
			card.style.setProperty("--mouse-y", `${y}px`);
		}
	});
}
