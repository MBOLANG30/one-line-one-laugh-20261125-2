// One Line, One Laugh — make.fun entry (u-coral-404-one-line-one-laugh-22f2c9f3).
// Writes a single funny line to entry.txt in the output directory.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "I asked the barista for something strong; she handed me her resignation letter.";

// The gate requires 1-200 characters, exactly one line, not only whitespace.
if (LINE.length < 1 || LINE.length > 200) {
  console.error(`error: line is ${LINE.length} characters, must be 1-200`);
  process.exit(1);
}
if (LINE.trim().length === 0) {
  console.error("error: line is only whitespace");
  process.exit(1);
}
if (LINE !== LINE.trim()) {
  console.error("error: line has leading or trailing whitespace");
  process.exit(1);
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  console.error("error: line must be exactly one line");
  process.exit(1);
}
if (/[\u0000-\u001f\u007f]/.test(LINE)) {
  console.error("error: line contains control characters");
  process.exit(1);
}

// The grader sets MAKEFUN_OUTPUT_DIR; default to /output when it is unset
// or empty. The output directory is only ever created, never deleted.
const outDir = process.env.MAKEFUN_OUTPUT_DIR?.trim() || "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, LINE, "utf8");

// Round-trip check: what the grader reads must be exactly the line.
const back = readFileSync(outPath, "utf8");
if (back !== LINE) {
  console.error("error: round-trip check failed, entry.txt does not match the line");
  process.exit(1);
}
console.log(`wrote ${outPath} (${LINE.length} chars)`);
