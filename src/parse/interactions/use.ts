import { getItemByID, checkInRoomForItemID, checkInventory } from "../../data";
import { checkInteraction, checkStringForSignificantTerms } from "../parse-utils";

function useCheck(term: ItemID): string | false {
  const existsInRoomAs = checkInRoomForItemID(term);
  const isItemInInventory = checkInventory(term);

  if (
    existsInRoomAs ||
    isItemInInventory
  ) {
    const Item: Item = getItemByID(existsInRoomAs || term);

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
