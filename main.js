let firstOperand;
let secondOperand;
let operator;
let screenCleared = true;

const digits = document.querySelectorAll(".button");
const operators = document.querySelectorAll(".operator");
const equals = document.querySelector("#operate");
const clear = document.querySelector("#clear");
const screen = document.querySelector("#screen-numbers");

digits.forEach((digit) =>
	digit.addEventListener("click", (e) => addNumberToScreen(e.target.innerHTML))
);

operators.forEach((op) => op.addEventListener("click", (e) => setOperator(e.target.innerHTML)));

equals.addEventListener("click", () => operate());

clear.addEventListener("click", () => clearScreen());

function addNumberToScreen(number) {
	if (screenCleared) {
		screenCleared = false;
		screen.innerHTML = " ";
		screen.innerHTML += number;
	} else screen.innerHTML += number;
}

function setOperator(op) {
	if (operator !== null) operate();
	operator = op;
	firstOperand = parseFloat(screen.innerHTML);
	screenCleared = true;
}

function clearScreen() {
	screen.innerHTML = "0";
	screenCleared = true;
	operator = null;
	firstOperand = null;
	secondOperand = null;
}

function operate() {
	if (screenCleared || operator === null) return;
	secondOperand = parseFloat(screen.innerHTML);

	switch (operator) {
		case "+":
			screen.innerHTML = firstOperand + secondOperand;
			break;
		case "-":
			screen.innerHTML = firstOperand - secondOperand;
			break;
		case "x":
			screen.innerHTML = firstOperand * secondOperand;
			break;
		case "/":
			screen.innerHTML = firstOperand / secondOperand;
			break;
	}

	screenCleared = true;
}
