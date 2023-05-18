const customer_pie=JSON.parse(customerCharts)
let matrix_lbel_pie=[]
for(let elemnt of customer_pie){
  matrix_lbel_pie.push([elemnt.Dilevery,elemnt.Pickup,elemnt.date])
}
let lab_pie=[]
let data_pickup_pie=[]
let data_dilevery_pie=[]
for(let elemnt of matrix_lbel_pie){
  data_dilevery_pie.push(elemnt[0])
  data_pickup_pie.push(elemnt[1])
  lab_pie.push(elemnt[2])
}
data_pie=data_dilevery_pie.concat(data_pickup_pie)
console.log(data_pie)
// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#292b2c';

// Pie Chart Example
var ctx = document.getElementById("myPieChart");
var myPieChart = new Chart(ctx, {
  type: 'pie',
  data: {
    labels: lab_pie,
    datasets: [{
      data: data_pie,
      backgroundColor: ['#007bff', '#dc3545'],
    }],
  },
});
