import {
  getItemByID,
  addToInventory,
  checkInRoomForID,
  removeItemFromRoom,
} from "../../data";
import { checkInteraction, checkStringForSignificantTerms } from "../parse-utils";

function takeIfExists(term: ItemID): string | false {
  const inRoomIndex = checkInRoomForID(term);

  if (typeof inRoomIndex !== 'boolean' && inRoomIndex >= 0) {
    const Item: Item = getItemByID(term);
    let takeInteractionString: boolean | string = false;

    if (Item.interactions?.take) {
      takeInteractionString = checkInteraction(Item.interactions.take);
    }
    if (Item.isTakeable) {
      addToInventory(term);
      removeItemFromRoom(term);
      return takeInteractionString || `you add the ${term} to your inventory`;
    } else {
      return takeInteractionString || `you can't carry the ${term}`;
    }
  }

  return false
}

export default function takeItem(stringArray: Array<string>): string {
  if (stringArray.length > 1) {
    const testResult = checkStringForSignificantTerms(
      stringArray,
      takeIfExists,
      false
    );

    if (testResult) return testResult;

    return "item not found";
  } else {
    return "what should I take?";
  }
}
