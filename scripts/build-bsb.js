#!/usr/bin/env node
"use strict";

// One-shot converter. Not used at runtime.
// Usage: node scripts/build-bsb.js /path/to/BSB.json data/bsb.json
// Source: scrollmapper/bible_databases formats/json/BSB.json (BSB text is CC0).

const fs = require("fs");

const rename = {
  "I Samuel": "1 Samuel",
  "II Samuel": "2 Samuel",
  "I Kings": "1 Kings",
  "II Kings": "2 Kings",
  "I Chronicles": "1 Chronicles",
  "II Chronicles": "2 Chronicles",
  "I Corinthians": "1 Corinthians",
  "II Corinthians": "2 Corinthians",
  "I Thessalonians": "1 Thessalonians",
  "II Thessalonians": "2 Thessalonians",
  "I Timothy": "1 Timothy",
  "II Timothy": "2 Timothy",
  "I Peter": "1 Peter",
  "II Peter": "2 Peter",
  "I John": "1 John",
  "II John": "2 John",
  "III John": "3 John",
  "Revelation of John": "Revelation",
};

const src = process.argv[2];
const dest = process.argv[3];
if (!src || !dest) {
  console.error("usage: build-bsb.js <BSB.json> <data/bsb.json>");
  process.exit(2);
}

const raw = JSON.parse(fs.readFileSync(src, "utf8"));
const books = raw.books.map((b, i) => {
  const name = rename[b.name] || b.name;
  const chapters = b.chapters.map((ch) => {
    const verses = [];
    for (const v of ch.verses) {
      const n = Number(v.verse);
      verses[n - 1] = String(v.text || "").replace(/\s+/g, " ").trim();
    }
    return verses;
  });
  return {
    id: name,
    name,
    testament: i < 39 ? "ot" : "nt",
    chapters,
  };
});

fs.writeFileSync(dest, JSON.stringify({ translation: "BSB", books }));
console.log("wrote", dest, "books", books.length);
