// Constants
var USERNAME_REGEX = /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9]).{8,}$/;
var MONTH_IDS = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];

// Helper function to safely get element by ID
function getElement(id) {
  var element = document.getElementById(id);
  if (!element) {
    console.error("Element not found: " + id);
  }
  return element;
}

// Helper function to collect monthly data
function collectMonthlyData(type) {
  return MONTH_IDS.map(function(month) {
    var element = getElement(month + "-" + type);
    return element ? element.value : "";
  }).map(Number);
}

window.onload = function () {
  var usernameInput = getElement("username");
  
  if (usernameInput) {
    usernameInput.addEventListener("input", function () {
      var username = usernameInput.value;

      if (USERNAME_REGEX.test(username)) {
        usernameInput.style.borderColor = "green";
      } else {
        usernameInput.style.borderColor = "red";
      }
    });
  }

  var downloadButton = getElement("download");
  
  if (downloadButton) {
    downloadButton.addEventListener("click", function () {
      var canvas = getElement("myChart");
      if (!canvas) return;
      
      var image = canvas.toDataURL("image/png");
      var link = document.createElement("a");
      link.href = image;
      link.download = "chart.png";
      link.click();
    });
  }
  var chartCanvas = getElement("myChart");
  if (!chartCanvas) return;
  
  var ctx = chartCanvas.getContext("2d");
  var myChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
      datasets: [
        {
          label: "Income",
          data: [],
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
        {
          label: "Expenses",
          data: [],
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });

  var chartTab = getElement("chart-tab");
  
  if (chartTab) {
    chartTab.addEventListener("click", function () {
      var incomeData = collectMonthlyData("income");
      var expensesData = collectMonthlyData("expenses");

      myChart.data.datasets[0].data = incomeData;
      myChart.data.datasets[1].data = expensesData;

      myChart.update();
    });
  }
};
