// VARIABLES DE ESTADO
let xp = 2500;
let saldoFicticio = 1000000; // Un millón para empezar el simulador

// 1. FUNCIÓN PARA SUMAR PUNTOS XP
function sumarXP(cantidad) {
    xp += cantidad;
    const xpDisplay = document.getElementById('xp-count');
    if(xpDisplay) {
        xpDisplay.innerText = xp.toLocaleString();
        // Animación simple de color al ganar puntos
        xpDisplay.style.color = "#64ffda";
        setTimeout(() => xpDisplay.style.color = "#ccd6f6", 500);
    }
    console.log("Ganaste " + cantidad + " XP en Masari.");
}

// 2. LÓGICA DE LA IA DE AHORRO
function analizarIA() {
    const montoInput = document.getElementById('gasto');
    const output = document.getElementById('ia-output');
    
    if(!montoInput || !output) return;

    const monto = parseFloat(montoInput.value);

    if (isNaN(monto) || monto <= 0) {
        output.innerText = "🤖 Por favor, ingresa un monto válido para que Masari te ayude.";
        output.style.color = "#ffffff";
    } else if (monto > 500) {
        output.innerText = "🤖 IA Masari: ¡Cuidado! Este gasto representa una gran parte de tu presupuesto. ¿Es realmente necesario?";
        output.style.color = "#ff4d4d";
    } else {
        output.innerText = "🤖 IA Masari: ¡Excelente control! Has ganado 15 XP por registrar tus finanzas.";
        output.style.color = "#00ff88";
        sumarXP(15);
    }
}

// 3. SIMULADOR DE BOLSA (MOVIMIENTO DE PRECIOS)
function actualizarBolsa() {
    const precioElemento = document.getElementById('precio');
    if(!precioElemento) return;

    // Generar un cambio aleatorio entre -$5000 y +$5000
    const fluctuacion = Math.floor(Math.random() * 10000) - 5000;
    const precioBase = 800000;
    const nuevoPrecio = precioBase + fluctuacion;

    precioElemento.innerText = "$" + nuevoPrecio.toLocaleString();
    
    // Cambiar color según si sube o baja (opcional)
    precioElemento.style.color = fluctuacion > 0 ? "#00ff88" : "#ff4d4d";
}

// Iniciar el movimiento de la bolsa cada 3 segundos
setInterval(actualizarBolsa, 3000);

// Mensaje de bienvenida en consola
console.log("Masari Engine: Cargado correctamente. ¡A aprender finanzas!");
