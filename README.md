# Jev AI

Jev AI is a browser-based decision interface powered by Pollinations' Jev inference API. It turns supplied context and structured questions into verdicts, confidence estimates, and score distributions.

## Run locally

The app is static HTML, CSS, and JavaScript; it has no build step or package dependencies. From the repository root, run:

```sh
python3 -m http.server 8000
```

Then open http://localhost:8000. Connect with Pollinations or paste your own Pollinations API token. OAuth sign-in depends on Pollinations accepting the current origin and redirect URI.

## Pollinations APIs

The app calls `gen.pollinations.ai/alpha/decisions` for Jev inference and Pollinations account endpoints for key validation and account details. Requests run from the user's browser. A manually entered token is stored in that browser's local storage; OAuth access tokens are stored in session storage. Never commit or share personal API tokens.

## Files

- `index.html`: app markup
- `styles.css`: app styles
- `app.js`: Pollinations integration and interface behavior
- `assets/pollinations-logo-light.png`: Pollinations logo used by the app

No license has been selected for this repository yet.
