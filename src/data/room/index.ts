let RoomsData: Rooms;
let currentRoom: Room;

export function setupRoomsData(
  roomsData: Rooms,
  info: GameInfo,
  itemsData: Items
) {
  RoomsData = roomsData;
  currentRoom = { ...RoomsData[info.initialRoomID] };
  if (currentRoom) {
    const keyedItems: Record<string, ItemID> = {};

    if (currentRoom.itemsList && currentRoom.itemsList.length > 0) {
      currentRoom.itemsList.forEach((itemKey: ItemID) => {
        const Item = itemsData[itemKey];
        Item && (keyedItems[Item.name] = itemKey);
      });
    }
    currentRoom.keyedItems = keyedItems;
  } else {
    console.error("No Room found for ID " + info.initialRoomID);
  }
}

export function getCurrentRoom(): Room {
  return currentRoom;
}
