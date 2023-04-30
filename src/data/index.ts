import startString from "./start-string";
import { setupRoomsData, getCurrentRoom } from "./room";
import { setItemsList, getItemByID } from "./item";

let Info: GameInfo;
let TriggersData: Triggers;
let StateData: States;

interface IntialiseGame {
  info: GameInfo;
  roomsData: Rooms;
  itemsData: Items;
  triggersData: Triggers;
  stateData: States;
}

export function intialiseGameData({
  info,
  roomsData,
  itemsData,
  triggersData,
  stateData,
}: IntialiseGame) {
  Info = info;
  TriggersData = triggersData;
  StateData = stateData;

  setItemsList(itemsData);
  setupRoomsData(roomsData, info, itemsData);

  return {
    startTitle: info.name,
    startString: startString(info),
    startIntro: info.introduction,
    // fireableInteractions
  };
}

export { getCurrentRoom, getItemByID };
