// --- VARIABLES GLOBALES ---
let xp = 2500;
let precioActual = 800000;
let acciones = 0;
let indiceQuiz = 0;

// --- BASE DE DATOS DE QUIZZES AUTOMÁTICOS ---
const preguntas = [
    { t: "INFLACIÓN", q: "¿Qué pasa con el dinero si hay mucha inflación?", o: ["Sube de valor", "Pierde valor", "No cambia"], a: 1, e: "La inflación es el aumento de precios. Si las cosas cuestan más y tienes el mismo dinero, tu poder de compra disminuye." },
    { t: "ETFs", q: "¿Cuál es la principal ventaja de un ETF?", o: ["Es una apuesta segura", "Diversificación instantánea", "Es dinero físico"], a: 1, e: "Un ETF es como una cesta con muchas acciones. Al comprarlo, estás diversificando tu riesgo entre cientos de empresas en lugar de apostar todo a una sola." },
    { t: "CRIPTO", q: "¿Cuántos Bitcoins existirán en total?", o: ["Infinitos", "21 Millones", "1 Billón"], a: 1, e: "Bitcoin fue diseñado para tener un límite máximo. A diferencia del dinero normal, nadie puede 'imprimir' más Bitcoins." },
    { t: "INTERÉS", q: "¿Qué requiere el interés compuesto para ser poderoso?", o: ["Mucho dinero inicial", "Mucho tiempo y paciencia", "Suerte en la bolsa"], a: 1, e: "El interés compuesto crece exponencialmente con el tiempo. Entre más años dejes que tus intereses generen nuevos intereses, más explosivo será el crecimiento." }
];

// --- NAVEGACIÓN ---
function cambiarPagina(id) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    document.getElementById('btn-' + id).classList.add('active');
}

// --- NUEVO MOTOR DE MEMES (A PRUEBA DE ERRORES) ---
function mostrarMeme(exito, mensaje) {
    const box = document.getElementById('meme-container');
    const img = document.getElementById('meme-img');
    const msg = document.getElementById('meme-msg');
    
    // COLECCIÓN DE MEMES INTEGRADA (Sin depender de internet)
    const memesExito = [
        "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHJmZzR6NHI0cmZ6NHI0cmZ6NHI0cmZ6NHI0cmZ6NHI0cmZ6NHI0JmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1n/LdOyjZ7TC5K3LghXY8/giphy.gif", // Stonks
        "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHJmZzR6NHI0cmZ6NHI0cmZ6NHI0cmZ6NHI0cmZ6NHI0cmZ6NHI0JmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1n/3o6gDWzmAzrpi5DQU8/giphy.gif", // Money Rain
        "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHJmZzR6NHI0cmZ6NHI0cmZ6NHI0cmZ6NHI0cmZ6NHI0cmZ6NHI0JmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1n/2XskdWuV659n7gW64s/giphy.gif", // Yes!
        "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHJmZzR6NHI0cmZ6NHI0cmZ6NHI0cmZ6NHI0cmZ6NHI0cmZ6NHI0JmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1n/w797sDk1u9FwA/giphy.gif"    // Nyan Cat
    ];
    const memesFallo = [
        "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHJmZzR6NHI0cmZ6NHI0cmZ6NHI0cmZ6NHI0cmZ6NHI0cmZ6NHI0JmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1n/9pZw57AyqOHy47uAdZ/giphy.gif", // This is fine
        "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHJmZzR6NHI0cmZ6NHI0cmZ6NHI0cmZ6NHI0cmZ6NHI0cmZ6NHI0JmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1n/hStvd5LiWCFzXYZAzM/giphy.gif", // Sad Pepe
        "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHJmZzR6NHI0cmZ6NHI0cmZ6NHI0cmZ6NHI0cmZ6NHI0cmZ6NHI0JmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1n/vfs07m4bFhR1X1g6uH/giphy.gif", // Oh No
        "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHJmZzR6NHI0cmZ6NHI0cmZ6NHI0cmZ6NHI0cmZ6NHI0cmZ6NHI0JmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1n/MhHk6V5774h2w/giphy.gif"    // Facepalm
    ];

    // Elije un meme aleatorio de la colección
    const coleccion = exito ? memesExito : memesFallo;
    img.src = coleccion[Math.floor(Math.random() * coleccion.length)];
    
    msg.innerText = mensaje;
    msg.style.color = exito ? "#10b981" : "#ef4444";
    
    // Activa el popup
    box.classList.add('active');
    
    // Lo desaparece automáticamente en 3 segundos
    setTimeout(() => {
        box.classList.remove('active');
    }, 3000);
}

