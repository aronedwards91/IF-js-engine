import {
  recursiveInventoryIDCheck,
  recursiveRoomItemIDCheck,
} from "../../data";
import { checkForCombination } from "../../data";
import { CombinationInteractions } from "../interaction-phrases";
import { checkInteraction } from "../parse-utils";

export const COMBINE_STRINGS = {
  cantCombine: "Items cannot be combined",
  itemsNotFound: "These items cannot be found",
};

export function ifCombinationThenAttempt(
  strArrayOriginal: Array<string>
): string | false {
  const strArray = [...strArrayOriginal];
  if (strArray.length > 2) {
    const checkedArray = strArray.splice(1, strArray.length - 1);

    let splitterIndex = -1;
    checkedArray.forEach((stringSection, i) => {
      if (CombinationInteractions.includes(stringSection)) {
        splitterIndex = i;
      }
    });

    if (splitterIndex > -1) {
      const firstItemArr = strArrayOriginal.slice(0, splitterIndex + 1);
      const firstItemID =
        recursiveInventoryIDCheck(firstItemArr) ||
        recursiveRoomItemIDCheck(firstItemArr);

      const secondItemArr = strArrayOriginal.slice(
        splitterIndex + 2,
        strArrayOriginal.length
      );
      const secondItemID =
        recursiveInventoryIDCheck(secondItemArr) ||
        recursiveRoomItemIDCheck(secondItemArr);

      if (firstItemID && secondItemID) {
        // check combine
        const isCombination = checkForCombination(
          firstItemID,
          secondItemID as string
        );
        if (isCombination) return checkInteraction(isCombination);

        return COMBINE_STRINGS.cantCombine;
      } else {
        if (secondItemID && !firstItemID) {
          return `cannot find ${firstItemArr.join(" ")}`;
        } else if (firstItemID && !secondItemID) {
          return `cannot find ${secondItemArr.join(" ")}`;
        }
        return COMBINE_STRINGS.itemsNotFound;
      }
    }
  }

  return false;
}
