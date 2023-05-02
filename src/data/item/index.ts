let ItemsData: Items;

export const getItemsData = () => ItemsData;

export function setItemsList(itemsData: Items) {
  ItemsData = itemsData;
}

export function getItemByID(itemID: ItemID) {
  return ItemsData[itemID];
}