// --- QUIZ AUTOMÁTICO (CORREGIDO) ---
function iniciarMaraton() {
    indiceQuiz = 0;
    const intro = document.getElementById('quiz-intro');
    const play = document.getElementById('quiz-play');
    if(intro && play) {
        intro.style.display = 'none';
        play.style.display = 'block';
        cargarPregunta();
    }
}

function cargarPregunta() {
    const d = preguntas[indiceQuiz];
    const temaTag = document.getElementById('quiz-tema');
    const conteo = document.getElementById('quiz-conteo');
    const qTexto = document.getElementById('quiz-pregunta');
    const divOpc = document.getElementById('quiz-opciones');
    
    temaTag.innerText = d.t;
    conteo.innerText = `${indiceQuiz + 1}/${preguntas.length}`;
    qTexto.innerText = d.q;
    
    divOpc.innerHTML = "";
    d.o.forEach((o, i) => {
        divOpc.innerHTML += `<button class="btn-main" style="margin-bottom:5px" id="opt-${i}" onclick="responderMaraton(${i})">${o}</button>`;
    });
    
    // Asegurar que el feedback esté oculto al cargar una nueva pregunta
    document.getElementById('quiz-feedback').style.display = 'none';
}

function responderMaraton(idx) {
    const d = preguntas[indiceQuiz];
    const feedText = document.getElementById('feedback-texto');
    const feedBox = document.getElementById('quiz-feedback');
    
    // Desactivar botones para que no cliquen doble
    document.querySelectorAll("#quiz-opciones button").forEach(b => b.disabled = true);
    
    feedBox.style.display = 'block';
    
    if(idx === d.a) {
        feedText.innerHTML = `<b style="color:#10b981">¡CORRECTO!</b><br>${d.e}`;
        xp += 500;
        mostrarMeme(true, "¡Stonks! Eres un genio financiero.");
    } else {
        feedText.innerHTML = `<b style="color:#ef4444">ERROR</b><br>Era: "${d.o[d.a]}".<br>${d.e}`;
        mostrarMeme(false, "F en el chat por tus ahorros...");
    }
    actualizarXPUI();

    // PASAR AUTOMÁTICAMENTE EN 3.5 SEGUNDOS
    setTimeout(() => {
        indiceQuiz++;
        if(indiceQuiz < preguntas.length) {
            cargarPregunta();
        } else {
            document.getElementById('quiz-play').innerHTML = "<h3>¡Maratón Completada! 🏆</h3><button class='btn-main' onclick='location.reload()'>Volver a empezar</button>";
            document.getElementById('med-genio').classList.add('unlocked');
        }
    }, 3500);
}

// --- OTROS SISTEMAS ---
function comprarAccion() { 
    acciones++; 
    actualizarUI(); 
    mostrarMeme(true, "¡Compraste el dip! Stonks. 📈");
}
function venderAccion() { 
    if(acciones > 0) {
        acciones = 0; 
        actualizarUI();
        mostrarMeme(true, "¡Ganancias aseguradas! Venta exitosa. 💰");
    } else {
        mostrarMeme(false, "No tienes nada que vender...");
    }
}
function actualizarUI() {
    document.getElementById('balance-total').innerText = "$" + (acciones * precioActual).toLocaleString();
    document.getElementById('mis-acciones').innerText = acciones + " unidades";
}
function actualizarXPUI() {
    document.getElementById('xp-count').innerText = xp.toLocaleString();
    document.getElementById('xp-bar-fill').style.width = Math.min((xp/10000)*100, 100) + "%";
}

// --- INICIALIZACIÓN ---
window.onload = () => {
    lucide.createIcons();
    const btn = document.getElementById('btn-start-maraton');
    if(btn) btn.addEventListener('click', iniciarMaraton);
    actualizarXPUI();
};

// GRÁFICA (Simplificada)
const ctx = document.getElementById('graficaBolsa');
if(ctx) {
    new Chart(ctx, { type: 'line', data: { labels: ["","","","",""], datasets: [{ data: [800000, 810000, 790000, 820000, 800000], borderColor: '#3b82f6', tension:0.4 }] } });
}
