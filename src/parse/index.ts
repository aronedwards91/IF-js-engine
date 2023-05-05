import { BuildTermHashMap } from "./interactionPhrases";
import { BaseInteractions } from "../enums";
import { listInventory } from "../data";
import checkExamine from "./examine";
import takeItem from "./take";
import placeItem from "./place";
import useItem from "./use";
import { moveIfDirectionKnown, checkGo } from "./go";
import checkEat from "./eat";

const Space = " ";
const TermHashMap = BuildTermHashMap();

function parseSection(input: string): string {
  const consistentSpacedString = input.replace(/\s\s+/g, Space);
  const removedVowels = consistentSpacedString
    .replace(" at ", " ")
    .replace(" the ", " ");
  const spaceSplit = removedVowels.split(Space);

  if (spaceSplit.length === 1) {
    const singleTermDirCheck = moveIfDirectionKnown(spaceSplit[0]);
    if (singleTermDirCheck) return singleTermDirCheck;
  }

  const firstTerm = TermHashMap.get(spaceSplit[0]);

  switch (firstTerm) {
    case BaseInteractions.Examine:
      return checkExamine(spaceSplit);

    case BaseInteractions.Take:
      return takeItem(spaceSplit);

    case BaseInteractions.Place:
      return placeItem(spaceSplit);

    case BaseInteractions.Items:
      return listInventory();

    case BaseInteractions.Use:
      return useItem(spaceSplit);

    case BaseInteractions.Go:
      return checkGo(spaceSplit);

    case BaseInteractions.Eat:
      return checkEat(spaceSplit);

      // case BaseInteractions.Open: closable door
      //   return checkEat(spaceSplit);
    default:
      // generic test
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
