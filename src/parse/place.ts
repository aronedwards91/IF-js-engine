import {
  removeFromInventory,
  addItemToRoom,
  checkInventory,
  getItemByID,
} from "../data";
import { fireIfTrigger } from "./parse-utils";

export default function checkPlace(stringArray: Array<string>): string {
  if (stringArray.length > 1) {
    const chosenObject = stringArray.slice(1).join(" ");

    if (checkInventory(chosenObject)) {
      let placeInteractionString: boolean | string = false;

      const Item = getItemByID(chosenObject);
      if (Item.interactions?.place) {
        placeInteractionString = fireIfTrigger(Item.interactions.place);
      }
      addItemToRoom(chosenObject);
      removeFromInventory(chosenObject);
      return placeInteractionString || `You place ${chosenObject} in the room`;
    }

    if (stringArray.length >= 3) {
      const unneededDescriptionObject = stringArray.slice(2).join(" ");

      if (checkInventory(unneededDescriptionObject)) {
        let placeInteractionString: boolean | string = false;
  
        const Item = getItemByID(unneededDescriptionObject);
        if (Item.interactions?.place) {
          placeInteractionString = fireIfTrigger(Item.interactions.place);
        }
        addItemToRoom(unneededDescriptionObject);
        removeFromInventory(unneededDescriptionObject);
        return placeInteractionString || `You place ${chosenObject} in the room`;
      }
    }

    return "you have no such item currently";
  } else {
    return "what should I place?";
  }
}
