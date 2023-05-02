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
const FS = "."; // fullstop on end

var assert = require("assert");

function genTestTitle(input, output) {
  const OutputText =
    output.length > 30 ? output.substring(0, 28) + "..." : output;
  return `> should return '${OutputText}' when type '${input}'`;
}
const IFEngine = global.window.IFictionEngine;

describe("Game Engine Test:", function () {
  let GameEngine;

  this.beforeAll(() => {
    console.log(">>", global.window.IFictionEngine);
    GameEngine = IFEngine.intialiseGameData({
      info: infoJSON,
      roomsData: roomsJSON,
      itemsData: itemsJSON,
      triggersData: triggersJSON,
      stateData: statesJSON,
    });
  });

  describe(BaseInteractions.Examine, function () {
    console.log(GameEngine);

    it("Listing generator correctly formats array", function () {
      const listString = IFEngine.testingTools.listArrayWithDeterminer([
        "potatoe",
        "smurf",
      ]);
      assert.equal(listString, "a potatoe, and a smurf");
    });

    it(genTestTitle("look", roomsJSON.tavern.description), function () {
      // TODO compare parsed text
      assert.equal(
        IFEngine.fireInput("look"),
        roomsJSON.tavern.interactions.examine +
          " , there is also " +
          IFEngine.testingTools.listArrayWithDeterminer(
            roomsJSON.tavern.placedItems
          ) +
          FS
      );
    });
  });
});
