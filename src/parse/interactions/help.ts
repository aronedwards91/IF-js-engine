import { checkStringForCustomInteractions } from "../parse-utils";
import { getGameInfo } from "../../data";

const HELP_TEXT = `HELP\n
Read the game's introduction carefully to understand the setting and your character's objectives.
Familiarize yourself with the game's commands and syntax. Common commands include "look," "go," "take," and "use." Pay attention to any special commands specific to the game.
use "items" to check your inventory
use "combine X with Y" to combine items

TIPS\n
Use the "look" command frequently to examine your surroundings and gather important information about the environment.
Experiment with different actions and commands. Try interacting with objects, characters, and the environment to uncover hidden clues and trigger events.
Pay attention to descriptions, as they often contain valuable hints. Look for keywords and phrases that might be relevant to your current objectives.
Interactive fiction games often feature puzzles and challenges that you must solve to progress. Think creatively and be open to unconventional solutions.
Analyze your inventory and the objects in your surroundings. Consider how they might be used together or interacted with to overcome obstacles.
Don't hesitate to try different approaches or combinations of actions. Sometimes, a solution may require multiple steps or a specific order of actions.
`;

export default function checkExamine(stringArray: Array<string>): string {
  if (stringArray.length > 1) {
    const hasCustomInteractions = checkStringForCustomInteractions(stringArray);

    if (hasCustomInteractions) return hasCustomInteractions;
    return "can't provide advice on specific items";
  } else {
    return getGameInfo().help || HELP_TEXT;
  }
}
