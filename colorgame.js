var numSquares = 6;
var colors = [];
var pickedColor;
var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");
let lives = 0;

init();

function init() {
    setupModeButtons();
    setupSquares();
    reset();
}

function setupModeButtons() { // vaikeustaso -button event listenerit (easy, hard)
    for (var i = 0; i < modeButtons.length; i++) {
        modeButtons[i].addEventListener("click", function () {
            modeButtons[0].classList.remove("selected");
            modeButtons[1].classList.remove("selected");
            this.classList.add("selected");
            // selvitä montako ruutua näytetään
            // this.textContent === "Easy" ? numSquares = 3 : numSquares = 6; // tekee saman kuin if-lauseke alla. Kätevä yhden rivin if-tapauksissa
            if (this.textContent === "Easy") {
                numSquares = 3;
            } else {
                numSquares = 6;
            }
            reset();
        });
    }
}

function setupSquares() { // square button event listenerit
    for (var i = 0; i < squares.length; i++) {
        squares[i].addEventListener("click", function () {
            // tallenna väri jota klikattiin
            var clickedColor = this.style.backgroundColor;
            // vertaa klikattua väriä pickedColoriin (oikeaan väriin)
            if (lives > 0) {
                if (clickedColor === pickedColor) {
                    messageDisplay.textContent = "Correct!";
                    resetButton.textContent = "Play Again?";
                    changeColors(clickedColor);
                    h1.style.backgroundColor = clickedColor;
                } else {
                    this.style.backgroundColor = "#232323";
                    lives--;
                    if (lives === 0) {
                        messageDisplay.textContent = "Out of Lives!";
                        resetButton.textContent = "Play Again?";
                    } else {
                        messageDisplay.textContent = "Incorrect! Lives left: "+lives;
                    }
                }
            } 
        });
    }
}

function reset() {
    // resetoi elämät. elämien määrä on ruutujen määrä jaettuna kahdella, pyöristettynä ylöspäin. Eli easy = 2, hard = 3.
    lives = Math.ceil(numSquares / 2);
    // luo uudet värit 
    colors = generateRandomColors(numSquares);
    // valitse uusi sattumanvarainen väri taulukosta
    pickedColor = pickColor();
    // colorDisplay mätsäämään picked coloriin
    colorDisplay.textContent = pickedColor;
    // vaihda resetButtonin teksti
    resetButton.textContent = "New Colors";
    // tyhjennä #message 'n sisältö
    messageDisplay.textContent = "Lives left: "+lives;
    // vaihda h1 taustaväri alkuperäiseksi
    h1.style.backgroundColor = "steelblue";
    // vaihda ruutujen väri, ja mikäli easy mode päällä, piilota 3 viimeistä ruutua
    for (var i = 0; i < squares.length; i++) {
        if (colors[i]) { // jos colors arrayssa on väri
            squares[i].style.display = "block"; // näytetään square (koska easy modessa piilotetaan 3)
            squares[i].style.backgroundColor = colors[i]; // laitetaan väri squareen
        } else { // muussa tapauksessa piilotetaan square
            squares[i].style.display = "none";
        }
    }
}

resetButton.addEventListener("click", function () {
    reset();
});

function changeColors(color) {
    // looppaa kaikki ruudut
    for (var i = 0; i < squares.length; i++) {
        // vaihda joka ruudun väri mätsäämään annettua väriä
        squares[i].style.backgroundColor = color;
    }
}

function pickColor() {
    var random = Math.floor(Math.random() * colors.length);
    return colors[random];
}

function generateRandomColors(num) {
    // luo taulukko
    var arr = [];
    // lisää num random värejä to taulukkoon
    for (var i = 0; i < num; i++) {
        // ota random väri ja pushaa taulukkoon
        arr.push(randomColor());
    }
    // palauta taulukko
    return arr;
}

function randomColor() {
    // valitse "red" 0-255 väliltä
    var r = Math.floor(Math.random() * 256);  // ei 255 + 1, koska myös nollaa tarvitaan tässä tapauksessa
    // valitse "green" 0-255 väliltä
    var g = Math.floor(Math.random() * 256);
    // valitse "blue" 0-255 väliltä
    var b = Math.floor(Math.random() * 256);
    // palauttaa "rgb(r, g, b)""
    return "rgb(" + r + ", " + g + ", " + b + ")";
}