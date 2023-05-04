import {
  getCurrentRoom,
  getItemByID,
  getRoomFullDescription,
  checkRoomItemsList,
  checkRoomPlacedItems,
  checkExaminableItems,
  getFromInventory
} from "../data";
import { fireIfTrigger } from "./parse-utils";

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
  if(invItem) invItem?.interactions.examine || invItem.description;

  return undefined;
}

export default function checkExamine(stringArray: Array<string>): string {
  const Room = getCurrentRoom();

  if (stringArray.length > 1) {
    const viewedObject: ItemID = stringArray.slice(1).join(" ");
    const checkA = checkExists(viewedObject);
    if (checkA) return checkA;

    if (stringArray.length >= 3) {
      // overdescribed single words
      const unneededDescriptionCheck: ItemID =
        stringArray[stringArray.length - 1];

      const checkB = checkExists(unneededDescriptionCheck);
      if (checkB) return checkB;

      // overdescribed double words
      const unneededDescriptionCheckDouble: ItemID = stringArray
        .splice(-2)
        .join(" ");

      const checkC = checkExists(unneededDescriptionCheckDouble);
      if (checkC) return checkC;

      // overdescribed triple words
      const unneededDescriptionCheckTriple: ItemID = stringArray
        .splice(-3)
        .join(" ");

      const checkD = checkExists(unneededDescriptionCheckTriple);
      if (checkD) return checkD;
    }

    return "can't see such an item";
  } else {
    return getRoomFullDescription();
  }
}
