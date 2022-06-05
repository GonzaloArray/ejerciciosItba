
document.addEventListener('DOMContentLoaded', iniciarApp);

// Ubicación
const resultados = document.querySelector('#resultados');
// Vector de Gastos
let gastos = [];

function iniciarApp() {
    document.querySelector('#formulario').addEventListener('submit', enviarInforme);
}

function enviarInforme(e) {
    e.preventDefault();

    const texto = document.querySelector('#texto').value;
    const numero = parseInt(document.querySelector('#numero').value);
    
    if (texto === '' || isNaN(numero)) {
        mostrarMensaje('Ingrese valores validos');
        return;
    }
    agregarGastos(texto, numero);
}

function mostrarMensaje(mensaje) {
    const existeError = document.querySelector('.errorMensaje');

    if (!existeError) { 
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('errorMensaje');
    
        // Mensaje de error
        divMensaje.textContent = mensaje;
        resultados.appendChild(divMensaje);    

        setTimeout(() => {
            divMensaje.remove();
        }, 3000);
    }
}

function agregarGastos(texto, numero) {
    const objGastos = {
        texto,
        numero,
        id: Date.now()
    }
    gastos.push(objGastos);
    
    mostrarGastos();
}

function mostrarGastos() {

    limpiarHTML();
    

    gastos.forEach( gasto => {
        
        const {texto, numero, id} = gasto;
        
        //Vamos a crear un li
        const nuevoGasto = document.createElement('LI');
        nuevoGasto.className = 'estilosLi';
        nuevoGasto.dataset.id = id;
        
        //Agregar el html del gasto
        nuevoGasto.innerHTML = `
        ${texto}: <span class="cantindadEstilo"> $ ${numero} </span>
        `;

        const btnEliminar = document.createElement('button');
        btnEliminar.textContent = 'Eliminar'
        btnEliminar.onclick = () => {
            eliminarProducto(id);
        }
        
        nuevoGasto.appendChild(btnEliminar);
        //agregar html
        resultados.appendChild(nuevoGasto);
        
    });
    mostrarTotal(gastos);
}

function mostrarTotal(gastosTotales) {
    let total = 0;
    let cantidad = 0;

    // Nos permite calcular el total a pagar
    gastosTotales.forEach(articulo => {
        total += articulo.numero;
        cantidad++;
    });
    
    mostrarHtml(total, cantidad);
}

function mostrarHtml(total = 0, cantidad = 0){
    
    const mostrarTotal = document.createElement('div');
    mostrarTotal.classList.add('mostrarTotal');
    mostrarTotal.textContent = 'Total: ';

    const totalSpan = document.createElement('span');
    totalSpan.classList.add('parrafoSpan');
    totalSpan.textContent = `$${total}`;
    
    const mostrarPago = document.createElement('div');
    mostrarPago.classList.add('mostrarTotales');
    mostrarPago.textContent = 'A cada uno le toca aportar: ';

    const pagoMostrar = document.createElement('span');
    pagoMostrar.classList.add('parrafoSpan');
    pagoMostrar.textContent = `$${total/cantidad}`;


    mostrarTotal.appendChild(totalSpan);
    mostrarPago.appendChild(pagoMostrar);
    
    resultados.appendChild(mostrarTotal);
    resultados.appendChild(mostrarPago);
}

// Elimina el html viejo
function limpiarHTML() {
    resultados.textContent = '';
}

function eliminarProducto(id) {
    const resultado = gastos.filter(articulo => articulo.id !== id);
    gastos = [...resultado];

    if (gastos.length !== -1) {
        actualizarResumen();
    }
}

function actualizarResumen() {
    
    limpiarHTML();

    gastos.forEach( articulo =>{

        const { texto, numero, id } = articulo;

         //Vamos a crear un li
         const nuevoGasto = document.createElement('LI');
         nuevoGasto.className = 'estilosLi';
         nuevoGasto.dataset.id = id;
         
         //Agregar el html del gasto
         nuevoGasto.innerHTML = `
         ${texto}: <span class="cantindadEstilo"> $ ${numero} </span>
         `;
 
         const btnEliminar = document.createElement('button');
         btnEliminar.textContent = 'Eliminar'
         btnEliminar.onclick = () => {
             eliminarProducto(id);
         }
         
         nuevoGasto.appendChild(btnEliminar);
         //agregar html
         resultados.appendChild(nuevoGasto);
    });

    mostrarTotal(gastos);
}