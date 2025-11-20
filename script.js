// Requires Chart.js
// In CodePen: Settings → JavaScript → add external:
// https://cdn.jsdelivr.net/npm/chart.js

window.addEventListener("DOMContentLoaded", () => {
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  const ctx = document.getElementById("skillsRadar");
  if (!ctx) return;

  const labels = [
    "Problem solving",
    "Systems thinking",
    "Automation",
    "Security mindset",
    "Documentation",
    "Collaboration"
  ];

  const datasetsByMode = {
    code: {
      label: "Code",
      data: [8, 7, 8, 6, 7, 8],
      borderColor: "#ffa7c4",
      backgroundColor: "rgba(255, 167, 196, 0.25)",
      pointBackgroundColor: "#ffa7c4",
      pointRadius: 3,
      borderWidth: 2
    },
    cyber: {
      label: "Cyber",
      data: [7, 8, 6, 8, 7, 7],
      borderColor: "#57f9ff",
      backgroundColor: "rgba(87, 249, 255, 0.22)",
      pointBackgroundColor: "#57f9ff",
      pointRadius: 3,
      borderWidth: 2
    }
  };

  const chart = new Chart(ctx, {
    type: "radar",
    data: {
      labels,
      datasets: [datasetsByMode.code]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          backgroundColor: "#050816",
          borderColor: "#1f233b",
          borderWidth: 1,
          titleColor: "#f4f4ff",
          bodyColor: "#f4f4ff",
          padding: 8
        }
      },
      scales: {
        r: {
          angleLines: {
            colour: "#1f233b"
          },
          grid: {
            colour: "#1f233b"
          },
          suggestedMin: 0,
          suggestedMax: 10,
          ticks: {
            display: false,
            stepSize: 2
          },
          pointLabels: {
            colour: "#a6a7c4",
            font: {
              size: 10
            }
          }
        }
      }
    }
  });

  const modeLabel = document.querySelector(".skills-mode-label");
  const toggleButtons = document.querySelectorAll(".toggle-btn");

  function setMode(mode) {
    const dataset = datasetsByMode[mode];
    if (!dataset) return;

    chart.data.datasets = [dataset];
    chart.update();

    if (modeLabel) {
      modeLabel.textContent =
        mode === "code" ? "Mode: Coding" : "Mode: Cyber";
    }

    toggleButtons.forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.mode === mode);
    });
  }

  toggleButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const mode = btn.dataset.mode;
      setMode(mode);
    });
  });

  // Ensure initial state is consistent
  setMode("code");
});
