function converterNumero(valor) {
    return parseFloat(valor.replace(",", "."));
}

function calcularIMC(peso, altura) {
    return peso / (altura * altura);
}

function classificarIMC(imc) {
    let classificacao = "";
    let grau = "";

    if (imc < 18.5) {
        classificacao = "Magreza";
        grau = "0";
    } else if (imc < 25) {
        classificacao = "Normal";
        grau = "0";
    } else if (imc < 30) {
        classificacao = "Sobrepeso";
        grau = "I";
    } else if (imc < 40) {
        classificacao = "Obesidade";
        grau = "II";
    } else {
        classificacao = "Obesidade Grave";
        grau = "III";
    }

    return {
        classificacao: classificacao,
        grau: grau
    };
}

function mostrarResultado(imc, classificacao, grau) {
    document.getElementById("valorIMC").textContent = imc.toFixed(2);
    document.getElementById("classificacao").textContent = classificacao;
    document.getElementById("grauObesidade").textContent = grau;

    document.getElementById("resultado").classList.remove("oculto");
}

const formIMC = document.getElementById("formIMC");

formIMC.addEventListener("submit", function(event) {
    event.preventDefault();

    let altura = converterNumero(document.getElementById("altura").value);
    let peso = converterNumero(document.getElementById("peso").value);

    if (altura <= 0 || peso <= 0 || isNaN(altura) || isNaN(peso)) {
        alert("Por favor, informe valores válidos para altura e peso.");
        return;
    }

    let imc = calcularIMC(peso, altura);
    let resultadoClassificacao = classificarIMC(imc);

    mostrarResultado(
        imc,
        resultadoClassificacao.classificacao,
        resultadoClassificacao.grau
    );
});