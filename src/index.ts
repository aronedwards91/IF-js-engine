import { intialiseGameData } from "./data";

interface InputReturn {
  string: string;
  onFinish: (str: string) => {};
}

export default {
  intialiseGameData,
  fireInput: (): InputReturn => {
    return {
      string: "",
      onFinish: (x) => {
        return x;
      },
    };
  },
  startGame: () => {},
};
