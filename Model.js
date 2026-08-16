.pragma library

.import "Canon.js" as Canon

var STATE_VERSION = 1

function fileUrlToPath(url) {
  var s = String(url || "")
  if (s.indexOf("file://") === 0) {
    s = s.substring(7)
    if (s.charAt(0) !== "/") s = "/" + s
    try { s = decodeURIComponent(s) } catch (e) {}
  }
  return s
}

function versesFor(bible, bookId, chapter) {
  if (!bible || !bible.books) return []
  for (var i = 0; i < bible.books.length; i++) {
    var b = bible.books[i]
    if (b.id !== bookId) continue
    var ch = b.chapters[chapter - 1]
    if (!ch) return []
    var out = []
    for (var v = 0; v < ch.length; v++) {
      out.push({ n: v + 1, text: ch[v] })
    }
    return out
  }
  return []
}

function verseCount(bible, bookId, chapter) {
  return versesFor(bible, bookId, chapter).length
}

function clampVerse(bible, bookId, chapter, verse) {
  var count = verseCount(bible, bookId, chapter)
  if (count <= 0) return 1
  var n = typeof verse === "number" ? verse : 1
  if (n < 1) return 1
  if (n > count) return count
  return n
}

function parseState(json, bible) {
  var data = null
  try { data = json ? JSON.parse(json) : null } catch (e) { data = null }
  var book = Canon.DEFAULT_BOOK
  var chapter = Canon.DEFAULT_CHAPTER
  var verse = Canon.DEFAULT_VERSE
  if (data && typeof data === "object") {
    if (typeof data.book === "string" && Canon.bookById(data.book)) book = data.book
    if (typeof data.chapter === "number" && Canon.isValidPlace(book, data.chapter, 1))
      chapter = data.chapter
    if (typeof data.verse === "number" && data.verse >= 1) verse = data.verse
  }
  verse = clampVerse(bible, book, chapter, verse)
  return { book: book, chapter: chapter, verse: verse }
}

function serializeState(book, chapter, verse) {
  return JSON.stringify({
    version: STATE_VERSION,
    translation: "BSB",
    book: book,
    chapter: chapter,
    verse: verse
  })
}
