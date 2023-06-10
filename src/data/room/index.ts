import { listArrayWithDeterminer } from "../../utils/lister";

let RoomsData: Rooms;
let currentRoom: Room;
let currentRoomID: RoomID;

export const getRoomsData = () => RoomsData;

export function setupRoomsData(roomsData: Rooms, info: GameInfo) {
  RoomsData = roomsData;
  currentRoom = { ...RoomsData[info.initialRoomID] };
  if (!currentRoom) {
    console.error("No Room found for ID " + info.initialRoomID);
  } else {
    !currentRoom.itemsList;
  }
  {
    currentRoom.itemsList = [];
  }
  currentRoomID = info.initialRoomID;
}

export function getCurrentRoom(): Room {
  return currentRoom;
}

export function addItemToRoom(itemID: ItemID, roomID = currentRoomID) {
  if (!RoomsData[roomID].placedItems) RoomsData[roomID].placedItems = [];
  (RoomsData[roomID].placedItems as string[]).push(itemID);
}

export function removeItemFromRoom(itemID: ItemID, roomID = currentRoomID) {
  if (!RoomsData[roomID].placedItems) RoomsData[roomID].placedItems = [];

  RoomsData[roomID].placedItems = (RoomsData[roomID].placedItems as string[]).filter(
    (val) => val !== itemID
  );
}

export function checkInRoomForItemID(
  itemID: ItemID,
  roomID = currentRoomID
): ItemID | false {
  const itemsListIndex = RoomsData[roomID]?.itemsList?.indexOf(itemID);
  if (itemsListIndex !== undefined && itemsListIndex >= 0)
    return RoomsData[roomID].itemsList?.[itemsListIndex] || false;

  const placedItemsIndex = RoomsData[roomID]?.placedItems?.indexOf(itemID);
  if (placedItemsIndex !== undefined && placedItemsIndex >= 0)
    return RoomsData[roomID].placedItems?.[placedItemsIndex] || false;

  if (RoomsData[roomID]?.altNames) {
    const altNamesKeyArr = Object.keys(RoomsData[roomID].altNames as Object);
    const checkAltNamesIndex = altNamesKeyArr.indexOf(itemID);
    if (checkAltNamesIndex !== undefined && checkAltNamesIndex >= 0) {
      const altKey = altNamesKeyArr[checkAltNamesIndex];
      return RoomsData[roomID].altNames?.[altKey] || false;
    }
  }

  return false;
}

export function recursiveRoomItemIDCheck(strArray: Array<string>): ItemID | false {
  const freshStrArray = [...strArray];

  while (freshStrArray.length > 0) {
    const itemID = freshStrArray.join(" ");
    const isItem = checkInRoomForItemID(itemID);

    if (isItem) return isItem;

    freshStrArray.splice(0, 1);
  }

  return false;
}

export function checkExaminableItems(
  itemID: ItemID,
  roomID = currentRoomID
): string | undefined {
  return RoomsData[roomID].examinable?.[itemID];
}

export function getRoomExit(
  exit: string,
  roomID = currentRoomID
): RoomID | undefined | StateCheck {
  const exitCheck = RoomsData[roomID].exits[exit];

  if (exitCheck) return exitCheck;
  return undefined;
}

export function moveToRoom(roomID: RoomID): string | false {
  if (RoomsData[roomID]) {
    currentRoom = RoomsData[roomID];
    currentRoomID = roomID;

    return currentRoom.description || `You go to the ${currentRoom.name}`;
  }
  return false;
}

export function getRoomShortDescription(roomID = currentRoomID): string {
  return RoomsData[roomID].description;
}

export function getRoomFullDescription(roomID = currentRoomID): string {
  const Room = RoomsData[roomID];

  const placedItems =
    Room.placedItems &&
    " , there is also " + listArrayWithDeterminer(Room.placedItems);

  return `${Room.interactions?.examine || Room.description}${
    placedItems || ""
  }`;
}
