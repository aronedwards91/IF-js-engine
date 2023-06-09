import { BuildTermHashMap } from "./interaction-phrases";
import { BaseInteractions } from "../enums";
import { listInventory } from "../data";
import {
  ifCombinationThenAttempt,
  COMBINE_STRINGS,
} from "./interactions/combine";
import checkExamine from "./interactions/examine";
import takeItem from "./interactions/take";
import placeItem from "./interactions/place";
import useItem from "./interactions/use";
import helpInteraction from "./interactions/help";
import { moveIfDirectionKnown, checkGo } from "./interactions/go";
import checkEat from "./interactions/eat";
import { checkStringForCustomInteractions } from "./parse-utils";

const Space = " ";
const TermHashMap = BuildTermHashMap();

function parseSection(input: string): string {
  const consistentSpacedString = input.replace(/\s\s+/g, Space);
  const removedVowels = consistentSpacedString
    .replace(" at ", " ")
    .replace(" the ", " ");
  const spaceSplit = removedVowels.split(Space);

  if (spaceSplit.length === 1) {
    const singleTerm = removedVowels;
    const singleTermDirCheck = moveIfDirectionKnown(singleTerm);
    if (singleTermDirCheck) return singleTermDirCheck;
  }

  const firstTerm = TermHashMap.get(spaceSplit[0]);

  const firstTermCombine = firstTerm === BaseInteractions.Combine;
  const isCombination = ifCombinationThenAttempt(spaceSplit);
  if (isCombination) return isCombination;

  switch (firstTerm) {
    case BaseInteractions.Examine:
      return checkExamine(spaceSplit);

    case BaseInteractions.Take:
      return takeItem(spaceSplit);

    case BaseInteractions.Place:
      return placeItem(spaceSplit);

    case BaseInteractions.Items:
      return listInventory();

    case BaseInteractions.Use:
      return useItem(spaceSplit);

    case BaseInteractions.Go:
      return checkGo(spaceSplit);

    case BaseInteractions.Eat:
      return checkEat(spaceSplit);

    case BaseInteractions.Help:
      return helpInteraction(spaceSplit);

    case BaseInteractions.Combine: {
      const isCombination = ifCombinationThenAttempt(spaceSplit);
      return isCombination || COMBINE_STRINGS.cantCombine;
    }

    default:
      // generic test
      const hasCustomInteractions =
        checkStringForCustomInteractions(spaceSplit);

      if (hasCustomInteractions) return hasCustomInteractions;

      spaceSplit[0] = firstTerm || spaceSplit[0];

      const hasCustomInteractionsMappedFirstTerm =
        checkStringForCustomInteractions(spaceSplit);

      if (hasCustomInteractionsMappedFirstTerm)
        return hasCustomInteractionsMappedFirstTerm;

      return "Command not understood";
  }
}

function parseInstructions(input: string): string {
  const cleanInput = input.toLowerCase().trim();
  let returnString = "";

  if (cleanInput.includes(" and ")) {
    cleanInput.split(" and ").forEach((section) => {
      returnString += parseSection(section);
    });
  } else if (cleanInput.includes(" then ")) {
    cleanInput.split(" then ").forEach((section) => {
      returnString += parseSection(section);
    });
  } else {
    returnString += parseSection(cleanInput);
  }

  return returnString.charAt(0).toUpperCase() + returnString.slice(1) + ".";
}

export default parseInstructions;
