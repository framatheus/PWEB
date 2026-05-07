let janela = document.getElementById("janela");
let titulo = document.getElementById("titulo");

let imagemFechada = `
data:image/svg+xml;utf8,
<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400">
  <rect x="70" y="50" width="260" height="300" rx="10" fill="%23d9ecf5" stroke="%230077b6" stroke-width="12"/>
  <line x1="200" y1="50" x2="200" y2="350" stroke="%230077b6" stroke-width="10"/>
  <line x1="70" y1="200" x2="330" y2="200" stroke="%230077b6" stroke-width="10"/>
  <rect x="95" y="75" width="80" height="100" fill="%23ffffff" opacity="0.45"/>
  <rect x="225" y="75" width="80" height="100" fill="%23ffffff" opacity="0.45"/>
  <rect x="95" y="225" width="80" height="100" fill="%23ffffff" opacity="0.45"/>
  <rect x="225" y="225" width="80" height="100" fill="%23ffffff" opacity="0.45"/>
  <text x="200" y="385" text-anchor="middle" font-family="Arial" font-size="22" fill="%230077b6">Janela fechada</text>
</svg>
`;

let imagemAberta = `
data:image/svg+xml;utf8,
<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400">
  <rect x="90" y="70" width="220" height="250" rx="10" fill="%23eaf7fc" stroke="%230077b6" stroke-width="10"/>
  <polygon points="90,70 25,105 25,290 90,320" fill="%23ffffff" stroke="%230077b6" stroke-width="10"/>
  <polygon points="310,70 375,105 375,290 310,320" fill="%23ffffff" stroke="%230077b6" stroke-width="10"/>
  <line x1="58" y1="115" x2="58" y2="295" stroke="%230077b6" stroke-width="6"/>
  <line x1="342" y1="115" x2="342" y2="295" stroke="%230077b6" stroke-width="6"/>
  <line x1="90" y1="195" x2="310" y2="195" stroke="%230077b6" stroke-width="8"/>
  <rect x="120" y="100" width="160" height="170" fill="%2390e0ef" opacity="0.4"/>
  <text x="200" y="385" text-anchor="middle" font-family="Arial" font-size="22" fill="%230077b6">Janela aberta</text>
</svg>
`;

let imagemQuebrada = `
data:image/svg+xml;utf8,
<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400">
  <rect x="70" y="50" width="260" height="300" rx="10" fill="%23d9ecf5" stroke="%230077b6" stroke-width="12"/>
  <line x1="200" y1="50" x2="200" y2="350" stroke="%230077b6" stroke-width="10"/>
  <line x1="70" y1="200" x2="330" y2="200" stroke="%230077b6" stroke-width="10"/>
  <polyline points="230,85 270,130 245,160 300,210 260,250 280,310" fill="none" stroke="%23000000" stroke-width="7"/>
  <polyline points="145,220 115,250 150,275 120,315" fill="none" stroke="%23000000" stroke-width="7"/>
  <polygon points="225,90 270,130 245,160 215,135" fill="%23ffffff" opacity="0.8"/>
  <polygon points="120,250 150,275 125,315 95,285" fill="%23ffffff" opacity="0.8"/>
  <circle cx="245" cy="170" r="8" fill="%23000000"/>
  <text x="200" y="385" text-anchor="middle" font-family="Arial" font-size="22" fill="%230077b6">Janela quebrada</text>
</svg>
`;

window.onload = function() {
    janela.src = imagemFechada;
    titulo.innerHTML = "Janela Fechada";
};

janela.onmouseover = function() {
    janela.src = imagemAberta;
    titulo.innerHTML = "Janela Aberta";
    janela.alt = "Janela aberta";
};

janela.onmouseout = function() {
    janela.src = imagemFechada;
    titulo.innerHTML = "Janela Fechada";
    janela.alt = "Janela fechada";
};

janela.onclick = function() {
    janela.src = imagemQuebrada;
    titulo.innerHTML = "Janela Quebrada";
    janela.alt = "Janela quebrada";
};