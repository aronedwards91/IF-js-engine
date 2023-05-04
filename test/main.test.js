var assert = require("assert");

global.window = {};
require("../example-adventure/index");
const infoJSON = require("../example-adventure/info.json");
const itemsJSON = require("../example-adventure/items.json");
const roomsJSON = require("../example-adventure/rooms.json");
const statesJSON = require("../example-adventure/states.json");
const triggersJSON = require("../example-adventure/triggers.json");

const Directions = Object.freeze({
  UP: "up",
  DOWN: "down",
  N: "n",
  S: "s",
  E: "e",
  W: "w",
  NE: "ne",
  NW: "nw",
  SE: "se",
  SW: "sw",
});
const BaseInteractions = Object.freeze({
  Examine: "examine",
  Take: "take",
  Place: "place",
  Items: "items",
  Use: "use",
  Go: "go",
  Eat: "eat",
  Open: "open",
  Attack: "attack",
  Equip: "equip",
  Smell: "smell",
});
const FormatOut = (str) => `${str.charAt(0).toUpperCase()}${str.slice(1)}.`;
const FS = "."; // fullstop on end

function genTestTitle(input, output) {
  const OutputText =
    output.length > 30 ? output.substring(0, 28) + "..." : output;
  return `> should return '${OutputText}' when type '${input}'`;
}
function genTest(input, expect) {
  console.log(input);
  it(genTestTitle(input, expect), function () {
    // TODO compare parsed text
    assert.equal(IFEngine.fireInput(input), FormatOut(expect));
  });
}

const IFEngine = global.window.IFictionEngine;
const GameEngine = IFEngine.intialiseGameData({
  info: infoJSON,
  roomsData: roomsJSON,
  itemsData: itemsJSON,
  triggersData: triggersJSON,
  stateData: statesJSON,
});

function reInitialise() {
  IFEngine.intialiseGameData({
    info: infoJSON,
    roomsData: roomsJSON,
    itemsData: itemsJSON,
    triggersData: triggersJSON,
    stateData: statesJSON,
  });
}

describe("Game Engine Test:", function () {
  this.beforeAll(reInitialise);

  describe(BaseInteractions.Examine + " objects/rooms", function () {
    it("Listing generator correctly formats array", function () {
      const listString = IFEngine.testingTools.listArrayWithDeterminer([
        "potatoe",
        "smurf",
      ]);
      assert.equal(listString, "a potatoe, and a smurf");
    });

    const lookTest = function (input) {
      // TODO compare parsed text
      assert.equal(
        IFEngine.fireInput(input),
        FormatOut(
          roomsJSON.tavern.interactions.examine +
            " , there is also " +
            IFEngine.testingTools.listArrayWithDeterminer(
              roomsJSON.tavern.placedItems
            )
        )
      );
    };
    it(
      genTestTitle(BaseInteractions.Examine, roomsJSON.tavern.description),
      () => lookTest(BaseInteractions.Examine)
    );

    describe("Examine works with alternate words", () => {
      it(genTestTitle("look", roomsJSON.tavern.description), () =>
        lookTest("look")
      );
      it(genTestTitle("check", roomsJSON.tavern.description), () =>
        lookTest("check")
      );
      it(genTestTitle("inspect", roomsJSON.tavern.description), () =>
        lookTest("inspect")
      );
    });

    describe("Examine simple objects", () => {
      genTest("look at red mug", itemsJSON["red mug"].interactions.examine);
      genTest("look at teaspoon", itemsJSON["teaspoon"].interactions.examine);
      genTest("look at teafork", itemsJSON["teafork"].description);
    });

    describe("Examine overdescribed objects", () => {
      genTest(
        "look at old dirty table",
        itemsJSON["table"].interactions.examine
      );
      genTest("look at dirty table", itemsJSON["table"].interactions.examine);
      genTest("look at old red mug", itemsJSON["red mug"].interactions.examine);
    });
  });

  describe(`${BaseInteractions.Take}/${BaseInteractions.Place} objects/rooms`, function () {
    describe("take & place items in room", function () {
      it("teaspoon visible in room", function () {
        assert.ok(IFEngine.fireInput("examine").includes("teaspoon"));
      });
      genTest("take teaspoon", itemsJSON["teaspoon"].interactions.take);
      genTest("take teaspoon", "item not found");
      it("teaspoon not visible in room", function () {
        assert.ok(IFEngine.fireInput("examine").includes("teaspoon") === false);
      });
      genTest("place teaspoon", `you place the teaspoon in the room`);
      it("teaspoon visible in room", function () {
        assert.ok(IFEngine.fireInput("take teaspoon").includes("teaspoon"));
      });
      genTest("take teafork", `you add the teafork to your inventory`);
      genTest("place teafork", itemsJSON["teafork"].interactions.place);
      genTest("take table", "you can't carry the table");
      genTest("take rag", itemsJSON["rag"].interactions.take);
    });
  });
});

describe(`check inventory system`, function () {
  this.beforeAll(() => {
    reInitialise();
  });

  it(genTestTitle("items", "teaspoon and a red mug"), function () {
    // TODO compare parsed text
    IFEngine.fireInput("take teaspoon");
    IFEngine.fireInput("take red mug");
    assert.equal(
      IFEngine.fireInput("items"),
      FormatOut("a teaspoon, and a red mug")
    );
  });

  it(genTestTitle("place red mug", "no items"), function () {
    IFEngine.fireInput("place red mug");
    assert.equal(IFEngine.fireInput("items"), FormatOut("a teaspoon"));
  });

  it(genTestTitle("place teaspoon", "teaspoon and a red mug"), function () {
    const x = IFEngine.fireInput("place teaspoon");
    assert.equal(
      IFEngine.fireInput("items"),
      FormatOut("nothing in inventory")
    );
  });
});
