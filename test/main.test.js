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
  it(genTestTitle(input, expect), function () {
    // TODO compare parsed text
    assert.equal(IFEngine.fireInput(input), FormatOut(expect));
  });
}

const IFEngine = global.window.IFictionEngine;

describe("Game Engine Test:", function () {
  let GameEngine;

  this.beforeAll(() => {
    GameEngine = IFEngine.intialiseGameData({
      info: infoJSON,
      roomsData: roomsJSON,
      itemsData: itemsJSON,
      triggersData: triggersJSON,
      stateData: statesJSON,
    });
  });

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

    it(
      genTestTitle(
        "look at red mug",
        itemsJSON["red mug"].interactions.examine
      ),
      function () {
        assert.equal(
          IFEngine.fireInput("look at red mug").trim(),
          FormatOut(itemsJSON["red mug"].interactions.examine)
        );
      }
    );

    describe("Examine overdescribed objects", () => {
      genTest(
        "look at old dirty table",
        itemsJSON["table"].interactions.examine
      );
      genTest("look at dirty table", itemsJSON["table"].interactions.examine);
      genTest("look at old red mug", itemsJSON["red mug"].interactions.examine);
    });
  });
});
