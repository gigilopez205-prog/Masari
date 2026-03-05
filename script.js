// --- ESTADO GLOBAL ---
let xp = 2500;
let precioActual = 800000;
let cantidadAcciones = 0;

// --- NAVEGACIÓN ---
function cambiarPagina(id) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    document.getElementById('btn-' + id).classList.add('active');
    if(id === 'juegos') setTimeout(() => miChart.update(), 100);
}

// --- SIMULADOR DE BOLSA ---
const ctx = document.getElementById('graficaBolsa').getContext('2d');
let miChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ["","","","","","","","","",""],
        datasets: [{
            data: [790000, 795000, 798000, 800000],
            borderColor: '#3b82f6',
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            fill: true,
            tension: 0.4
        }]
    },
    options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } }
});

setInterval(() => {
    let cambio = Math.floor(Math.random() * 10000) - 4500;
    precioActual += cambio;
    
    // Actualizar textos de precio
    const pBolsa = document.getElementById('p-bolsa');
    if(pBolsa) {
        pBolsa.innerText = "$" + precioActual.toLocaleString();
        pBolsa.style.color = cambio > 0 ? "#10b981" : "#ef4444";
    }
    
    actualizarVistaCartera();

    // Actualizar Gráfica
    miChart.data.datasets[0].data.push(precioActual);
    if(miChart.data.datasets[0].data.length > 15) miChart.data.datasets[0].data.shift();
    miChart.update('none');
}, 3000);

// --- COMPRA Y VENTA (CORREGIDO) ---
function comprarAccion() {
    cantidadAcciones += 1;
    actualizarXP(100);
    actualizarVistaCartera();
    desbloquearMedalla('med-lobo');
    console.log("Comprado: " + cantidadAcciones);
}

function venderAccion() {
    if(cantidadAcciones > 0) {
        let totalVenta = cantidadAcciones * precioActual;
        if(totalVenta > 1000000) desbloquearMedalla('med-rico');
        
        cantidadAcciones = 0;
        actualizarXP(50);
        actualizarVistaCartera();
        alert("¡Acciones vendidas con éxito!");
    } else {
        alert("No tienes acciones para vender.");
    }
}

function actualizarVistaCartera() {
    const valTotal = document.getElementById('balance-total');
    const unidades = document.getElementById('mis-acciones');
    
    if(valTotal && unidades) {
        valTotal.innerText = "$" + (cantidadAcciones * precioActual).toLocaleString();
        unidades.innerText = cantidadAcciones + " unidades";
    }
}

// --- ACADEMIA Y QUIZ ---
const bancoPreguntas = {
    interes: { q: "¿Qué hace el interés compuesto?", o: ["Crece sobre el capital + intereses", "Resta dinero", "Es un gasto"], a: 0 },
    ahorro: { q: "¿Cuándo se debe ahorrar?", o: ["Al final del mes", "Antes de gastar", "Nunca"], a: 1 }
};

function abrirQuiz(tema) {
    const data = bancoPreguntas[tema];
    const container = document.getElementById('quiz-container');
    container.style.display = 'block';
    document.getElementById('quiz-titulo').innerText = "Examen rápido";
    document.getElementById('quiz-pregunta').innerText = data.q;
    
    const opcionesDiv = document.getElementById('quiz-opciones');
    opcionesDiv.innerHTML = "";
    data.o.forEach((opcion, i) => {
        opcionesDiv.innerHTML += `<button class="btn-main" style="margin-bottom:5px" onclick="validarRespuesta(${i}, ${data.a})">${opcion}</button>`;
    });
    window.scrollTo(0,0);
}

function validarRespuesta(idx, correcta) {
    if(idx === correcta) {
        alert("¡Excelente! +500 XP");
        actualizarXP(500);
        desbloquearMedalla('med-genio');
    } else {
        alert("Respuesta incorrecta, vuelve a intentarlo.");
    }
    document.getElementById('quiz-container').style.display = 'none';
}

// --- XP Y MEDALLAS ---
function actualizarXP(puntos) {
    xp += puntos;
    document.getElementById('xp-count').innerText = xp.toLocaleString();
    document.getElementById('xp-bar-fill').style.width = Math.min((xp/10000)*100, 100) + "%";
}

function desbloquearMedalla(id) {
    const m = document.getElementById(id);
    if(m) m.classList.add('unlocked');
}
