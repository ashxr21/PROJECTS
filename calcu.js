const buttons = document.querySelectorAll("button");
const display = document.getElementById("display");

let firstNumber = "";
let operator = "";

// Add button functionality
buttons.forEach(button => {

    button.onclick = function () {

        const value = button.textContent;

        // Displaying the Numbers and decimal
        if (
            value === "0" ||
            value === "1" ||
            value === "2" ||
            value === "3" ||
            value === "4" ||
            value === "5" ||
            value === "6" ||
            value === "7" ||
            value === "8" ||
            value === "9" ||
            value === "."
        ) {
            display.value += value;
        }

        // AC
        else if (value === "AC") {
            display.value = "";
            firstNumber = "";
            operator = "";
        }

        // Backspace
        else if (value === "⌫") {
            display.value = display.value.slice(0, -1);
        }

        // Operators
        else if (
            value === "+" ||
            value === "−" ||
            value === "×" ||
            value === "÷"
        ) {

            firstNumber = Number(display.value);
            operator = value;
            display.value = "";
        }

        // Equals
        else if (value === "=") {

            let secondNumber = Number(display.value);
            let result;

            switch (operator) {

                case "+":
                    result = firstNumber + secondNumber;
                    break;

                case "−":
                    result = firstNumber - secondNumber;
                    break;

                case "×":
                    result = firstNumber * secondNumber;
                    break;

                case "÷":
                    result = firstNumber / secondNumber;
                    break;

                default:
                    result = "Error";
            }

            display.value = result;
        }
    };
});

