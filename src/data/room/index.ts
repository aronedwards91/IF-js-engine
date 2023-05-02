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

export function checkRoomItems(itemID: ItemID, roomID = currentRoomID) {
  return RoomsData[roomID].itemsList.indexOf(itemID);
}

export function getRoomShortDescription(roomID = currentRoomID): string {
  return RoomsData[roomID].description;
}

export function getRoomFullDescription(roomID = currentRoomID): string {
  const Room = RoomsData[roomID];
  const placedItems = Room.placedItems
    ? " , there is also " + listArrayWithDeterminer(Room.placedItems)
    : false;

  return `${Room.interactions?.examine || Room.description}${
    placedItems || ""
  }`;
}
