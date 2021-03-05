import { expect } from "chai";
import { formatComma } from "../../src/calculator/UnitCalculator";

describe("UnitCalculator", () => {
  describe("formatComma", () => {
    it("should return formatted number from string", () => {
      expect(formatComma("30000")).to.equal("30,000");
    });
  });
});
