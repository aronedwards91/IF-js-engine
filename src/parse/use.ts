import { getItemByID, checkInRoomForID, checkInventory } from "../data";
import { fireIfTrigger, checkStringForSignificantTerms } from "./parse-utils";

function useCheck(term: ItemID): string | undefined {
  const existsInRoomIndex = checkInRoomForID(term);
  const isItemInInventory = checkInventory(term);

  if (
    existsInRoomIndex === 0 ||
    (typeof existsInRoomIndex !== "boolean" && existsInRoomIndex >= 0) ||
    isItemInInventory
  ) {
    const Item: Item = getItemByID(term);

    if (Item.interactions?.use) {
      return fireIfTrigger(Item.interactions.use);
    } else {
      return "There is no obvious way to use " + term;
    }
  }
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
