type RoomID = string;
type TriggerID = string;
type StateID = string;
type ItemID = string;
type returnString = string;
type State = string | number | boolean;
type StateCheckDescription = string;
type InteractionVaried = BaseInteractions | string;

interface Trigger {
  stateID: StateID;
  newValue: State;
  returnString: returnString;
}

type Interaction = returnString | TriggerID;

type DirectionsOptions = Record<Directions | string, RoomID>;

interface Room {
  name: string;
  description: StateCheckDescription;
  exits: DirectionsOptions;
  img: string;
  onExamine?: Interaction;
  interactions: Record<InteractionVaried, Interaction>;
  itemsList?: Array<ItemID>;
  keyedItems: Record<string, ItemID>;
  lookable?: Record<string, returnString>;
}

interface Item {
  name: string;
  UID: ItemID;
  description: StateCheckDescription;
  takeable: boolean;
  hasStatus: boolean;
  icon?: string;
  onUse?: Interaction;
  interactions: Record<InteractionVaried, Interaction>;
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
  description: returnString;
  author: string;
  version: number;
  category: returnString;
  releaseDate: string;
  icon: string;
  introduction: returnString;
  initialRoomID: RoomID;
}

//  Data Arrays
type Triggers = Record<TriggerID, Trigger>;
type States = Record<StateID, State>;
type Rooms = Record<RoomID, Room>;
type Items = Record<ItemID, Item>;
