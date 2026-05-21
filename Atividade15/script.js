function validar(){
    let nome = document.nomeform.elements[0];
    let email = document.nomeform.elements[1];
    let comentario = document.nomeform.elements[2];

    if(nome.value.trim().length<10) {
        alert("O nome deve ter no mínimo 10 caracteres.");
        nome.focus();
        return false;
    }

    if(email.value.trim() === "") {
        alert("Preencha o campo e-mail corretamente.");
        email.focus();
        return false;
    }

    if(comentario.value.trim().length<20) {
        alert("O comentario deve ter no mínimo 20 caracteres.");
        comentario.focus();
        return false;
    }

    let pesquisa = document.nomeform.elements["pesquisa"];
    let resposta = "";

    for (let i = 0; i < pesquisa.length; i++){
        if(pesquisa[i].checked){
            resposta = pesquisa[i].value;
        }
    }

    if(resposta === ""){
        alert("Selecione uma opção de pesquisa.");
        return false;
    }

    if(resposta === "nao"){
        alert("Que bom que você voltou a visitar essa página!");
    } else{
        alert("Volte sempre à esta página!");
    }

    return true;
}