/* 
    <!-- 
        Como desafío para esta clase desarrollá un algoritmo que cada vez que oprimas un
        botón de la pantalla, surja un prompt() pidiendo un dato que al aceptar lo incluirá
        en un array.
        
        Y otro botón que llame a una función que tenga un for..of para crear un elemento
        HTML por cada uno de los datos ingresados en el array. Y mostrarlos en pantalla.
        
        En clase necesitaremos ese algoritmo para lograr la consigna del Sprint 2.

    -->
 */

document.addEventListener('DOMContentLoaded', iniciarApp);

let arrayNew = [];

function iniciarApp() {
    document.querySelector('#btnOne').addEventListener('click', primerClick);
    document.querySelector('#btnTwo').addEventListener('click', segundoClick);
}

function primerClick() {

    const infoPrompt = prompt('Ingresar datos');
    arrayNew.push(infoPrompt);
}

function segundoClick() {
    
    for(let miArray of arrayNew){
        mostrarInfo(miArray);
    }

    arrayNew = [];
}

function mostrarInfo(mensaje) {

    //Enviar la información al DOM
    const envioInformacion = document.querySelector('#resultado');

    // Crear la información para el DOM
    const createLi = document.createElement('LI');
    createLi.textContent = mensaje;

    // Enviamos la información
    envioInformacion.appendChild(createLi);
}