export enum Directions {
  UP,
  DOWN,
  N = "N",
  S = "S",
  E = "E",
  W = "W",
  NE = "NE",
  NW = "NW",
  SE = "SE",
  SW = "SW",
}

export enum BaseInteractions {
  Items = "items",
  Take = "take",
  Examine = "examine",
  Use = "use",
  Go = "go",
  Smell = "smell",
  Eat = "eat",
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

interface Room {
  name: string;
  UID: RoomID;
  description: StateCheckDescription;
  exits: Array<Directions>;
  img: string;
  onLook?: Interaction;
  onSmell?: Interaction;
  onListen?: Interaction;
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

//  Data Arrays
type Triggers = Record<TriggerID, Trigger>;
type States = Record<StateID, State>;
type Rooms = Record<RoomID, Room>;
type Items = Record<ItemID, Item>;
