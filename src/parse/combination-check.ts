import { CombinationInteractions } from "./interaction-phrases";

export function isCombinationCall(strArray: Array<string>): boolean {
  if (strArray.length > 2) {
    let stringContainsSplitter = false;
    const checkedArray = strArray.splice(1, strArray.length - 1);

    checkedArray.forEach((stringSection) => {
      if (CombinationInteractions.includes(stringSection))
        stringContainsSplitter = true;
    });

    return stringContainsSplitter;
  }
  return false;
}
