const input = document.getElementById('input-number');
const currentBase = document.getElementById('options');
const output = document.getElementById('output-section');
const buttonSection = document.getElementById('button-section');

// Determine the current base
let thisBase;
function determineCurrentBase(base) {
  switch (base) {
    case 'decimal':
      thisBase = 10;
      break;
    case 'binary':
      thisBase = 2;
      break;
    case 'octal':
      thisBase = 8;
      break;
    case 'hexa':
      thisBase = 16;
      break;
    default:
      output.textContent = "Invalid base selection. Please choose decimal, binary, octal, or hexadecimal.";
      return; // Exit function on invalid base selection
  }
}

// Function to handle validation and conversion
function convertNumber(base, num, targetBase) {
  // Input validation
  const isValidInput = validateInput(num, base);
  if (!isValidInput) {
    return; // Exit function if input is invalid
  }

  const parsedNum = parseInt(num, base); // Parse based on current base
  let convertedValue;

  switch (targetBase) {
    case 'decimal':
      convertedValue = convertToDecimal(parsedNum);
      break;
    case 'binary':
      convertedValue = convertToBinary(parsedNum);
      break;
    case 'hexa':
      convertedValue = convertToHexa(parsedNum);
      break;
    case 'octal':
      convertedValue = convertToOctal(parsedNum);
      break;
    default:
      console.error(`Unsupported target base: ${targetBase}`);
      return; // Handle unsupported base
  }

  output.textContent = convertedValue;
}

// Function to validate input based on current base
function validateInput(num, base) {
  // Check for empty input
  if (num.trim() === '') {
    output.textContent = "Please enter a number to convert.";
    return false;
  }

  // Check for invalid characters based on current base
  const validChars = base === 10 ? '0123456789' : (base === 8 ? '01234567' : (base === 16 ? '0123456789ABCDEF' : '01'));
  for (let char of num) {
    if (!validChars.includes(char.toUpperCase())) {
      output.textContent = `Invalid number or base`;
      return false;
    }
  }

  return true; // Input is valid
}

// Function to convert to decimal (from any base)
function convertToDecimal(num, thisBase) {
  return parseInt(num, thisBase);
}

// Function to convert to binary (from decimal)
function convertToBinary(num) {
  return num.toString(2);
}

// Function to convert to hexadecimal (from decimal)
function convertToHexa(num) {
  return num.toString(16).toUpperCase();
}

// Function to convert to octal (from decimal)
function convertToOctal(num) {
  return num.toString(8);
}

// Event listener for button click
buttonSection.addEventListener('click', (event) => {
  const clickedButton = event.target;

  if (clickedButton.classList.contains('input-btn')) {
    const buttonId = clickedButton.id;
    const inputValue = input.value;

    // Determine the target base based on the button ID
    let targetBase;
    switch (buttonId) {
      case 'decimal':
        targetBase = 'decimal';
        break;
      case 'binary':
        targetBase = 'binary';
        break;
      case 'hexa':
        targetBase = 'hexa';
        break;
      case 'octal':
        targetBase = 'octal';
        break;
      default:
        console.error(`Unsupported button : ${buttonId}`);
        return;
    }

    determineCurrentBase(currentBase.value);
    convertNumber(thisBase, inputValue, targetBase);
  }
});