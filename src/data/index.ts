import startString from "./start-string";
import { setupRoomsData, getRoomsData } from "./room";
import { setItemsList, getItemsData } from "./item";
import { setupStateAndTriggers, getStateTriggerData } from "./state";

let Info: GameInfo;

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

  setItemsList(itemsData);
  setupRoomsData(roomsData, info);
  setupStateAndTriggers(triggersData, stateData);

  return {
    startTitle: info.name,
    startString: startString(info),
    startIntro: info.introduction,
    // fireableInteractions
  };
}

export function debugGameState() {
  return {
    RoomsData: getRoomsData(),
    ItemsData: getItemsData(),
    ...getStateTriggerData(),
  };
}

export * from "./item";
export * from "./room";
export * from "./inventory";
export * from "./state";
