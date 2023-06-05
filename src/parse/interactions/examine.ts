import {
  getItemByID,
  getRoomFullDescription,
  checkInRoomForItemID,
  checkExaminableItems,
  getFromInventory,
} from "../../data";
import {
  checkInteraction,
  checkStringForSignificantTerms,
} from "../parse-utils";

function checkExists(term: ItemID): string | false {
  const existsInRoomAs = checkInRoomForItemID(term);

  if (existsInRoomAs) {
    const Item: Item = getItemByID(existsInRoomAs);

    return checkInteraction(Item.interactions?.examine || Item.description);
  }

  const examinable = checkExaminableItems(term);
  if (examinable) return checkInteraction(examinable);

  const invItem = getFromInventory(term);
  if (invItem)
    return (
      checkInteraction(invItem.interactions.examine) || invItem.description
    );

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
