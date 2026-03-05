let xp = 2500;
let precioActual = 800000;
let cantidadAcciones = 0;

// BASE DE DATOS DE QUIZZES
const maratonPreguntas = [
    { t: "INFLACIÓN", q: "¿Qué pasa con los ahorros si hay mucha inflación?", o: ["Valen más", "Valen menos", "No cambian"], a: 1, e: "La inflación devora el valor del dinero ahorrado bajo el colchón." },
    { t: "ETFs", q: "¿Por qué invertir en un ETF?", o: ["Es una sola empresa", "Es diversificar riesgo", "Es una estafa"], a: 1, e: "Un ETF te protege porque no pones todos los huevos en la misma cesta." },
    { t: "CRIPTO", q: "¿Quién creó Bitcoin?", o: ["Elon Musk", "Satoshi Nakamoto", "El Banco Mundial"], a: 1, e: "Fue creado por una persona o grupo anónimo en 2009." },
    { t: "INTERÉS", q: "¿Qué acelera el interés compuesto?", o: ["Retirar las ganancias", "Reinvertir ganancias", "Gastar intereses"], a: 1, e: "Reinvertir es el combustible del interés compuesto." }
];

let indiceQuiz = 0;

// FUNCIONES DE NAVEGACIÓN
function cambiarPagina(id) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    document.getElementById('btn-' + id).classList.add('active');
}

// LÓGICA DE MEMES
function mostrarMeme(exito, mensaje) {
    const box = document.getElementById('meme-container');
    const img = document.getElementById('meme-img');
    const msg = document.getElementById('meme-msg');
    
    // URLs de memes (puedes cambiarlas por las que quieras)
    const memesExito = [
        "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHJmZzR6NHI0cmZ6NHI0cmZ6NHI0cmZ6NHI0cmZ6NHI0cmZ6NHI0JmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1n/LdOyjZ7TC5K3LghXY8/giphy.gif", // Stonks
        "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHJmZzR6NHI0cmZ6NHI0cmZ6NHI0cmZ6NHI0cmZ6NHI0cmZ6NHI0JmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1n/3o6gDWzmAzrpi5DQU8/giphy.gif"  // Money rain
    ];
    const memesFallo = [
        "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHJmZzR6NHI0cmZ6NHI0cmZ6NHI0cmZ6NHI0cmZ6NHI0cmZ6NHI0JmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1n/9pZw57AyqOHy47uAdZ/giphy.gif", // This is fine
        "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHJmZzR6NHI0cmZ6NHI0cmZ6NHI0cmZ6NHI0cmZ6NHI0cmZ6NHI0JmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1n/hStvd5LiWCFzXYZAzM/giphy.gif"  // Sad
    ];

    img.src = exito ? memesExito[Math.floor(Math.random()*memesExito.length)] : memesFallo[Math.floor(Math.random()*memesFallo.length)];
    msg.innerText = mensaje;
    msg.style.color = exito ? "#10b981" : "#ef4444";
    
    box.classList.add('active');
    setTimeout(() => box.classList.remove('active'), 3000);
}

// MARATÓN DE QUIZZES
function iniciarMaraton() {
    indiceQuiz = 0;
    document.getElementById('quiz-intro').style.display = 'none';
    document.getElementById('quiz-play').style.display = 'block';
    mostrarPregunta();
}

function mostrarPregunta() {
    const data = maratonPreguntas[indiceQuiz];
    document.getElementById('quiz-feedback').style.display = 'none';
    document.getElementById('quiz-tema-tag').innerText = data.t;
    document.getElementById('quiz-count').innerText = `${indiceQuiz + 1}/${maratonPreguntas.length}`;
    document.getElementById('quiz-q').innerText = data.q;
    
    const opts = document.getElementById('quiz-options');
    opts.innerHTML = "";
    data.o.forEach((o, i) => {
        opts.innerHTML += `<button class="btn-main" onclick="responderMaraton(${i})">${o}</button>`;
    });
}

function responderMaraton(idx) {
    const data = maratonPreguntas[indiceQuiz];
    const feed = document.getElementById('quiz-feedback');
    const txt = document.getElementById('feedback-text');
    
    feed.style.display = 'block';
    const esCorrecto = (idx === data.a);
    
    if(esCorrecto) {
        txt.innerHTML = `<b style="color:#10b981">¡CORRECTO!</b><br>${data.e}`;
        actualizarXP(500);
        mostrarMeme(true, "¡Eres un genio financiero!");
    } else {
        txt.innerHTML = `<b style="color:#ef4444">ERROR</b><br>Era: ${data.o[data.a]}. ${data.e}`;
        mostrarMeme(false, "F en el chat por tus ahorros...");
    }

    // PASAR AUTOMÁTICAMENTE
    setTimeout(() => {
        indiceQuiz++;
        if(indiceQuiz < maratonPreguntas.length) {
            mostrarPregunta();
        } else {
            document.getElementById('quiz-play').innerHTML = "<h3>¡Maratón Completada! 🏆</h3><button class='btn-main' onclick='location.reload()'>Volver a empezar</button>";
            desbloquearMedalla('med-genio');
        }
    }, 3500);
}

// ... (Resto de funciones: Bolsa, XP, Medallas - igual que antes) ...
function comprarAccion() { 
    cantidadAcciones++; 
    actualizarVista(); 
    mostrarMeme(true, "¡Compraste el dip! Stonks 📈");
}
function venderAccion() { 
    if(cantidadAcciones > 0) {
        cantidadAcciones = 0; 
        actualizarVista();
        mostrarMeme(true, "¡Ganancias aseguradas! 💰");
    } else {
        mostrarMeme(false, "No tienes nada que vender...");
    }
}
function actualizarVista() {
    document.getElementById('balance-total').innerText = "$" + (cantidadAcciones * precioActual).toLocaleString();
    document.getElementById('mis-acciones').innerText = cantidadAcciones + " unidades";
}
function actualizarXP(p) { xp += p; document.getElementById('xp-count').innerText = xp.toLocaleString(); document.getElementById('xp-bar-fill').style.width = Math.min((xp/10000)*100, 100) + "%"; }
function desbloquearMedalla(id) { document.getElementById(id).classList.add('unlocked'); }

// GRÁFICA (Simplicada para el ejemplo)
const ctx = document.getElementById('graficaBolsa').getContext('2d');
let miChart = new Chart(ctx, { type: 'line', data: { labels: ["","","","",""], datasets: [{ data: [800000, 810000, 790000, 820000], borderColor: '#3b82f6' }] } });
