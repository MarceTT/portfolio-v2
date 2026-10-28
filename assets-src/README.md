# Asset sources

Editable sources for the generated binaries in `public/`. Edit the HTML here, then
regenerate — never hand-edit the PNGs.

| Source | Output |
|--------|--------|
| `og-image.html` | `public/images/og-image.png` (1200x630) |
| `favicon-square.html` | `public/apple-touch-icon.png` (180), `public/favicon-32x32.png`, `public/favicon-16x16.png` |
| `og-image-brief.md` | Design brief the OG image follows |

`public/favicon.svg` is the rounded vector icon used by modern browsers and is kept
by hand; `favicon-square.html` reproduces the same mark without rounded corners,
because iOS applies its own mask to `apple-touch-icon.png`.

## Regenerate

Requires Google Chrome. Run from the repository root:

```bash
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
TMPD=$(mktemp -d)

# Open Graph image
"$CHROME" --headless=new --disable-gpu --hide-scrollbars --no-first-run \
  --user-data-dir="$TMPD/p1" --window-size=1200,630 \
  --screenshot=public/images/og-image.png \
  "file://$PWD/assets-src/og-image.html"

# Raster favicons: render once at 512 and downscale
"$CHROME" --headless=new --disable-gpu --hide-scrollbars --no-first-run \
  --user-data-dir="$TMPD/p2" --window-size=512,512 \
  --screenshot="$TMPD/icon512.png" \
  "file://$PWD/assets-src/favicon-square.html"

for pair in 180:apple-touch-icon.png 32:favicon-32x32.png 16:favicon-16x16.png; do
  cp "$TMPD/icon512.png" "public/${pair##*:}"
  sips -z "${pair%%:*}" "${pair%%:*}" "public/${pair##*:}" >/dev/null
done
```

After regenerating the OG image, social platforms cache previews aggressively.
Re-scrape with the [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
and the [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/).
