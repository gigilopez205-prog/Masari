let puntosXP = 2500;
let precioActual = 800000;
let datosPrecios = [795000, 798000, 800000];
let etiquetas = ["T-2", "T-1", "T-0"];

// 1. INICIALIZAR GRÁFICA
const ctx = document.getElementById('graficaBolsa').getContext('2d');
let colorGrafica = '#3b82f6'; 

const miGrafica = new Chart(ctx, {
    type: 'line',
    data: {
        labels: etiquetas,
        datasets: [{
            data: datosPrecios,
            borderColor: colorGrafica,
            backgroundColor: 'rgba(59, 130, 246, 0.05)',
            borderWidth: 3,
            fill: true,
            tension: 0.4,
            pointRadius: 2
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

// 2. FUNCIONES DE XP
function actualizarXP(cantidad) {
    puntosXP += cantidad;
    document.getElementById('xp-count').innerText = puntosXP.toLocaleString();
    let porcentaje = Math.min((puntosXP / 10000) * 100, 100);
    document.getElementById('xp-bar-inner').style.width = porcentaje + "%";
}

// 3. COMPRAR Y VENDER
function comprarAccion() {
    actualizarXP(100);
    registrarHistorial("COMPRA", "#10b981");
}

function venderAccion() {
    actualizarXP(50);
    registrarHistorial("VENTA", "#ef4444");
}

function registrarHistorial(tipo, color) {
    const historial = document.getElementById('lista-transacciones');
    const pLabel = document.getElementById('precio-bolsa').innerText;
    const ahora = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    const item = `<p style="border-bottom: 1px solid rgba(255,255,255,0.05); padding: 8px 0; margin:0;">
        <span style="color: ${color}; font-weight:bold;">● ${tipo}</span> $MAS a ${pLabel} <small style="float:right; color:#64748b;">${ahora}</small>
    </p>`;
    if (historial.innerHTML.includes("No hay actividad")) historial.innerHTML = item;
    else historial.innerHTML = item + historial.innerHTML;
}

// 4. ACADEMIA E IA
function completarClase(nombre, recompensa) {
    actualizarXP(recompensa);
    alert("¡Clase completada! Ganaste " + recompensa + " XP");
}

function analizarGasto() {
    const monto = document.getElementById('gasto-input').value;
    const res = document.getElementById('ia-resultado');
    if (monto > 1000) {
        res.innerHTML = "<span style='color:#ef4444;'>🤖 Gasto alto. Considera invertirlo.</span>";
    } else {
        res.innerHTML = "<span style='color:#10b981;'>🤖 Gasto sano. +10 XP</span>";
        actualizarXP(10);
    }
}

// 5. BUCLE DEL MERCADO (CAMBIO DE COLOR AQUÍ)
setInterval(() => {
    let cambio = Math.floor(Math.random() * 10000) - 4500;
    precioActual += cambio;
    
    const pDoc = document.getElementById('precio-bolsa');
    const tDoc = document.getElementById('trend-label');
    
    pDoc.innerText = "$" + precioActual.toLocaleString();
    
    // Cambiar colores según mercado
    if(cambio > 0) {
        colorGrafica = '#10b981'; // Verde
        pDoc.style.color = "#10b981";
        tDoc.innerText = "▲ SUBIENDO";
        tDoc.style.color = "#10b981";
    } else {
        colorGrafica = '#ef4444'; // Rojo
        pDoc.style.color = "#ef4444";
        tDoc.innerText = "▼ BAJANDO";
        tDoc.style.color = "#ef4444";
    }

    // Actualizar Gráfica
    miGrafica.data.datasets[0].borderColor = colorGrafica;
    miGrafica.data.datasets[0].backgroundColor = colorGrafica + '1A'; // 1A es transparencia
    miGrafica.data.labels.push("");
    miGrafica.data.datasets[0].data.push(precioActual);
    
    if(miGrafica.data.labels.length > 20) {
        miGrafica.data.labels.shift();
        miGrafica.data.datasets[0].data.shift();
    }
    
    miGrafica.update('none'); // Update suave
}, 3000);
