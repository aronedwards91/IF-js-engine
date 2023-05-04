import {
  getItemByID,
  addToInventory,
  checkRoomItemsList,
  removeItemFromRoom,
} from "../data";
import { fireIfTrigger } from "./parse-utils";

export default function takeItem(stringArray: Array<string>): string {
  if (stringArray.length > 1) {
    const chosenObject = stringArray.slice(1).join(" ");
    const existsInRoomIndex = checkRoomItemsList(chosenObject);
    console.log("existsInRoomIndex", existsInRoomIndex);

    if (existsInRoomIndex >= 0) {
      const Item: Item = getItemByID(chosenObject);
      console.log("Item", Item);
      let takeInteractionString: boolean | string = false;

      if (Item.interactions?.take) {
        takeInteractionString = fireIfTrigger(Item.interactions.take);
      }
      if (Item.isTakeable) {
        addToInventory(chosenObject);
        removeItemFromRoom(chosenObject);
        return (
          takeInteractionString || `you add ${chosenObject} to your inventory`
        );
      } else {
        return takeInteractionString || `you can't carry ${chosenObject}`;
      }
    }

    if (stringArray.length >= 3) {
      const unneededDescriptionObject = stringArray.slice(2).join(" ");
      const existsInRoomIndexB = checkRoomItemsList(unneededDescriptionObject);

      if (existsInRoomIndexB >= 0) {
        const Item: Item = getItemByID(unneededDescriptionObject);
        let takeInteractionString: boolean | string = false;

        if (Item.interactions?.take) {
          takeInteractionString = Item.interactions.take;
        }

        if (Item.isTakeable) {
          addToInventory(unneededDescriptionObject);
          removeItemFromRoom(chosenObject);

          return (
            takeInteractionString || `you add ${chosenObject} to your inventory`
          );
        } else {
          return takeInteractionString || `you can't carry ${chosenObject}`;
        }
      }
    }

    return "item not found";
  } else {
    return "what should I take?";
  }
}
