import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "The office printer prints its test page flawlessly, then eats the one contract that matters, flashes an error in a language no one speaks, and demands a cartridge worth more than the printer. It is not broken. It is a hostage negotiator with a paper tray.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const target = join(outDir, "entry.txt");
writeFileSync(target, LINE, "utf8");
const written = readFileSync(target, "utf8");
if (written !== LINE) {
  throw new Error(`output mismatch: expected ${JSON.stringify(LINE)}, got ${JSON.stringify(written)}`);
}
// Byte-level verification: the file must be exactly the UTF-8 encoding of
// LINE — no trailing newline, no BOM, no re-encoding surprises.
const writtenBytes = readFileSync(target);
const expectedBytes = Buffer.from(LINE, "utf8");
if (!writtenBytes.equals(expectedBytes)) {
  throw new Error(
    `output bytes mismatch: expected ${expectedBytes.length} bytes, got ${writtenBytes.length} bytes`,
  );
}
if (written.length < 1 || written.length > 400) {
  throw new Error(`output length ${written.length} outside 1-400 chars`);
}
console.log(`wrote ${target} (${LINE.length} chars)`);
