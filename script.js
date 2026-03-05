// --- VARIABLES ---
let xp = 2500;
let precioActual = 800000;
let cantidadAcciones = 0;

// --- NAVEGACIÓN ---
function cambiarPagina(id) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    document.getElementById('btn-' + id).classList.add('active');
    if(id === 'juegos') setTimeout(() => miChart.update(), 150);
}

// --- GRÁFICA ---
const ctx = document.getElementById('graficaBolsa').getContext('2d');
let miChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ["","","","","","","","","",""],
        datasets: [{ data: [790000, 795000, 798000, 800000], borderColor: '#3b82f6', fill: true, tension: 0.4 }]
    },
    options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } }
});

// --- SIMULACIÓN DE PRECIO ---
setInterval(() => {
    let cambio = Math.floor(Math.random() * 12000) - 5500;
    precioActual += cambio;
    const pBolsa = document.getElementById('p-bolsa');
    if(pBolsa) {
        pBolsa.innerText = "$" + precioActual.toLocaleString();
        pBolsa.style.color = cambio > 0 ? "#10b981" : "#ef4444";
    }
    actualizarVista();
    miChart.data.datasets[0].data.push(precioActual);
    if(miChart.data.datasets[0].data.length > 15) miChart.data.datasets[0].data.shift();
    miChart.update('none');
}, 3000);

// --- COMPRA / VENTA ---
function comprarAccion() {
    cantidadAcciones++;
    registrarLog("COMPRA", "#10b981");
    actualizarXP(100);
    desbloquearMedalla('med-lobo');
    actualizarVista();
}

function venderAccion() {
    if(cantidadAcciones > 0) {
        registrarLog("VENTA", "#ef4444");
        if(cantidadAcciones * precioActual > 1000000) desbloquearMedalla('med-rico');
        cantidadAcciones = 0;
        actualizarXP(50);
        actualizarVista();
    }
}

function registrarLog(tipo, color) {
    const hist = document.getElementById('historial-bolsa');
    const h = new Date().getHours() + ":" + new Date().getMinutes().toString().padStart(2, '0');
    const linea = `<div style="padding:8px; border-bottom:1px solid #233554; display:flex; justify-content:space-between">
        <b style="color:${color}">${tipo}</b> <span>$${precioActual.toLocaleString()}</span> <small>${h}</small>
    </div>`;
    if(hist.innerHTML.includes("Esperando")) hist.innerHTML = linea;
    else hist.innerHTML = linea + hist.innerHTML;
}

function actualizarVista() {
    const bal = document.getElementById('balance-total');
    const acc = document.getElementById('mis-acciones');
    if(bal) bal.innerText = "$" + (cantidadAcciones * precioActual).toLocaleString();
    if(acc) acc.innerText = cantidadAcciones + " unidades";
}

// --- ACADEMIA ---
const preguntas = {
    inflacion: { q: "¿Qué es la inflación?", o: ["Subida de precios", "Regalo del banco", "Bajada de impuestos"], a: 0, e: "La inflación reduce lo que puedes comprar con tu dinero." },
    etfs: { q: "¿Qué es un ETF?", o: ["Una moneda", "Un paquete de acciones", "Una sola empresa"], a: 1, e: "Es como una cesta que contiene trozos de muchas empresas para reducir riesgo." },
    cripto: { q: "¿Cuántos Bitcoins habrá?", o: ["Infinitos", "21 Millones", "1 Billón"], a: 1, e: "Su escasez es lo que le da valor, como el oro digital." },
    interes: { q: "¿El interés compuesto es...?", o: ["Interés sobre interés", "Un gasto extra", "Solo para ricos"], a: 0, e: "Es reinvertir tus ganancias para que generen más ganancias por sí solas." }
};

function abrirQuiz(tema) {
    const d = preguntas[tema];
    document.getElementById('quiz-container').style.display = 'block';
    document.getElementById('quiz-feedback').style.display = 'none';
    document.getElementById('quiz-titulo').innerText = "Examen de " + tema.toUpperCase();
    document.getElementById('quiz-pregunta').innerText = d.q;
    const opc = document.getElementById('quiz-opciones');
    opc.innerHTML = "";
    d.o.forEach((o, i) => {
        opc.innerHTML += `<button class="btn-main" onclick="verificar('${tema}', ${i})">${o}</button>`;
    });
}

function verificar(tema, idx) {
    const d = preguntas[tema];
    const feed = document.getElementById('quiz-feedback');
    const txt = document.getElementById('feedback-texto');
    feed.style.display = "block";
    if(idx === d.a) {
        txt.innerHTML = `<b style="color:#10b981">¡CORRECTO!</b><br>${d.e}`;
        actualizarXP(500);
        desbloquearMedalla('med-genio');
    } else {
        txt.innerHTML = `<b style="color:#ef4444">INCORRECTO</b><br>La correcta era: ${d.o[d.a]}. <br>${d.e}`;
    }
}

function cerrarQuiz() { document.getElementById('quiz-container').style.display = 'none'; }
function actualizarXP(p) { xp += p; document.getElementById('xp-count').innerText = xp.toLocaleString(); document.getElementById('xp-bar-fill').style.width = Math.min((xp/10000)*100, 100) + "%"; }
function desbloquearMedalla(id) { const m = document.getElementById(id); if(m) m.classList.add('unlocked'); }
