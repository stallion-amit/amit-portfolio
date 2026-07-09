# Amit Kothari Portfolio

Static GitHub Pages-ready replica of the Amit Kothari portfolio originally published at `https://amitthrive.lovable.app/`.

## Project Structure

- `index.html` - production entry page
- `404.html` - GitHub Pages fallback for client-side routes
- `assets/` - downloaded production CSS, JavaScript, and image assets
- `.github/workflows/pages.yml` - GitHub Pages deployment workflow
- `.nojekyll` - keeps GitHub Pages from processing the static build with Jekyll

## Local Preview

From this folder:

```bash
python3 -m http.server 4173
```

Then open `http://localhost:4173/`.

## Publishing

Push this folder to a GitHub repository and enable GitHub Pages with GitHub Actions. The included workflow publishes the repository root directly, so no build step is required.
