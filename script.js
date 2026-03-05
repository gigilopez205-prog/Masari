let puntosXP = 2500;
let precioActual = 800000;
let historialPrecios = [790000, 795000, 798000, 800000]; // Precios iniciales
let etiquetas = ["10:00", "10:05", "10:10", "10:15"]; // Horas iniciales

// CONFIGURACIÓN DE LA GRÁFICA
const ctx = document.getElementById('graficaBolsa').getContext('2d');
const miGrafica = new Chart(ctx, {
    type: 'line',
    data: {
        labels: etiquetas,
        datasets: [{
            label: 'Precio $MAS',
            data: historialPrecios,
            borderColor: '#3b82f6',
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            borderWidth: 3,
            fill: true,
            tension: 0.4,
            pointRadius: 0
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
            x: { display: false },
            y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#94a3b8' } }
        }
    }
});

function actualizarXP(cantidad) {
    puntosXP += cantidad;
    document.getElementById('xp-count').innerText = puntosXP.toLocaleString();
    let porcentaje = Math.min((puntosXP / 10000) * 100, 100);
    document.getElementById('xp-bar-inner').style.width = porcentaje + "%";
}

function comprarAccion() {
    actualizarXP(100);
    registrarHistorial("COMPRA", "#10b981");
}

function venderAccion() {
    actualizarXP(50);
    registrarHistorial("VENTA", "#ef4444");
    alert("Venta realizada.");
}

function registrarHistorial(tipo, color) {
    const historial = document.getElementById('lista-transacciones');
    const pLabel = document.getElementById('precio-bolsa').innerText;
    const ahora = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    const item = `<p style="border-bottom: 1px solid #233554; padding: 5px 0;">
        <span style="color: ${color};">●</span> ${tipo}: $MAS a ${pLabel} <small style="float:right;">${ahora}</small>
    </p>`;
    if (historial.innerHTML.includes("No hay movimientos")) historial.innerHTML = item;
    else historial.innerHTML = item + historial.innerHTML;
}

function completarClase(nombre, recompensa) {
    actualizarXP(recompensa);
    alert("¡Felicidades! +" + recompensa + " XP");
}

// SIMULADOR EN VIVO (ACTUALIZA PRECIO Y GRÁFICA)
setInterval(() => {
    let cambio = Math.floor(Math.random() * 8000) - 3500;
    precioActual += cambio;
    
    // Actualizar Texto
    const pDoc = document.getElementById('precio-bolsa');
    const tDoc = document.getElementById('trend-label');
    pDoc.innerText = "$" + precioActual.toLocaleString();
    
    if(cambio > 0) {
        pDoc.style.color = "#10b981";
        tDoc.innerText = "▲ Subiendo";
        tDoc.style.color = "#10b981";
        miGrafica.data.datasets[0].borderColor = "#10b981"; // Cambia gráfica a verde
    } else {
        pDoc.style.color = "#ef4444";
        tDoc.innerText = "▼ Bajando";
        tDoc.style.color = "#ef4444";
        miGrafica.data.datasets[0].borderColor = "#ef4444"; // Cambia gráfica a rojo
    }

    // Actualizar Gráfica
    miGrafica.data.labels.push(new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', second:'2-digit'}));
    miGrafica.data.datasets[0].data.push(precioActual);
    
    // Mantener solo los últimos 15 puntos para que no se amontone
    if(miGrafica.data.labels.length > 15) {
        miGrafica.data.labels.shift();
        miGrafica.data.datasets[0].data.shift();
    }
    
    miGrafica.update();
}, 3000);
