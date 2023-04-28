function parseSection(input: string): string {
  
  return input;
}

function parseInstructions(input: string): string {
  const cleanInput = input.toLowerCase().trim();
  let returnString = "new string";

  if (cleanInput.includes(" and ")) {
    cleanInput.split(" and ").forEach((section) => {
      returnString += parseSection(section);
    });
  } else if (cleanInput.includes(" then ")) {
    cleanInput.split(" then ").forEach((section) => {
      returnString += parseSection(section);
    });
  }

  return returnString.charAt(0).toUpperCase() + returnString.slice(1) + ".";
}

export default parseInstructions;
