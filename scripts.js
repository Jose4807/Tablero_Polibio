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
    for(let i = 0; i < 6; i++) {
        if (i != 0) {
            htmlBotones += '<br>';
        }
        for(let j = 0; j < 6; j++) {
            htmlBotones += '<button id="boton' + i + j + '" type="button" class="boton-matriz btn btn-danger m-1" data-letra="' + (isNaN(objetoAbecedario["" + i + j]) ? 'letra' : 'numero') + '">' + objetoAbecedario["" + i + j] + '</button>';
        }
    }
    htmlMatriz.innerHTML = htmlBotones;

    // Agregamos los eventos para habilitar/deshabilitar según el switch
    agregarEventosSwitch();
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
}

// Llamamos a la función inicial para definir la matriz
definirMatriz();
