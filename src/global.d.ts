import { BaseInteractions, Directions } from "./enums";

declare global {
  type RoomID = string;
  type TriggerID = string;
  type TriggerString = string;
  type StateID = string;
  type ItemID = string;
  type ReturnString = string;
  type State = string | number | boolean;
  type StateGroup = Record<string, State>;
  type StateCheckDescription = string;
  type InteractionVaried = BaseInteractions | string;

  interface Trigger {
    stateID: StateID;
    newValue: State;
    returnString: ReturnString;
  }

  interface StateCheck {
    onPass: ReturnString | TriggerString;
    onFail: ReturnString | TriggerString;
    req: Record<StateID, State>;
  }

  type Interaction = ReturnString | TriggerString | StateCheck;

  type DirectionsOptions = Record<Directions | string, RoomID | StateCheck>;

  interface Room {
    name: string;
    description: StateCheckDescription;
    exits: DirectionsOptions;
    img: string;
    interactions: Record<InteractionVaried, Interaction>;
    itemsList: Array<ItemID>;
    placedItems: Array<ItemID>;
    examinable?: Record<string, ReturnString>;
  }

  interface Item {
    description: StateCheckDescription;
    isTakeable: boolean;
    icon?: string;
    interactions: Record<InteractionVaried, Interaction>;
    // alt names?
  }

  interface PlayerStatus {
    room: RoomID;
    name: string;
    inventory: Array<ItemID>;
  }

  // TODO - map?
  interface Combination {
    id1: ItemID;
    id2: ItemID;
    effects: Array<TriggerID>;
  }

  interface GameInfo {
    name: string;
    description: ReturnString;
    author: string;
    version?: number;
    category?: ReturnString;
    releaseDate?: string;
    icon?: string;
    introduction: ReturnString;
    initialRoomID: RoomID;
    help?: string; // overrides help command
  }

  //  Data Arrays
  type Triggers = Record<TriggerID, Trigger>;
  type States = Record<StateID, StateGroup>;
  type Rooms = Record<RoomID, Room>;
  type Items = Record<ItemID, Item>;
}
