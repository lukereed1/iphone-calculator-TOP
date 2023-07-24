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
digits.forEach((button) =>
	button.addEventListener("click", () => button.classList.add("grey-pulse"))
);
digits.forEach((button) =>
	button.addEventListener("transitionend", () => button.classList.remove("grey-pulse"))
);

operators.forEach((op) => op.addEventListener("click", (e) => setOperator(e.target.innerHTML)));
operators.forEach((op) => op.addEventListener("click", (e) => invertOperatorColours(op)));

equals.addEventListener("click", () => operate());
equals.addEventListener("click", () => equals.classList.add("grey-pulse"));
equals.addEventListener("transitionend", () => equals.classList.remove("grey-pulse"));

clear.addEventListener("click", () => clearScreen());
clear.addEventListener("transitionend", () => clear.classList.remove("white-pulse"));

percent.addEventListener("click", () => divide100());
percent.addEventListener("transitionend", () => percent.classList.remove("white-pulse"));

posNeg.addEventListener("click", () => positiveNegative());
posNeg.addEventListener("transitionend", () => posNeg.classList.remove("white-pulse"));

period.addEventListener("click", () => addPeriodToScreen());
period.addEventListener("transitionend", () => period.classList.remove("grey-pulse"));

function addNumberToScreen(number) {
	resetOperatorColours();
	if (screenCleared) {
		screenCleared = false;
		screen.innerHTML = "";
		screen.innerHTML += number;
	} else if (screen.textContent.length < 9) screen.innerHTML += number;
}

function addPeriodToScreen() {
	period.classList.add("grey-pulse");
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
	if (operator === "/" && secondOperand === 0) {
		screen.innerHTML = "bruh";
		return;
	}
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
	percent.classList.add("white-pulse");
	let result = parseFloat(screen.innerHTML) / 100;
	if (result.toString().length >= 9) {
		result = trimToNineDigits(result);
	}
	screen.innerHTML = result;
}

function positiveNegative() {
	posNeg.classList.add("white-pulse");
	let num = parseFloat(screen.innerHTML);
	if (Math.sign(num) === 1) {
		screen.innerHTML = -num;
	} else if (Math.sign(num) === -1) {
		screen.innerHTML = Math.abs(num);
	} else return;
}

function clearScreen() {
	clear.classList.add("white-pulse");
	screen.innerHTML = "0";
	screenCleared = true;
	operator = null;
	secondOperand = null;
	periodPresent = false;
	resetOperatorColours();
}

function add() {
	let result = firstOperand + secondOperand;
	if (result.toString().length >= 9) {
		screen.innerHTML = trimToNineDigits(result);
	} else screen.innerHTML = result;
}

function subtract() {
	let result = firstOperand - secondOperand;
	if (result.toString().length >= 9) {
		screen.innerHTML = trimToNineDigits(result);
	} else screen.innerHTML = result;
}

function divide() {
	let result = firstOperand / secondOperand;
	if (result.toString().length >= 9) {
		screen.innerHTML = trimToNineDigits(result);
	} else screen.innerHTML = result;
}

function multiply() {
	let result = firstOperand * secondOperand;
	if (result.toString().length >= 9) {
		screen.innerHTML = trimToNineDigits(result);
	} else screen.innerHTML = result;
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
