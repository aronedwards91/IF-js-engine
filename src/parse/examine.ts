import { getCurrentRoom, getItemByID } from "../data";

export default function checkExamine(stringArray: Array<string>): string {
  const Room = getCurrentRoom();

  if (stringArray.length > 1) {
    const viewedObject = stringArray.slice(1).join(" ");

    if (Room.keyedItems[viewedObject]) {
      const Item: Item = getItemByID(Room.keyedItems[viewedObject]);
      return Item.interactions.examine;
    }

    if (Room.lookable && Room.lookable[viewedObject])
      return Room.lookable[viewedObject];

    // TODO check inventory

    if (stringArray.length >= 3) {
      const unneededDescriptionCheck = stringArray.slice(2).join(" ");
      if (Room.keyedItems[unneededDescriptionCheck]) {
        const Item: Item = getItemByID(
          Room.keyedItems[unneededDescriptionCheck]
        );
        return Item.interactions.examine;
      }

      if (Room.lookable && Room.lookable[unneededDescriptionCheck])
        return Room.lookable[unneededDescriptionCheck];
    }

    return "can't see such an item";
  } else {
    return Room.description;
  }
}
