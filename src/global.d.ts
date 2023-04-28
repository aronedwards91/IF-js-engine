export enum Directions {
  UP = "up",
  DOWN = "down",
  N = "n",
  S = "s",
  E = "e",
  W = "w",
  NE = "ne",
  NW = "nw",
  SE = "se",
  SW = "sw",
}

export enum BaseInteractions {
  Items = "items",
  Take = "take",
  Examine = "examine",
  Use = "use",
  Go = "go",
  Smell = "smell",
  Eat = "eat",
  Open = "open",
  Attack = "attack",
  Equip = "equip",
}

type RoomID = string;
type TriggerID = string;
type StateID = string;
type ItemID = string;
type State = string | number | boolean;
type StateCheckDescription = string;
type InteractionVaried = BaseInteractions | string;

interface Trigger {
  stateID: StateID;
  newValue: State;
  returnString: string;
}

type Interaction = string | TriggerID;

type DirectionsOptions = Record<Directions | string, RoomID>;

interface Room {
  name: string;
  UID: RoomID;
  description: StateCheckDescription;
  exits: DirectionsOptions;
  img: string;
  onExamine?: Interaction;
  interactions: Record<InteractionVaried, Interaction>;
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
  description: string;
  author: string;
  version: number;
  category: string;
  releaseDate: string;
  icon: string;
}

//  Data Arrays
type Triggers = Record<TriggerID, Trigger>;
type States = Record<StateID, State>;
type Rooms = Record<RoomID, Room>;
type Items = Record<ItemID, Item>;
