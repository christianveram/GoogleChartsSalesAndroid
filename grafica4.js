// grafica4.js - OPCIÓN 1: ÁREA APILADA
function drawChart4() {
  var queryString = encodeURIComponent('SELECT I, SUM(P), SUM(Q), SUM(R) GROUP BY I');
  var queryUrl = 'https://docs.google.com/spreadsheets/d/1QS6MigyL_aoYZ3cVMldaiscHftT49OTl/gviz/tq?sheet=Hoja1&headers=1&tq=' + queryString;

  var query = new google.visualization.Query(queryUrl);
  query.send(handleResponse4);
}

function handleResponse4(response) {
  if (response.isError()) {
    document.getElementById('grafica4').innerHTML = '<div class="error">Error: ' + response.getMessage() + '</div>';
    return;
  }

  var dt = response.getDataTable();
  var data = new google.visualization.DataTable();
  data.addColumn('string', 'Categoría');
  data.addColumn('number', 'US Sales (M)');
  data.addColumn('number', 'EU Sales (M)');
  data.addColumn('number', 'JP Sales (M)');

  var rows = [];
  for (var i = 0; i < dt.getNumberOfRows(); i++) {
    var us = parseFloat(String(dt.getValue(i, 1)).replace(",", "")) / 1e6;
    var eu = parseFloat(String(dt.getValue(i, 2)).replace(",", "")) / 1e6;
    var jp = parseFloat(String(dt.getValue(i, 3)).replace(",", "")) / 1e6;
    rows.push({ categoria: dt.getValue(i, 0), us: us, eu: eu, jp: jp });
  }

  // Ordenar por US 
  rows.sort((a, b) => b.us - a.us);

  for (var i = 0; i < rows.length; i++) {
    data.addRow([rows[i].categoria, rows[i].us, rows[i].eu, rows[i].jp]);
  }

  var formatter = new google.visualization.NumberFormat({ suffix: 'M', fractionDigits: 0 });
  formatter.format(data, 1);
  formatter.format(data, 2);
  formatter.format(data, 3);

  var options = {
    titleTextStyle: { color: '#000', fontSize: 18, bold: true },
    width: 900,
    height: 600,
    backgroundColor: window.DASHBOARD_CONFIG.CHART_BACKGROUND,
    chartArea: { left: 100, top: 40, width: '80%', height: '70%' },
    hAxis: {
      title: 'Categoría',
      textStyle: { color: '#555' },
      titleTextStyle: { bold: true, color: '#000' },
      slantedTextAngle: 45
    },
    vAxis: {
      title: 'Ventas (en millones)',
      minValue: 0,
      textStyle: { color: '#555' },
      titleTextStyle: { bold: true, color: '#000' }
    },
    colors: ['#34A853', '#3B82F6', '#F59E0B'],
    legend: { position: 'top', textStyle: { color: '#000', fontSize: 14 } },
    isStacked: true, // 
    pointSize: 6,
    lineWidth: 3
  };

  var chart = new google.visualization.AreaChart(document.getElementById('grafica4'));
  chart.draw(data, options);
}