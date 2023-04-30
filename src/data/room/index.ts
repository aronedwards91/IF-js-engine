import { GameInfo, Room, Rooms, States, Triggers } from "../../global";

let RoomsData: Rooms;
let currentRoom: Room;

export function SetupRoomsData(roomsData: Rooms, info: GameInfo) {
    console.log(">>>roomsData", roomsData);
  RoomsData = roomsData;
  currentRoom = RoomsData[info.initialRoomID];
  if (!currentRoom) {
    console.error("No Room found for ID " + info.initialRoomID);
  }
}

export function getCurrentRoom(): Room {
  return currentRoom;
}
