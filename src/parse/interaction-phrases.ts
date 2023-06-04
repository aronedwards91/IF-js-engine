import { BaseInteractions, Directions } from "../enums";

export const soloWordDirection: Record<string, string[]> = {
  [Directions.UP]: ["up", "upward", "upstairs", "above"],
  [Directions.DOWN]: ["down", "downward", "under", "downstairs"],
  [Directions.N]: ["n", "north"],
  [Directions.E]: ["e", "east"],
  [Directions.W]: ["s", "south"],
  [Directions.S]: ["w", "west"],
  [Directions.NE]: ["ne", "northeast"],
  [Directions.NW]: ["nw", "northwest"],
  [Directions.SE]: ["se", "southeast"],
  [Directions.SW]: ["sw", "southwest"],
};
export const soloWord: Record<string, string[]> = {
  [BaseInteractions.Examine]: [
    "examine",
    "look",
    "check",
    "inspect",
    "investigate",
    "probe",
    "appraise",
    "review",
    "scan",
    "scrutinize",
    "study",
    "survey",
    "vet",
    "view",
    "peruse",
    "research",
  ],
  [BaseInteractions.Take]: [
    "take",
    "get",
    "pick",
    "collect",
    "seize",
    "acquire",
    "obtain",
    "snatch",
    "receive",
    "appropriate",
    "fetch",
    "hold",
    "clutch",
  ],
  [BaseInteractions.Place]: [
    "place",
    "drop",
    "discard",
    "abandon",
    "remove",
    "dump",
    "deposit",
    "install",
    "lay",
    "give",
  ],
  [BaseInteractions.Use]: [
    "use",
    "apply",
    "control",
    "grab",
    "employ",
    "manipulate",
    "operate",
    "utilise",
    "utilize",
    "wield",
    "work",
  ],
  [BaseInteractions.Go]: [
    "go",
    "flee",
    "advance",
    "move",
    "walk",
    "progress",
    "travel",
    "depart",
    "escape",
    "exit",
    "withdraw",
    "vamoose",
  ],
  [BaseInteractions.Items]: [
    "items",
    "inventory",
    "stuff",
    "equipment",
    "gear",
    "loot",
    "things",
    "kit",
  ],
  [BaseInteractions.Eat]: [
    "eat",
    "consume",
    "bite",
    "devour",
    "ingest",
    "swallow",
    "drink",
  ],
  [BaseInteractions.Open]: [
    "open",
    "unlock",
    "unbolt",
    "uncover",
    "unfold",
    "unravel",
    "release",
  ],
  [BaseInteractions.Close]: [
    "close",
    "shut",
    "block",
    "bar",
    "bolt",
    "lock",
    "secure",
  ],
  [BaseInteractions.Help]: ["help", "advice", "assist", "support", "guide"],
  [BaseInteractions.Attack]: [
    "attack",
    "punch",
    "kick",
    "assail",
    "beat",
    "charge",
    "harm",
    "hit",
    "strike",
    "bash",
    "batter",
    "bot",
    "wallop",
  ],
  [BaseInteractions.Equip]: ["equip", "wear", "don"],
  [BaseInteractions.Smell]: ["smell", "sniff", "whiff", "huff"],
  ...soloWordDirection,
};

export const DoubleTerm: Record<string, string[]> = {
  [BaseInteractions.Equip]: ["put on"],
  [BaseInteractions.Place]: ["put down", "lay down"],
};

export const BuildDirectionTermHashMap = (): Map<string, string> => {
  const HashMap = new Map();

  Object.keys(soloWordDirection).forEach((key) => {
    soloWordDirection[key as string].forEach((term) => {
      HashMap.set(term, key);
    });
  });

  return HashMap;
};

export const BuildTermHashMap = (): Map<string, string> => {
  const HashMap = new Map();

  Object.keys(soloWord).forEach((key) => {
    soloWord[key as string].forEach((term) => {
      HashMap.set(term, key);
    });
  });
  Object.keys(DoubleTerm).forEach((key) => {
    soloWord[key].forEach((term) => {
      HashMap.set(term, key);
    });
  });

  return HashMap;
};
