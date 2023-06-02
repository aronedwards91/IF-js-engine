import { handleStringCheck } from "./string-check";
import { getStateByID } from "../../data/state";

export function handleStateCheck(stateCheck: StateCheck): string {
  let isPass = false;

  Object.keys(stateCheck.req).forEach((key) => {
    if (stateCheck.req[key] === getStateByID(key)) isPass = true;
  });

  const onPostCheck = isPass ? stateCheck.onPass : stateCheck.onFail;

  const stringCheck = handleStringCheck(onPostCheck);

  if (stringCheck) return stringCheck;

  return onPostCheck;
}
