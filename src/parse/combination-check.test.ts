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

function genComboTest(input: string, checkBool: boolean) {
  it(`>>"${input}"`, function () {
    assert.equal(comboChecker(input), checkBool);
  });
}

describe("test comboChecker logic", function () {
  genComboTest("use wrench with screw", true);
  genComboTest("use wrench and screw", true);
  genComboTest("apply wrench to screw", true);
  genComboTest("combine wrench and screw", true);
  genComboTest("open door with key", true);
  genComboTest("place key in lock", true);
  genComboTest("wrench and screw", true);
  genComboTest("use wrench and screw", true);
  genComboTest("use wrench on the screw", true);
  genComboTest("use wrench on the screw", true);

  genComboTest("wrench screw", false);
  genComboTest("wrench + screw", false);
  genComboTest("wrench & screw", false);
});
