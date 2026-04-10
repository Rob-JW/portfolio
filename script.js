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
 *
 * Two profiles (Cyber / General), smooth data transitions on mode switch,
 * theme-reactive colours, combined tooltip, keyboard-navigable tablist.
 * Respects prefers-reduced-motion.
 */
function initRadarChart() {
	const canvas = document.getElementById("skillsRadar");
	if (!canvas || typeof Chart === "undefined") return;

	const ctx = canvas.getContext("2d");
	const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

	const modes = {
		cyber: {
			title: "Cyber",
			labels: [
				["Network", "Fundamentals"],
				["Linux", "CLI"],
				["Windows /", "Active Directory"],
				["Web", "Security"],
				["Scripting", "(Bash/Python)"],
				["DFIR &", "Logging"]
			],
			current: [40, 25, 30, 30, 25, 20],
			target: [65, 60, 60, 55, 50, 55]
		},

		general: {
			title: "General",
			labels: [
				["Leadership", " "],
				["Engineering", "Governance"],
				["Quality", "& Audit"],
				["Process", "Transformation"],
				["Defence", "Acquisition"],
				["Operational", "Delivery"]
			],
			current: [88, 88, 75, 82, 80, 85],
			target: [90, 88, 88, 85, 80, 85]
		}
	};

	// Read live theme colours from CSS custom properties so the chart
	// follows the active light / dark theme.
	function getThemeColors() {
		const styles = getComputedStyle(document.documentElement);
		const read = (name, fallback) =>
			(styles.getPropertyValue(name) || "").trim() || fallback;
		return {
			accent: read("--accent", "#4ade80"),
			accent2: read("--accent-2", "#38bdf8"),
			textMain: read("--text-main", "#e5e7eb"),
			textMuted: read("--text-muted", "#9ca3af")
		};
	}

	// Convert a hex colour string to rgba() with the given alpha. Any value
	// that isn't a valid hex is returned untouched.
	function hexToRgba(hex, alpha) {
		if (typeof hex !== "string" || !hex.startsWith("#")) return hex;
		const h = hex.replace("#", "");
		const full =
			h.length === 3
				? h
						.split("")
						.map((c) => c + c)
						.join("")
				: h;
		if (full.length !== 6) return hex;
		const r = parseInt(full.slice(0, 2), 16);
		const g = parseInt(full.slice(2, 4), 16);
		const b = parseInt(full.slice(4, 6), 16);
		return `rgba(${r}, ${g}, ${b}, ${alpha})`;
	}

	function updateCanvasLabel(modeKey) {
		const title = modes[modeKey].title;
		canvas.setAttribute(
			"aria-label",
			`${title} skills radar chart showing current levels and 12-month targets across six axes`
		);
	}

	let currentMode = "cyber";
	let radarChart = null;

	function buildConfig() {
		const mode = modes[currentMode];
		const colors = getThemeColors();
		return {
			type: "radar",
			data: {
				labels: mode.labels,
				datasets: [
					{
						label: "Current level",
						data: mode.current,
						fill: true,
						backgroundColor: hexToRgba(colors.accent, 0.25),
						borderColor: colors.accent,
						pointBackgroundColor: colors.accent,
						pointRadius: 3,
						borderWidth: 2
					},
					{
						label: "Target (12 months)",
						data: mode.target,
						fill: true,
						backgroundColor: hexToRgba(colors.accent2, 0.18),
						borderColor: colors.accent2,
						pointBackgroundColor: colors.accent2,
						pointRadius: 3,
						borderWidth: 2
					}
				]
			},
			options: {
				responsive: true,
				maintainAspectRatio: false,
				// Fixed padding keeps the plot area the same size regardless of
				// label text length — prevents jump on mode switch.
				layout: {
					padding: { top: 20, right: 40, bottom: 20, left: 40 }
				},
				animation: {
					duration: reducedMotionQuery.matches ? 0 : 600,
					easing: "easeOutQuart"
				},
				plugins: {
					legend: { display: false },
					tooltip: {
						mode: "index",
						intersect: false,
						callbacks: {
							label: (item) => `${item.dataset.label}: ${item.raw}/100`
						}
					}
				},
				scales: {
					r: {
						// Hard min/max so scale is identical across modes —
						// no visual resize when switching Cyber / General.
						min: 0,
						max: 95,
						ticks: {
							stepSize: 25,
							showLabelBackdrop: false,
							color: "rgba(0, 0, 0, 0)"
						},
						grid: { color: colors.textMuted, lineWidth: 1 },
						angleLines: { color: colors.textMuted, lineWidth: 1 },
						pointLabels: {
							color: colors.textMain,
							padding: 12,
							font: {
								size: 11,
								family: "system-ui, -apple-system, sans-serif"
							}
						}
					}
				}
			}
		};
	}

	// Update the chart data + theme colours in place. Chart.js animates
	// between states natively, giving a smooth morph between Cyber / General
	// and when the user switches theme.
	function updateRadar() {
		if (!radarChart) return;
		const mode = modes[currentMode];
		const colors = getThemeColors();

		radarChart.data.labels = mode.labels;

		const [currentDs, targetDs] = radarChart.data.datasets;
		currentDs.data = mode.current;
		currentDs.backgroundColor = hexToRgba(colors.accent, 0.25);
		currentDs.borderColor = colors.accent;
		currentDs.pointBackgroundColor = colors.accent;

		targetDs.data = mode.target;
		targetDs.backgroundColor = hexToRgba(colors.accent2, 0.18);
		targetDs.borderColor = colors.accent2;
		targetDs.pointBackgroundColor = colors.accent2;

		const r = radarChart.options.scales.r;
		r.grid.color = colors.textMuted;
		r.angleLines.color = colors.textMuted;
		r.pointLabels.color = colors.textMain;

		radarChart.update();
		updateCanvasLabel(currentMode);
	}

	function setMode(modeKey, focusButton) {
		if (!modes[modeKey]) return;

		currentMode = modeKey;

		const toggleButtons = document.querySelectorAll(".toggle-button");
		toggleButtons.forEach((btn) => {
			const isActive = btn.getAttribute("data-mode") === modeKey;
			btn.classList.toggle("active", isActive);
			btn.setAttribute("aria-selected", String(isActive));
			btn.setAttribute("tabindex", isActive ? "0" : "-1");
		});

		if (focusButton) focusButton.focus();
		updateRadar();
	}

	// Initial render
	radarChart = new Chart(ctx, buildConfig());
	updateCanvasLabel(currentMode);

	// Toggle buttons: click + keyboard arrow navigation (WAI-ARIA tab pattern)
	const toggleButtons = Array.from(document.querySelectorAll(".toggle-button"));
	toggleButtons.forEach((btn, index) => {
		btn.addEventListener("click", () => {
			const mode = btn.getAttribute("data-mode");
			if (mode && mode !== currentMode) setMode(mode);
		});

		btn.addEventListener("keydown", (e) => {
			let nextIndex = null;
			if (e.key === "ArrowRight" || e.key === "ArrowDown") {
				nextIndex = (index + 1) % toggleButtons.length;
			} else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
				nextIndex = (index - 1 + toggleButtons.length) % toggleButtons.length;
			} else if (e.key === "Home") {
				nextIndex = 0;
			} else if (e.key === "End") {
				nextIndex = toggleButtons.length - 1;
			}
			if (nextIndex !== null) {
				e.preventDefault();
				const targetBtn = toggleButtons[nextIndex];
				const targetMode = targetBtn.getAttribute("data-mode");
				setMode(targetMode, targetBtn);
			}
		});
	});

	// Re-sync chart colours when the user switches theme
	const themeSelect = document.getElementById("theme-select");
	if (themeSelect) {
		themeSelect.addEventListener("change", () => {
			requestAnimationFrame(updateRadar);
		});
	}

	// Re-sync chart when OS theme changes (relevant when "System" is selected)
	const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");
	prefersDark.addEventListener("change", () => {
		requestAnimationFrame(updateRadar);
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
