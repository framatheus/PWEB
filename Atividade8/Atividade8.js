let total = 0;
let limite = 45;

let somaIdades = 0;
let maisVelha = 0;
let maisNova = Infinity;

let qtdPessimo = 0;
let qtdOtimoBom = 0;

let mulheres = 0;
let homens = 0;
let outros = 0;

function adicionar() {
    if (total >= limite) {
        alert("Já foram cadastradas 45 pessoas!");
        return;
    }

    let idade = Number(document.getElementById("idade").value);
    let sexo = document.getElementById("sexo").value;
    let opiniao = Number(document.getElementById("opiniao").value);

    if (!idade) {
        alert("Digite uma idade válida!");
        return;
    }

    total++;

    somaIdades += idade;

    if (idade > maisVelha) maisVelha = idade;
    if (idade < maisNova) maisNova = idade;

    if (opiniao === 1) qtdPessimo++;
    if (opiniao === 3 || opiniao === 4) qtdOtimoBom++;

    if (sexo === "feminino") mulheres++;
    else if (sexo === "masculino") homens++;
    else outros++;

    document.getElementById("idade").value = "";
}

function finalizar() {
    if (total === 0) {
        alert("Nenhum dado inserido!");
        return;
    }

    let media = somaIdades / total;
    let porcentagem = (qtdOtimoBom / total) * 100;

    document.getElementById("resultado").innerHTML =
        "Média de idade: " + media.toFixed(2) + "<br>" +
        "Mais velha: " + maisVelha + "<br>" +
        "Mais nova: " + maisNova + "<br>" +
        "Péssimo: " + qtdPessimo + "<br>" +
        "Ótimo/Bom: " + porcentagem.toFixed(2) + "%<br>" +
        "Mulheres: " + mulheres + "<br>" +
        "Homens: " + homens + "<br>" +
        "Outros: " + outros;
}