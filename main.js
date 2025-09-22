// main.js
// Configuración global para todos los gráficos
window.DASHBOARD_CONFIG = {
  CHART_BACKGROUND: '#f0f0f0',
  FONT_FAMILY: 'Arial, sans-serif'
};

// Cargar Google Charts y registrar todos los callbacks
google.charts.load('current', { packages: ['corechart'] });

google.charts.setOnLoadCallback(function() {
  // Llama a todas las funciones de gráficos
  if (typeof drawChart === 'function') drawChart();
  if (typeof drawChart2 === 'function') drawChart2();
  if (typeof drawChart3 === 'function') drawChart3();
  if (typeof drawChart4 === 'function') drawChart4();
  if (typeof drawChart5 === 'function') drawChart5();
  if (typeof drawChart6 === 'function') drawChart6();
});



