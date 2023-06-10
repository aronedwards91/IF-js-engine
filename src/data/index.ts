import startString from "./start-string";
import { resetInventory, getInventoryItems } from "./inventory";
import { setupRoomsData, getRoomsData } from "./room";
import { setItemsList, getItemsData } from "./item";
import { setupStateAndTriggers, getStateTriggerData } from "./state";
import { setupCombinations } from "./combinations";

let gameInfo: GameInfo;

interface IntialiseGame {
  info: GameInfo;
  roomsData: Rooms;
  itemsData: Items;
  triggersData: Triggers;
  stateData: States;
  combinationsData: Combinations;
}

export function intialiseGameData({
  info,
  roomsData,
  itemsData,
  triggersData,
  stateData,
  combinationsData,
}: IntialiseGame) {
  gameInfo = JSON.parse(JSON.stringify(info));

  const RoomsData = JSON.parse(JSON.stringify(roomsData));
  const ItemsData = JSON.parse(JSON.stringify(itemsData));
  const TriggersData = JSON.parse(JSON.stringify(triggersData));
  const StateData = JSON.parse(JSON.stringify(stateData));
  const CombinationsData = JSON.parse(JSON.stringify(combinationsData));

  setItemsList(ItemsData);
  setupRoomsData(RoomsData, gameInfo);
  setupStateAndTriggers(TriggersData, StateData);
  setupCombinations(CombinationsData);
  resetInventory();

  return {
    startTitle: gameInfo.name,
    startString: startString(gameInfo),
    startIntro: gameInfo.introduction,
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

export function getGameInfo(): GameInfo {
  return gameInfo;
}
export * from "./item";
export * from "./room";
export * from "./inventory";
export * from "./state";
export * from "./combinations";
