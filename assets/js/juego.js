// Función anonima autoinvocada
(() => {
  "use strict";

  let deck = [];

  const tipos = ["C", "D", "H", "S"];
  const especiales = ["A", "J", "Q", "K"];

  let puntosJugador = 0,
    puntosComputaodra = 0;

  //Referencias DOM
  const btnPedir = document.querySelector("#btnPedir");
  const btnDetener = document.querySelector("#btnDetener");
  const btnNuevo = document.querySelector("#btnNuevo");

  const divCartasJugador = document.querySelector("#jugador-cartas");

  const divCartasComputadora = document.querySelector("#computadora-cartas");

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

  //Asignamos el valor correspondiente a cada carta en el mazo
  const valorCarta = (carta) => {
    const valor = carta.substring(0, carta.length - 1);
    return isNaN(valor) ? (valor === "A" ? 11 : 10) : valor * 1;
  };

  const valor = valorCarta(pedirCarta());

  //Turno de la computadora
  const turnoComputadora = (puntosMinimos) => {
    do {
      const carta = pedirCarta();

      puntosComputaodra = puntosComputaodra + valorCarta(carta);
      puntosAcumulados[1].innerText = puntosComputaodra;
      console.log(puntosComputaodra);

      //imagen carta
      const imgCarta = document.createElement("img");
      imgCarta.src = `assets/cartas/${carta}.png`;
      imgCarta.classList.add("carta");
      divCartasComputadora.append(imgCarta);

      if (puntosMinimos > 21) {
        break;
      }
    } while (puntosComputaodra < puntosMinimos && puntosMinimos <= 21);

    setTimeout(() => {
      if (puntosComputaodra === puntosMinimos) {
        alert("Empate");
      } else if (puntosMinimos > 21) {
        alert("Computadora gana");
      } else if (puntosComputaodra > 21) {
        alert("Jugador gana");
      } else {
        alert("Computadora gana");
      }
    });
  };

  // Eventos
  btnPedir.addEventListener("click", () => {
    const carta = pedirCarta();

    puntosJugador = puntosJugador + valorCarta(carta);
    puntosAcumulados[0].innerText = puntosJugador;
    console.log(puntosJugador);

    //imagen carta
    const imgCarta = document.createElement("img");
    imgCarta.src = `assets/cartas/${carta}.png`;
    imgCarta.classList.add("carta");
    divCartasJugador.append(imgCarta);

    if (puntosJugador > 21) {
      
      btnPedir.disabled = true;
      btnDetener.disabled = true;
      turnoComputadora(puntosJugador);
    } else if (puntosJugador === 21) {
      
      btnPedir.disabled = true;
      btnDetener.disabled = true;
      turnoComputadora(puntosJugador);
    }
  });

  btnDetener.addEventListener("click", () => {
    if (puntosJugador <= 21) {
      btnPedir.disabled = true;
      btnDetener.disabled = true;
      turnoComputadora(puntosJugador);
    }
  });

  btnNuevo.addEventListener("click", () => {
    console.clear();
    deck = [];
    deck = crearDeck();
    puntosJugador = 0;
    puntosComputaodra = 0;

    puntosAcumulados[0].innerText = 0;
    puntosAcumulados[1].innerText = 0;

    divCartasComputadora.innerHTML = "";
    divCartasJugador.innerHTML = "";

    btnPedir.disabled = false;
    btnDetener.disabled = false;
  });
})();
