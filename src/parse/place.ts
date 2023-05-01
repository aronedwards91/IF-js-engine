import {
  getInventoryItems,
  removeFromInventory,
} from "../data";

export default function checkPlace(stringArray: Array<string>): string {

  if (stringArray.length > 1) {
    const chosenObject = stringArray.slice(1).join(" ");

    const ItemKey = getInventoryItems()[chosenObject];
    if (ItemKey) {
      // addItem to Room
      removeFromInventory(ItemKey);
      return `You place ${chosenObject} in the room`;
    }

    if (stringArray.length >= 3) {
      const unneededDescriptionObject = stringArray.slice(2).join(" ");
      const ItemKeyB = getInventoryItems()[unneededDescriptionObject];

      if (ItemKeyB) {
        // addItem to Room
        removeFromInventory(ItemKeyB);
        return `You place ${chosenObject} in the room`;
      }
    }

    return "you have no such item currently"
  } else {
    return "what should I place?";
  }
}
