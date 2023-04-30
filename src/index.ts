import { intialiseGameData } from "./data";
import ParseInstructions from "./parse";

export default {
  intialiseGameData,
  fireInput: (input: string): string => {
    return ParseInstructions(input)
  },
  startGame: () => {},
};
