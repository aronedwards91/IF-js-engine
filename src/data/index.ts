import startString from "./start-string";
import { resetInventory, getInventoryItems } from "./inventory";
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
  const Info = JSON.parse(JSON.stringify(info));
  const RoomsData = JSON.parse(JSON.stringify(roomsData));
  const ItemsData = JSON.parse(JSON.stringify(itemsData));
  const TriggersData = JSON.parse(JSON.stringify(triggersData));
  const StateData = JSON.parse(JSON.stringify(stateData));

  setItemsList(ItemsData);
  setupRoomsData(RoomsData, Info);
  setupStateAndTriggers(TriggersData, StateData);
  resetInventory();

  return {
    startTitle: Info.name,
    startString: startString(Info),
    startIntro: Info.introduction,
    // fireableInteractions
  };
}

export function debugGameState() {
  return {
    RoomsData: getRoomsData(),
    ItemsData: getItemsData(),
    inv: getInventoryItems(),
    ...getStateTriggerData(),
  };
}

export * from "./item";
export * from "./room";
export * from "./inventory";
export * from "./state";
