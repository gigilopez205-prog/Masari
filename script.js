// VARIABLES GLOBALES
let xp = 2500;
let precioActual = 800000;
let acciones = 0;
let indiceQuiz = 0;

// BASE DE PREGUNTAS
const preguntas = [
    { t: "INFLACIÓN", q: "¿Qué pasa con tu dinero si hay mucha inflación?", o: ["Sube de valor", "Pierde valor", "Se duplica"], a: 1, e: "La inflación hace que los precios suban, por lo que tu dinero compra menos cosas." },
    { t: "ETFs", q: "¿Qué es un ETF?", o: ["Una sola empresa", "Un paquete de acciones", "Una moneda física"], a: 1, e: "Es como una cesta con muchas acciones para diversificar el riesgo." },
    { t: "CRIPTO", q: "¿Cuál es el límite total de Bitcoins?", o: ["No tiene límite", "21 Millones", "100 Millones"], a: 1, e: "Bitcoin es escaso, solo existirán 21 millones de unidades." },
    { t: "INTERÉS", q: "¿Qué es el interés compuesto?", o: ["Interés sobre interés", "Un impuesto nuevo", "Dinero perdido"], a: 0, e: "Es cuando tus ganancias generan sus propias ganancias con el tiempo." }
];

// NAVEGACIÓN
function cambiarPagina(id) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    document.getElementById('btn-' + id).classList.add('active');
    if(id === 'juegos') { setTimeout(initChart, 100); }
}

// LÓGICA DE MEMES
function lanzarMeme(exito, texto) {
    const box = document.getElementById('meme-container');
    const img = document.getElementById('meme-img');
    const msg = document.getElementById('meme-msg');
    
    const mExito = ["https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHJmZzR6NHI0cmZ6NHI0cmZ6NHI0cmZ6NHI0cmZ6NHI0cmZ6NHI0JmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1n/LdOyjZ7TC5K3LghXY8/giphy.gif", "https://media.giphy.com/media/3o6gDWzmAzrpi5DQU8/giphy.gif"];
    const mFallo = ["https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHJmZzR6NHI0cmZ6NHI0cmZ6NHI0cmZ6NHI0cmZ6NHI0cmZ6NHI0JmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1n/9pZw57AyqOHy47uAdZ/giphy.gif", "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHJmZzR6NHI0cmZ6NHI0cmZ6NHI0cmZ6NHI0cmZ6NHI0cmZ6NHI0JmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1n/hStvd5LiWCFzXYZAzM/giphy.gif"];

    img.src = exito ? mExito[Math.floor(Math.random()*mExito.length)] : mFallo[Math.floor(Math.random()*mFallo.length)];
    msg.innerText = texto;
    msg.style.color = exito ? "#10b981" : "#ef4444";
    
    box.classList.add('active');
    setTimeout(() => box.classList.remove('active'), 2500);
}

// SISTEMA DE QUIZ AUTOMÁTICO
function iniciarMaraton() {
    indiceQuiz = 0;
    document.getElementById('quiz-intro').style.display = 'none';
    document.getElementById('quiz-play').style.display = 'block';
    cargarPregunta();
}

function cargarPregunta() {
    const data = preguntas[indiceQuiz];
    document.getElementById('q-feedback').style.display = 'none';
    document.getElementById('q-tag').innerText = data.t;
    document.getElementById('q-num').innerText = (indiceQuiz + 1) + "/" + preguntas.length;
    document.getElementById('q-texto').innerText = data.q;
    
    const divOpc = document.getElementById('q-opciones');
    divOpc.innerHTML = "";
    data.o.forEach((opt, i) => {
        divOpc.innerHTML += `<button class="btn-main" onclick="responder(${i})">${opt}</button>`;
    });
}

function responder(idx) {
    const data = preguntas[indiceQuiz];
    const fBox = document.getElementById('q-feedback');
    const fTxt = document.getElementById('f-texto');
    
    fBox.style.display = 'block';
    if(idx === data.a) {
        fTxt.innerHTML = `<b style="color:#10b981">¡CORRECTO!</b><br>${data.e}`;
        xp += 500;
        lanzarMeme(true, "¡Stonks! Ganaste 500 XP");
    } else {
        fTxt.innerHTML = `<b style="color:#ef4444">ERROR</b><br>Era: ${data.o[data.a]}<br>${data.e}`;
        lanzarMeme(false, "F en el chat...");
    }
    actualizarXPUI();

    setTimeout(() => {
        indiceQuiz++;
        if(indiceQuiz < preguntas.length) {
            cargarPregunta();
        } else {
            document.getElementById('quiz-play').innerHTML = "<h3>¡Maratón Completada! 🏆</h3><button class='btn-main' onclick='location.reload()'>Reiniciar</button>";
            document.getElementById('med-genio').classList.add('unlocked');
        }
    }, 3000);
}

// BOLSA Y OTROS
function comprarAccion() { 
    acciones++; 
    lanzarMeme(true, "¡Acción comprada!");
    actualizarUI(); 
}
function venderAccion() { 
    if(acciones > 0) { 
        acciones = 0; 
        lanzarMeme(true, "¡Vendido con éxito!");
        actualizarUI(); 
    } 
}
function actualizarUI() {
    document.getElementById('balance-total').innerText = "$" + (acciones * precioActual).toLocaleString();
    document.getElementById('mis-acciones').innerText = acciones;
}
function actualizarXPUI() {
    document.getElementById('xp-count').innerText = xp;
    document.getElementById('xp-bar-fill').style.width = Math.min((xp/10000)*100, 100) + "%";
}

// INICIALIZACIÓN
window.onload = () => {
    lucide.createIcons();
    actualizarXPUI();
};

// GRÁFICA SENCILLA
let miChart;
function initChart() {
    const ctx = document.getElementById('graficaBolsa');
    if(!ctx) return;
    if(miChart) miChart.destroy();
    miChart = new Chart(ctx, {
        type: 'line',
        data: { labels: ["","","","",""], datasets: [{ data: [800000, 810000, 790000, 820000, 800000], borderColor: '#3b82f6', tension:0.4 }] },
        options: { responsive: true, maintainAspectRatio: false }
    });
}
