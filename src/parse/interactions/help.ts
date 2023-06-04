import { checkStringForCustomInteractions } from "../parse-utils";
import { getGameInfo } from "../../data";

const HELP_TEXT = "guide... TODO";

export default function checkExamine(stringArray: Array<string>): string {
  if (stringArray.length > 1) {
    const hasCustomInteractions = checkStringForCustomInteractions(stringArray);

    if (hasCustomInteractions) return hasCustomInteractions;
    return "can't provide advice on specific items";
  } else {
    return getGameInfo().help || HELP_TEXT;
  }
}
