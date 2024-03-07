"use strict";
//Figuras y sus respectivos atributos
const figuras = {
    cuadrado: ['lado'],
    triangulo: ['base', 'altura'],
    rectangulo: ['base', 'altura'],
    circulo: ['radio'],
    trapecio: ["base mayor", "base menor", "altura"],
    rombo: ["diagonal mayor", "diagonal menor"]
};
//Funcion para calcular el area de la figura correspondiente
function calcularArea(figura, event, maxLength) {
    //Obtener el input que se esta modificando y limitar la cantidad de caracteres
    const inputNumber = event.target;
    if (inputNumber.value.length > maxLength) {
        inputNumber.value = inputNumber.value.slice(0, maxLength);
    }
    //Calcular el area de la figura correspondiente
    let area = 0;
    let base = null;
    let altura = null;
    let radio = null;
    let base_menor = null;
    let base_mayor = null;
    let diagonal_mayor = null;
    let diagonal_menor = null;
    let resultado = document.getElementById("resultado");
    switch (figura) {
        case "cuadrado":
            base = document.getElementById("lado");
            area = Math.pow(parseFloat(base.value), 2);
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
        default:
            break;
    }
    //Imprimir el resultado
    if (area > 0) {
        if (area % 1 === 0) {
            resultado.innerHTML = `El área del ${figura} es: ${area.toFixed(0)}`;
        }
        else {
            resultado.innerHTML = `El área del ${figura} es: ${area.toFixed(2)}`;
        }
    }
    else {
        resultado.innerHTML = `Ningún dato puede ser 0 o menor para el ${figura}.`;
    }
}
//Funcion para mostrar el modal con los inputs correspondientes
function modalOption() {
    let figuraValor;
    //Funcion para capitalizar la primera letra de una palabra
    const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);
    //Imprimir las figuras en el HTML
    const imprimirFigura = document.getElementById("figuras");
    for (const figura in figuras) {
        if (Object.prototype.hasOwnProperty.call(figuras, figura)) {
            imprimirFigura.innerHTML += `<img src="assets/img/${figura}.png" alt="${capitalize(figura)}" class="figura" value="${figura}">`;
        }
    }
    //Obtener las figuras y agregarles un evento click
    const figurasHTML = document.querySelectorAll(".figura");
    //Mostrar el modal con los inputs correspondientes
    figurasHTML.forEach((figura) => {
        figura.addEventListener("click", () => {
            figuraValor = figura.getAttribute("value");
            let modal = document.getElementById("modal");
            let modalContent = document.getElementById("modal-content");
            let html = "";
            if (figuraValor && figuras[figuraValor]) {
                html = `
                    <div class="modal-header">
                        <h2>Área de un ${capitalize(figuraValor)}</h2>
                        <span><button class="close">&times;</button></span>
                        </div>
                        <div class="modal-body">
                        `;
                figuras[figuraValor].forEach((input) => {
                    html += `
                            <label for="${input}">${capitalize(input)}: </label>
                                <input type="number" placeholder="${capitalize(input)}" id="${input}" name="${input}" oninput="calcularArea('${figuraValor}', event, 8)" onkeydown="return event.keyCode !== 69 && event.keyCode !== 189 && event.key !== ','" max="99999999">
                                <br/>
                            `;
                });
                html += `
                            </div>
                            <div class="modal-footer">
                                <h3 id="resultado"></h3>
                            </div>`;
            }
            else {
                html = `
                <div class="modal-header">
                    <h2>Figura no encontrada o aún no se puede encontrar su área</h2>
                    <span><button class="close" onclick="closeModal()">&times;</button></span>
                </div>
                `;
            }
            //Imprimir el modal
            modalContent.innerHTML = html;
            modal.style.display = "block";
        });
    });
}
//Funcion para cerrar el modal con un boton x o con la tecla escape
function closeModal(event) {
    var _a;
    if ((event === null || event === void 0 ? void 0 : event.key) === "Escape" ||
        (event instanceof MouseEvent && ((_a = event.target) === null || _a === void 0 ? void 0 : _a.classList.contains("close")))) {
        const modal = document.getElementById("modal");
        modal.style.display = "none";
    }
}
//Eventos para abrir o cerrar el modal
document.addEventListener("DOMContentLoaded", modalOption);
document.addEventListener("keydown", closeModal);
document.addEventListener("click", closeModal);
