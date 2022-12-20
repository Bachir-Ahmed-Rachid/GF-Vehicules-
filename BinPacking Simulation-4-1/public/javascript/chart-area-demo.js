const customer=JSON.parse(customerCharts)
let matrix_lbel=[]
for(let elemnt of customer){
  matrix_lbel.push([elemnt.Dilevery,elemnt.Pickup,elemnt.date])
}
let lab=[]
let data_pickup=[]
let data_dilevery=[]
for(let elemnt of matrix_lbel){
  data_dilevery.push(elemnt[0])
  data_pickup.push(elemnt[1])
  lab.push(elemnt[2])
}


// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#292b2c';

// Area Chart Example
var ctx = document.getElementById("myAreaChart");
var myLineChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels:lab,
    datasets: [{
      label: "Palettes delivrer",
      lineTension: 0.3,
      backgroundColor: "rgba(2,117,216,0.2)",
      borderColor: "rgba(2,117,216,1)",
      pointRadius: 5,
      pointBackgroundColor: "rgba(2,117,216,1)",
      pointBorderColor: "rgba(255,255,255,0.8)",
      pointHoverRadius: 5,
      pointHoverBackgroundColor: "rgba(2,117,216,1)",
      pointHitRadius: 50,
      pointBorderWidth: 2,
      data: data_dilevery,
    },
    {
      label: "Palettes ramasser",
      lineTension: 0.3,
      backgroundColor: "rgba(2,117,216,0.2)",
      borderColor: "rgba(216,10,2,1)",
      pointRadius: 5,
      pointBackgroundColor: "rgba(216,10,2,1)",
      pointBorderColor: "rgba(255,255,255,0.8)",
      pointHoverRadius: 5,
      pointHoverBackgroundColor: "rgba(216,10,2,1)",
      pointHitRadius: 50,
      pointBorderWidth: 2,
      data: data_pickup,
    }],
  },
  options: {
    scales: {
      xAxes: [{
        time: {
          unit: 'date'
        },
        gridLines: {
          display: false
        },
        ticks: {
          maxTicksLimit: 7
        }
      }],
      yAxes: [{
        ticks: {
          min: 0,
          max: 40,
          maxTicksLimit: 5
        },
        gridLines: {
          color: "rgba(0, 0, 0, .125)",
        }
      }],
    },
    legend: {
      display: true
    }
  }
});
