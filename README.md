# Canon

Berean Standard Bible reader for the Omarchy bar. Offline, no audio.

Plugin id: `andrewbacon.canon`.

## Install (this machine)

The live copy is:

```sh
omarchy plugin validate ~/.config/omarchy/plugins/andrewbacon.canon
omarchy plugin enable andrewbacon.canon --section right
```

From git later:

```sh
omarchy plugin add https://github.com/RamenPacket84/canon.git --enable
omarchy bar move andrewbacon.canon --section right
```

## Usage

- Left-click the bar chip to open or close the reader.
- Scroll the chip to move to the previous or next chapter.
- Type a reference (`jn 3:16`, `psalm 23`, `1 john 1`) and press Enter.
- Press `c` to copy the current verse as `text - Book chapter:verse`.
- Use the book button to browse Old/New Testament, then a chapter.
- Escape closes the panel. The last verse is saved to
  `~/.local/state/omarchy/settings/canon.json`.

## Remove

```sh
omarchy plugin remove andrewbacon.canon
```

Reading position in `canon.json` is left in place. This plugin is not a clock
clone; removing it does not touch `omarchy.clock`.
