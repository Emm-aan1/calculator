const calculatorDisplay = document.querySelector('h1');
const inputBtns = document.querySelectorAll('button');
const clearBtn = document.getElementById('clear-btn');

// calculate first and second values
const calculate = {
  '/': (firstValue, secondValue) => firstValue / secondValue,
  '*': (firstValue, secondValue) => firstValue * secondValue,
  '+': (firstValue, secondValue) => firstValue + secondValue,
  '-': (firstValue, secondValue) => firstValue - secondValue,
  '=': (firstValue, secondValue) => secondValue,
};

let firstValue = 0;
let operatorValue = '';
let awaitValue = false;

function numberValue(num) {
  if (awaitValue) {
    calculatorDisplay.textContent = num;
    awaitValue = false;
  } else {
    const displayValue = calculatorDisplay.textContent;
    calculatorDisplay.textContent = displayValue === '0' ? num : displayValue + num;
  }
};

function addDecimal() {
  // if operator used, dont add "."
  if (awaitValue) return;

  // if no decimal, add one
  if (!calculatorDisplay.textContent.includes('.')) {
    calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`;
  }
}

// operator function
function useOperator(operator) {
  const currentValue = Number(calculatorDisplay.textContent);

  // prevent multiple operator
  if (operatorValue && awaitValue) {
    operatorValue = operator;
    return;
  };

  // assign value if there is none
  if (!firstValue) {
    firstValue = currentValue;
  } else {
    const calculation = calculate[operatorValue](firstValue, currentValue);
    calculatorDisplay.textContent = calculation;
    firstValue = calculation;
  }

  awaitValue = true;
  operatorValue = operator;
}

// clear display
function clearAll() {
  firstValue = 0;
  operatorValue = '';
  awaitValue = false;
  calculatorDisplay.textContent = '0';
}
clearBtn.addEventListener('click', clearAll);

// event listeners
inputBtns.forEach((button) => {
  if (button.classList.length === 0) {
    button.addEventListener('click', () => {
      numberValue(button.value)
    });
  } else if (button.classList.contains('operator')) {
    button.addEventListener('click', () => {
      useOperator(button.value)
    });
  } else if (button.classList.contains('decimal')) {
    button.addEventListener('click', addDecimal)
  }
});