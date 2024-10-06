function definirMatriz(){
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
    
    

    for(let i=0; i<6; i++){
        if (i != 0){
            htmlBotones = htmlBotones + '<br>';
        }
        for(let j=0; j<6; j++){
            //Para visualizar
            //htmlBotones = htmlBotones + '<button type="button" class="btn btn-danger m-1">'+i+j+'</button>';
            htmlBotones = htmlBotones + '<button id="boton'+ i + j +'" type="button" class="boton-matriz btn btn-danger m-1">'+ objetoAbecedario[""+i+j] +'</button>';

        }
    }
    htmlMatriz.innerHTML = htmlBotones;
}
definirMatriz();