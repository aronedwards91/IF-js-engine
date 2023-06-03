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
  RoomsData[roomID].placedItems.push(itemID);
}

export function removeItemFromRoom(itemID: ItemID, roomID = currentRoomID) {
  if (!RoomsData[roomID].placedItems) RoomsData[roomID].placedItems = [];

  RoomsData[roomID].placedItems = RoomsData[roomID].placedItems.filter(
    (val) => val !== itemID
  );
}

// TODO remove?
export function checkRoomItemsList(
  itemID: ItemID,
  roomID = currentRoomID
): number {
  return RoomsData[roomID].itemsList.indexOf(itemID);
}

// TODO remove?
export function checkRoomPlacedItems(
  itemID: ItemID,
  roomID = currentRoomID
): number | false {
  return RoomsData[roomID]?.placedItems.indexOf(itemID);
}

export function checkInRoomForID(
  itemID: ItemID,
  roomID = currentRoomID
): number | false {
  const itemsList = RoomsData[roomID]?.itemsList.indexOf(itemID);
  const placedItems = RoomsData[roomID]?.placedItems.indexOf(itemID);

  return itemsList >= 0 ? itemsList : placedItems;
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
  // TODO text wrong owner?
  const placedItems =
    Room.placedItems &&
    " , there is also " + listArrayWithDeterminer(Room.placedItems);

  return `${Room.interactions?.examine || Room.description}${
    placedItems || ""
  }`;
}
