import { moveToRoom, getRoomExit } from "../../data";
import { checkStringForSignificantTerms } from "../parse-utils";
import { BuildDirectionTermHashMap } from "../interaction-phrases";
import { handleStateCheck } from "./state-check";

const DirectionTermHashMap = BuildDirectionTermHashMap();

export function moveIfDirectionKnown(term: string): string | undefined {
  const dirTerm = DirectionTermHashMap.get(term) || term;
  const roomExit = getRoomExit(dirTerm);
  console.log(">>>>roomExit", roomExit);

  if(typeof roomExit === 'string') {
    // checkstring()
    // if checkstring false
    
    const newRoomDescription = moveToRoom(roomExit);
    if (newRoomDescription) return newRoomDescription;
  } else if(roomExit) {
     return handleStateCheck(roomExit);
  }

  return undefined;
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
