// menu.js
document.addEventListener('DOMContentLoaded', () => {
    const menuItems = document.querySelectorAll('.menu-item');
    
    // Función para redibujar una gráfica específica
    // Asegúrate de que tus funciones de dibujo de gráficas (drawChart1, drawChart2, etc.)
    // estén disponibles globalmente o sean accesibles desde aquí.
    const redrawChart = (chartId) => {
        switch(chartId) {
            case 'grafica1':
                if (typeof drawChart1 === 'function') drawChart1();
                break;
            case 'grafica2':
                if (typeof drawChart2 === 'function') drawChart2();
                break;
            case 'grafica3':
                if (typeof drawChart3 === 'function') drawChart3();
                break;
            case 'grafica4':
                if (typeof drawChart4 === 'function') drawChart4();
                break;
            case 'grafica5':
                if (typeof drawChart5 === 'function') drawChart5();
                break;
            case 'grafica6':
                if (typeof drawChart6 === 'function') drawChart6();
                break;
            default:
                break;
        }
    };

    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            // Elimina la clase 'active' de todos los botones
            menuItems.forEach(btn => btn.classList.remove('active'));
            
            // Oculta todos los contenedores de gráficas
            document.querySelectorAll('.grafica-card').forEach(container => {
                container.style.display = 'none';
            });

            // Agrega la clase 'active' al botón clickeado
            item.classList.add('active');

            // Muestra solo el contenedor de la gráfica seleccionada
            const targetId = item.getAttribute('data-target'); // e.g., "grafica1"
            const targetContainer = document.getElementById(`${targetId}-container`); // e.g., "grafica1-container"
            if (targetContainer) {
                targetContainer.style.display = 'block';
                // Redibuja la gráfica cuando su contenedor se hace visible
                redrawChart(targetId);
            }
        });
    });

    // Asegúrate de dibujar la primera gráfica al cargar la página
    // Esto es importante porque inicialmente solo el primer contenedor está visible
    redrawChart('grafica1'); 
});