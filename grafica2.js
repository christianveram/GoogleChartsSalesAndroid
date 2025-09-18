// grafica2.js - Instalaciones por categoría + etiquetas FUERA, en negro, con formato 7.000M
function drawChart2() {
  var queryString = encodeURIComponent('SELECT I, SUM(D) GROUP BY I ORDER BY SUM(D) DESC');
  var queryUrl = 'https://docs.google.com/spreadsheets/d/1QS6MigyL_aoYZ3cVMldaiscHftT49OTl/gviz/tq?sheet=Hoja1&headers=1&tq=' + queryString;

  var query = new google.visualization.Query(queryUrl);
  query.send(handleQueryResponse2);
}

// ✅ Función para formatear números con separador de miles (punto)
function formatWithThousands(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function handleQueryResponse2(response) {
  if (response.isError()) {
    document.getElementById('grafica2').innerHTML = '<div class="error">Error: ' + response.getMessage() + '</div>';
    return;
  }

  var data = response.getDataTable();

  // Creamos un DataView con 3 columnas: categoría, valor (en M), y etiqueta
  var view = new google.visualization.DataView(data);
  view.setColumns([
    0, // Categoría
    {
      calc: function (dt, row) {
        return dt.getValue(row, 1) / 1e6; // Convertir a millones
      },
      type: "number",
      label: "Installs (M)"
    },
    {
      calc: function (dt, row) {
        var installs = dt.getValue(row, 1) / 1e6;
        var rounded = Math.round(installs); // Redondear
        var formatted = formatWithThousands(rounded); // Formato: 7.000
        return formatted + 'M'; // Ej: "7.000M"
      },
      type: "string",
      role: "annotation" // ✅ Etiqueta
    }
  ]);

  var options = {
    title: 'Número de instalaciones por categoría',
    width: 900,
    height: 600,
    titleTextStyle: { color: '#000000', fontSize: 20, bold: true },
    hAxis: { 
      title: 'Installs (en millones)',
      minValue: 0,
      textStyle: { color: '#555' },
      titleTextStyle: { bold: true, color: '#000000' },
      format: '#,##0\'M\'' // ✅ También formatea el eje con separador (si Google Charts lo permite)
    },
    vAxis: { 
      title: 'Categoría',
      textStyle: { color: '#555' },
      titleTextStyle: { bold: true, color: '#000000' }
    },
    legend: { position: 'none' },
    colors: ['#34A853'],
    bar: { groupWidth: '60%' },
    backgroundColor: window.DASHBOARD_CONFIG.CHART_BACKGROUND,
    chartArea: { left: 180, top: 70, width: '65%', height: '75%' },
    annotations: {
      textStyle: {
        fontSize: 13,
        color: '#000',        // ✅ Texto en negro
        bold: true,
        auraColor: 'none'
      },
      stem: {
        length: 0             // ✅ Sin tallo
      },
      alwaysOutside: true     // ✅ Siempre fuera de la barra
    }
  };

  var chart = new google.visualization.BarChart(document.getElementById('grafica2'));
  chart.draw(view, options);
}