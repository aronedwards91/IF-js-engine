var assert = require("assert");

var ItemData = require("./index.ts");

interface Item {
  description: string;
  isTakeable: boolean;
  itemID: string;
}
type ItemID = string;
type Items = Record<ItemID, Item>;

const Box = {
  description: "a box",
  isTakeable: false,
  itemID: "box",
};

ItemData.setItemsList({
  box: Box,
});

function genItemTest(inputString: Array<string>, checkItem: Object | boolean) {
  it(`>>"${inputString.join(" ")}"`, function () {
    assert.deepEqual(ItemData.recursiveInventoryCheck(inputString), checkItem);
  });
}

describe("check recursive ItemID selection works", () => {
  genItemTest(["big", "red", "box"], Box);
  genItemTest(["red", "box"], Box);
  genItemTest(["box"], Box);

  genItemTest(["a", "box", "thats", "wooden"], false);
});
