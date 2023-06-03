import { TriggerPrefix } from "../../enums";
import { moveToRoom } from "../../data";
import { fireTrigger } from "../../data/state";

export function handleStringCheck(stringValue: string): string | false {
  const substringCheck =
    stringValue.length >= 4 ? stringValue.substring(0, 4) : false;

  if (substringCheck) {
    const stringContent = stringValue.substring(4);

    if (substringCheck === TriggerPrefix.MOVE_LOCATION) {
      return moveToRoom(stringContent);
    }
    if (substringCheck === TriggerPrefix.FIRE_TRIGGER) {
      return fireTrigger(stringContent);
    }
    //  move description??
  }

  return false;
}
