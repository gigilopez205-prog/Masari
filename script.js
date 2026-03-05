let xp = 2500;
let precio = 800000;

function cambiarPagina(id) {
    // Cambiar Secciones
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    
    // Cambiar Botones
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    document.getElementById('btn-' + id).classList.add('active');
    
    if(id === 'juegos') setTimeout(() => miChart.update(), 100);
}

// GRÁFICA
const ctx = document.getElementById('graficaBolsa').getContext('2d');
let miChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ["","","","",""],
        datasets: [{
            data: [790000, 795000, 798000, 800000],
            borderColor: '#3b82f6',
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            fill: true, tension: 0.4
        }]
    },
    options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } }
});

// SIMULACIÓN
setInterval(() => {
    let cambio = Math.floor(Math.random() * 8000) - 4000;
    precio += cambio;
    let color = cambio > 0 ? "#10b981" : "#ef4444";
    
    const pBolsa = document.getElementById('p-bolsa');
    const pInicio = document.getElementById('p-inicio');
    
    if(pBolsa) { pBolsa.innerText = "$" + precio.toLocaleString(); pBolsa.style.color = color; }
    if(pInicio) { pInicio.innerText = "$" + precio.toLocaleString(); pInicio.style.color = color; }

    miChart.data.datasets[0].borderColor = color;
    miChart.data.datasets[0].data.push(precio);
    if(miChart.data.datasets[0].data.length > 15) miChart.data.datasets[0].data.shift();
    miChart.data.labels.push("");
    if(miChart.data.labels.length > 15) miChart.data.labels.shift();
    miChart.update('none');
}, 3000);

function actualizarXP(n) {
    xp += n;
    document.getElementById('xp-count').innerText = xp.toLocaleString();
    document.getElementById('xp-bar-fill').style.width = Math.min((xp/10000)*100, 100) + "%";
}

function comprarAccion() { actualizarXP(100); log("COMPRA", "#10b981"); }
function venderAccion() { actualizarXP(50); log("VENTA", "#ef4444"); }
function completarClase(c, n) { actualizarXP(n); alert("¡Clase completada!"); }

function log(tipo, color) {
    const list = document.getElementById('lista-tx');
    const item = `<p style="border-bottom: 1px solid #233554; padding: 5px 0;"><span style="color:${color}">● ${tipo}</span> a $${precio.toLocaleString()}</p>`;
    list.innerHTML = item + list.innerHTML;
}

function analizarGasto() {
    const m = document.getElementById('gasto-input').value;
    const res = document.getElementById('ia-resultado');
    res.innerText = m > 1000 ? "🤖 Gasto alto. ¡Mejor invierte!" : "🤖 Gasto ok. ¡Buen control!";
    res.style.color = m > 1000 ? "#ef4444" : "#10b981";
}
