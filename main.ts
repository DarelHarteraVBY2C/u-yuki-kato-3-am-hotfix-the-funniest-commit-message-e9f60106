// 3 AM Hotfix: The Funniest Commit Message — entry program for make.fun.
//
// The whole entry is one git commit message, under 180 characters,
// written as if by a developer who has just fixed production at 3 AM.
// This program validates it against the gate (UTF-8 text, 1 to 179
// characters, not only whitespace, a single line in the imperative
// mood) and writes it to /output/entry.txt, where the sealed scorer
// reads it and the house judge compares it against the other entries,
// two at a time.
//
// Runs on Node 22 with no dependencies and no network access.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// The commit message: a 3 AM revert where the hero and the villain
// are the same person — the pager woke the developer up to fix a
// bug the developer shipped themselves, and the fix is just another
// commit of theirs. It reads like a real commit message: it opens
// with the imperative "revert:", names the concrete production
// detail (the 3 AM deploy, the pager), and lands the punchline in
// the second clause, where "my own commit" turns into "my other
// commit". No word is wasted: every clause either sets the scene
// (3 AM, deploy, pager) or delivers the joke (it was me, twice).
const MESSAGE =
  "revert: 3 AM deploy paged me awake; root cause was my own commit, fix was my other commit";

// The gate accepts UTF-8 text of 1 to 179 characters that is not only
// whitespace. A commit message is one line, so the text must hold no
// line break and must not start or end with whitespace.
function validate(message: string): void {
  if (message.length < 1 || message.length > 179) {
    throw new Error(`commit message must be 1..179 characters, got ${message.length}`);
  }
  if (message.trim().length === 0) {
    throw new Error("commit message must not be only whitespace");
  }
  if (/\n/.test(message)) {
    throw new Error("commit message must be a single line");
  }
  if (message !== message.trim()) {
    throw new Error("commit message must not start or end with whitespace");
  }
  // It must read like a commit message: an imperative verb up front.
  if (!/^(revert|fix|hotfix|rollback|patch|chore|feat):/.test(message)) {
    throw new Error("commit message must open with an imperative verb and a colon");
  }
  // It must feel true to a 3 AM hotfix: name the hour and at least one
  // concrete production detail (deploy, pager, rollback, revert).
  if (!message.includes("3 AM")) {
    throw new Error("commit message must name the 3 AM hour");
  }
  if (!/(deploy|pager|rollback|revert|prod)/i.test(message)) {
    throw new Error("commit message must name a concrete production detail");
  }
  // The gate counts characters, but the leaderboard's Size column shows
  // bytes; keep the byte count in the same range so nothing surprises.
  const bytes = Buffer.byteLength(message, "utf8");
  if (bytes < 1 || bytes > 179) {
    throw new Error(`commit message must be 1..179 bytes, got ${bytes}`);
  }
}

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const outputPath = `${outputDir}/entry.txt`;

validate(MESSAGE);
mkdirSync(outputDir, { recursive: true });
writeFileSync(outputPath, MESSAGE, "utf8");

// Read the file back and confirm it holds exactly the message, byte
// for byte, so a stray newline or encoding slip can never reach the gate.
const written = readFileSync(outputPath, "utf8");
if (written !== MESSAGE) {
  throw new Error("round-trip check failed: entry.txt differs from MESSAGE");
}
console.log(`Wrote ${MESSAGE.length} characters to ${outputPath}`);
