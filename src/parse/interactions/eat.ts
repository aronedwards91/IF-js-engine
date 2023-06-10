import {
  getItemByID,
  checkInRoomForItemID,
  getFromInventory,
} from "../../data";
import {
  checkInteraction,
  checkStringForSignificantTerms,
} from "../parse-utils";

function checkEatableExists(term: ItemID): string | false {
  const existsInRoomAs = checkInRoomForItemID(term);

  if (existsInRoomAs) {
    const Item: Item | false = getItemByID(existsInRoomAs);
    if(Item) return Item.interactions?.eat
      ? checkInteraction(Item.interactions.eat)
      : "It's not eatable";
  }

  const invItem = getFromInventory(term);
  if (invItem && invItem?.interactions.eat)
    return invItem && invItem.interactions?.eat
      ? checkInteraction(invItem.interactions.eat)
      : "It's not eatable";

  return false;
}

export default function checkEat(stringArray: Array<string>): string {
  if (stringArray.length > 1) {
    const testResult = checkStringForSignificantTerms(
      stringArray,
      checkEatableExists
    );

    if (testResult) return testResult;
    return "can't see such an item";
  } else {
    return "eat what?";
  }
}
