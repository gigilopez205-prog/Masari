let puntosXP = 2500;
let precioActual = 800000;

// NAVEGACIÓN ENTRE SECCIONES
function cambiarPagina(id) {
    document.querySelectorAll('section').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('nav a').forEach(l => l.classList.remove('active'));
    
    document.getElementById(id).classList.add('active');
    document.getElementById('link-' + id).classList.add('active');
    
    if(id === 'juegos') {
        setTimeout(() => miGrafica.update(), 100);
    }
}

// LÓGICA DE PUNTOS
function actualizarXP(n) {
    puntosXP += n;
    document.getElementById('xp-count').innerText = puntosXP.toLocaleString();
    document.getElementById('xp-bar-inner').style.width = Math.min((puntosXP/10000)*100, 100) + "%";
}

// GRÁFICA DE BOLSA
const ctx = document.getElementById('graficaBolsa').getContext('2d');
let miGrafica = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ["T-3", "T-2", "T-1", "T-0"],
        datasets: [{
            data: [790000, 795000, 798000, 800000],
            borderColor: '#3b82f6',
            backgroundColor: 'rgba(59, 130, 246, 0.05)',
            fill: true,
            tension: 0.4,
            pointRadius: 2
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: { x: { display: false }, y: { ticks: { color: '#94a3b8' } } }
    }
});

// SIMULADOR DE MERCADO
setInterval(() => {
    let cambio = Math.floor(Math.random() * 10000) - 5000;
    precioActual += cambio;
    const pLabel = document.getElementById('precio-bolsa');
    const tLabel = document.getElementById('trend-label');
    
    let color = cambio > 0 ? "#10b981" : "#ef4444";
    pLabel.innerText = "$" + precioActual.toLocaleString();
    pLabel.style.color = color;
    tLabel.innerText = cambio > 0 ? "▲ SUBIENDO" : "▼ BAJANDO";
    tLabel.style.color = color;

    miGrafica.data.datasets[0].borderColor = color;
    miGrafica.data.datasets[0].data.push(precioActual);
    if(miGrafica.data.datasets[0].data.length > 15) miGrafica.data.datasets[0].data.shift();
    miGrafica.data.labels.push("");
    if(miGrafica.data.labels.length > 15) miGrafica.data.labels.shift();
    miGrafica.update('none');
}, 3000);

// ACCIONES DE BOTONES
function comprarAccion() {
    actualizarXP(100);
    registrarHistorial("COMPRA", "#10b981");
}

function venderAccion() {
    actualizarXP(50);
    registrarHistorial("VENTA", "#ef4444");
}

function completarClase(clase, xp) {
    actualizarXP(xp);
    alert(`¡Has aprendido sobre ${clase}! +${xp} XP`);
}

function registrarHistorial(tipo, color) {
    const list = document.getElementById('lista-transacciones');
    const precio = document.getElementById('precio-bolsa').innerText;
    const item = `<p style="border-bottom: 1px solid #233554; padding: 8px 0;">
        <span style="color:${color}">● ${tipo}</span> a ${precio}
    </p>`;
    if(list.innerHTML.includes("Sin actividad")) list.innerHTML = item;
    else list.innerHTML = item + list.innerHTML;
}

function analizarGasto() {
    const m = document.getElementById('gasto-input').value;
    const res = document.getElementById('ia-resultado');
    if(m > 2000) {
        res.innerHTML = "🤖 <span style='color:#ef4444'>Gasto excesivo. Inviértelo en $MAS.</span>";
    } else {
        res.innerHTML = "🤖 <span style='color:#10b981'>Buen control. ¡Has ganado +10 XP!</span>";
        actualizarXP(10);
    }
}
