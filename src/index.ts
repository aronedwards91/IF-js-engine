import { intialiseGameData, debugGameState } from "./data";
import ParseInstructions from "./parse";
import { listWithDeterminer, listArrayWithDeterminer } from "./utils/lister";

export default {
  intialiseGameData,
  fireInput: (input: string): string => {
    return ParseInstructions(input);
  },
  startGame: () => {},
  debugGameState,
  testingTools: {
    listWithDeterminer,
    listArrayWithDeterminer,
  },
};
