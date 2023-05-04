let TriggersData: Triggers;
let StateData: States;

const TriggerSplit = ":";

export const getStateTriggerData = () => ({
  TriggersData,
  StateData,
});

const strSplit = ":";

export const getStateByID = (id: StateID): any => {
  if (id.includes(strSplit)) {
    const split = id.split(strSplit);
    return StateData[split[0]][split[1]];
  }
  return StateData[id];
};

export function setupStateAndTriggers(
  triggersData: Triggers,
  stateData: States
) {
  TriggersData = triggersData;
  StateData = stateData;
}

export function fireTrigger(triggerID: TriggerID): string {
  const Trigger = TriggersData[triggerID];
  if (Trigger) {
    const stateSplitKey = Trigger.stateID.split(TriggerSplit);
    if (stateSplitKey.length === 2) {
      const StateGroup = StateData[stateSplitKey[0]];

      if (StateGroup && StateGroup[stateSplitKey[1]]) {
        StateGroup[stateSplitKey[1]] = Trigger.newValue;

        return Trigger.returnString;
      }
    }
  }
  console.error("unable to fire trigger => " + triggerID);
  return "That didn't work";
}
