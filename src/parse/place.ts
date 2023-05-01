import {
  removeFromInventory,
  addItemToRoom,
  checkInventory,
} from "../data";

export default function checkPlace(stringArray: Array<string>): string {
  if (stringArray.length > 1) {
    const chosenObject = stringArray.slice(1).join(" ");

    if (checkInventory(chosenObject)) {
      addItemToRoom(chosenObject);
      removeFromInventory(chosenObject);
      return `You place ${chosenObject} in the room`;
    }

    if (stringArray.length >= 3) {
      const unneededDescriptionObject = stringArray.slice(2).join(" ");

      if (checkInventory(unneededDescriptionObject)) {
        addItemToRoom(unneededDescriptionObject);
        removeFromInventory(unneededDescriptionObject);
        return `You place ${chosenObject} in the room`;
      }
    }

    return "you have no such item currently";
  } else {
    return "what should I place?";
  }
}
