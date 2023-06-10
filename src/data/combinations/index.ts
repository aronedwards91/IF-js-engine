let CombinationsData: Combinations;
let CombinationKeys: Array<ItemID> = [];

export function setupCombinations(combinationsData: Combinations) {
  const freshCombinationData = { ...combinationsData };

  Object.keys(combinationsData).forEach((combinationRoot: ItemID) => {
    CombinationKeys.push(combinationRoot);

    Object.keys(combinationsData[combinationRoot]).forEach((comboWith) => {
      if (CombinationKeys.includes(comboWith) === false)
        CombinationKeys.push(comboWith);

      if (Object.keys(combinationsData).includes(comboWith) === false) {
        freshCombinationData[comboWith] = {};
      }
      freshCombinationData[comboWith][combinationRoot] =
        freshCombinationData[combinationRoot][comboWith];
    });
  });

  CombinationsData = freshCombinationData;
}

export function checkForCombination(
  itemA: ItemID,
  itemB: ItemID
): Interaction | false {
  if (CombinationsData[itemA]?.[itemB]) return CombinationsData[itemA]?.[itemB];

  return false;
}

export function recursiveCombinationItemIDCheck(strArray: Array<string>): ItemID | false {
  const freshStrArray = [...strArray];


  while (freshStrArray.length > 0) {
    const itemID = freshStrArray.join(" ");
    const isItem = CombinationKeys.includes(itemID);

    if (isItem) return itemID;

    freshStrArray.splice(0, 1);
  }

  return false;
}
