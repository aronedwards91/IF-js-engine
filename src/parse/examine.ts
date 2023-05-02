import { getCurrentRoom, getItemByID, getRoomFullDescription } from "../data";
import { fireIfTrigger } from "./parse-utils";

export default function checkExamine(stringArray: Array<string>): string {
  const Room = getCurrentRoom();

  if (stringArray.length > 1) {
    const viewedObject: ItemID = stringArray.slice(1).join(" ");
    const itemInRoomCheckIndex = Room.itemsList.indexOf(viewedObject);



    if (itemInRoomCheckIndex >= 0) {
      const Item: Item = getItemByID(Room.itemsList[itemInRoomCheckIndex]);
      return fireIfTrigger(Item.interactions?.examine) || Item.description;
    }

    if (Room.lookable && Room.lookable[viewedObject])
      return Room.lookable[viewedObject];

    // TODO check inventory

    if (stringArray.length >= 3) {
      const unneededDescriptionCheck: ItemID = stringArray.slice(2).join(" ");
      const itemInRoomCheckIndexB = Room.itemsList.indexOf(unneededDescriptionCheck);

      if (itemInRoomCheckIndexB >= 0) {
        const Item: Item = getItemByID(
          Room.itemsList[itemInRoomCheckIndexB]
        );
        return fireIfTrigger(Item.interactions?.examine) || Item.description;
      }

      if (Room.lookable && Room.lookable[unneededDescriptionCheck])
        return Room.lookable[unneededDescriptionCheck];
    }

    return "can't see such an item";
  } else {
    return getRoomFullDescription();
  }
}
