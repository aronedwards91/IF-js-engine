import {
  getItemByID,
  addToInventory,
  checkRoomItems,
  removeItemFromRoom,
} from "../data";
import { fireIfTrigger } from "./parse-utils";

export default function useItem(stringArray: Array<string>): string {
  if (stringArray.length > 1) {
    const chosenObject = stringArray.slice(1).join(" ");
    const existsInRoomIndex = checkRoomItems(chosenObject);

    if (existsInRoomIndex >= 0) {
        const Item: Item = getItemByID(chosenObject);

        if(Item.interactions?.use) {
            return fireIfTrigger(Item.interactions.use);
        } else {
            return "There is no obvious way to use " + chosenObject;
        }
    }
    
    if (stringArray.length >= 3) {
        const unneededDescriptionObject = stringArray.slice(2).join(" ");
        const existsInRoomIndexB = checkRoomItems(unneededDescriptionObject);

      if (existsInRoomIndexB >= 0) {
        const Item: Item = getItemByID(unneededDescriptionObject);

        if(Item.interactions?.use) {
            return fireIfTrigger(Item.interactions.use);
        } else {
            return "There is no obvious way to use " + chosenObject;
        }
      }
    }

    return "item not found";
  } else {
    return "what should I use?";
  }
}
