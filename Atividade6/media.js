function calcularMedia() {
    let nome = document.getElementById("nome").ariaValueMax;
    let nota1 = parseFloat (document.getElementById("nota1").value);
    let nota2 = parseFloat (document.getElementById("nota2").value);
    let nota3 = parseFloat (document.getElementById("nota3").value);
    let nota4 = parseFloat (document.getElementById("nota4").value);

    if(nome === "" || isNaN(nota1) || isNaN(nota2) || isNaN(nota3) || isNaN(nota4)) {
        alert("Preencha o nome e as quatro notas do aluno");
        return;
    }

    let confirmar = confirm("Deseja calcular a média do aluno " + nome + "?");

    if(confirmar) {
        let media = (nota1 + nota2 + nota3 + nota4) / 4;
        let mediaFormatada = media.toFixed(2);

        document.getElementById("resultado").innerHTML =
            "Aluno: <strong>" + nome + "</strong><br>" +
            "Média: <strong>" + mediaFormatada + "</strong>";

        alert("A média de " + nome + " é " + mediaFormatada);
    } else {
        alert("Operação cancelada");
    }
}