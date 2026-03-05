// VARIABLES DE ESTADO
let xp = 2500;
let precio = 800000;
let misAcciones = 0;
let precioCompraPromedio = 0;

// 1. NAVEGACIÓN
function cambiarPagina(id) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    document.getElementById('btn-' + id).classList.add('active');
    if(id === 'juegos') setTimeout(() => miChart.update(), 100);
}

// 2. LÓGICA DE BOLSA Y CARTERA
const ctx = document.getElementById('graficaBolsa').getContext('2d');
let miChart = new Chart(ctx, {
    type: 'line',
    data: { labels: ["","","","",""], datasets: [{ data: [790000, 795000, 798000, 800000], borderColor: '#3b82f6', fill: true, tension: 0.4 }] },
    options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } }
});

setInterval(() => {
    let cambio = Math.floor(Math.random() * 10000) - 5000;
    precio += cambio;
    document.getElementById('p-bolsa').innerText = "$" + precio.toLocaleString();
    actualizarCartera();
    
    // Actualizar gráfica
    miChart.data.datasets[0].borderColor = cambio > 0 ? "#10b981" : "#ef4444";
    miChart.data.datasets[0].data.push(precio);
    if(miChart.data.datasets[0].data.length > 15) miChart.data.datasets[0].data.shift();
    miChart.update('none');
}, 3000);

function comprarAccion() {
    misAcciones++;
    precioCompraPromedio = precio; 
    actualizarXP(100);
    desbloquearMedalla('med-lobo');
    actualizarCartera();
}

function venderAccion() {
    if(misAcciones > 0) {
        let ganancia = (precio - precioCompraPromedio) * misAcciones;
        if(ganancia > 100000) desbloquearMedalla('med-rico');
        misAcciones = 0;
        actualizarXP(50);
        actualizarCartera();
        alert("Venta realizada");
    }
}

function actualizarCartera() {
    const balance = document.getElementById('balance-total');
    const unidades = document.getElementById('mis-acciones');
    if(balance) {
        let valorActual = misAcciones * precio;
        balance.innerText = "$" + valorActual.toLocaleString();
        unidades.innerText = misAcciones + " unidades";
    }
}

// 3. SISTEMA DE QUIZ
const preguntas = {
    interes: { q: "¿Qué hace el interés compuesto?", o: ["Crece dinero sobre dinero", "Resta dinero", "No hace nada"], a: 0 },
    ahorro: { q: "¿Cuál es la regla del ahorro?", o: ["Gastar todo", "Ahorrar antes de gastar", "Pedir prestado"], a: 1 }
};

function abrirQuiz(tema) {
    const q = preguntas[tema];
    document.getElementById('quiz-container').style.display = 'block';
    document.getElementById('quiz-titulo').innerText = "Examen: " + tema;
    document.getElementById('quiz-pregunta').innerText = q.q;
    const divOpciones = document.getElementById('quiz-opciones');
    divOpciones.innerHTML = "";
    q.o.forEach((opt, i) => {
        divOpciones.innerHTML += `<button class="quiz-btn" onclick="validarQuiz(${i}, ${q.a})">${opt}</button>`;
    });
}

function validarQuiz(elegida, correcta) {
    if(elegida === correcta) {
        alert("¡Correcto! +500 XP");
        actualizarXP(500);
        desbloquearMedalla('med-genio');
    } else {
        alert("Incorrecto. Estudia más.");
    }
    document.getElementById('quiz-container').style.display = 'none';
}

// 4. LOGROS Y XP
function desbloquearMedalla(id) {
    document.getElementById(id).classList.add('unlocked');
}

function actualizarXP(n) {
    xp += n;
    document.getElementById('xp-count').innerText = xp.toLocaleString();
    document.getElementById('xp-bar-fill').style.width = Math.min((xp/10000)*100, 100) + "%";
}

function analizarGasto() {
    const m = document.getElementById('gasto-input').value;
    const res = document.getElementById('ia-resultado');
    res.innerText = m > 1000 ? "🤖 IA: ¡Demasiado! Mejor compra acciones." : "🤖 IA: Gasto aceptable.";
}
