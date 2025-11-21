// Ensure the footer year stays current
document.addEventListener("DOMContentLoaded", () => {
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
});

// Radar chart
const canvas = document.getElementById("skillsRadar");

if (canvas) {
  const ctx = canvas.getContext("2d");

  const modes = {
    cyber: {
      labels: [
        "Network Fundamentals",
        "Linux / CLI",
        "Windows / AD",
        "Web Security",
        "Scripting",
        "DFIR & Logging"
      ],
      // Values are out of 100 to reflect low current competence
      current: [10, 20, 20, 20, 20, 10],
      target: [40, 40, 40, 30, 30, 30]
    },
    code: {
      labels: [
        "HTML / CSS",
        "JavaScript",
        "TypeScript / React",
        "APIs & HTTP",
        "Automation Scripts",
        "Git & Workflow"
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
            label: function (context) {
              return `${context.dataset.label}: ${context.formattedValue}/100`;
            }
          }
        }
      },
      scales: {
        r: {
          min: 0,
          max: 100,
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
              size: 10
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

// Hover effect for project cards
const cardsContainer = document.getElementById("cards");

if (cardsContainer) {
  cardsContainer.addEventListener("mousemove", (e) => {
    const cards = cardsContainer.getElementsByClassName("grid-card");
    for (const card of cards) {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
    }
  });
}
