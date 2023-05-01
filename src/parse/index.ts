import { BuildTermHashMap } from "./interactionPhrases";
import { BaseInteractions } from "../enums";
import { getCurrentRoom, getItemByID, listInventory } from "../data";
import checkExamine from "./examine";
import takeItem from "./take";

const Space = " ";
const TermHashMap = BuildTermHashMap();

function parseSection(input: string): string {
  const consistentSpacedString = input.replace(/\s\s+/g, Space);
  const removedVowels = consistentSpacedString
    .replace(" at ", " ")
    .replace(" the ", " ");
  const spaceSplit = removedVowels.split(Space);

  const firstTerm = TermHashMap.get(spaceSplit[0]);

  switch (firstTerm) {
    case BaseInteractions.Examine:
      return checkExamine(spaceSplit);

    case BaseInteractions.Take:
      return takeItem(spaceSplit);

    case BaseInteractions.Place:
    // TODO !!!! remove in add to room

    case BaseInteractions.Items:
      return listInventory();

    default:
      return "Command not understood";
  }
}

function parseInstructions(input: string): string {
  const cleanInput = input.toLowerCase().trim();
  let returnString = "";

  if (cleanInput.includes(" and ")) {
    cleanInput.split(" and ").forEach((section) => {
      returnString += parseSection(section);
    });
  } else if (cleanInput.includes(" then ")) {
    cleanInput.split(" then ").forEach((section) => {
      returnString += parseSection(section);
    });
  } else {
    returnString += parseSection(cleanInput);
  }

  return returnString.charAt(0).toUpperCase() + returnString.slice(1) + ".";
}

export default parseInstructions;
