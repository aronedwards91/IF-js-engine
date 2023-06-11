import { listArrayWithDeterminer } from "../../utils/lister";
import { getRecordAltNames } from "../item";

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

  RoomsData[roomID].placedItems = (
    RoomsData[roomID].placedItems as string[]
  ).filter((val) => val !== itemID);
}

export function checkInRoomForItemID(
  itemID: ItemID,
  roomID = currentRoomID
): ItemID | false {
  const Room = RoomsData[roomID];
  if (Room) {
    const itemsAllIDs = Object.assign(
      {},
      Room.itemsList && getRecordAltNames(Room.itemsList),
      Room.placedItems && getRecordAltNames(Room.placedItems),
      Room.altNames
    );

    const itemIDFromAllNames = itemsAllIDs[itemID];

    if(itemIDFromAllNames) return itemIDFromAllNames;
  }

  return false;
}

export function recursiveRoomItemIDCheck(
  strArray: Array<string>
): ItemID | false {
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
