let RoomsData: Rooms;
let currentRoom: Room;
let currentRoomID: RoomID;

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
  RoomsData[roomID].placedItems.push(itemID);
}

export function removeItemFromRoom(itemID: ItemID, roomID = currentRoomID) {
  RoomsData[roomID].placedItems = RoomsData[roomID].placedItems.filter(
    (val) => val !== itemID
  );
}

export function checkRoomItems(itemID: ItemID, roomID = currentRoomID) {
  return RoomsData[roomID].itemsList.indexOf(itemID);
}

export function getRoomDescription(roomID = currentRoomID): string {
  const Room = RoomsData[roomID];
  const placedItems = Room.placedItems.join(", ");

  return `${RoomsData[roomID].description} ${
    placedItems ? " ," + placedItems : ""
  }`;
}
