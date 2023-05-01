import {
  getItemByID,
  addToInventory,
  checkRoomItems,
  removeItemFromRoom
} from "../data";

export default function takeItem(stringArray: Array<string>): string {
  if (stringArray.length > 1) {
    const chosenObject = stringArray.slice(1).join(" ");
    const existsInRoomIndex = checkRoomItems(chosenObject);
    if (existsInRoomIndex >= 0) {
      const Item: Item = getItemByID(chosenObject);

      if (Item.isTakeable) {
        addToInventory(chosenObject);
        removeItemFromRoom(chosenObject);
        return `you add ${chosenObject} to your inventory`;
      } else {
        return `you can't carry ${chosenObject}`;
      }
    }

    if (stringArray.length >= 3) {
      const unneededDescriptionObject = stringArray.slice(2).join(" ");
      const existsInRoomIndexB = checkRoomItems(unneededDescriptionObject);

      if (existsInRoomIndexB >= 0) {
        const Item: Item = getItemByID(unneededDescriptionObject);

        if (Item.isTakeable) {
          addToInventory(unneededDescriptionObject);
          removeItemFromRoom(chosenObject);
          return `you add ${chosenObject} to your inventory`;
        } else {
          return `you can't carry ${chosenObject}`;
        }
      }
    }

    return "item not found";
  } else {
    return "what should I take?";
  }
}
