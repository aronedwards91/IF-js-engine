let ItemsData: Items;

export const getItemsData = () => ItemsData;

export function setItemsList(itemsData: Items) {
  ItemsData = itemsData;
}

export function getItemByID(itemID: ItemID): Item | false {
  return ItemsData[itemID] || false;
}

export function recursiveInventoryCheck(strArray: Array<string>): Item | false {
  const freshStrArray = [...strArray];

  while (freshStrArray.length > 0) {
    const itemID = freshStrArray.join(" ");
    const isItem = getItemByID(itemID);

    if (isItem) return { ...isItem, itemID: itemID };

    freshStrArray.splice(0, 1);
  }

  return false;
}

export function recursiveInventoryIDCheck(strArray: Array<string>): ItemID | false {
  const isItem = recursiveInventoryCheck(strArray);
  
  return isItem && isItem.itemID ? isItem.itemID : false;
}
