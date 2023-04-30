import { GameInfo, Items, Rooms, States, Triggers } from "../global";
import startString from "./start-string";

let Info: GameInfo;
let RoomsData: Rooms;
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
  RoomsData = roomsData;
  ItemsData = itemsData;
  TriggersData = triggersData;
  StateData = stateData;

  return {
    startTitle: info.name,
    startString: startString(info),
    // fireableInteractions
  };
}
