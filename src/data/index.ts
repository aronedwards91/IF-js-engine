import { GameInfo, Items, Rooms, States, Triggers } from "../global";
import startString from "./start-string";
import { SetupRoomsData, getCurrentRoom } from "./room";

let Info: GameInfo;
let ItemsData: Items;
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
  ItemsData = itemsData;
  TriggersData = triggersData;
  StateData = stateData;

  SetupRoomsData(roomsData, info);

  return {
    startTitle: info.name,
    startString: startString(info),
    startIntro: info.introduction,
    // fireableInteractions
  };
}

export { getCurrentRoom };
