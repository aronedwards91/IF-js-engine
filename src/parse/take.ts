import {
  getItemByID,
  addToInventory,
  checkRoomItemsList,
  checkRoomPlacedItems,
  removeItemFromRoom,
} from "../data";
import { fireIfTrigger, checkStringForSignificantTerms } from "./parse-utils";

function takeIfExists(term: ItemID): string | undefined {
  const existsInRoomIndex = checkRoomItemsList(term);
  const existsPlacedInRoomIndex = checkRoomPlacedItems(term);
  const index =
    existsInRoomIndex >= 0 ? existsInRoomIndex : existsPlacedInRoomIndex;

  if (index >= 0) {
    const Item: Item = getItemByID(term);
    let takeInteractionString: boolean | string = false;

    if (Item.interactions?.take) {
      takeInteractionString = fireIfTrigger(Item.interactions.take);
    }
    if (Item.isTakeable) {
      addToInventory(term);
      removeItemFromRoom(term);
      return takeInteractionString || `you add the ${term} to your inventory`;
    } else {
      return takeInteractionString || `you can't carry the ${term}`;
    }
  }
}

export default function takeItem(stringArray: Array<string>): string {
  if (stringArray.length > 1) {
    const testResult = checkStringForSignificantTerms(
      stringArray,
      takeIfExists
    );

    if (testResult) return testResult;

    return "item not found";
  } else {
    return "what should I take?";
  }
}
