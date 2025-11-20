// Ensure the footer year stays current
document.addEventListener("DOMContentLoaded", () => {
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
});

const ctx = document.getElementById("skillsRadar");

if (ctx) {
  const modes = {
    cyber: {
      labels: [
        "Network fundamentals",
        "Linux / CLI",
        "Windows / AD basics",
        "Web security",
        "Scripting (Python/Bash)",
        "DFIR & logging"
      ],
      current: [3, 2, 2, 2, 2, 1],
      target: [4, 4, 4, 3, 3, 3]
    },
    code: {
      labels: [
        "HTML / CSS",
        "JavaScript",
        "TypeScript / React",
        "APIs & HTTP",
        "Automation scripts",
        "Git & workflow"
      ],
      current: [3, 2, 2, 2, 2, 3],
      target: [4, 3, 3, 3, 3, 4]
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
          pointRadius: 3,
          borderWidth: 2
        },
        {
          label: "Target (12 months)",
          data: mode.target,
          fill: true,
          backgroundColor: "rgba(56, 189, 248, 0.18)",
          borderColor: "rgba(56, 189, 248, 1)",
          pointBackgroundColor: "rgba(56, 189, 248, 1)",
          pointBorderColor: "#020617",
          pointRadius: 3,
          borderWidth: 2
        }
      ]
    };

    const options = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          callbacks: {
            label: function (ctx) {
              return `${ctx.dataset.label}: ${ctx.formattedValue}/5`;
            }
          }
        }
      },
      scales: {
        r: {
          suggestedMin: 0,
          suggestedMax: 5,
          ticks: {
            stepSize: 1,
            showLabelBackdrop: false,
            color: "rgba(148, 163, 184, 0.9)"
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
              size: 11
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
