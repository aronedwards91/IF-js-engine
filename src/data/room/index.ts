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

export function checkRoomItemsList(
  itemID: ItemID,
  roomID = currentRoomID
): number {
  return RoomsData[roomID].itemsList.indexOf(itemID);
}

export function checkRoomPlacedItems(
  itemID: ItemID,
  roomID = currentRoomID
): number {
  return RoomsData[roomID].placedItems.indexOf(itemID);
}

export function checkExaminableItems(
  itemID: ItemID,
  roomID = currentRoomID
): string | undefined {
  return RoomsData[roomID].examinable?.[itemID];
}

export function checkRoomExit(
  exit: string,
  roomID = currentRoomID
): RoomID | undefined {
  const exitCheck = RoomsData[roomID].exits[exit];

  if (exitCheck) return exitCheck;
  return undefined;
}

export function moveRoomByExit(
  exit: string,
  roomID = currentRoomID
): string | undefined {
  const checkExit = checkRoomExit(exit, roomID);

  if (checkExit) {
    if (RoomsData[checkExit]) {
      currentRoom = RoomsData[checkExit];
      currentRoomID = checkExit;
      return currentRoom.description;
    }
    console.error("exit to unknown room " + checkExit);
  }
  return undefined;
}

export function getRoomShortDescription(roomID = currentRoomID): string {
  return RoomsData[roomID].description;
}

export function getRoomFullDescription(roomID = currentRoomID): string {
  const Room = RoomsData[roomID];
  // TODO text wrong owner?
  const placedItems = Room.placedItems
    ? " , there is also " + listArrayWithDeterminer(Room.placedItems)
    : false;

  return `${Room.interactions?.examine || Room.description}${
    placedItems || ""
  }`;
}
