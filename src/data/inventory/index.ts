import { listArrayWithDeterminer } from "../../utils/lister";
import {getItemByID} from "../item";

const Inventory: Array<ItemID> = [];
// const altName

function getInventoryItems(): Array<ItemID> {
  return Inventory;
}

function checkInventory(itemName: ItemID): boolean {
  return Inventory.indexOf(itemName) >= 0;
}

function getFromInventory(itemName: ItemID): Item | false {
  return Inventory.indexOf(itemName) >= 0 && getItemByID(itemName);
}

// TODO capitalize
function listInventory(): string {
  return listArrayWithDeterminer(Inventory) || "nothing in inventory";
}

function addToInventory(itemName: ItemID) {
  Inventory.push(itemName);
}

// function addMultinameToInventory

function removeFromInventory(itemId: ItemID) {
  const indexOfInventoryItem = Inventory.indexOf(itemId);
  if (indexOfInventoryItem >= 0) {
    Inventory.splice(indexOfInventoryItem, 1);
  }
}

export {
  getInventoryItems,
  getFromInventory,
  checkInventory,
  listInventory,
  addToInventory,
  removeFromInventory,
};
