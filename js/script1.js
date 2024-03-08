"use strict";

const figuras = {
  cuadrado: ['lado'],
  triangulo: ['base', 'altura'],
  rectangulo: ['base', 'altura'],
  circulo: ['radio'],
  trapecio: ["base mayor", "base menor", "altura"],
  rombo: ["diagonal mayor", "diagonal menor"],
  heptagono: ["lado", "apotema"],
  hexagono: ["lado", "apotema"]
};

function calcularArea(figura, event, maxLength) {
  const inputNumber = event.target;
  
  if (inputNumber.value.length > maxLength) {
    inputNumber.value = inputNumber.value.slice(0, maxLength);
  }

  let area = 0;
  let base = null;
  let lado = null;
  let altura = null;
  let radio = null;
  let base_menor = null;
  let base_mayor = null;
  let diagonal_mayor = null;
  let diagonal_menor = null;
  let apotema = null;

  switch (figura) {
    case "cuadrado":
      lado = document.getElementById("lado");
      area = Math.pow(parseFloat(lado.value), 2);
      break;
    case "circulo":
      radio = document.getElementById("radio");
      area = Math.PI * Math.pow(parseFloat(radio.value), 2);
      break;
    case "triangulo":
      base = document.getElementById("base");
      altura = document.getElementById("altura");
      area = (parseFloat(base.value) * parseFloat(altura.value)) / 2;
      break;
    case "rectangulo":
      base = document.getElementById("base");
      altura = document.getElementById("altura");
      area = parseFloat(base.value) * parseFloat(altura.value);
      break;
    case "trapecio":
      base_mayor = document.getElementById("base mayor");
      base_menor = document.getElementById("base menor");
      altura = document.getElementById("altura");
      area = ((parseFloat(base_mayor.value) + parseFloat(base_menor.value)) * parseFloat(altura.value)) / 2;
      break;
    case "rombo":
      diagonal_mayor = document.getElementById("diagonal mayor");
      diagonal_menor = document.getElementById("diagonal menor");
      area = (parseFloat(diagonal_mayor.value) * parseFloat(diagonal_menor.value)) / 2;
      break;
    case "heptagono":
      lado = document.getElementById("lado");
      apotema = document.getElementById("apotema");
      area = (7 * parseFloat(lado.value) * parseFloat(apotema.value)) / 2;
      break;
    case "hexagono":
      lado = document.getElementById("lado");
      apotema = document.getElementById("apotema");
      area = ((6 * parseFloat(lado.value)) * parseFloat(apotema.value)) / 2;
      break;
    default:
      break;
  }

  if (area > 0) {
    return area % 1 === 0 ? area.toFixed(0) : area.toFixed(2);
  } else {
    return `Ningún dato puede ser 0 o menor para el ${figura}.`;
  }
}

function modalOption() {
const figurasHTML = document.getElementById("figuras");

for (const figura in figuras) {
    if (Object.prototype.hasOwnProperty.call(figuras, figura)) {
        figurasHTML.innerHTML += `<img src="assets/img/${figura}.png" alt="${figura.charAt(0).toUpperCase() + s.slice(1)}" class="figura" value="${figura}">`;
    }
}

const figurasElements = document.querySelectorAll(".figura");

figurasElements.forEach((figura) => {
    figura.addEventListener("click", () => {
        // ... (resto de la lógica de la función modalOption)
    });
});
}

function closeModal(event) {
  if (
    (event === null || event === undefined ? undefined : event.key) === "Escape" ||
    (event instanceof MouseEvent && event.target.classList.contains("close"))
  ) {
    const modal = document.getElementById("modal");
    modal.style.display = "none";
  }
}

// Exporta las funciones que deseas utilizar en las pruebas
module.exports = {
  calcularArea,
  modalOption,
  closeModal,
};
