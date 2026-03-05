let xp = 2500;
let precioActual = 800000;
let cantidadAcciones = 0;

function cambiarPagina(id) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    document.getElementById('btn-' + id).classList.add('active');
    if(id === 'juegos') setTimeout(() => miChart.update(), 100);
}

// SIMULADOR
const ctx = document.getElementById('graficaBolsa').getContext('2d');
let miChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ["","","","","","","","","",""],
        datasets: [{ data: [790000, 795000, 798000, 800000], borderColor: '#3b82f6', fill: true, tension: 0.4 }]
    },
    options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } }
});

setInterval(() => {
    let cambio = Math.floor(Math.random() * 10000) - 4500;
    precioActual += cambio;
    const pBolsa = document.getElementById('p-bolsa');
    if(pBolsa) {
        pBolsa.innerText = "$" + precioActual.toLocaleString();
        pBolsa.style.color = cambio > 0 ? "#10b981" : "#ef4444";
    }
    actualizarVistaCartera();
    miChart.data.datasets[0].data.push(precioActual);
    if(miChart.data.datasets[0].data.length > 15) miChart.data.datasets[0].data.shift();
    miChart.update('none');
}, 3000);

// BOLSA E HISTORIAL
function comprarAccion() {
    cantidadAcciones++;
    actualizarXP(100);
    actualizarVistaCartera();
    registrarHistorial("COMPRA", "#10b981");
    desbloquearMedalla('med-lobo');
}

function venderAccion() {
    if(cantidadAcciones > 0) {
        registrarHistorial("VENTA", "#ef4444");
        cantidadAcciones = 0;
        actualizarXP(50);
        actualizarVistaCartera();
    }
}

function registrarHistorial(tipo, color) {
    const contenedor = document.getElementById('historial-bolsa');
    const ahora = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    const item = `
        <div style="border-bottom: 1px solid #233554; padding: 10px 0; display:flex; justify-content:space-between">
            <span style="color:${color}">● ${tipo}</span>
            <span>$${precioActual.toLocaleString()}</span>
            <small style="color:var(--gray)">${ahora}</small>
        </div>`;
    if(contenedor.innerHTML.includes("No hay movimientos")) contenedor.innerHTML = item;
    else contenedor.innerHTML = item + contenedor.innerHTML;
}

function actualizarVistaCartera() {
    const valTotal = document.getElementById('balance-total');
    const unidades = document.getElementById('mis-acciones');
    if(valTotal) valTotal.innerText = "$" + (cantidadAcciones * precioActual).toLocaleString();
    if(unidades) unidades.innerText = cantidadAcciones + " unidades";
}

// ACADEMIA CON FEEDBACK
const bancoPreguntas = {
    inflacion: {
        q: "Si la inflación sube, ¿qué le ocurre a tu poder adquisitivo?",
        o: ["Aumenta", "Disminuye", "Se queda igual"], a: 1,
        e: "La inflación es el aumento de precios. Si las cosas cuestan más y tú tienes el mismo dinero, tu poder de compra disminuye porque te alcanza para menos cosas."
    },
    etfs: {
        q: "¿Cuál es la principal ventaja de un ETF?",
        o: ["Es una apuesta segura", "Diversificación instantánea", "Es dinero físico"], a: 1,
        e: "Un ETF es una cesta con muchas acciones. Al comprarlo, estás diversificando tu riesgo entre cientos de empresas en lugar de apostar todo a una sola."
    },
    cripto: {
        q: "¿Por qué se dice que Bitcoin es escaso?",
        o: ["Porque el gobierno lo prohíbe", "Solo existirán 21 millones", "Porque es muy caro"], a: 1,
        e: "Bitcoin fue diseñado para tener un límite máximo de 21 millones de unidades. A diferencia del dinero normal, nadie puede 'imprimir' más Bitcoins."
    },
    interes: {
        q: "¿Qué requiere el interés compuesto para ser efectivo?",
        o: ["Mucho dinero inicial", "Mucho tiempo y paciencia", "Suerte en la bolsa"], a: 1,
        e: "El interés compuesto crece exponencialmente con el tiempo. Entre más años dejes que tus intereses generen nuevos intereses, más explosivo será el crecimiento."
    }
};

function abrirQuiz(tema) {
    const data = bancoPreguntas[tema];
    document.getElementById('quiz-container').style.display = 'block';
    document.getElementById('quiz-feedback').style.display = 'none';
    document.getElementById('quiz-titulo').innerText = "Examen: " + tema.toUpperCase();
    document.getElementById('quiz-pregunta').innerText = data.q;
    const opcionesDiv = document.getElementById('quiz-opciones');
    opcionesDiv.innerHTML = "";
    data.o.forEach((opcion, i) => {
        opcionesDiv.innerHTML += `<button class="btn-main" style="margin-bottom:5px" onclick="validarRespuesta('${tema}', ${i})">${opcion}</button>`;
    });
    window.scrollTo(0,0);
}

function validarRespuesta(tema, idx) {
    const data = bancoPreguntas[tema];
    const feedbackDiv = document.getElementById('quiz-feedback');
    const feedbackTexto = document.getElementById('feedback-texto');
    feedbackDiv.style.display = 'block';
    if(idx === data.a) {
        feedbackTexto.innerHTML = `<b style="color:var(--green)">¡CORRECTO!</b><br>${data.e}`;
        actualizarXP(500);
        desbloquearMedalla('med-genio');
    } else {
        feedbackTexto.innerHTML = `<b style="color:var(--red)">INCORRECTO</b><br>La respuesta correcta era: "${data.o[data.a]}".<br><br>${data.e}`;
    }
}

function cerrarQuiz() { document.getElementById('quiz-container').style.display = 'none'; }
function actualizarXP(p) { xp += p; document.getElementById('xp-count').innerText = xp.toLocaleString(); document.getElementById('xp-bar-fill').style.width = Math.min((xp/10000)*100, 100) + "%"; }
function desbloquearMedalla(id) { document.getElementById(id).classList.add('unlocked'); }
