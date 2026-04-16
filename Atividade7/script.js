function jogar(escolhaJogador) {
    const numeroAleatorio = Math.random();
    let escolhaComputador = "";

    if(numeroAleatorio < 0.33) {
        escolhaComputador = "pedra";
    } else if (numeroAleatorio < 0.66) {
        escolhaComputador = "papel";
    } else {
        escolhaComputador = "tesoura";
    }

    let resultado = "";

    if (escolhaJogador === escolhaComputador) {
        resultado = "Empate!"
    } else if (
        (escolhaJogador === "pedra" && escolhaComputador === "tesoura") ||
        (escolhaJogador === "papel" && escolhaComputador === "pedra") ||
        (escolhaJogador === "tesoura" && escolhaComputador === "papel")
    ) {
        resultado = "Você venceu!";
    } else {
        resultado = "O computador venceu!";
    }

    document.getElementById("jogador").textContent = escolhaJogador;
    document.getElementById("computador").textContent = escolhaComputador;
    document.getElementById("mensagem").textContent = resultado;
}