let ItemsData: Items;

export function setItemsList(itemsData: Items) {
  ItemsData = itemsData;
}

export function getItemByID(itemID: ItemID) {
  return ItemsData[itemID];
}
