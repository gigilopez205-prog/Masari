let puntosXP = 2500;
let precioActual = 800000;

function actualizarXP(cantidad) {
    puntosXP += cantidad;
    document.getElementById('xp-count').innerText = puntosXP.toLocaleString();
    
    // La barra se llena hasta los 5000 XP
    let porcentaje = (puntosXP / 5000) * 100;
    document.getElementById('xp-bar-inner').style.width = porcentaje + "%";
}

function comprarAccion() {
    actualizarXP(100);
    
    // Añadir al historial
    const historial = document.getElementById('lista-transacciones');
    const ahora = new Date().toLocaleTimeString();
    
    // Crear el mensaje del movimiento
    const nuevoMovimiento = `<p style="border-bottom: 1px solid #233554; padding: 5px 0;">
        <span style="color: #10b981;">✔ COMPRA:</span> 1 acción $MAS a ${document.getElementById('precio-bolsa').innerText} 
        <small style="float:right;">${ahora}</small>
    </p>`;
    
    // Si es la primera vez, borramos el mensaje de "No hay movimientos"
    if (historial.innerText.includes("No hay movimientos")) {
        historial.innerHTML = nuevoMovimiento;
    } else {
        historial.innerHTML = nuevoMovimiento + historial.innerHTML;
    }
}

function analizarGasto() {
    const monto = document.getElementById('gasto-input').value;
    const feedback = document.getElementById('ia-resultado');

    if (monto > 1000) {
        feedback.innerText = "🤖 IA Masari: ¡Alto! Ese gasto es excesivo. Podrías haber ganado XP invirtiendo eso.";
        feedback.style.color = "#ef4444";
    } else {
        feedback.innerText = "🤖 IA Masari: Registro exitoso. Has ganado 10 XP.";
        feedback.style.color = "#10b981";
        actualizarXP(10);
    }
}

// Simulador de precios real
setInterval(() => {
    let cambio = Math.floor(Math.random() * 6000) - 2500;
    precioActual += cambio;
    
    const precioDoc = document.getElementById('precio-bolsa');
    const trendDoc = document.getElementById('trend-label');
    
    if(precioDoc) {
        precioDoc.innerText = "$" + precioActual.toLocaleString();
        if(cambio > 0) {
            precioDoc.style.color = "#10b981";
            trendDoc.innerText = "▲ Subiendo";
            trendDoc.style.color = "#10b981";
        } else {
            precioDoc.style.color = "#ef4444";
            trendDoc.innerText = "▼ Bajando";
            trendDoc.style.color = "#ef4444";
        }
    }
}, 3000);
