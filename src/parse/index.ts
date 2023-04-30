import { BuildTermHashMap } from "./interactionPhrases";
import { BaseInteractions } from "../enums";
import { getCurrentRoom, getItemByID } from "../data";

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
      const Room = getCurrentRoom();
      if (spaceSplit.length > 1) {
        // look at what?
        const viewedObject = spaceSplit.slice(1).join(" ");

        if (Room.keyedItems[viewedObject]) {
          const Item: Item = getItemByID(Room.keyedItems[viewedObject]);
          return Item.interactions.examine;
        }

        // check lookable
        // check ver description

        return "can't see such an item";
      } else {
        return Room.description;
      }
      break;

    default:
      return "";
  }

  return "Command not understood";
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
    returnString += parseSection(input);
  }

  return returnString.charAt(0).toUpperCase() + returnString.slice(1) + ".";
}

export default parseInstructions;
