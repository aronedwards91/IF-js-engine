function checkReq(req: Record<StateID, State>) {
  const isPass = true;
  Object.keys(req).forEach((key) => {});

  return isPass;
}

export function handleStateCheck(statecheck: StateCheck): string {

  const isPass = true;
  Object.keys(statecheck.req).forEach((key) => {});

  return ">>statecheck";
}
