let firstOperand;
let secondOperand;
let operator;
let screenCleared = true;

const digits = document.querySelectorAll(".button");
const operators = document.querySelectorAll(".operator");
const equals = document.querySelector("#operate");
const clear = document.querySelector("#clear");
const screen = document.querySelector("#screen-numbers");
const percent = document.querySelector("#percent");
const posNeg = document.querySelector("#pos-neg");

digits.forEach((digit) =>
	digit.addEventListener("click", (e) => addNumberToScreen(e.target.innerHTML))
);

operators.forEach((op) => op.addEventListener("click", (e) => setOperator(e.target.innerHTML)));

equals.addEventListener("click", () => operate());

clear.addEventListener("click", () => clearScreen());

percent.addEventListener("click", () => divide100());

posNeg.addEventListener("click", () => positiveNegative());

function addNumberToScreen(number) {
	if (screenCleared) {
		screenCleared = false;
		screen.innerHTML = "";
		screen.innerHTML += number;
	} else if (screen.textContent.length < 9) screen.innerHTML += number;
}

function setOperator(op) {
	if (operator !== null) operate();
	operator = op;
	firstOperand = parseFloat(screen.innerHTML);
	screenCleared = true;
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

function divide100() {
	screen.innerHTML = parseFloat(screen.innerHTML) / 100;
}

function positiveNegative() {
	let num = parseFloat(screen.innerHTML);
	if (Math.sign(num) === 1) {
		screen.innerHTML = -num;
	} else if (Math.sign(num) === -1) {
		screen.innerHTML = Math.abs(num);
	} else return;
}

function clearScreen() {
	screen.innerHTML = "0";
	screenCleared = true;
	operator = null;
	firstOperand = null;
	secondOperand = null;
}
