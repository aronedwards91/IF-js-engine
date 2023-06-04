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

describe("Test test utils part A:", function () {
  it("teaspoon visible in room", function () {
    assert.ok(IFEngine.fireInput("examine").includes("teaspoon"));
  });
  genTest("take teaspoon", itemsJSON["teaspoon"].interactions.take);
  genTest("take teaspoon", "item not found");
  it("teaspoon no longer visible in room", function () {
    assert.ok(IFEngine.fireInput("examine").includes("teaspoon") === false);
    assert.ok(IFEngine.debugGameState().inv.toString() === "teaspoon");
  });
});

describe("Test test utils part B:", function () {
  this.beforeAll(reInitialise); // This is focus of test

  it("teaspoon again visible in room", function () {
    assert.ok(IFEngine.fireInput("examine").includes("teaspoon"));
  });

  it("teaspoon not visible in inventory", function () {
    assert.ok(IFEngine.debugGameState().inv.toString() === "");
  });
});

describe("Game Engine Test:", function () {
  this.beforeAll(reInitialise);

  describe("can use help text", function () {
    genTest("help", infoJSON.help);
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
      genTest("look at notanitem", "can't see such an item");
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

describe(`Test use call`, function () {
  this.beforeAll(reInitialise);

  describe("use simple objects", () => {
    genTest("use table", itemsJSON["table"].interactions.use);
    genTest("use teaspoon", itemsJSON["teaspoon"].interactions.use);
    genTest("use rag", "there is no obvious way to use rag");
  });

  describe("use item in inventory", () => {
    genTest("take teaspoon", itemsJSON["teaspoon"].interactions.take);
    genTest("use teaspoon", itemsJSON["teaspoon"].interactions.use);
  });
});

describe(`Test inventory system`, function () {
  this.beforeAll(reInitialise);

  it(genTestTitle("items", "teaspoon and a red mug"), function () {
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
    IFEngine.fireInput("place teaspoon");
    assert.equal(
      IFEngine.fireInput("items"),
      FormatOut("nothing in inventory")
    );
  });
});

describe("Test state management", function () {
  this.beforeAll(reInitialise);

  it("Firing trigger updates state", function () {
    assert.ok(IFEngine.testingTools.getStateByID("rtavern:tableGreenMug"));

    IFEngine.fireInput("take green mug");

    assert.ok(
      IFEngine.testingTools.getStateByID("rtavern:tableGreenMug") === false
    );
  });

  // TODO test numerical state
});

describe("Test movement", function () {
  this.beforeAll(reInitialise);

  genTest("go up", roomsJSON.bedroom.description);
  genTest("go down", roomsJSON.tavern.description);

  genTest("up", roomsJSON.bedroom.description);
  genTest("down", roomsJSON.tavern.description);
  genTest("outside", roomsJSON.outside.description);
  genTest("n", roomsJSON.tavern.description);

  // TODO test all directions
  // TODO E , east
  // TODO W, west
  // TODO S, south

  describe("Go works with alternate terms", () => {
    genTest("move upstairs", roomsJSON.bedroom.description);
    genTest("travel downward", roomsJSON.tavern.description);
    genTest("outside", roomsJSON.outside.description);
    genTest("north", roomsJSON.tavern.description);
  });
});

describe("Test movement", function () {
  this.beforeAll(reInitialise);

  describe("eat simple objects", () => {
    genTest("eat", "eat what?");
    genTest("eat table", itemsJSON["table"].interactions.eat);
    genTest("eat teaspoon", itemsJSON["teaspoon"].interactions.eat);
    genTest("eat rag", "It's not eatable");
    genTest("eat thingsthatsnotthere", "can't see such an item");
  });

  describe("eat overdescribed objects", () => {
    genTest("eat at old dirty table", itemsJSON["table"].interactions.eat);
    genTest("eat at dirty table", itemsJSON["table"].interactions.eat);
    genTest("eat at old rag", "It's not eatable");
  });
});

describe("Test state check move", function () {
  it("go outside", function () {
    assert.ok(
      IFEngine.testingTools.getStateByID("routside:ladderOnWall") === false
    );

    IFEngine.fireInput("go outside");

    assert.equal(
      IFEngine.testingTools.getCurrentRoom().name,
      roomsJSON["outside"].name
    );
  });

  it("go up fails as no ladder", function () {
    assert.equal(
      IFEngine.fireInput("go up"),
      FormatOut(roomsJSON["outside"].exits.up.onFail)
    );
  });

  it("'use ladder' fail as command unspecific (should move it first)", function () {
    assert.equal(
      IFEngine.fireInput("use ladder"),
      FormatOut(itemsJSON["ladder"].interactions.use.onFail)
    );
  });

  genTest("go up", roomsJSON["outside"].exits.up.onFail);

  genTest("move ladder", triggersJSON["moveLadder"].returnString);
  genTest("climb ladder", roomsJSON["roof"].description);
});

describe("Test help as custom interaction", function () {
  this.beforeAll(reInitialise);

  it("in tavern", function () {
    assert.equal(
      IFEngine.testingTools.getCurrentRoom().name,
      roomsJSON["tavern"].name
    );
  });
  genTest("help teaspoon", itemsJSON["teaspoon"].interactions.help);
});

describe("Test Open/Close Door", function () {
  this.beforeAll(reInitialise);

  it("in tavern can travel to cellar", function () {
    assert.equal(
      IFEngine.testingTools.getCurrentRoom().name,
      roomsJSON["tavern"].name
    );
  });
  
  genTest("go down", roomsJSON["tavern"].exits.down.onFail);
  genTest("open cellar door", triggersJSON["openCellarDoor"].returnString);
  genTest("go down", roomsJSON["cellar"].description);
  genTest("close cellar door", triggersJSON["closeCellarDoor"].returnString);
  genTest("go up", roomsJSON["cellar"].exits.up.onFail);
  genTest("open cellar door", triggersJSON["openCellarDoor"].returnString);
  genTest("go up", roomsJSON["tavern"].description);
});