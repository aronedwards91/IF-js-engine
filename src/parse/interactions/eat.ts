import { getItemByID, checkInRoomForID, getFromInventory } from "../../data";
import { fireIfTrigger, checkStringForSignificantTerms } from "../parse-utils";

function checkEatableExists(term: ItemID): string | undefined {
  const existsInRoomIndex = checkInRoomForID(term);

  if (
    existsInRoomIndex === 0 ||
    (typeof existsInRoomIndex !== "boolean" && existsInRoomIndex >= 0)
  ) {
    const Item: Item = getItemByID(term);
    return Item.interactions?.eat
      ? fireIfTrigger(Item.interactions.eat)
      : "It's not eatable";
  }

  const invItem = getFromInventory(term);
  if (invItem && invItem?.interactions.eat)
    return invItem && invItem.interactions?.eat
      ? fireIfTrigger(invItem.interactions.eat)
      : "It's not eatable";

  return undefined;
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
