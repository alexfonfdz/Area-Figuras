
//Figuras y sus respectivos atributos
const figuras : Record<string, string[]> = {
    cuadrado: ['lado'],
    triangulo: ['base', 'altura'],
    rectangulo: ['base','altura'],
    circulo: ['radio'],
    trapecio: ["base mayor", "base menor", "altura"],
    rombo: ["diagonal mayor", "diagonal menor"],
    heptagono: ["lado", "apotema"],
    hexagono: ["lado", "apotema"]
}

//Funcion para calcular el area de la figura correspondiente
function calcularArea(figura: string, event : Event, maxLength : number) {
    //Obtener el input que se esta modificando y limitar la cantidad de caracteres
    const inputNumber : HTMLInputElement = event.target as HTMLInputElement;
    if(inputNumber.value.length > maxLength){
        inputNumber.value = inputNumber.value.slice(0, maxLength)
    }

    //Calcular el area de la figura correspondiente
    let area = 0;
    let base: HTMLInputElement | null = null;
    let lado: HTMLInputElement | null = null;
    let altura: HTMLInputElement | null = null;
    let radio: HTMLInputElement | null = null;
    let base_menor: HTMLInputElement | null = null;
    let base_mayor: HTMLInputElement | null = null;
    let diagonal_mayor: HTMLInputElement | null = null;
    let diagonal_menor: HTMLInputElement | null = null;
    let apotema: HTMLInputElement | null = null;
    const resultado: HTMLHeadingElement = document.getElementById("resultado") as HTMLHeadingElement;

    switch (figura) {
        case "cuadrado":
            lado = document.getElementById("lado") as HTMLInputElement;
            area = Math.pow(parseFloat(lado.value), 2);
            break;
        case "circulo":
            radio = document.getElementById("radio") as HTMLInputElement;
            area = Math.PI * Math.pow(parseFloat(radio.value), 2);
            break;
        case "triangulo":
            base = document.getElementById("base") as HTMLInputElement;
            altura = document.getElementById("altura") as HTMLInputElement;
            area = (parseFloat(base.value) * parseFloat(altura.value)) / 2;
            break;
        case "rectangulo":
            base = document.getElementById("base") as HTMLInputElement;
            altura = document.getElementById("altura") as HTMLInputElement;
            area = parseFloat(base.value) * parseFloat(altura.value);
            break;
        case "trapecio":
            base_mayor = document.getElementById("base mayor") as HTMLInputElement;
            base_menor = document.getElementById("base menor") as HTMLInputElement;
            altura = document.getElementById("altura") as HTMLInputElement;
            area = ((parseFloat(base_mayor.value) + parseFloat(base_menor.value))*parseFloat(altura.value))/2;
            break;
        case "rombo":
            diagonal_mayor = document.getElementById("diagonal mayor") as HTMLInputElement;
            diagonal_menor = document.getElementById("diagonal menor") as HTMLInputElement;
            area = (parseFloat(diagonal_mayor.value) * parseFloat(diagonal_menor.value))/2;
            break;
        case "heptagono":
            lado = document.getElementById("lado") as HTMLInputElement;
            apotema = document.getElementById("apotema") as HTMLInputElement;
            area = (7 * parseFloat(lado.value) * parseFloat(apotema.value))/2;
            break;
        case "hexagono":
            lado = document.getElementById("lado") as HTMLInputElement;
            apotema = document.getElementById("apotema") as HTMLInputElement;
            area = ((6 *parseFloat(lado.value)) * parseFloat(apotema.value))/2;
            break;
        default:
            
            break;
    }
    
    //Imprimir el resultado
    if (area > 0) {
        if (area % 1 === 0) {
            resultado.innerHTML = `El área del ${figura} es: ${area.toFixed(0)}`;
        } else {
            resultado.innerHTML = `El área del ${figura} es: ${area.toFixed(2)}`;
        }
    } else {
        resultado.innerHTML = `Ningún dato puede ser 0 o menor para el ${figura}.`;
    }
}


//Funcion para mostrar el modal con los inputs correspondientes
function modalOption(){

    let figuraValor : string | null;
    
    //Imprimir las figuras en el HTML
    const imprimirFigura : HTMLDivElement | null = document.getElementById("figuras") as HTMLDivElement;
    for(const figura in figuras){
        const figuraCapitalized = figura?.charAt(0).toUpperCase() + figura?.slice(1);
        if(Object.prototype.hasOwnProperty.call(figuras, figura)){
            imprimirFigura.innerHTML += `<img src="assets/img/${figura}.png" alt="${figuraCapitalized}" class="figura" value="${figura}">`
        }
    }

    //Obtener las figuras y agregarles un evento click
    const figurasHTML = document.querySelectorAll(".figura");
    
    //Mostrar el modal con los inputs correspondientes
    figurasHTML.forEach((figura) => {
        figura.addEventListener("click", () => {
            figuraValor = figura.getAttribute("value");
            
            const modal : HTMLDivElement = document.getElementById("modal") as HTMLDivElement;
            const modalContent : HTMLDivElement = document.getElementById("modal-content") as HTMLDivElement;
            let html  = "";
            if(figuraValor && figuras[figuraValor]){
                const figuraValorCapitlized = figuraValor.charAt(0).toUpperCase() + figuraValor.slice(1);
                html = `
                    <div class="modal-header">
                        <h2>Área de un ${figuraValorCapitlized}</h2>
                        <span><button class="close">&times;</button></span>
                        </div>
                        <div class="modal-body">
                        `;
                    figuras[figuraValor].forEach((input) => {
                        const inputCapitalized = input.charAt(0).toUpperCase() + input.slice(1);
                        html +=`
                            <label for="${input}">${inputCapitalized}: </label>
                                <input type="number" placeholder="${inputCapitalized}" id="${input}" name="${input}" oninput="calcularArea('${figuraValor}', event, 8)" onkeydown="return event.keyCode !== 69 && event.keyCode !== 189 && event.key !== ','" max="99999999" min="0.1" step="any" required>
                                <br/>
                            `});
                        html += `
                            </div>
                            <div class="modal-footer">
                                <h3 id="resultado"></h3>
                            </div>`;
                            
            }else{
                html = `
                <div class="modal-header">
                    <h2>Figura no encontrada o aún no se puede encontrar su área</h2>
                    <span><button class="close" onclick="closeModal()">&times;</button></span>
                </div>
                `;
            }
            //Imprimir el modal
            modalContent.innerHTML = html;
            modal.style.display = "block"        

        });
    });
}



//Funcion para cerrar el modal con un boton x o con la tecla escape
function closeModal(event?: KeyboardEvent | MouseEvent) {
    if ((event as KeyboardEvent)?.key === "Escape" ||
      (event instanceof MouseEvent && (event.target as HTMLElement)?.classList.contains("close"))) {
      const modal = document.getElementById("modal") as HTMLDivElement;
      modal.style.display = "none";
    }
  }
  

//Eventos para abrir o cerrar el modal
document.addEventListener("DOMContentLoaded", modalOption);
document.addEventListener("keydown", closeModal);
document.addEventListener("click", closeModal);
