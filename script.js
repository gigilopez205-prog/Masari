// VARIABLES INICIALES
let puntosXP = 2500;
let precioBase = 800000;

// 1. FUNCIÓN PARA ACTUALIZAR XP VISUALMENTE
function actualizarXP(cantidad) {
    puntosXP += cantidad;
    document.getElementById('xp-count').innerText = puntosXP.toLocaleString();
    
    // Hacer que la barra de progreso crezca un poquito
    let nuevaAnchura = Math.min((puntosXP / 5000) * 100, 100); 
    document.getElementById('xp-bar-inner').style.width = nuevaAnchura + "%";
}

// 2. FUNCIÓN PARA EL BOTÓN BUY
function comprarAccion() {
    actualizarXP(100); // Gana 100 XP por invertir
    alert("¡Compra exitosa! Has invertido en $MAS y ganaste 100 XP.");
}

// 3. FUNCIÓN PARA EL BOTÓN SELL
function venderAccion() {
    alert("Has vendido tus acciones. ¡Aseguraste tus ganancias!");
}

// 4. FUNCIÓN IA DE AHORRO
function analizarGasto() {
    const monto = document.getElementById('gasto-input').value;
    const feedback = document.getElementById('ia-resultado');

    if (monto === "") {
        feedback.innerText = "⚠️ Por favor ingresa un monto.";
        feedback.style.color = "#94a3b8";
    } else if (monto > 1000) {
        feedback.innerText = "🤖 IA Masari: ¡Cuidado! Este gasto es muy alto. Podrías invertirlo en la bolsa.";
        feedback.style.color = "#ef4444";
    } else {
        feedback.innerText = "🤖 IA Masari: Gasto razonable. ¡Has ganado 10 XP por registrarlo!";
        feedback.style.color = "#10b981";
        actualizarXP(10);
    }
}

// 5. SIMULADOR DE BOLSA (CAMBIA EL PRECIO SOLO)
setInterval(() => {
    let variacion = Math.floor(Math.random() * 4000) - 2000;
    let precioActual = precioBase + variacion;
    const precioDoc = document.getElementById('precio-bolsa');
    if(precioDoc) {
        precioDoc.innerText = "$" + precioActual.toLocaleString();
        precioDoc.style.color = variacion > 0 ? "#10b981" : "#ef4444";
    }
}, 3000);
