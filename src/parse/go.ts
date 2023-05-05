import { moveRoomByExit } from "../data";
import { checkStringForSignificantTerms } from "./parse-utils";
import { BuildDirectionTermHashMap } from "./interactionPhrases";

const DirectionTermHashMap = BuildDirectionTermHashMap();

function moveIfDirectionKnown(term: string): string | undefined {
  const dirTerm = DirectionTermHashMap.get(term) || term;
  const newRoomDescription: string | undefined = moveRoomByExit(dirTerm);
  if (newRoomDescription) return newRoomDescription;

  return undefined;
}

export default function checkGo(stringArray: Array<string>): string {
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
