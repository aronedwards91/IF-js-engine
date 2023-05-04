import {
  getCurrentRoom,
  getItemByID,
  getRoomFullDescription,
  checkRoomItemsList,
  checkRoomPlacedItems,
  checkExaminableItems,
  getFromInventory,
} from "../data";
import { fireIfTrigger, checkStringForSignificantTerms } from "./parse-utils";

function checkExists(term: ItemID): string | undefined {
  const itemInRoomCheckIndex = checkRoomItemsList(term);

  if (itemInRoomCheckIndex >= 0) {
    const Item: Item = getItemByID(term);
    return fireIfTrigger(Item.interactions?.examine) || Item.description;
  }
  const itemPlacedInRoomCheckIndex = checkRoomPlacedItems(term);

  if (itemPlacedInRoomCheckIndex >= 0) {
    const Item: Item = getItemByID(term);
    return fireIfTrigger(Item.interactions?.examine || Item.description);
  }

  const examinable = checkExaminableItems(term);
  if (examinable) return examinable;

  const invItem = getFromInventory(term);
  if (invItem) invItem?.interactions.examine || invItem.description;

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
