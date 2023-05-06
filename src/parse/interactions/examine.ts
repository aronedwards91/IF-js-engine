import {
  getItemByID,
  getRoomFullDescription,
  checkInRoomForID,
  checkExaminableItems,
  getFromInventory,
} from "../../data";
import { fireIfTrigger, checkStringForSignificantTerms } from "../parse-utils";

function checkExists(term: ItemID): string | undefined {
  const existsInRoomIndex = checkInRoomForID(term);

  if (
    existsInRoomIndex === 0 ||
    (typeof existsInRoomIndex !== "boolean" && existsInRoomIndex >= 0)
  ) {
    const Item: Item = getItemByID(term);

    return fireIfTrigger(Item.interactions?.examine || Item.description);
  }

  const examinable = checkExaminableItems(term);
  if (examinable) return fireIfTrigger(examinable);

  const invItem = getFromInventory(term);
  if (invItem)
    fireIfTrigger(invItem?.interactions.examine) || invItem.description;

  return undefined;
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
