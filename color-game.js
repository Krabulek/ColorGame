var numSquares = 6;
var colors = [];
var pickedColor;
var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var message = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");

init();

function init() {
	setModeButtons();
	setGuessLogic();
	resetColors();
}

resetButton.addEventListener("click", function() {
	resetColors();
});

function changeColor(color) {
	squares.forEach(function(square) {
		square.style.backgroundColor = color;
	});
}

function pickColor() {
	var random = Math.floor(Math.random() * colors.length);
	return colors[random];
}

function randomColor() {
	var red = Math.floor(Math.random() * 256);
	var green = Math.floor(Math.random() * 256);
	var blue = Math.floor(Math.random() * 256);
	var color = "rgb(" + red + ", " + green + ", " + blue + ")";
	return color;
}

function randomColors(size) {
	var colors = [];
	for (var i = 0; i < size; i++) {
		colors.push(randomColor());
	}
	return colors;
}

//setting up guessing logic
function setGuessLogic() {
	for (var i = 0; i < squares.length; i++) {
		squares[i].addEventListener("click", function() {
			var clickedColor = this.style.backgroundColor;

			if (clickedColor === pickedColor) {
				message.textContent = "Good job!";
				resetButton.textContent = "PLAY AGAIN";
				changeColor(clickedColor);
				h1.style.backgroundColor = pickedColor;
			} else {
				this.style.backgroundColor = "#232323";
				message.textContent = "Try again";
			}
		});
	}
}

//setting up mode buttons
function setModeButtons() {
	for (var i = 0; i < modeButtons.length; i++) {
		modeButtons[i].addEventListener("click", function() {
			modeButtons[0].classList.remove("selected");
			modeButtons[1].classList.remove("selected");
			this.classList.add("selected");
			this.textContent === "EASY" ? (numSquares = 3) : (numSquares = 6);
			resetColors();
		});
	}
}

//reseting the game
function resetColors() {
	colors = randomColors(numSquares);
	pickedColor = pickColor();
	colorDisplay.textContent = pickedColor;
	message.textContent = "";
	resetButton.textContent = "NEW COLORS";
	h1.style.backgroundColor = "steelblue";
	for (var i = 0; i < squares.length; i++) {
		if (colors[i]) {
			squares[i].style.display = "block";
			squares[i].style.backgroundColor = colors[i];
		} else {
			squares[i].style.display = "none";
		}
	}
}
