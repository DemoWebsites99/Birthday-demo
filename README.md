# A Little Birthday Surprise 💖

A responsive birthday surprise website made with plain HTML, CSS, and JavaScript. No install or backend required.

## 1. Personalize it

Open `script.js` and change the first two lines:

```js
const FRIEND_NAME = "Birthday Girl";
const YOUR_NAME = "Your Bestie";
```

Replace the example letter in the `letterText` variable with your own message if you like.

## 2. Add your photos

Copy your images into the `images` folder and name them exactly:

- `photo1.jpg`
- `photo2.jpg`
- `photo3.jpg`

If you only have two photos, add `photo1.jpg` and `photo2.jpg`. The third card will show a friendly placeholder until you add `photo3.jpg`.

You can use `.png`, `.jpg`, or `.webp`, but if you change the extension, update the matching `src` paths in `index.html`.

## 3. Run it

1. Extract the ZIP file if needed.
2. Open the `birthday_surprise_website` folder.
3. Double-click `index.html` to open it in your browser.

For a local development server, open a terminal in the folder and run:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## 4. Share it

To share it as a website link, upload the folder to a static hosting service such as GitHub Pages, Netlify, or Cloudflare Pages. Upload the `index.html`, `style.css`, `script.js`, and `images` folder together. Test the hosted link on a phone before sending it to your friend.

## Included interactions

- Animated welcome screen with floating decorations
- Clickable Polaroid photo cards with personal message pop-ups
- Animated envelope and typing birthday letter
- Interactive candles, confetti finale, and replay button
- Optional user-controlled sound effects (no autoplay)
- Responsive layout and reduced-motion support

The Google Fonts link requires an internet connection; the site itself still works without it using fallback fonts.
