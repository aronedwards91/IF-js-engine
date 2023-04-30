import { BaseInteractions } from "../global";

export const soloWord: Record<string, string[]> = {
  [BaseInteractions.Examine]: [
    "examine",
    "look",
    "grab",
    "hold",
    "clutch",
    "grip",
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
  ],
  [BaseInteractions.Use]: [
    "use",
    "apply",
    "control",
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
};

export const DoubleTerm: Record<string, string[]> = {
  [BaseInteractions.Examine]: ["look at"],
  [BaseInteractions.Equip]: ["put on"],
};

export const BuildTermHashMap = (): Map<string, string> => {
  const HashMap = new Map();

  Object.keys(soloWord).forEach((key) => {
    (soloWord[key as string]).forEach((term) => {
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
