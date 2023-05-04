import { fireTrigger } from "../data/state";

export function fireIfTrigger(response: string): string {
  if (response.substring(0, 2) === ">>") {
    return fireTrigger(response.substring(2));
  }
  return response;
}

export function checkStringForSignificantTerms(
  stringArray: Array<string>,
  testFunction: (x: string) => string | undefined
): string | undefined {
  // if (stringArray.length > 1) {
  const viewedObject: ItemID = stringArray.slice(1).join(" ");
  const checkA = testFunction(viewedObject);
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
  // }
  return undefined;
}
