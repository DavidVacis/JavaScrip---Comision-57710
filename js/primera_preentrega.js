let numero_adivinar = Math.floor(Math.random() * 20) + 1;
// Acumula intentos del usuario
let intentos = 0;
// Bucle guardar los intentos
while (intentos < 5) {
  let numero_ingresado = parseInt(prompt("Introduce un número entre 1 y 20: "));

  if (isNaN(numero_ingresado) || numero_ingresado < 1 || numero_ingresado > 20) {
    alert("Error: Ingresa un número válido entre 1 y 20.");
    continue;
  }
  intentos++;

  if (numero_ingresado === numero_adivinar) {
    alert("¡Felicidades! Adivinaste el número en "+ intentos +" intentos.");
    break;
  } else if (numero_ingresado < numero_adivinar) {
    alert("Tu número es demasiado bajo. Intenta de nuevo.");
  } else {
    alert("Tu número es demasiado alto. Intenta de nuevo.");
  }
}

if (intentos === 5) {
  alert("No adivinaste en tus 5 intentos. El número secreto era: " + numero_adivinar);
}
