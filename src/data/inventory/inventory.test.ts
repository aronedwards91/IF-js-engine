var assert = require("assert");

var InvData = require("./index.ts");

interface Item {
  altNames: Array<string>;
  description: string;
  isTakeable: boolean;
  icon?: string;
  interactions: Record<string, string>;
  itemID?: ItemID;
}

type ItemID = string;
type Items = Record<ItemID, Item>;

InvData.addToInventory("box");

function genItemTest(inputString: Array<string>, checkItem: Object | boolean) {
  it(`>>"${inputString.join(" ")}"`, function () {
    assert.deepEqual(InvData.recursiveInventoryIDCheck(inputString), checkItem);
  });
}

describe("check recursive ItemID selection works", () => {
  genItemTest(["big", "red", "box"], "box");
  genItemTest(["red", "box"], "box");
  genItemTest(["box"], "box");

  genItemTest(["a", "box", "thats", "wooden"], false);
});
