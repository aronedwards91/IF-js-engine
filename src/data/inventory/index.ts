const Inventory: Record<ItemName, ItemID> = {};
// const altName

function getInventoryItems(): Record<ItemName, ItemID> {
  return Inventory;
}

function getInventoryItem(itemName: ItemName): ItemID {
  return Inventory[itemName];
}

// TODO capitalize 
function listInventory(): string {
  return Object.keys(Inventory).join(", ") || "nothing in inventory";
}

function addToInventory(itemName: ItemName, itemId: ItemID) {
  Inventory[itemName] = itemId;
}

// function addMultinameToInventory

function getItemNameByItemID(itemID: ItemID) {
  return Object.keys(Inventory).find((key) => Inventory[key] === itemID);
}
function removeFromInventory(itemId: ItemID) {
  const paramKey = getItemNameByItemID(itemId);
  const InventoryParam = paramKey ? Inventory[paramKey] : null;

  if (paramKey && InventoryParam) delete Inventory[paramKey];
}

export {
  getInventoryItems,
  getInventoryItem,
  listInventory,
  addToInventory,
  removeFromInventory,
};
