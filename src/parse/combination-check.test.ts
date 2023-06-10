var assert = require("assert");

var CombinationCall = require("./combination-check.ts");

const Space = " ";

function comboChecker(input: string) {
  const consistentSpacedString = input.replace(/\s\s+/g, Space);
  const removedVowels = consistentSpacedString
    .replace(" at ", " ")
    .replace(" the ", " ");
  const spaceSplit = removedVowels.split(Space);

  return CombinationCall.isCombinationCall(spaceSplit);
}

function genComboTest(input: string, checkBool: number | false) {
  it(`>>"${input}"`, function () {
    const indexTrue = comboChecker(input) !== -1
    assert.equal(comboChecker(input), checkBool);
  });
}

describe("test comboChecker logic", function () {
  genComboTest("use wrench with screw", 2);
  genComboTest("use wrench and screw", 2);
  genComboTest("apply wrench to screw", 2);
  genComboTest("combine wrench and screw", 2);
  genComboTest("open door with key", 2);
  genComboTest("place key in lock", 2);
  genComboTest("wrench and screw", 1);
  genComboTest("use wrench and screw", 2);
  genComboTest("use blue wrench on the screw", 3);

  genComboTest("wrench screw", false);
  genComboTest("wrench + screw", false);
  genComboTest("wrench & screw", false);
});
