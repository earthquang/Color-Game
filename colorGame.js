var colors = randomColorGen(numBoxes);
var numBoxes = 6;
var correctColor = colorsRandomIndex();
var colorBoxes = document.querySelectorAll(".colorBox");
var correctColorDisp = document.querySelector("#correctColorDisp");
var header = document.querySelector("#header");
var result = document.querySelector("#result");
var newGame = document.querySelector("#newGame");
var modeSelected = document.querySelectorAll(".modeButton");
var clickSound = document.querySelector("#clickSound");
var wrongSound = document.querySelector("#wrongSound");
var correctSound = document.querySelector("#correctSound");


startGame();

function startGame() {
	initColorBoxes();
	selectMode();
	resetGame();
}

function initColorBoxes() {
	for (var i = 0; i < colorBoxes.length; i++) {
		colorBoxes[i].addEventListener("click", function(){
			var clickedColor = this.style.background;
			if (clickedColor === correctColor) {
				result.textContent = "Correct!";
				result.style.color = "rgb(100, 255, 0)";
				matchColors(clickedColor);
				newGame.textContent = "Play Again?";
				correctSound.play();
			}
			else {
				this.style.background = "#232323";
				result.textContent = "Try Again!";
				result.style.color = "Red";
				wrongSound.play();
			}
		});
	}
}

function selectMode() {
	for (var i = 0; i < modeSelected.length; i++) {
		modeSelected[i].addEventListener("click", function(){
			clickSound.play();
			modeSelected[0].classList.remove("selected");
			modeSelected[1].classList.remove("selected");
			this.classList.add("selected");
			this.textContent === "Easy" ? numBoxes = 3: numBoxes = 6;
			resetGame();
		});
	}
}

newGame.addEventListener("click", function(){
	resetGame();
	clickSound.play();
});

function resetGame() {
	colors = randomColorGen(numBoxes);
	correctColor = colorsRandomIndex();
	correctColorDisp.textContent = correctColor;
	for (var i = 0; i < colorBoxes.length; i++) {
		if (colors[i]) {
			colorBoxes[i].style.display = "block";
			colorBoxes[i].style.background = colors[i];
		} else {
			colorBoxes[i].style.display = "none"
		}
	}
	newGame.textContent = "New Colors";
	result.textContent = "";
	header.style.background = "steelblue";
}


function matchColors(color) {
	for (var i = 0; i < colorBoxes.length; i++) {
		colorBoxes[i].style.background = color;
	}
	header.style.background = color;
}
function randomColorStr() {
	var rColorCode = "rgb(" + Math.floor(Math.random() * 256) + ", " + Math.floor(Math.random() * 256) + ", " + Math.floor(Math.random() * 256) + ")";
	return rColorCode;
}
function randomColorGen(num) {
	var rColorArray = [];
	for (var i = 0; i < num; i++) {
		rColorArray.push(randomColorStr()); 
	}
	return rColorArray;
}
function colorsRandomIndex() {
	var randomIndex = Math.floor(Math.random() * colors.length);
	return colors[randomIndex];
}
