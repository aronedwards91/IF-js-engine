import { BuildTermHashMap } from "./interactionPhrases";
import { BaseInteractions } from "../global";
import {getCurrentRoom} from "../data";

const Space = " ";
const TermHashMap = BuildTermHashMap();

function parseSection(input: string): string {
  const consistentSpacedString = input.replace(/\s\s+/g, Space);
  const spaceSplit = consistentSpacedString.split(Space);

  const firstTerm = TermHashMap.get(spaceSplit[0]);
  console.log("firstterm", firstTerm);

  switch (firstTerm) {
    case BaseInteractions.Examine:
      if (spaceSplit.length > 1) {
        // look at what?
      } else {
        // look at room
        const Room = getCurrentRoom();
        return Room.description;
      }
      break;

    default:
      break;
  }

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
