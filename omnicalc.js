const buttons = document.querySelectorAll("button");
const display = document.getElementById("display");

let num1 = "";
let operator = "";

//*Add button functionality
buttons.forEach(button => {

    button.onclick = function(){

        const value = button.textContent;
    
        //*Displaying the Numbers
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
        //*Displaying the AC functionality button
        else if( value === "AC"){
            display.value = "";
            num1 = "";
            operator = "";
        }
        //*Displaying the backspance functionality button
        else if( value === "⌫"){
            display.value = display.value.slice(0,-1);
        }
        //*Operators
        else if(value === "+" ||
                value === "-" ||
                value === "x" ||
                value === "÷"
        ){
            num1 = Number(display.value);
            operator = value;
            display.value = "";

        }
        //*Calculating the numbers given by the user
        else if( value === "="){
            let num2 = Number(display.value);
            let result;

            switch(operator){

                case "+":
                    result = num1 + num2;
                    break;

                case "-":
                    result = num1 - num2;
                    break;

                case "x":
                    result = num1 * num2;
                    break;

                    case "÷":
                    //*if the second number is equal to 0 display "cannot divide by zero"
                    if(num2 === 0){
                        result = "Can't divide by 0";
                    } else {
                        result = num1 / num2;
                    }
                    break;

                default:
                    result = "Error";
            }
            display.value = result;
        }
    }
}) 
