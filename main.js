let firstOperand;
let secondOperand;
let operator;
let isCleared = true;

const digits = document.querySelectorAll(".button");
const operators = document.querySelectorAll(".operator");
const screen = document.querySelector("#screen-numbers");

digits.forEach((digit) =>
	digit.addEventListener("click", (e) => addDigitsToScreen(e.target.innerHTML))
);

function addDigitsToScreen(num) {
	if (isCleared === true) {
		isCleared = false;
		screen.innerHTML = " ";
		screen.innerHTML += num;
	} else {
		screen.innerHTML += num;
	}
}

operators.forEach((op) => op.addEventListener("click", (e) => getOperator(e.target.innerHTML)));

function getOperator(op) {
	if (isCleared) return;

	firstOperand = parseFloat(screen.innerHTML);
	switch (op) {
		case "+":
			operator = "+";
			break;
		case "-":
			operator = "-";
			break;
		case "x":
			operator = "*";
			break;
		case "/":
			operator = "/";
			break;
	}
}
