let xp = 0;
let precioActual = 800000;
let acciones = 0;
let indiceQuiz = 0;

// --- 25 PREGUNTAS VARIADAS ---
const bancoPreguntas = [
    { q: "¿Qué es la inflación?", o: ["Sube el precio", "Baja el precio", "Regalo", "Impuesto"], a: 0 },
    { q: "¿Qué es un ETF?", o: ["Cripto", "Cesta de acciones", "Un banco", "Un préstamo"], a: 1 },
    { q: "¿Qué es el interés compuesto?", o: ["Interés simple", "Interés sobre interés", "Perder dinero", "Un gasto"], a: 1 },
    { q: "Bitcoin es...", o: ["Papel", "Oro digital", "Una empresa", "Un fraude"], a: 1 },
    { q: "¿Qué es un 'Bull Market'?", o: ["Mercado bajista", "Mercado alcista", "Mercado cerrado", "Crisis"], a: 1 },
    { q: "¿Qué significa diversificar?", o: ["Todo a una", "Repartir riesgo", "Gastar todo", "Ahorrar"], a: 1 },
    { q: "¿Qué es el S&P 500?", o: ["Un carro", "Índice de 500 empresas", "Un banco", "Precio del oro"], a: 1 },
    { q: "¿Qué es un dividendo?", o: ["Un gasto", "Parte de beneficios", "Una deuda", "Un impuesto"], a: 1 },
    // ... (Añadir 17 más siguiendo este patrón para completar las 25)
    { q: "¿Cuál es el límite de Bitcoins?", o: ["21 Millones", "100 Millones", "Infinito", "1 Billón"], a: 0 },
    { q: "¿Qué es un Broker?", o: ["Un vendedor", "Plataforma de inversión", "Un cajero", "Una moneda"], a: 1 }
];

// --- MOTOR DE LA BOLSA (PICOS) ---
const ctx = document.getElementById('graficaPicos').getContext('2d');
let miChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: Array(20).fill(""),
        datasets: [{
            data: Array(20).fill(800000),
            borderColor: '#3b82f6',
            borderWidth: 3,
            pointRadius: 0,
            tension: 0 // Tension 0 crea picos rectos como en la vida real
        }]
    },
    options: { responsive: true, maintainAspectRatio: false, scales: { y: { grid: { color: '#233554' } }, x: { display: false } } }
});

setInterval(() => {
    let cambio = (Math.random() - 0.5) * 15000; // Picos agresivos
    precioActual += cambio;
    document.getElementById('p-bolsa').innerText = "$" + Math.floor(precioActual).toLocaleString();
    document.getElementById('p-bolsa').style.color = cambio > 0 ? "#10b981" : "#ef4444";
    
    miChart.data.datasets[0].data.push(precioActual);
    miChart.data.datasets[0].data.shift();
    miChart.update('none');
    actualizarVista();
}, 800);

// --- SISTEMA DE MEMES ---
function lanzarMeme(exito) {
    const memesOk = [
        "https://media.giphy.com/media/LdOyjZ7TC5K3LghXY8/giphy.gif",
        "https://media.giphy.com/media/3o6gDWzmAzrpi5DQU8/giphy.gif",
        "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHJmZzR6NHI0cmZ6NHI0cmZ6NHI0cmZ6NHI0cmZ6NHI0cmZ6NHI0JmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1n/2XskdWuV659n7gW64s/giphy.gif"
    ];
    const memesBad = [
        "https://media.giphy.com/media/9pZw57AyqOHy47uAdZ/giphy.gif",
        "https://media.giphy.com/media/hStvd5LiWCFzXYZAzM/giphy.gif",
        "https://media.giphy.com/media/MhHk6V5774h2w/giphy.gif"
    ];
    const container = document.getElementById('meme-container');
    const img = document.getElementById('meme-img');
    img.src = exito ? memesOk[Math.floor(Math.random()*memesOk.length)] : memesBad[Math.floor(Math.random()*memesBad.length)];
    container.classList.add('active');
    setTimeout(() => container.classList.remove('active'), 2500);
}

// --- PERFIL FUNCIONAL ---
function guardarPerfil() {
    const nombre = document.getElementById('user-name').value;
    alert("¡Perfil de " + nombre + " actualizado correctamente!");
}

document.getElementById('upload-photo').addEventListener('change', function(e) {
    const reader = new FileReader();
    reader.onload = function() { document.getElementById('user-photo').src = reader.result; }
    reader.readAsDataURL(e.target.files[0]);
});

// --- ACADEMIA MARATÓN ---
function iniciarMaraton() {
    indiceQuiz = 0;
    document.getElementById('quiz-intro').style.display = 'none';
    document.getElementById('quiz-play').style.display = 'block';
    mostrarQ();
}

function mostrarQ() {
    const p = bancoPreguntas[indiceQuiz];
    document.getElementById('q-num').innerText = (indiceQuiz+1) + "/25";
    document.getElementById('q-texto').innerText = p.q;
    const ops = document.getElementById('q-opciones');
    ops.innerHTML = "";
    p.o.forEach((op, i) => {
        ops.innerHTML += `<button class="btn-main" onclick="validar(${i})">${op}</button>`;
    });
}

function validar(idx) {
    if(idx === bancoPreguntas[indiceQuiz].a) {
        xp += 400; lanzarMeme(true);
    } else {
        lanzarMeme(false);
    }
    indiceQuiz++;
    if(indiceQuiz < bancoPreguntas.length) setTimeout(mostrarQ, 2600);
    else {
        document.getElementById('med-genio').classList.add('unlocked');
        document.getElementById('quiz-play').innerHTML = "<h3>🏆 ¡MARATÓN COMPLETADA!</h3>";
    }
    actualizarVista();
}

// --- UTILIDADES ---
function cambiarPagina(id) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    event.target.classList.add('active');
}

function comprarAccion() { acciones++; actualizarVista(); lanzarMeme(true); document.getElementById('med-lobo').classList.add('unlocked'); }
function venderAccion() { if(acciones > 0) { acciones--; actualizarVista(); lanzarMeme(true); } }
function actualizarVista() {
    document.getElementById('balance-total').innerText = "$" + Math.floor(acciones * precioActual).toLocaleString();
    document.getElementById('mis-acciones').innerText = acciones;
    document.getElementById('xp-count').innerText = xp;
    document.getElementById('xp-bar-fill').style.width = (xp/10000)*100 + "%";
}
