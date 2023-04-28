import { GameInfo, Items, Rooms, States, Triggers } from "../global";

let Info: GameInfo;
let RoomsData: Rooms;
let ItemsData: Items;
let TriggersData: Triggers;
let StateData: States;

export function intialiseGameData(
  info: GameInfo,
  roomsData: Rooms,
  itemsData: Items,
  triggersData: Triggers,
  stateData: States
) {
  Info = info;
  RoomsData = roomsData;
  ItemsData = itemsData;
  TriggersData = triggersData;
  StateData = stateData;
}
