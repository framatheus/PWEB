const inputTexto = document.getElementById("texto");
const radioMaiuscula = document.getElementById("maiuscula");
const radioMinuscula = document.getElementById("minuscula");

radioMaiuscula.addEventListener("click", function () {
    inputTexto.value = inputTexto.value.toUpperCase();
});

radioMinuscula.addEventListener("click", function () {
    inputTexto.value = inputTexto.value.toLowerCase();
});