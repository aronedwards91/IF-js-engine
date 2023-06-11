import { listArrayWithDeterminer } from "../../utils/lister";
import { getItemByID, getRecordAltNames } from "../item";

const Inventory: Array<ItemID> = [];
// const altName

export function resetInventory() {
  Inventory.splice(0, Inventory.length);

}

function getInventoryItems(): Array<ItemID> {
  return Inventory;
}

function checkInInventoryID(itemName: ItemID): ItemID | false {
  const itemsAllIDs: Record<string, string> = getRecordAltNames(Inventory);

  return itemsAllIDs[itemName] || false;
}

// TODO getItemData not in scope
function getFromInventory(itemName: ItemID): Item | false {
  const itemTrueName = checkInInventoryID(itemName);

  return Inventory.indexOf(itemTrueName as ItemID) >= 0 && getItemByID(itemTrueName as ItemID);
}

function listInventory(): string {
  return listArrayWithDeterminer(Inventory) || "nothing in inventory";
}

function addToInventory(itemName: ItemID) {
  Inventory.push(itemName);
}

function removeFromInventory(itemId: ItemID) {
  const indexOfInventoryItem = Inventory.indexOf(itemId);
  if (indexOfInventoryItem >= 0) {
    Inventory.splice(indexOfInventoryItem, 1);
  }
}

export {
  getInventoryItems,
  getFromInventory,
  checkInInventoryID,
  listInventory,
  addToInventory,
  removeFromInventory,
};

export function recursiveInventoryIDCheck(strArray: Array<string>): ItemID | false {
  const freshStrArray = [...strArray];

  while (freshStrArray.length > 0) {
    const itemID = freshStrArray.join(" ");
    const isItem =Inventory.includes(itemID);

    if (isItem) return itemID;

    freshStrArray.splice(0, 1);
  }

  return false;
}
