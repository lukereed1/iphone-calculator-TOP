let firstOperand;
let secondOperand;
let operator;
let screenCleared = true;
let periodPresent = false;
let operatorInverted = false;

const digits = document.querySelectorAll(".button");
const operators = document.querySelectorAll(".operator");
const equals = document.querySelector("#operate");
const clear = document.querySelector("#clear");
const screen = document.querySelector("#screen-numbers");
const percent = document.querySelector("#percent");
const posNeg = document.querySelector("#pos-neg");
const period = document.querySelector(".period");

digits.forEach((digit) =>
	digit.addEventListener("click", (e) => addNumberToScreen(e.target.innerHTML))
);

operators.forEach((op) => op.addEventListener("click", (e) => setOperator(e.target.innerHTML)));

operators.forEach((op) => op.addEventListener("click", (e) => invertOperatorColours(op)));

equals.addEventListener("click", () => operate());

clear.addEventListener("click", () => clearScreen());

percent.addEventListener("click", () => divide100());

posNeg.addEventListener("click", () => positiveNegative());

period.addEventListener("click", () => addPeriodToScreen());

function addNumberToScreen(number) {
	resetOperatorColours();
	if (screenCleared) {
		screenCleared = false;
		screen.innerHTML = "";
		screen.innerHTML += number;
	} else if (screen.textContent.length < 9) screen.innerHTML += number;
}

function addPeriodToScreen() {
	if (screenCleared || periodPresent) return;
	screen.innerHTML += ".";
	periodPresent = true;
}

function setOperator(op) {
	if (operator !== null) operate();
	if (periodPresent) periodPresent = false;
	operator = op;
	firstOperand = parseFloat(screen.innerHTML);
	screenCleared = true;
}

function operate() {
	if (screenCleared || operator === null) return;
	secondOperand = parseFloat(screen.innerHTML);
	switch (operator) {
		case "+":
			add();
			break;
		case "-":
			subtract();
			break;
		case "x":
			multiply();
			break;
		case "/":
			divide();
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
	secondOperand = null;
	periodPresent = false;
	resetOperatorColours();
}

function add() {
	let result = firstOperand + secondOperand;
	if (answerLengthOverMax(result)) {
		screen.innerHTML = trimToNineDigits(result);
	} else screen.innerHTML = result;
}

function subtract() {
	let result = firstOperand - secondOperand;
	if (answerLengthOverMax(result)) {
		screen.innerHTML = trimToNineDigits(result);
	} else screen.innerHTML = result;
}

function divide() {
	let result = firstOperand / secondOperand;
	if (answerLengthOverMax(result)) {
		screen.innerHTML = trimToNineDigits(result);
	} else screen.innerHTML = result;
}

function multiply() {
	let result = firstOperand * secondOperand;
	if (answerLengthOverMax(result)) {
		screen.innerHTML = trimToNineDigits(result);
	} else screen.innerHTML = result;
}

function answerLengthOverMax(number) {
	let numberLength = Math.abs(number).toString();
	if (numberLength >= 9) return true;
}

function trimToNineDigits(number) {
	let numberString = number.toString();
	let trimmedNumber = numberString.slice(0, 9);
	return parseFloat(trimmedNumber);
}

function invertOperatorColours(operator) {
	if (operatorInverted === false) {
		operator.style.backgroundColor = "white";
		operator.style.color = "#ff9500";
		operator.style.transition = ".2s ease";
		operatorInverted = true;
	}
}

function resetOperatorColours() {
	operators.forEach((op) => {
		op.style.backgroundColor = "#ff9500";
		op.style.color = "white";
		op.style.transition = ".2s ease";
		operatorInverted = false;
	});
}
