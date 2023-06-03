import { getItemByID, checkInRoomForID, checkInventory } from "../../data";
import { checkInteraction, checkStringForSignificantTerms } from "../parse-utils";

function useCheck(term: ItemID): string | false {
  const existsInRoomIndex = checkInRoomForID(term);
  const isItemInInventory = checkInventory(term);

  if (
    existsInRoomIndex === 0 ||
    (typeof existsInRoomIndex !== "boolean" && existsInRoomIndex >= 0) ||
    isItemInInventory
  ) {
    const Item: Item = getItemByID(term);

    if (Item.interactions?.use) {
      return checkInteraction(Item.interactions.use);
    } else {
      return "There is no obvious way to use " + term;
    }
  }

  return false
}

export default function useItem(stringArray: Array<string>): string {
  if (stringArray.length > 1) {
    const testResult = checkStringForSignificantTerms(stringArray, useCheck);

    if (testResult) return testResult;

    return "item not found";
  } else {
    return "what should I use?";
  }
}
