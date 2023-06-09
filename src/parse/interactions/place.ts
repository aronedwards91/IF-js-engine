import {
  removeFromInventory,
  addItemToRoom,
  getItemByID,
  checkInInventoryID
} from "../../data";
import { checkInteraction, checkStringForSignificantTerms } from "../parse-utils";

export function genPlaceString(term: ItemID): string {
  return `You place the ${term} in the room`;
}

function placeIfExists(term: ItemID): string | false {
  const itemInventoryTrueID = checkInInventoryID(term);
  if (itemInventoryTrueID) {
    let placeInteractionString: boolean | string = false;

    const Item = getItemByID(itemInventoryTrueID || term);
    if (Item && Item.interactions?.place) {
      placeInteractionString = checkInteraction(Item.interactions.place);
    }
    addItemToRoom(itemInventoryTrueID || term);
    removeFromInventory(itemInventoryTrueID || term);
    return placeInteractionString || genPlaceString(term);
  }

  return false
}

export default function checkPlace(stringArray: Array<string>): string {
  if (stringArray.length > 1) {
    const testResult = checkStringForSignificantTerms(
      stringArray,
      placeIfExists,
      false
    );
    if (testResult) return testResult;

    return "you have no such item currently";
  } else {
    return "what should I place?";
  }
}
