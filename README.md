# Canon

Berean Standard Bible reader for the Omarchy bar. Offline, no audio.

While this copy is still a clock clone, Omarchy loads it as `andrewbacon.clock`
and it replaces the built-in clock. The publish id will be
`io.github.<you>.canon`.

## Install (development)

This folder is already a live plugin:

```sh
omarchy plugin validate ~/.config/omarchy/plugins/andrewbacon.clock
```

Later, from git:

```sh
omarchy plugin add https://github.com/<you>/canon.git --enable
omarchy bar move io.github.<you>.canon --section right
```

## Usage

- Left-click the bar chip to open or close the reader.
- Scroll the chip to move to the previous or next chapter.
- Type a reference (`jn 3:16`, `psalm 23`, `1 john 1`) and press Enter.
- Use the book button to browse Old/New Testament, then a chapter.
- Escape closes the panel. The last verse is saved to
  `~/.local/state/omarchy/settings/canon.json`.

## Remove

```sh
omarchy plugin remove andrewbacon.clock
```

While this is still a clone of `omarchy.clock`, removal restores the built-in
clock. Reading position in `canon.json` is left in place.
