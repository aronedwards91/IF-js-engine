import {
  getItemByID,
  getRoomFullDescription,
  checkInRoomForID,
  checkExaminableItems,
  getFromInventory,
} from "../../data";
import {
  checkInteraction,
  checkStringForSignificantTerms,
} from "../parse-utils";

function checkExists(term: ItemID): string | false {
  const existsInRoomIndex = checkInRoomForID(term);

  if (
    existsInRoomIndex === 0 ||
    (typeof existsInRoomIndex !== "boolean" && existsInRoomIndex >= 0)
  ) {
    const Item: Item = getItemByID(term);

    return checkInteraction(Item.interactions?.examine || Item.description);
  }

  const examinable = checkExaminableItems(term);
  if (examinable) return checkInteraction(examinable);

  const invItem = getFromInventory(term);
  if (invItem)
    return checkInteraction(invItem.interactions.examine) || invItem.description;

  return false;
}

export default function checkExamine(stringArray: Array<string>): string {
  if (stringArray.length > 1) {
    const testResult = checkStringForSignificantTerms(stringArray, checkExists);

    if (testResult) return testResult;
    return "can't see such an item";
  } else {
    return getRoomFullDescription();
  }
}
