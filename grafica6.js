// grafica6.js - User Rating vs Critic Rating por Categoría
function drawChart6() {
  var queryString = encodeURIComponent('SELECT I, AVG(T), AVG(U) GROUP BY I ORDER BY AVG(T) DESC');
  var queryUrl = 'https://docs.google.com/spreadsheets/d/1QS6MigyL_aoYZ3cVMldaiscHftT49OTl/gviz/tq?sheet=Hoja1&headers=1&tq=' + queryString;

  var query = new google.visualization.Query(queryUrl);
  query.send(handleResponse6);
}

function handleResponse6(response) {
  if (response.isError()) {
    document.getElementById('grafica6').innerHTML = '<div class="error">Error: ' + response.getMessage() + '</div>';
    return;
  }

  var dt = response.getDataTable();
  var data = new google.visualization.DataTable();
  data.addColumn('string', 'Categoría');
  data.addColumn('number', 'User Rating (promedio)');
  data.addColumn('number', 'Critic Rating (promedio)');

  // Agregar filas
  for (var i = 0; i < dt.getNumberOfRows(); i++) {
    var category = dt.getValue(i, 0);
    var userRating = parseFloat(dt.getValue(i, 1));
    var criticRating = parseFloat(dt.getValue(i, 2));
    data.addRow([category, userRating, criticRating]);
  }

  // Formatear a 2 decimales
  var formatter = new google.visualization.NumberFormat({ decimalSymbol: '.', fractionDigits: 2 });
  formatter.format(data, 1);
  formatter.format(data, 2);

  var options = {
    titleTextStyle: { color: '#000', fontSize: 18, bold: true },
    width: 900,
    height: 600,
    backgroundColor: window.DASHBOARD_CONFIG.CHART_BACKGROUND,
    chartArea: { left: 180, top: 50, width: '70%', height: '75%' },
    hAxis: {
      title: 'Rating Promedio (1-5)',
      minValue: 0,
      maxValue: 5,
      textStyle: { color: '#555' },
      titleTextStyle: { bold: true, color: '#000' }
    },
    vAxis: {
      title: 'Categoría',
      textStyle: { color: '#555' },
      titleTextStyle: { bold: true, color: '#000' }
    },
    colors: ['#3B82F6', '#F59E0B'], // Azul = Usuarios, Naranja = Críticos
    legend: { position: 'top', textStyle: { color: '#000', fontSize: 14 } },
    bar: { groupWidth: '70%' },
    annotations: {
      textStyle: { fontSize: 12, bold: true, color: '#000' }
    }
  };

  var chart = new google.visualization.BarChart(document.getElementById('grafica6'));
  chart.draw(data, options);
}