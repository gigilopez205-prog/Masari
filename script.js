let xp = 2500;
let precioActual = 800000;
let acciones = 0;
let indiceQuiz = 0;

// 1. FUNCIONAMIENTO DE LA BOLSA (MOVIMIENTO CONSTANTE)
const ctx = document.getElementById('graficaBolsa').getContext('2d');
let miChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ["","","","","","","","","",""],
        datasets: [{
            label: 'Precio',
            data: [800000, 805000, 798000, 810000, 800000],
            borderColor: '#3b82f6',
            tension: 0.4,
            fill: true,
            backgroundColor: 'rgba(59, 130, 246, 0.1)'
        }]
    },
    options: { responsive: true, maintainAspectRatio: false }
});

setInterval(() => {
    let fluctuacion = Math.floor(Math.random() * 10000) - 4800;
    precioActual += fluctuacion;
    
    // Actualizar texto
    const pTexto = document.getElementById('p-bolsa');
    pTexto.innerText = "$" + precioActual.toLocaleString();
    pTexto.style.color = fluctuacion > 0 ? "#10b981" : "#ef4444";

    // Actualizar gráfica
    miChart.data.datasets[0].data.push(precioActual);
    if(miChart.data.datasets[0].data.length > 10) miChart.data.datasets[0].data.shift();
    miChart.update();
    
    actualizarCartera();
}, 2000); // Se mueve cada 2 segundos sin falta

// 2. SISTEMA DE MEMES MEJORADO
function lanzarMeme(esExito, mensaje) {
    const contenedor = document.getElementById('meme-container');
    const imagen = document.getElementById('meme-img');
    const texto = document.getElementById('meme-msg');

    const mOk = [
        "https://media.giphy.com/media/LdOyjZ7TC5K3LghXY8/giphy.gif", // Stonks
        "https://media.giphy.com/media/3o6gDWzmAzrpi5DQU8/giphy.gif"  // Dinero
    ];
    const mError = [
        "https://media.giphy.com/media/9pZw57AyqOHy47uAdZ/giphy.gif", // This is fine
        "https://media.giphy.com/media/hStvd5LiWCFzXYZAzM/giphy.gif"  // Sad
    ];

    imagen.src = esExito ? mOk[Math.floor(Math.random()*mOk.length)] : mError[Math.floor(Math.random()*mError.length)];
    texto.innerText = mensaje;
    
    contenedor.classList.add('active');
    setTimeout(() => contenedor.classList.remove('active'), 2500);
}

// 3. QUIZ AUTOMÁTICO
const misPreguntas = [
    { q: "¿Qué es la inflación?", o: ["Subida de precios", "Dinero gratis"], a: 0 },
    { q: "¿Qué es un ETF?", o: ["Una moneda", "Paquete de acciones"], a: 1 }
];

function iniciarMaraton() {
    indiceQuiz = 0;
    document.getElementById('quiz-intro').style.display = 'none';
    document.getElementById('quiz-play').style.display = 'block';
    mostrarQ();
}

function mostrarQ() {
    const p = misPreguntas[indiceQuiz];
    document.getElementById('q-texto').innerText = p.q;
    const ops = document.getElementById('q-opciones');
    ops.innerHTML = "";
    p.o.forEach((op, i) => {
        ops.innerHTML += `<button class="btn-main" onclick="validar(${i})">${op}</button>`;
    });
}

function validar(idx) {
    if(idx === misPreguntas[indiceQuiz].a) {
        lanzarMeme(true, "¡Correcto! +500 XP");
        xp += 500;
    } else {
        lanzarMeme(false, "¡Incorrecto!");
    }
    
    setTimeout(() => {
        indiceQuiz++;
        if(indiceQuiz < misPreguntas.length) mostrarQ();
        else {
            document.getElementById('quiz-play').innerHTML = "<h3>¡Fin del Maratón!</h3>";
            document.getElementById('med-genio').classList.add('unlocked');
        }
    }, 3000);
}

// 4. FUNCIONES BÁSICAS
function comprarAccion() { 
    acciones++; 
    actualizarCartera(); 
    lanzarMeme(true, "¡Acción Comprada!"); 
}
function venderAccion() { 
    if(acciones > 0) { 
        acciones--; 
        actualizarCartera(); 
        lanzarMeme(true, "¡Vendido!"); 
    } 
}
function actualizarCartera() {
    document.getElementById('balance-total').innerText = "$" + (acciones * precioActual).toLocaleString();
    document.getElementById('mis-acciones').innerText = acciones;
    document.getElementById('xp-count').innerText = xp;
}
function cambiarPagina(id) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(id).classList.add('active');
}
