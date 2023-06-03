import {
  removeFromInventory,
  addItemToRoom,
  checkInventory,
  getItemByID,
} from "../../data";
import { checkInteraction, checkStringForSignificantTerms } from "../parse-utils";

export function genPlaceString(term: ItemID): string {
  return `You place the ${term} in the room`;
}

function placeIfExists(term: ItemID): string | false {
  if (checkInventory(term)) {
    let placeInteractionString: boolean | string = false;

    const Item = getItemByID(term);
    if (Item.interactions?.place) {
      placeInteractionString = checkInteraction(Item.interactions.place);
    }
    addItemToRoom(term);
    removeFromInventory(term);
    return placeInteractionString || genPlaceString(term);
  }

  return false
}

export default function checkPlace(stringArray: Array<string>): string {
  if (stringArray.length > 1) {
    const testResult = checkStringForSignificantTerms(
      stringArray,
      placeIfExists
    );
    if (testResult) return testResult;

    return "you have no such item currently";
  } else {
    return "what should I place?";
  }
}
