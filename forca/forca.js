const palavraElement = document.getElementById("palavra");
const tentativasElement = document.getElementById("tentativas");
const tecladoElement = document.getElementById("teclado");
const palavras = ["ABACAXI", "BANANA", "CARRO", "DADO", "ELEFANTE", "FOGO", "GATO", "HELICOPTERO", "IGREJA", "JANELA", "KIWI", "LARANJA", "MACACO", "NAVIO", "ONIBUS", "PIANO", "QUEIJO", "RAIO", "SAPO", "TIGRE", "UVA", "VELA", "XICARA",
    "ZEBRA", "ARVORE", "OCULOS", "ENFASE", "UMIDO", "PASSARO", "BOLA", "CACHORRO", "DIAMANTE", "ESPADA", "FLORESTA", "GUITARRA", "HOSPITAL", "INVERNO", "JORNAL", "KARATE", "LAMPADA", "MONTANHA", "NUVEM", "ORQUIDEA", "PIANO", "QUILOMBO",
    "RIO", "SOL", "TELEFONE", "UMBIGO", "VULCAO", "WASHINGTON", "XADREZ", "YOGA", "ZOOLOGIA", "AGUA", "OLEO", "EXITO", "PEROLA", "BANDEIRA", "COELHO", "DESENHO", "ESTRADA", "FLOR", "GATO", "HORA", "ILHA", "JARDIM", "KARMA",
    "LUZ", "MAR", "NATUREZA", "OLHO", "PAGINA", "QUEIMADA", "RIO", "SOL", "TERRA", "UVA", "VENTO", "XAROPE", "YOGA", "ZEBRA", "ÁRVORE", "OCULOS", "ULTIMO", "BOLA", "CARRO", "DANÇA", "ESPORTE", "FOGO", "GATO", "HOTEL", "INVERNO", "JANELA",
    "KIWI", "LUAR", "MONTANHA", "NUVEM", "CONSTATAÇAO"
];
// Array de palavras

let palavra = ""; // Palavra a ser adivinhada
let letrasAdivinhadas = [];
let tentativas = 6;

function obterPalavraAleatoria() {
    return palavras[Math.floor(Math.random() * palavras.length)];
}

function exibirPalavra() {
    palavraElement.textContent = palavra
        .split("")
        .map(letra => (letrasAdivinhadas.includes(letra) ? letra : "_"))
        .join(" ");
}

function exibirTentativas() {
    tentativasElement.textContent = tentativas;
}

function criarTeclado() {
    const alfabeto = "ABCDEFGHIJKLMNOPQRSTUVWXYZÇ";
    for (let letra of alfabeto) {
        const botao = document.createElement("button");
        botao.textContent = letra;
        botao.id = letra; // Definir id para cada botão igual à letra correspondente
        botao.addEventListener("click", () => adivinharLetra(letra));
        tecladoElement.appendChild(botao);
    }
}

function adivinharLetra(letra) {
    if (letrasAdivinhadas.includes(letra)) {
        alert("Você já tentou essa letra!");
        return;
    }

    letrasAdivinhadas.push(letra);

    if (palavra.includes(letra)) {
        document.getElementById(letra).classList.add("verde");
    } else {
        document.getElementById(letra).classList.add("vermelho");
        tentativas--;
    }

    exibirPalavra();
    exibirTentativas();
    verificarFimDoJogo();
}

function verificarFimDoJogo() {
    if (tentativas === 0) {
        alert("Você perdeu! A palavra era: " + palavra);
        reiniciarJogo();
    } else if (!palavraElement.textContent.includes("_")) {
        alert("Parabéns, você acertou a palavra: " + palavra);
        reiniciarJogo();
    }
}

function reiniciarJogo() {
    palavra = obterPalavraAleatoria();
    letrasAdivinhadas = [];
    tentativas = 6;
    palavraElement.textContent = "";
    exibirPalavra();
    exibirTentativas();
    reiniciarTeclado();
}

function reiniciarTeclado() {
    const botoes = tecladoElement.getElementsByTagName("button");
    for (let botao of botoes) {
        botao.classList.remove("verde", "vermelho");
    }
}

criarTeclado();
reiniciarJogo();
