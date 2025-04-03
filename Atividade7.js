function jogar() {
    let opcoes = ["Pedra", "Papel", "Tesoura"];

    let escolhaUsuario = prompt("Escolha: Pedra, Papel ou Tesoura").toLowerCase();

    let numeroAleatorio = Math.random() * 0.99;
    let escolhaComputador = opcoes[Math.ceil(numeroAleatorio * 3) - 1];

    console.log(`Você escolheu: ${escolhaUsuario}`);
    console.log(`Computador escolheu: ${escolhaComputador}`)

    if (escolhaUsuario === escolhaComputador.toLowerCase()) {
        console.log("Empate!");
    } else if (
        (escolhaUsuario === "pedra" && escolhaComputador === "Tesoura") ||
        (escolhaUsuario === "tesoura" && escolhaComputador === "Papel") ||
        (escolhaUsuario === "papel" && escolhaComputador === "Pedra")
    ) {
        console.log("Você venceu!");
    } else {
        console.log("Computador venceu!");
    }
}

jogar();