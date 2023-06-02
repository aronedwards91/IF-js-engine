import { TriggerPrefix } from "../../enums";
import { moveToRoom, getCurrentRoom } from "../../data";

export function handleStringCheck(stringValue: string): string | false {
  const substringCheck =
    stringValue.length >= 4 ? stringValue.substring(0, 4) : false;

  if (substringCheck) {
    const stringContent = stringValue.substring(4);

    if (substringCheck === TriggerPrefix.MOVE_LOCATION) {
        return moveToRoom(stringContent);
    } else if (substringCheck === TriggerPrefix.FIRE_TRIGGER) {
      // fireTrigger
    }
    //  move description??
  }

  return false;
}
