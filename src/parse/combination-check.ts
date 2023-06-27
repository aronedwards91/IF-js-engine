import { CombinationInteractions } from "./interaction-phrases";

type StringIndex = number;

// used by test
export function isCombinationCall(
  strArray: Array<string>
): StringIndex | boolean {
  if (strArray.length > 2) {
    const checkedArray = strArray.splice(1, strArray.length - 1);

    let splitterIndex = -1;
    checkedArray.forEach((stringSection, i) => {
      if (CombinationInteractions.includes(stringSection)) splitterIndex = i;
    });

    return splitterIndex + 1;
  }
  return false;
}
