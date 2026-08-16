#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const vm = require("vm");

function load(name) {
  const src = fs.readFileSync(path.join(__dirname, "..", name), "utf8")
    .split("\n")
    .filter((l) => !l.trim().startsWith(".pragma") && !l.trim().startsWith(".import"))
    .join("\n");
  const sandbox = { console };
  vm.createContext(sandbox);
  vm.runInContext(src, sandbox, { filename: name });
  return sandbox;
}

const C = load("Canon.js");
let pass = 0, fail = 0;
function ok(name, cond) {
  if (cond) { pass++; console.log("PASS " + name); }
  else { fail++; console.log("FAIL " + name); }
}

ok("66 books", C.BOOKS.length === 66);
ok("john exists", !!C.bookById("John"));
ok("psalms 150", C.chapterCount("Psalms") === 150);
ok("jn 3:16", (() => {
  const p = C.parseReference("jn 3:16");
  return p && p.book === "John" && p.chapter === 3 && p.verse === 16;
})());
ok("john 3", (() => {
  const p = C.parseReference("john 3");
  return p && p.book === "John" && p.chapter === 3 && p.verse === 1;
})());
ok("1 john 1:1", (() => {
  const p = C.parseReference("1 john 1:1");
  return p && p.book === "1 John" && p.chapter === 1 && p.verse === 1;
})());
ok("psalm 23", C.parseReference("psalm 23").book === "Psalms");
ok("song of solomon", C.parseReference("song 1").book === "Song of Solomon");
ok("rev 22", C.parseReference("rev 22").book === "Revelation");
ok("genesis 1 glued", C.parseReference("genesis1").chapter === 1);
ok("invalid book", C.parseReference("zzz 99") === null);
ok("invalid chapter", C.parseReference("jude 2") === null);
ok("next wraps to next book", (() => {
  const n = C.nextChapter("Malachi", 4);
  return n.book === "Matthew" && n.chapter === 1;
})());
ok("prev wraps to prev book", (() => {
  const n = C.prevChapter("Matthew", 1);
  return n.book === "Malachi" && n.chapter === 4;
})());
ok("compact ref", C.formatRef("John", 3, 16, true) === "John 3:16");

const bible = JSON.parse(fs.readFileSync(path.join(__dirname, "..", "data/bsb.json"), "utf8"));
ok("bsb 66", bible.books.length === 66);
const john = bible.books.find((b) => b.id === "John");
ok("bsb john 3:16", john.chapters[2][15].indexOf("God so loved the world") !== -1);
ok("psalm 119 length", bible.books.find((b) => b.id === "Psalms").chapters[118].length === 176);

console.log(fail === 0 ? `\n${pass} passed` : `\n${pass} passed, ${fail} failed`);
process.exit(fail === 0 ? 0 : 1);
