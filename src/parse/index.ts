function parseSection(input: string): string {
  return input;
}

function parseInstructions(input: string): string {
  let returnString = "new string";

  if (input.includes(" and ")) {
    input.split(input).forEach((section) => {
      returnString += parseSection(section);
    });
  }

  return returnString.charAt(0).toUpperCase() + returnString.slice(1) + ".";
}

export default parseInstructions;
