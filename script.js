let puntosXP = 2500;
let precioActual = 800000;

function actualizarXP(cantidad) {
    puntosXP += cantidad;
    const xpDisplay = document.getElementById('xp-count');
    const xpBar = document.getElementById('xp-bar-inner');
    
    if(xpDisplay) xpDisplay.innerText = puntosXP.toLocaleString();
    if(xpBar) {
        let porcentaje = Math.min((puntosXP / 10000) * 100, 100);
        xpBar.style.width = porcentaje + "%";
    }
}

function comprarAccion() {
    actualizarXP(100);
    const historial = document.getElementById('lista-transacciones');
    const pLabel = document.getElementById('precio-bolsa').innerText;
    const ahora = new Date().toLocaleTimeString();
    
    const item = `<p style="border-bottom: 1px solid #233554; padding: 5px 0;">
        <span style="color: #10b981;">●</span> Compraste $MAS a ${pLabel} <small style="float:right;">${ahora}</small>
    </p>`;
    
    if (historial.innerHTML.includes("No hay movimientos")) {
        historial.innerHTML = item;
    } else {
        historial.innerHTML = item + historial.innerHTML;
    }
}

// NUEVA FUNCIÓN PARA VENDER
function venderAccion() {
    actualizarXP(50); // Menos XP por vender, pero igual cuenta como actividad
    const historial = document.getElementById('lista-transacciones');
    const pLabel = document.getElementById('precio-bolsa').innerText;
    const ahora = new Date().toLocaleTimeString();
    
    const item = `<p style="border-bottom: 1px solid #233554; padding: 5px 0;">
        <span style="color: #ef4444;">●</span> Vendiste $MAS a ${pLabel} <small style="float:right;">${ahora}</small>
    </p>`;
    
    if (historial.innerHTML.includes("No hay movimientos")) {
        historial.innerHTML = item;
    } else {
        historial.innerHTML = item + historial.innerHTML;
    }
    alert("Venta realizada con éxito.");
}

function completarClase(nombre, recompensa) {
    actualizarXP(recompensa);
    const historial = document.getElementById('lista-transacciones');
    const ahora = new Date().toLocaleTimeString();
    
    const log = `<p style="border-bottom: 1px solid #233554; padding: 5px 0;">
        <span style="color: #facc15;">⭐ LOGRO:</span> ${nombre} <small style="float:right;">${ahora}</small>
    </p>`;
    
    if (historial.innerHTML.includes("No hay movimientos")) {
        historial.innerHTML = log;
    } else {
        historial.innerHTML = log + historial.innerHTML;
    }
    alert("¡Felicidades! Ganaste " + recompensa + " XP");
}

function analizarGasto() {
    const monto = document.getElementById('gasto-input').value;
    const res = document.getElementById('ia-resultado');
    if (monto > 1000) {
        res.innerText = "🤖 IA: Gasto excesivo detectado. ¡Cuidado!";
        res.style.color = "#ef4444";
    } else {
        res.innerText = "🤖 IA: Gasto bajo control. ¡Bien hecho!";
        res.style.color = "#10b981";
        actualizarXP(10);
    }
}

setInterval(() => {
    let cambio = Math.floor(Math.random() * 5000) - 2000;
    precioActual += cambio;
    const pDoc = document.getElementById('precio-bolsa');
    const tDoc = document.getElementById('trend-label');
    
    if(pDoc) {
        pDoc.innerText = "$" + precioActual.toLocaleString();
        if(cambio > 0) {
            pDoc.style.color = "#10b981";
            tDoc.innerText = "▲ Subiendo";
            tDoc.style.color = "#10b981";
        } else {
            pDoc.style.color = "#ef4444";
            tDoc.innerText = "▼ Bajando";
            tDoc.style.color = "#ef4444";
        }
    }
}, 3000);
