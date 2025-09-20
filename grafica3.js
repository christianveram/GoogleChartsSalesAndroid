// grafica3.js
let todosLosDatos = []; // Almacena todos los datos de ventas para un acceso rápido

// Cargamos el paquete de Google Charts y la función principal de carga
google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart3);

function drawChart3() {
    // Consulta para obtener todas las categorías y ventas por región
    var queryString = encodeURIComponent('SELECT I, P, Q, R WHERE I IS NOT NULL AND P IS NOT NULL');
    var queryUrl = 'https://docs.google.com/spreadsheets/d/1QS6MigyL_aoYZ3cVMldaiscHftT49OTl/gviz/tq?sheet=Hoja1&headers=1&tq=' + queryString;

    var query = new google.visualization.Query(queryUrl);
    query.send(handleResponse3);
}

function handleResponse3(response) {
    if (response.isError()) {
        document.getElementById('grafica3').innerHTML = '<div class="error">⚠️ Error: ' + response.getMessage() + '</div>';
        return;
    }

    var dt = response.getDataTable();
    todosLosDatos = [];

    for (var i = 0; i < dt.getNumberOfRows(); i++) {
        var categoria = dt.getValue(i, 0);
        var usSales = parseFloat(String(dt.getValue(i, 1)).replace(",", "")) || 0;
        var euSales = parseFloat(String(dt.getValue(i, 2)).replace(",", "")) || 0;
        var jpSales = parseFloat(String(dt.getValue(i, 3)).replace(",", "")) || 0;
        
        todosLosDatos.push({
            categoria,
            usSales,
            euSales,
            jpSales
        });
    }

    var categoriasUnicas = [...new Set(todosLosDatos.map(d => d.categoria))].sort();

    var select = document.getElementById('grafica3-categoria-select');
    // Aseguramos que el selector esté limpio antes de añadir opciones
    select.innerHTML = '<option value="all">-- Todas --</option>'; 
    categoriasUnicas.forEach(cat => {
        var option = document.createElement('option');
        option.value = cat;
        option.textContent = cat;
        select.appendChild(option);
    });

    select.onchange = function() {
        mostrarVentasPorCategoria(this.value);
    };

    // Dibuja la gráfica inicial con todos los datos
    mostrarVentasPorCategoria('all');
}

function mostrarVentasPorCategoria(categoria) {
    var container = document.getElementById('grafica3');
    var totalSalesUS = 0;
    var totalSalesEU = 0;
    var totalSalesJP = 0;

    if (categoria === 'all') {
        // Sumamos las ventas de todas las categorías
        todosLosDatos.forEach(dato => {
            totalSalesUS += dato.usSales;
            totalSalesEU += dato.euSales;
            totalSalesJP += dato.jpSales;
        });
    } else {
        // Filtramos por la categoría seleccionada y sumamos
        var datosFiltrados = todosLosDatos.filter(d => d.categoria === categoria);
        datosFiltrados.forEach(dato => {
            totalSalesUS += dato.usSales;
            totalSalesEU += dato.euSales;
            totalSalesJP += dato.jpSales;
        });
    }

    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Región');
    data.addColumn('number', 'Ventas (M)');

    data.addRows([
        ['US', totalSalesUS / 1e6],
        ['EU', totalSalesEU / 1e6],
        ['JP', totalSalesJP / 1e6]
    ]);

    var formatter = new google.visualization.NumberFormat({ suffix: 'M', fractionDigits: 0 });
    formatter.format(data, 1);

    var options = {
        pieHole: 0.5,
        slices: { 0: { color: '#34A853' }, 1: { color: '#3B82F6' }, 2: { color: '#F59E0B' } },
        backgroundColor: window.DASHBOARD_CONFIG.CHART_BACKGROUND, // Restaurado a tu variable original
        legend: { position: 'right', textStyle: { color: '#000000', fontSize: 14 } }, // Restaurado
        chartArea: { left: '10%', top: 40, width: '80%', height: '80%' },
        pieSliceText: 'value',
        pieSliceTextStyle: { fontSize: 12, color: '#fff' },
        tooltip: { text: 'both', textStyle: { fontSize: 12 } }
    };

    var chart = new google.visualization.PieChart(container);
    chart.draw(data, options);
}