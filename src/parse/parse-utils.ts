import { handleStateCheck } from "./interactions/state-check";
import { handleStringCheck } from "./interactions/string-check";
import {
  getItemByID,
  checkInRoomForID,
  getCurrentRoom,
  getFromInventory,
} from "../data";

export function checkInteraction(interaction: Interaction): string {
  if (typeof interaction === "string") {
    const isSpecialString = handleStringCheck(interaction);

    if (isSpecialString) return isSpecialString;
    return interaction;
  } else {
    return handleStateCheck(interaction);
  }
}

function checkCustomInteractions(
  interactionCommand: InteractionVaried,
  term: ItemID
): string | false {
  const existsInRoomIndex = checkInRoomForID(term);

  if (
    existsInRoomIndex === 0 ||
    (typeof existsInRoomIndex !== "boolean" && existsInRoomIndex >= 0)
  ) {
    const Item: Item = getItemByID(term);

    if (Item && Item.interactions?.[interactionCommand])
      return checkInteraction(Item.interactions[interactionCommand]);
  }

  const invItem = getFromInventory(term);
  if (invItem && invItem.interactions?.[interactionCommand])
    return checkInteraction(invItem.interactions[interactionCommand]);

  const room = getCurrentRoom();
  if (room && room.interactions?.[interactionCommand])
    return checkInteraction(room.interactions[interactionCommand]);

  return false;
}

export function checkStringForCustomInteractions(
  stringArray: Array<string>
): string | false {
  const targetedObject: ItemID = stringArray.slice(1).join(" ");
  // check for special interactions in room or with objects  eg ["move", "ladder"]
  const possibleInteractionCommand = stringArray[0];
  const hasSpecialInteraction = checkCustomInteractions(
    possibleInteractionCommand,
    targetedObject
  );
  if (hasSpecialInteraction) return hasSpecialInteraction;

  if (stringArray.length >= 3) {
    const unneededDescriptionCheckTarget: ItemID =
      stringArray[stringArray.length - 1];

    const check = checkCustomInteractions(
      possibleInteractionCommand,
      unneededDescriptionCheckTarget
    );
    if (check) return check;
  }

  return false;
}

export function checkStringForSignificantTerms(
  stringArray: Array<string>,
  testFunction: (x: string) => string | false
): string | false {
  const targetedObject: ItemID = stringArray.slice(1).join(" ");

  const checkA = testFunction(targetedObject);
  if (checkA) return checkA;

  if (stringArray.length >= 3) {
    // overdescribed single words
    const unneededDescriptionCheck: ItemID =
      stringArray[stringArray.length - 1];

    const checkB = testFunction(unneededDescriptionCheck);
    if (checkB) return checkB;

    // overdescribed double words
    const unneededDescriptionCheckDouble: ItemID = stringArray
      .splice(-2)
      .join(" ");

    const checkC = testFunction(unneededDescriptionCheckDouble);
    if (checkC) return checkC;

    // overdescribed triple words
    const unneededDescriptionCheckTriple: ItemID = stringArray
      .splice(-3)
      .join(" ");

    const checkD = testFunction(unneededDescriptionCheckTriple);
    if (checkD) return checkD;
  }

  const hasCustomInteractions = checkStringForCustomInteractions(stringArray);

  if(hasCustomInteractions) return hasCustomInteractions;

  return false;
}
