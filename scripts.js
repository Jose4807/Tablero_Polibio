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

    // Creamos la matriz con los botones
    for (let i = 0; i < 6; i++) {
        if (i != 0) {
            htmlBotones += '<br>';
        }
        for (let j = 0; j < 6; j++) {
            htmlBotones += '<button id="boton' + i + j + '" type="button" class="boton-matriz btn btn-danger m-1" data-letra="' + (isNaN(objetoAbecedario["" + i + j]) ? 'letra' : 'numero') + '">' + objetoAbecedario["" + i + j] + '</button>';
        }
    }
    htmlMatriz.innerHTML = htmlBotones;

    // Agregamos los eventos para habilitar/deshabilitar según el switch
    agregarEventosSwitch();
    agregarEventosBotones(objetoAbecedario);
}

function agregarEventosBotones(objetoAbecedario) {
    const botones = document.querySelectorAll('.boton-matriz');
    const valorCifrado = document.getElementById('valorCifrado');
    const valorDescifrado = document.getElementById('valorDescifrado');

    let seleccionFila = true; // Controlar si estamos en la fila o columna
    let coordenadaFila = ''; // Guardar la coordenada de la fila seleccionada

    botones.forEach(boton => {
        boton.addEventListener('click', function() {
            const id = this.id;
            const letra = objetoAbecedario[id.substr(5)]; // Obtener letra o número correspondiente
            const coordenadas = id.substr(5); // Obtener coordenadas del botón

            if (document.getElementById('switchMode').checked) { // Modo letras
                valorCifrado.value += coordenadas.trim(); // Agregar coordenadas sin espacios
                valorDescifrado.value += letra.trim(); // Agregar letra sin espacios
            } else { // Modo números
                const fila = id[5]; // Obtener fila del botón
                const columna = id[6]; // Obtener columna del botón

                if (seleccionFila) {
                    // Desactivar toda la fila de números
                    for (let j = 0; j < 6; j++) {
                        document.getElementById('boton' + fila + j).disabled = true;
                    }

                    // Habilitar solo los botones de la primera columna (columna 0)
                    for (let i = 1; i < 6; i++) { // Filas de letras
                        document.getElementById('boton' + i + '0').disabled = false; // Habilitar columna 0
                    }

                    // Guardamos la coordenada de la fila seleccionada
                    coordenadaFila = fila;

                    seleccionFila = false; // Pasamos a la selección de columna
                } else {
                    // Desactivar la primera columna
                    for (let i = 1; i < 6; i++) {
                        document.getElementById('boton' + i + '0').disabled = true; // Desactivar columna 0
                    }

                    // Habilitar nuevamente la primera fila
                    for (let j = 0; j < 6; j++) {
                        document.getElementById('boton' + '0' + j).disabled = false; // Habilitar fila 0
                    }

                    // Combinar la coordenada de la fila seleccionada con la columna actual
                    const coordenadaCompleta = coordenadaFila + columna;

                    // Mostrar coordenadas combinadas en "Valor Cifrado"
                    valorCifrado.value += coordenadaCompleta.trim(); // Evitar espacios en blanco

                    // Buscar la letra correspondiente en la matriz (objetoAbecedario)
                    const letraDescifrada = objetoAbecedario[coordenadaCompleta];
                    valorDescifrado.value += letraDescifrada.trim(); // Evitar espacios en blanco

                    // Resetear para volver a la selección de fila
                    seleccionFila = true;
                }
            }
        });
    });
}



function agregarEventosSwitch() {
    const switchElement = document.getElementById('switchMode');
    switchElement.addEventListener('change', function() {
        const botones = document.querySelectorAll('.boton-matriz');

        botones.forEach(boton => {
            const tipo = boton.getAttribute('data-letra');
            if (this.checked) {
                // Si el switch está activado, se habilitan las letras y se deshabilitan los números
                if (tipo === 'numero') {
                    boton.disabled = true;
                    boton.classList.remove('btn-primary');
                    boton.classList.add('btn-secondary');
                } else {
                    boton.disabled = false;
                    boton.classList.remove('btn-secondary');
                    boton.classList.add('btn-primary');
                }
            } else {
                // Si el switch está desactivado, se habilitan los números y se deshabilitan las letras
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
    });

    // Trigger inicial para que empiece con los números habilitados
    switchElement.dispatchEvent(new Event('change'));

    // Solo activar la fila de números
    for (let j = 0; j < 6; j++) {
        document.getElementById('boton' + '0' + j).disabled = false; // Activar fila de números
    }
    for (let i = 1; i < 6; i++) {
        for (let j = 0; j < 6; j++) {
            document.getElementById('boton' + i + j).disabled = true; // Desactivar filas de letras
        }
    }
}

// Llamamos a la función inicial para definir la matriz
definirMatriz();
