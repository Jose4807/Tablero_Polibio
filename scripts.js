let primerNumero = ''; //Para modo numeros y guardar el primer numero seleccioando

function definirMatriz() {
    var htmlMatriz = document.getElementById("matriz");
    var htmlBotones = '';
    var objetoAbecedario = {
        "00": " ", "01": "1", "02": "2", "03": "3", "04": "4", "05": "5",
        "10": "1", "11": "A", "12": "B", "13": "C", "14": "D", "15": "E",
        "20": "2", "21": "F", "22": "G", "23": "H", "24": "I/J", "25": "K",
        "30": "3", "31": "L", "32": "M", "33": "N", "34": "O", "35": "P",
        "40": "4", "41": "Q", "42": "R", "43": "S", "44": "T", "45": "U",
        "50": "5", "51": "V", "52": "W", "53": "X", "54": "Y", "55": "Z"
    };

    // Crear la matriz de botones
    for (let i = 0; i < 6; i++) {
        if (i !== 0) {
            htmlBotones += '<br>';    //template literals//Interpolacion de variables p/insertar directamente variables
        }                             //IsNaN para verificar si el valor no es un numero
        for (let j = 0; j < 6; j++) { //Determinamos si es letra o numero
            const tipoDato = isNaN(objetoAbecedario["" + i + j]) ? 'letra' : 'numero'; 
            htmlBotones += `<button id="boton${i}${j}" type="button" class="boton-matriz btn btn-danger m-1" data-letra="${tipoDato}">${objetoAbecedario["" + i + j]}</button>`;
        }
    }
    htmlMatriz.innerHTML = htmlBotones; //botones generados se anaden a la matriz

    // Agregar eventos a los botones y al switch
    agregarEventosSwitch();
    agregarEventosBotones(objetoAbecedario);
}

function agregarEventosBotones(objetoAbecedario) {
    const botones = document.querySelectorAll('.boton-matriz');
    const valorCifrado = document.getElementById('valorCifrado');
    const valorDescifrado = document.getElementById('valorDescifrado');

    botones.forEach(boton => {
        boton.addEventListener('click', function() {
            const id = this.id;
            const coordenadas = id.substr(5); // Obtener las coordenadas del botón

            if (document.getElementById('switchMode').checked) { // Modo letras
                const letra = objetoAbecedario[coordenadas];
                const coordenadasF = coordenadas[1] + coordenadas[0]; // 1,0 Para mostrar las coordenadas correctamente
                valorCifrado.value += coordenadasF; // Agregar coordenadas a valorCifrado
                valorDescifrado.value += letra.trim(); // Agregar la letra correspondiente a valorDescifrado
            } else { // Modo números
                const numero = objetoAbecedario[coordenadas];

                // Primer clic en la fila de números
                if (!primerNumero) {
                    if (/^\d+$/.test(numero)) {
                        primerNumero = coordenadas[1]; // Guardar el número seleccionado (columna)
                        desactivarFilaActivarPrimeraColumna(); // Desactivar fila y activar primera columna
                    }
                } else {
                    // Segundo clic, en la columna 1
                    const segundoNumero = coordenadas[0]; // Obtener el número de la fila
                    const nuevaCoordenada = primerNumero + segundoNumero; // Invertir las coordenadas para mostrar

                    // Usar la coordenada original (segundoNumero + primerNumero) para buscar la letra correcta
                    const coordenadaOriginal = segundoNumero + primerNumero;
                    const letraCorrespondiente = objetoAbecedario[coordenadaOriginal];

                    valorCifrado.value += nuevaCoordenada; // Mostrar las coordenadas cifradas (invertidas)
                    valorDescifrado.value += letraCorrespondiente.trim(); // Mostrar la letra correcta

                    // Resetear para la siguiente selección
                    primerNumero = '';
                    resetearFilaYColumna(); // Volver a desactivar columna y activar fila
                }
            }
        });
    });
}

function desactivarFilaActivarPrimeraColumna() {
    // Desactivar toda la primera fila (fila de números)
    for (let j = 0; j < 6; j++) {
        document.getElementById(`boton0${j}`).disabled = true;
    }

    // Activar la columna 1
    for (let i = 1; i < 6; i++) {
        document.getElementById(`boton${i}0`).disabled = false;
    }
}

function resetearFilaYColumna() {
    // Reactivar toda la primera fila (fila de números)
    for (let j = 0; j < 6; j++) {
        document.getElementById(`boton0${j}`).disabled = false;
    }

    // Desactivar todas las columnas de letras/números
    for (let i = 1; i < 6; i++) {
        for (let j = 0; j < 6; j++) {
            document.getElementById(`boton${i}${j}`).disabled = true;
        }
    }
}

function agregarEventosSwitch() {
    const switchElement = document.getElementById('switchMode');
    switchElement.addEventListener('change', function() {
        const botones = document.querySelectorAll('.boton-matriz');

        botones.forEach(boton => {
            const tipo = boton.getAttribute('data-letra');
            if (this.checked) { // Modo letras activado
                if (tipo === 'numero') {
                    boton.disabled = true;
                    boton.classList.remove('btn-primary');
                    boton.classList.add('btn-secondary');
                } else {
                    boton.disabled = false;
                    boton.classList.remove('btn-secondary');
                    boton.classList.add('btn-primary');
                }
            } else { // Modo números activado
                if (tipo === 'letra') {
                    boton.disabled = true;
                    boton.classList.remove('btn-primary');
                    boton.classList.add('btn-secondary');
                } else {
                    boton.disabled = false;
                    boton.classList.remove('btn-secondary');
                    boton.classList.add('btn-primary');
                }
            }
        });

        // Inicializar en modo números (fila de números activada)
        if (!this.checked) {
            resetearFilaYColumna();
        }
    });

    // Inicializar en modo números (fila de números activada)
    switchElement.dispatchEvent(new Event('change'));
}

// Inicializar la matriz al cargar la página
definirMatriz();

