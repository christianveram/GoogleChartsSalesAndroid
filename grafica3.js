// grafica3.js
function drawChart3() {
  var queryString = encodeURIComponent('SELECT SUM(P), SUM(Q), SUM(R)');
  var queryUrl = 'https://docs.google.com/spreadsheets/d/1QS6MigyL_aoYZ3cVMldaiscHftT49OTl/gviz/tq?sheet=Hoja1&headers=1&tq=' + queryString;

  var query = new google.visualization.Query(queryUrl);
  query.send(handleResponse3);
}

function handleResponse3(response) {
  if (response.isError()) {
    document.getElementById('grafica3').innerHTML = '<div class="error">Error: ' + response.getMessage() + '</div>';
    return;
  }

  var dataTable = response.getDataTable();
  var data = new google.visualization.DataTable();
  data.addColumn('string', 'Región');
  data.addColumn('number', 'Ventas (M)');

  data.addRows([
    ['US', parseFloat(String(dataTable.getValue(0, 0)).replace(",", "")) / 1e6],
    ['EU', parseFloat(String(dataTable.getValue(0, 1)).replace(",", "")) / 1e6],
    ['JP', parseFloat(String(dataTable.getValue(0, 2)).replace(",", "")) / 1e6]
  ]);

  var formatter = new google.visualization.NumberFormat({ suffix: 'M', fractionDigits: 0 });
  formatter.format(data, 1);

  var options = {
    title: 'Distribución de ventas globales por región',
    pieHole: 0.5,
    slices: { 0: { color: '#34A853' }, 1: { color: '#3B82F6' }, 2: { color: '#F59E0B' } },
    backgroundColor: window.DASHBOARD_CONFIG.CHART_BACKGROUND,
    legend: { position: 'right', textStyle: { color: '#000000', fontSize: 14 } },
    chartArea: { left: '10%', top: 50, width: '80%', height: '80%' },
    pieSliceText: 'value',
    pieSliceTextStyle: { fontSize: 12, color: '#fff' },
    tooltip: { text: 'both', textStyle: { fontSize: 12 } }
  };

  var chart = new google.visualization.PieChart(document.getElementById('grafica3'));
  chart.draw(data, options);
}