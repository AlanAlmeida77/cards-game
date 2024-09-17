let deck = [];

const tipos = ["C", "D", "H", "S"];
const especiales = ["A", "J", "Q", "K"];

let puntosJugador = 0,
  puntosComputaodra = 0;

//Referencias DOM
const btnPedir = document.querySelector("#btnPedir");
const puntosAcumulados = document.querySelectorAll("small");

// Crear nueva baraja
const crearDeck = () => {
  for (let i = 2; i <= 10; i++) {
    for (let tipo of tipos) {
      deck.push(i + tipo);
    }
  }

  for (let tipo of tipos) {
    for (let esp of especiales) {
      deck.push(esp + tipo);
    }
  }

  //console.log(deck);
  deck = _.shuffle(deck);
  return deck;
};

crearDeck();

//Esta función permite tomar una nueva carta hasta que no quede ninguna en el mazo

const pedirCarta = () => {
  //let carta = _.sample(deck);
  //deck = _.without(deck, carta);

  //console.log("esta es tu carta aleatoria: " + carta);
  //console.log("Mazo restante: ", deck);

  if (deck.length === 0) {
    throw "No hay cartas en el deck";
  }

  const carta = deck.pop();
  return carta;
};

const valorCarta = (carta) => {
  const valor = carta.substring(0, carta.length - 1);
  return isNaN(valor) ? (valor === "A" ? 11 : 10) : valor * 1;
};

const valor = valorCarta(pedirCarta());

// Eventos
btnPedir.addEventListener("click", () => {
  const carta = pedirCarta();

  puntosJugador = puntosJugador + valorCarta(carta);
  puntosAcumulados[0].innerText = puntosJugador;
  console.log(puntosJugador);
});
