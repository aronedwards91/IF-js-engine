import {
  getItemByID,
  addToInventory,
  checkInRoomForItemID,
  removeItemFromRoom,
} from "../../data";
import { checkInteraction, checkStringForSignificantTerms } from "../parse-utils";

function takeIfExists(term: ItemID): string | false {
  const existsInRoomAs = checkInRoomForItemID(term);

  if (existsInRoomAs) {
    const Item: Item = getItemByID(existsInRoomAs);
    let takeInteractionString: boolean | string = false;

    if (Item.interactions?.take) {
      takeInteractionString = checkInteraction(Item.interactions.take);
    }
    if (Item.isTakeable) {
      addToInventory(existsInRoomAs);
      removeItemFromRoom(existsInRoomAs);
      return takeInteractionString || `you add the ${existsInRoomAs} to your inventory`;
    } else {
      return takeInteractionString || `you can't carry the ${existsInRoomAs}`;
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
