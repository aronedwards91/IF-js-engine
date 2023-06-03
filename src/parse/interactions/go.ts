import { moveToRoom, getRoomExit } from "../../data";
import { checkStringForSignificantTerms } from "../parse-utils";
import { BuildDirectionTermHashMap } from "../interaction-phrases";
import { handleStateCheck } from "./state-check";
import { handleStringCheck } from "./string-check";

const DirectionTermHashMap = BuildDirectionTermHashMap();

export function moveIfDirectionKnown(term: string): string | false {
  const dirTerm = DirectionTermHashMap.get(term) || term;
  const roomExit = getRoomExit(dirTerm);

  if (typeof roomExit === "string") {
    const isSpecialString = handleStringCheck(roomExit);

    if (!isSpecialString) {
      const newRoomDescription = moveToRoom(roomExit);
      if (newRoomDescription) return newRoomDescription;

      return false; // moveToRoom found no room
    } else {
      return isSpecialString;
    }
  } else if (roomExit) {
    return handleStateCheck(roomExit);
  }

  return false;
}

export function checkGo(stringArray: Array<string>): string {
  if (stringArray.length > 1) {
    const testResult = checkStringForSignificantTerms(
      stringArray,
      moveIfDirectionKnown
    );

    if (testResult) return testResult;

    return "direction not found";
  } else {
    return "which direction do you want to go?";
  }
}
