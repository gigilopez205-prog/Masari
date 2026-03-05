// ==========================================
// 1. VARIABLES GLOBALES Y ESTADO INICIAL
// ==========================================
let puntosXP = 2500;
let precioActual = 800000;
let historialPrecios = [790000, 795000, 798000, 800000];
let etiquetas = ["T-3", "T-2", "T-1", "Actual"];

// ==========================================
// 2. SISTEMA DE NAVEGACIÓN (PÁGINAS)
// ==========================================
function cambiarPagina(idSeccion) {
    // Ocultar todas las secciones
    const secciones = document.querySelectorAll('main section');
    secciones.forEach(s => s.classList.remove('active'));

    // Quitar estado activo de los links del menú
    const links = document.querySelectorAll('nav a');
    links.forEach(l => l.classList.remove('active'));

    // Mostrar la sección seleccionada
    const seccionActiva = document.getElementById(idSeccion);
    if (seccionActiva) {
        seccionActiva.classList.add('active');
    }

    // Marcar como activo el link clickeado
    const linkActivo = document.getElementById('link-' + idSeccion);
    if (linkActivo) {
        linkActivo.classList.add('active');
    }
}

// ==========================================
// 3. LÓGICA DE PUNTOS XP
// ==========================================
function actualizarXP(cantidad) {
    puntosXP += cantidad;
    const xpDisplay = document.getElementById('xp-count');
    const xpBar = document.getElementById('xp-bar-inner');
    
    if(xpDisplay) xpDisplay.innerText = puntosXP.toLocaleString();
    if(xpBar) {
        // La barra se llena llegando a los 10,000 XP
        let porcentaje = Math.min((puntosXP / 10000) * 100, 100);
        xpBar.style.width = porcentaje + "%";
    }
}

// ==========================================
// 4. SIMULADOR DE BOLSA Y GRÁFICA
// ==========================================
const ctx = document.getElementById('graficaBolsa').getContext('2d');
let miGrafica = new Chart(ctx, {
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

function comprarAccion() {
    actualizarXP(100);
    registrarHistorial("COMPRA", "#10b981");
}

function venderAccion() {
    actualizarXP(50);
    registrarHistorial("VENTA", "#ef4444");
    alert("¡Venta exitosa! Has asegurado tus ganancias.");
}

function registrarHistorial(tipo, color) {
    const historial = document.getElementById('lista-transacciones');
    const pLabel = document.getElementById('precio-bolsa').innerText;
    const ahora = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    
    const item = `
        <p style="border-bottom: 1px solid #233554; padding: 10px 0; display: flex; justify-content: space-between;">
            <span><strong style="color: ${color}">${tipo}:</strong> $MAS a ${pLabel}</span>
            <small style="color: #64748b">${ahora}</small>
        </p>`;
    
    if (historial.innerHTML.includes("No hay actividad")) {
        historial.innerHTML = item;
    } else {
        historial.innerHTML = item + historial.innerHTML;
    }
}

// Actualización automática del mercado
setInterval(() => {
    let cambio = Math.floor(Math.random() * 12000) - 5000;
    precioActual += cambio;
    
    const pDoc = document.getElementById('precio-bolsa');
    const tDoc = document.getElementById('trend-label');
    
    if(pDoc) {
        pDoc.innerText = "$" + precioActual.toLocaleString();
        
        let colorMercado = cambio > 0 ? "#10b981" : "#ef4444";
        pDoc.style.color = colorMercado;
        tDoc.innerText = cambio > 0 ? "▲ SUBIENDO" : "▼ BAJANDO";
        tDoc.style.color = colorMercado;

        // Actualizar color de la gráfica
        miGrafica.data.datasets[0].borderColor = colorMercado;
        miGrafica.data.datasets[0].backgroundColor = colorMercado + "1A"; // Transparencia
    }

    // Añadir nuevo punto a la gráfica
    miGrafica.data.labels.push("");
    miGrafica.data.datasets[0].data.push(precioActual);
    
    if(miGrafica.data.labels.length > 15) {
        miGrafica.data.labels.shift();
        miGrafica.data.datasets[0].data.shift();
    }
    miGrafica.update('none');
}, 3000);

// ==========================================
// 5. ACADEMIA E IA
// ==========================================
function completarClase(nombre, recompensa) {
    actualizarXP(recompensa);
    registrarHistorial("LOGRO", "#facc15");
    alert(`🎉 ¡Felicidades! Has completado la clase de ${nombre} y ganaste ${recompensa} XP.`);
}

function analizarGasto() {
    const monto = document.getElementById('gasto-input').value;
    const res = document.getElementById('ia-resultado');
    
    if (!monto) {
        res.innerText = "🤖 Introduce un monto para analizar.";
        res.style.color = "#94a3b8";
        return;
    }

    if (monto > 1500) {
        res.innerText = "🤖 IA: ¡Gasto peligroso! Eso equivale a muchas acciones de $MAS. Intenta ahorrarlo.";
        res.style.color = "#ef4444";
    } else {
        res.innerText = "🤖 IA: Gasto bajo control. Mantener este hábito te llevará a la libertad financiera.";
        res.style.color = "#10b981";
        actualizarXP(15);
    }
}
