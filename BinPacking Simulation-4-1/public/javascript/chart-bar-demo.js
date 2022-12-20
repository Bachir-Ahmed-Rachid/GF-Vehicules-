const customer_bar=JSON.parse(customerCharts)
let matrix_lbel_bar=[]
for(let elemnt of customer_bar){
  matrix_lbel_bar.push([elemnt.Dilevery,elemnt.Pickup,elemnt.date])
}
let lab_bar=[]
let data_pickup_bar=[]
let data_dilevery_bar=[]
for(let elemnt of matrix_lbel_bar){
  data_dilevery_bar.push(elemnt[0])
  data_pickup_bar.push(elemnt[1])
  lab_bar.push(elemnt[2])
}
// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#292b2c';

// Bar Chart Example
var ctx = document.getElementById("myBarChart");
var myLineChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: lab_bar,
    datasets: [{
      label: "Palettes delivrer",
      backgroundColor: "rgba(2,117,216,1)",
      borderColor: "rgba(2,117,216,1)",
      data: data_dilevery_bar,
    },
    {
      label: "Palettes ramasser ",
      backgroundColor: "rgba(216,10,2,1)",
      borderColor: "rgba(216,10,2,1)",
      data: data_pickup_bar,
    }],
  },
  options: {
    scales: {
      xAxes: [{
        time: {
          unit: 'month'
        },
        gridLines: {
          display: false
        },
        ticks: {
          maxTicksLimit: 6
        }
      }],
      yAxes: [{
        ticks: {
          min: 0,
          max: 50,
          maxTicksLimit: 5
        },
        gridLines: {
          display: true
        }
      }],
    },
    legend: {
      display: true
    }
  }
});
