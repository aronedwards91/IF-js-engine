let CombinationsData: Combinations;

export function setupCombinations(combinationsData: Combinations) {
  const freshCombinationData = { ...combinationsData };

  Object.keys(combinationsData).forEach((combinationRoot: ItemID) => {

    Object.keys(combinationsData[combinationRoot]).forEach((comboWith) => {

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
