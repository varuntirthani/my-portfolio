import assert from "node:assert/strict";
import test from "node:test";
import { parseNote, plainToLatex } from "./cfa-math.ts";

test("keeps ordinary prose out of math mode", () => {
  assert.deepEqual(
    parseNote(
      "Best practice: Index all calculations at a single point in time before manipulating them",
    ),
    [
      {
        type: "text",
        content:
          "Best practice: Index all calculations at a single point in time before manipulating them",
      },
    ],
  );
});

test("does not treat slash abbreviations as formulas", () => {
  assert.ok(
    parseNote("Use ICONV and enter NOM, C/Y, then CPT EFF").every(
      (part) => part.type !== "math",
    ),
  );
});

test("separates labels, formulas, and explanatory text", () => {
  assert.deepEqual(
    parseNote(
      "Effective Annual Rate: EAR = \\left(1 + r_{\\text{periodic}}\\right)^m − 1",
    ),
    [
      { type: "label", content: "Effective Annual Rate: " },
      {
        type: "math",
        content: "EAR = \\left(1 + r_{\\text{periodic}}\\right)^m − 1",
      },
    ],
  );
});

test("does not split mathematical ellipses as sentences", () => {
  const parts = parseNote("Series: x₁ + x₂ + ... + xₙ = 1");
  assert.equal(parts.filter((part) => part.type === "math").length, 1);
});

test("renders only dollar-delimited spans as math", () => {
  assert.deepEqual(
    parseNote(
      "Equity futures: $N_f = \\frac{β_T − β_P}{β_F}$ — for cash equitization, $β_P = 0$",
    ),
    [
      { type: "label", content: "Equity futures: " },
      { type: "math", content: "N_f = \\frac{β_T − β_P}{β_F}" },
      { type: "text", content: " — for cash equitization, " },
      { type: "math", content: "β_P = 0" },
    ],
  );
});

test("groups adjacent unicode subscripts", () => {
  assert.equal(plainToLatex("xₜ₋₁"), "x_{t-1}");
});

test("escapes percentages and groups exponential terms", () => {
  assert.equal(plainToLatex("%ΔPV"), "\\%ΔPV");
  assert.equal(
    plainToLatex("e^(r−δ)T"),
    "e^{(r-\\delta )T}",
  );
});
