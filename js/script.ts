
//Figuras y sus respectivos atributos
const figuras : Record<string, string[]> = {
    cuadrado: ['lado'],
    triangulo: ['base', 'altura'],
    rectangulo: ['base','altura'],
    circulo: ['radio']
}

//Funcion para calcular el area de la figura correspondiente
function calcularArea(figura: string, event : Event, maxLength : number) {
    //Obtener el input que se esta modificando y limitar la cantidad de caracteres
    const inputNumber : HTMLInputElement = event.target as HTMLInputElement;
    if(inputNumber.value.length > maxLength){
        inputNumber.value = inputNumber.value.slice(0, maxLength)
    }

    //Calcular el area de la figura correspondiente
    let area: number = 0;
    let base: HTMLInputElement | null = null;
    let altura: HTMLInputElement | null = null;
    let radio: HTMLInputElement | null = null;
    let resultado: HTMLHeadingElement = document.getElementById("resultado") as HTMLHeadingElement;

    switch (figura) {
        case "cuadrado":
            base = document.getElementById("lado") as HTMLInputElement;
            area = Math.pow(parseFloat(base.value), 2);
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
        default:
            console.log("Figura no encontrada");
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
    //Funcion para capitalizar la primera letra de una palabra
    const capitalize = (s : string) => s.charAt(0).toUpperCase() + s.slice(1);
    
    //Imprimir las figuras en el HTML
    const imprimirFigura : HTMLDivElement | null = document.getElementById("figuras") as HTMLDivElement;
    for(const figura in figuras){
        if(Object.prototype.hasOwnProperty.call(figuras, figura)){
            imprimirFigura.innerHTML += `<img src="assets/img/${figura}.png" alt="${capitalize(figura)}" class="figura" value="${figura}">`
        }
    }

    //Obtener las figuras y agregarles un evento click
    const figurasHTML = document.querySelectorAll(".figura");
    
    //Mostrar el modal con los inputs correspondientes
    figurasHTML.forEach((figura) => {
        figura.addEventListener("click", () => {
            figuraValor = figura.getAttribute("value");
            console.log(figuraValor);
            let modal : HTMLDivElement = document.getElementById("modal") as HTMLDivElement;
            let modalContent : HTMLDivElement = document.getElementById("modal-content") as HTMLDivElement;
            let html : string = "";
            if(figuraValor && figuras[figuraValor]){
                html = `
                    <div class="modal-header">
                        <h2>Área de un ${capitalize(figuraValor)}</h2>
                        <span><button class="close">&times;</button></span>
                        </div>
                        <div class="modal-body">
                        `;
                    figuras[figuraValor].forEach((input) => {
                        html +=`
                            <label for="${input}">${capitalize(input)}: </label>
                                <input type="number" placeholder="${capitalize(input)}" id="${input}" name="${input}" oninput="calcularArea('${figuraValor}', event, 8)" onkeydown="return event.keyCode !== 69 && event.keyCode !== 189 && event.key !== ','" max="99999999">
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
function closeModal(event? : KeyboardEvent | MouseEvent | any | undefined) {
    if (event?.key === "Escape" || event?.target.classList.contains("close")) {
        let modal : HTMLDivElement = document.getElementById("modal") as HTMLDivElement;
        modal.style.display = "none";
    }

}

//Eventos para abrir o cerrar el modal
document.addEventListener("DOMContentLoaded", modalOption);
document.addEventListener("keydown", closeModal);
document.addEventListener("click", closeModal);
