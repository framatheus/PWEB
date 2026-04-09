function calcularOperacoes() {
  let num1 = parseFloat(document.getElementById("num1").value);
  let num2 = parseFloat(document.getElementById("num2").value);

  if (isNaN(num1) || isNaN(num2)) {
    alert("Digite os dois números");
    return;
  }

  let confirmar = confirm("Deseja calcular as operações com os números informados?");

  if (confirmar) {
    let soma = num1 + num2;
    let subtracao = num1 - num2;
    let produto = num1 * num2;
    let divisao;
    let resto;

    if (num2 === 0) {
      divisao = "Não é possível dividir por zero";
      resto = "Não existe resto com divisor zero";
    } else {
      divisao = (num1 / num2).toFixed(2);
      resto = num1 % num2;
    }

    document.getElementById("resultadoOperacoes").innerHTML =
      "Soma: <strong>" + soma + "</strong><br>" +
      "Subtração: <strong>" + subtracao + "</strong><br>" +
      "Produto: <strong>" + produto + "</strong><br>" +
      "Divisão: <strong>" + divisao + "</strong><br>" +
      "Resto da divisão: <strong>" + resto + "</strong>";

    alert("Operações calculadas!");
  } else {
    alert("Operação cancelada");
  }
}