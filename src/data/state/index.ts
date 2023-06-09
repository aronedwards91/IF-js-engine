let TriggersData: Triggers;
let StateData: States;

const SPLIT = ":";

const NewValTypes = {
  add: ">+>",
  subtract: ">->",
  multiply: ">*>",
};
const NewValArray = Object.values(NewValTypes);

export const getStateTriggerData = () => ({
  TriggersData,
  StateData,
});

export const getStateByID = (id: StateID): any => {
  if (id.includes(SPLIT)) {
    const split = id.split(SPLIT);
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
    const stateSplitKey = Trigger.stateID.split(SPLIT);

    if (stateSplitKey.length === 2) {
      const StateGroup = StateData[stateSplitKey[0]];
      const StateGroupItem = StateGroup[stateSplitKey[1]];

      if (StateGroup && StateGroup.hasOwnProperty(stateSplitKey[1])) {
        if (
          typeof Trigger.newValue === "string" &&
          Trigger.newValue.length > 3
        ) {
          const labelCheck = Trigger.newValue.substring(0, 3);
          const setNumber = parseInt(Trigger.newValue.substring(3));

          if (NewValArray.includes(labelCheck) && isNaN(setNumber) === false) {
            const initialValue = StateGroupItem as number;

            switch (labelCheck) {
              case NewValTypes.add:
                StateGroup[stateSplitKey[1]] = initialValue + setNumber;
                break;
              case NewValTypes.subtract:
                StateGroup[stateSplitKey[1]] = initialValue - setNumber;
                break;
              case NewValTypes.multiply:
                StateGroup[stateSplitKey[1]] = initialValue * setNumber;
                break;
            }
          } else {
            StateGroup[stateSplitKey[1]] = Trigger.newValue;
          }
        } else {
          StateGroup[stateSplitKey[1]] = Trigger.newValue;
        }

        return Trigger.returnString; // Expected Return
      }
    }
    console.error(
      `Trigger call broken => ${triggerID} , stateID:${Trigger.stateID}`
    );
  } else {
    console.error("unable to fire trigger => " + triggerID);
  }

  return "That didn't work";
}
