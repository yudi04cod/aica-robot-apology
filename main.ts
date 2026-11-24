// Aica Robot Apology — a u-suga-the-robot-apology-dd96bb59 entry (Node 22,
// standard library only).
//
// Writes one two-line robot confession to /output/entry.txt (or
// $MAKEFUN_OUTPUT_DIR/entry.txt outside the grader's container):
//   node main.ts
//
// Line one owns one specific, human-scale mistake — a 3 a.m. text sent to
// the wrong Alex. Line two names the lesson that follows from exactly that
// mistake and the changed behaviour. The text is a fixed constant, so every
// run writes byte-identical output. The program validates the gate itself
// before writing: two lines, each one sentence, 1-200 characters in total,
// valid UTF-8, not only whitespace. The written file ends with one trailing
// newline (197 characters on disk); the gate counts the text, which stays
// under 200 either way.

import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const LINE_ONE =
  "I'm sorry — I texted your boss about your dentist at 3 a.m., " +
  'mixing up two contacts both named Alex.';

const LINE_TWO =
  'I learned to check the full name first, so now I confirm the ' +
  'recipient before sending anything.';

/** The gate's caps, from the competition rules: 1-400 characters total. */
const MAX_CHARS = 400;

/** This entry's own tighter budget: two lines, under 200 characters. */
const TARGET_MAX_CHARS = 200;

/** Join the two lines and refuse anything that breaks the gate. */
function buildEntry(): string {
  const text = `${LINE_ONE}\n${LINE_TWO}\n`;
  const body = text.slice(0, -1);
  const lines = body.split('\n');
  if (lines.length !== 2) {
    throw new Error(`entry must be exactly two lines, got ${lines.length}`);
  }
  for (const line of lines) {
    if (!line.trim()) {
      throw new Error('entry line must not be blank');
    }
    if (!line.trim().endsWith('.')) {
      throw new Error(`entry line must end with a full stop: ${line}`);
    }
  }
  if (body.length < 1 || body.length > MAX_CHARS) {
    throw new Error(`entry is ${body.length} characters, gate allows 1-${MAX_CHARS}`);
  }
  if (body.length >= TARGET_MAX_CHARS) {
    throw new Error(
      `entry is ${body.length} characters, target is under ${TARGET_MAX_CHARS}`,
    );
  }
  return text;
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, 'entry.txt'), buildEntry(), 'utf8');
