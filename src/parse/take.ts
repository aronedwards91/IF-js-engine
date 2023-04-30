import { getCurrentRoom, getItemByID, addToInventory } from "../data";

export default function takeItem(stringArray: Array<string>): string {
  const Room = getCurrentRoom();

  if (stringArray.length > 1) {
    const chosenObject = stringArray.slice(1).join(" ");

    const ItemKey = Room.keyedItems[chosenObject];
    if (ItemKey) {
      const Item: Item = getItemByID(ItemKey);

      if (Item.isTakeable) {
        addToInventory(Item.name, ItemKey);
        return `you add ${chosenObject} to your inventory`;
      } else {
        return `You can't carry ${chosenObject}`;
      }
    }

    if (stringArray.length >= 3) {
      const unneededDescriptionObject = stringArray.slice(2).join(" ");
      const ItemKeyB = Room.keyedItems[unneededDescriptionObject];
      if (ItemKeyB) {
        const Item: Item = getItemByID(ItemKeyB);

        if (Item.isTakeable) {
          addToInventory(Item.name, ItemKeyB);
          return `you add ${chosenObject} to your inventory`;
        } else {
          return `You can't carry ${chosenObject}`;
        }
      }
    }

    return "Item not found";
  } else {
    return "What should I take?";
  }
}
