import { handleStringCheck } from "./string-check";
import { getStateByID } from "../../data/state";

const SPLIT = ":";

const numCheckTypes = {
  smaller: "<",
  bigger: ">",
  smallerOrEq: "<=",
  biggerOrEq: ">=",
};

export function handleStateCheck(stateCheck: StateCheck): string {
  let isPass = false;

  Object.keys(stateCheck.req).forEach((key) => {

    const checkedValue= stateCheck.req[key];
    const split = key.split(SPLIT);

    if (split.length > 2) {
      const checkType = split[2];

      switch (checkType) {
        case numCheckTypes.smaller:
          isPass = getStateByID(key) < checkedValue;
          break;
        case numCheckTypes.bigger:
          isPass = getStateByID(key) > checkedValue;
          break;
        case numCheckTypes.smallerOrEq:
          isPass = getStateByID(key) <= checkedValue;
          break;
        case numCheckTypes.biggerOrEq:
          isPass = getStateByID(key) >= checkedValue;
          break;
      }
    } else if (checkedValue === getStateByID(key)) {
      isPass = true;
    }
  });

  const onPostCheck = isPass ? stateCheck.onPass : stateCheck.onFail;

  const stringCheck = handleStringCheck(onPostCheck);

  if (stringCheck) return stringCheck;

  return onPostCheck;
}
