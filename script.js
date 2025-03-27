function calcularMedia() {
    let nome = prompt("Digite o nome do aluno:");
    let nota1 = parseFloat(prompt("Digite a primeira nota:"));
    let nota2 = parseFloat(prompt("Digite a segunda nota:"));
    let nota3 = parseFloat(prompt("Digite a terceira nota:"));
    let nota4 = parseFloat(prompt("Digite a quarta nota:"));

    let media = (nota1 + nota2 + nota3 + nota4) / 4;
    alert(`Aluno: ${nome}\nMédia: ${media.toFixed(2)}`);
}

function calcularOperacoes() {
    let num1 = parseFloat(prompt("Digite o primeiro número:"));
    let num2 = parseFloat(prompt("Digite o segundo número:"));

    let soma = num1 + num2;
    let subtracao = num1 - num2;
    let produto = num1 * num2;
    let divisao = num1 / num2;
    let resto = num1 % num2;

    alert(
        `Soma: ${soma}\n` +
        `Subtração: ${subtracao}\n` +
        `Produto: ${produto}\n` +
        `Divisão: ${divisao.toFixed(2)}\n` +
        `Resto da divisão: ${resto}`
    );
}
