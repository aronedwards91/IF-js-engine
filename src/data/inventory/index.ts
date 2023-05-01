const Inventory: Array<ItemID> = [];
// const altName

function getInventoryItems(): Array<ItemID> {
  return Inventory;
}

// TODO capitalize
function listInventory(): string {
  return Inventory.join(", ") || "nothing in inventory";
}

function addToInventory(itemName: ItemID) {
  Inventory.push(itemName);
}

// function addMultinameToInventory

function removeFromInventory(itemId: ItemID) {
  const indexOfInventoryItem = Inventory.indexOf(itemId);
  if (indexOfInventoryItem > 0) {
    Inventory.splice(indexOfInventoryItem, 1);
  }
}

export {
  getInventoryItems,
  listInventory,
  addToInventory,
  removeFromInventory,
};
