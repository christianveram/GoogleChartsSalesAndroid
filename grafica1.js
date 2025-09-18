// grafica1.js - Distribución de ratings por categoría + % CENTRADO dentro de las barras
function drawChart() {
  var queryString = encodeURIComponent('SELECT I, SUM(J), SUM(K), SUM(L), SUM(M), SUM(N) GROUP BY I');
  var queryUrl = 'https://docs.google.com/spreadsheets/d/1QS6MigyL_aoYZ3cVMldaiscHftT49OTl/gviz/tq?sheet=Hoja1&headers=1&tq=' + queryString;

  var query = new google.visualization.Query(queryUrl);
  query.send(handleQueryResponse);
}

function handleQueryResponse(response) {
  if (response.isError()) {
    document.getElementById('grafica1').innerHTML = '<div class="error">Error: ' + response.getMessage() + '</div>';
    return;
  }

  var dt = response.getDataTable();
  var data = new google.visualization.DataTable();
  data.addColumn('string', 'Categoría');
  data.addColumn('number', '5★');
  data.addColumn({type: 'string', role: 'annotation'});
  data.addColumn('number', '4★');
  data.addColumn({type: 'string', role: 'annotation'});
  data.addColumn('number', '3★');
  data.addColumn({type: 'string', role: 'annotation'});
  data.addColumn('number', '2★');
  data.addColumn({type: 'string', role: 'annotation'});
  data.addColumn('number', '1★');
  data.addColumn({type: 'string', role: 'annotation'});

  // Calcular porcentajes por categoría
  for (var i = 0; i < dt.getNumberOfRows(); i++) {
    var category = dt.getValue(i, 0);
    var r5 = parseFloat(dt.getValue(i, 1)) || 0;
    var r4 = parseFloat(dt.getValue(i, 2)) || 0;
    var r3 = parseFloat(dt.getValue(i, 3)) || 0;
    var r2 = parseFloat(dt.getValue(i, 4)) || 0;
    var r1 = parseFloat(dt.getValue(i, 5)) || 0;

    var total = r5 + r4 + r3 + r2 + r1;
    if (total === 0) continue;

    var p5 = (r5 / total) * 100;
    var p4 = (r4 / total) * 100;
    var p3 = (r3 / total) * 100;
    var p2 = (r2 / total) * 100;
    var p1 = (r1 / total) * 100;

    // Mostrar % solo si >= 5 para evitar saturación
    data.addRow([
      category,
      p5, (p5 >= 5 ? p5.toFixed(0) + '%' : ''),
      p4, (p4 >= 5 ? p4.toFixed(0) + '%' : ''),
      p3, (p3 >= 5 ? p3.toFixed(0) + '%' : ''),
      p2, (p2 >= 5 ? p2.toFixed(0) + '%' : ''),
      p1, (p1 >= 5 ? p1.toFixed(0) + '%' : '')
    ]);
  }

  // Ordenar por % de 5★ (descendente)
  var view = new google.visualization.DataView(data);
  view.setRows(view.getFilteredRows([{column: 1, sortOrder: 'descending'}]));

  var options = {
    title: 'Distribución de ratings por categoría (%)',
    titleTextStyle: { color: '#000', fontSize: 18, bold: true },
    width: '100%',
    height: 500,
    backgroundColor: window.DASHBOARD_CONFIG.CHART_BACKGROUND,
    chartArea: { left: 180, top: 70, width: '70%', height: '75%' },
    hAxis: {
      title: 'Porcentaje de ratings (%)',
      textStyle: { color: '#555' },
      titleTextStyle: { bold: true, color: '#000' },
      format: '#\'%\''
    },
    vAxis: {
      title: 'Categoría',
      textStyle: { color: '#555' },
      titleTextStyle: { bold: true, color: '#000' }
    },
    colors: ['#4CAF50', '#8BC34A', '#FFC107', '#FF9800', '#F44336'],
    isStacked: true,
    legend: { position: 'top', textStyle: { color: '#000', fontSize: 13 } },
    bar: { groupWidth: '70%' },
    annotations: {
      textStyle: {
        fontSize: 12,
        color: '#fff',
        bold: true,
        auraColor: 'transparent'
      },
      stem: {
        length: 0 // ✅ Clave: elimina el tallo para que el texto quede centrado dentro del segmento
      },
      alwaysOutside: false // ✅ Permite que se muestre dentro de la barra
    }
  };

  var chart = new google.visualization.BarChart(document.getElementById('grafica1'));
  chart.draw(view, options);
}