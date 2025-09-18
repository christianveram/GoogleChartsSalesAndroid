// grafica5.js - TOP 10 por categoría + tooltip claro: "Descargas: X M"

let todosLosJuegos = []; // Almacena todos los juegos con categoría, rank y installs

function drawChart5() {
  var queryString = encodeURIComponent('SELECT I, A, B, D WHERE B IS NOT NULL AND I != "" AND D IS NOT NULL');
  var queryUrl = 'https://docs.google.com/spreadsheets/d/1QS6MigyL_aoYZ3cVMldaiscHftT49OTl/gviz/tq?sheet=Hoja1&headers=1&tq=' + queryString;

  var query = new google.visualization.Query(queryUrl);
  query.send(handleResponse5);
}

function handleResponse5(response) {
  if (response.isError()) {
    document.getElementById('grafica5').innerHTML = '<div class="error">⚠️ Error: ' + response.getMessage() + '</div>';
    return;
  }

  var dt = response.getDataTable();
  todosLosJuegos = [];

  for (var i = 0; i < dt.getNumberOfRows(); i++) {
    var category = dt.getValue(i, 0);
    var title = dt.getValue(i, 1);
    var rank = parseInt(dt.getValue(i, 2));
    var installs = parseInt(dt.getValue(i, 3)) || 0;

    if (category && !isNaN(rank)) {
      todosLosJuegos.push({ category, title, rank, installs });
    }
  }

  var categoriasUnicas = [...new Set(todosLosJuegos.map(j => j.category))].sort();

  var selectorContainer = document.getElementById('selector-categoria');
  if (!selectorContainer) {
    var container = document.getElementById('grafica5');
    selectorContainer = document.createElement('div');
    selectorContainer.id = 'selector-categoria';
    selectorContainer.style.margin = '15px 0';
    selectorContainer.style.textAlign = 'center';
    container.parentNode.insertBefore(selectorContainer, container);
  }

  var select = document.getElementById('categoria-select');
  if (!select) {
    select = document.createElement('select');
    select.id = 'categoria-select';
    select.style.padding = '8px';
    select.style.fontSize = '14px';
    select.style.borderRadius = '5px';
    select.style.border = '1px solid #ccc';
    select.style.backgroundColor = '#2d2d2d';
    select.style.color = 'white';

    var defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = '-- Selecciona una categoría --';
    select.appendChild(defaultOption);

    selectorContainer.innerHTML = '<label style="color:white; margin-right:10px;" for="categoria-select">Categoría: </label>';
    selectorContainer.appendChild(select);
  }

  select.innerHTML = '<option value="">-- Selecciona una categoría --</option>';
  categoriasUnicas.forEach(cat => {
    var option = document.createElement('option');
    option.value = cat;
    option.textContent = cat;
    select.appendChild(option);
  });

  select.onchange = function() {
    mostrarTop10PorCategoria(this.value);
  };

  if (categoriasUnicas.length > 0) {
    select.value = categoriasUnicas[0];
    select.dispatchEvent(new Event('change'));
  }
}

function formatInstalls(num) {
  if (num >= 1e9) {
    return (num / 1e9).toFixed(1).replace(/\.0$/, '') + 'B';
  } else if (num >= 1e6) {
    return (num / 1e6).toFixed(1).replace(/\.0$/, '') + 'M';
  } else if (num >= 1e3) {
    return (num / 1e3).toFixed(1).replace(/\.0$/, '') + 'K';
  } else {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
}

function mostrarTop10PorCategoria(categoria) {
  var container = document.getElementById('grafica5');
  if (!categoria) {
    container.innerHTML = '<div style="padding:40px; text-align:center; color:#aaa;">Selecciona una categoría para ver su Top 10.</div>';
    return;
  }

  var juegosFiltrados = todosLosJuegos
    .filter(j => j.category === categoria)
    .sort((a, b) => a.rank - b.rank)
    .slice(0, 10);

  if (juegosFiltrados.length === 0) {
    container.innerHTML = '<div class="error">No hay juegos en esta categoría.</div>';
    return;
  }

  var data = new google.visualization.DataTable();
  data.addColumn('string', 'Juego');
  data.addColumn('number', 'Ranking');
  data.addColumn({type: 'string', role: 'annotation'});
  data.addColumn({type: 'string', role: 'tooltip', 'p': {'html': true}});

  var maxRank = Math.max(...juegosFiltrados.map(j => j.rank)) + 10;
  juegosFiltrados.forEach(juego => {
    // ✅ ¡Aquí está el cambio clave!
    var tooltip = `
      <div style="padding:8px 12px; font-family:Arial; font-size:13px; background:#333; color:#f0f0f0; border-radius:4px; white-space:nowrap;">
        Descargas: ${formatInstalls(juego.installs)}
      </div>
    `;
    data.addRow([juego.title, maxRank - juego.rank, `#${juego.rank}`, tooltip]);
  });

  var options = {
    title: `Top 10 en "${categoria}"`,
    titleTextStyle: { color: '#000', fontSize: 16, bold: true },
    width: '100%',
    height: 500,
    backgroundColor: window.DASHBOARD_CONFIG.CHART_BACKGROUND,
    chartArea: { left: 200, top: 50, width: '65%', height: '80%' },
    hAxis: {
      textStyle: { color: '#555' },
      titleTextStyle: { bold: true, color: '#000' },
      gridlines: { color: '#eee' },
      textPosition: 'none'
    },
    vAxis: {
      title: 'Juego',
      textStyle: { color: '#555' },
      titleTextStyle: { bold: true, color: '#000' }
    },
    colors: ['#34A853'],
    bar: { groupWidth: '70%' },
    legend: { position: 'none' },
    annotations: {
      alwaysOutside: false,
      textStyle: {
        fontSize: 12,
        color: '#fff',
        bold: true,
        auraColor: 'transparent'
      }
    },
    tooltip: { isHtml: true }
  };

  var chart = new google.visualization.BarChart(container);
  chart.draw(data, options);
}