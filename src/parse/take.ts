import { getCurrentRoom, getItemByID } from "../data";

export default function takeItem(stringArray: Array<string>): string {
  const Room = getCurrentRoom();

  if (stringArray.length > 1) {
    const chosenObject = stringArray.slice(1).join(" ");

    if (Room.keyedItems[chosenObject]) {
      const Item: Item = getItemByID(Room.keyedItems[chosenObject]);

      if (Item.isTakeable) {
        // TODO add to inventory
        return `you add ${chosenObject} to your inventory`;
      } else {
        return `You can't carry ${chosenObject}`;
      }
    }

    if (stringArray.length >= 3) {
      const unneededDescriptionObject = stringArray.slice(2).join(" ");
      if (Room.keyedItems[unneededDescriptionObject]) {
        const Item: Item = getItemByID(
          Room.keyedItems[unneededDescriptionObject]
        );
        // TODO add to inventory
        return `you add ${chosenObject} to your inventory`;
      }
    }

    return "Item not found";
  } else {
    return "What should I take?";
  }
}
