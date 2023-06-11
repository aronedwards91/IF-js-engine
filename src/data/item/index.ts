let ItemsData: Items;

export const getItemsData = () => ItemsData;

export function setItemsList(itemsData: Items) {
  ItemsData = itemsData;
}

export function getItemByID(itemID: ItemID): Item | false {
  return ItemsData[itemID] || false;
}

export function getRecordAltNames(
  itemIds: Array<ItemID>
): Record<ItemID, ItemID> {
  const allItemIDs: Record<ItemID, ItemID> = {};

  itemIds.forEach((id) => {
    allItemIDs[id] = id;

    const itemData: Item | false = getItemByID(id);
    if (itemData && itemData.altNames) {
      itemData.altNames.forEach((altID: string) => {
        allItemIDs[altID] = id;
      });
    }
  });

  return allItemIDs;
}
