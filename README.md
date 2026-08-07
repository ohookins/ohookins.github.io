Personal website code for the GitHub Pages site at https://ohookins.github.io.

## Build

Install dependencies:

```bash
npm install
```

Build the site locally:

```bash
npm run build
```

Run the site locally:

```bash
npm run develop
```

## Deployment

This repository uses GitHub Actions to build the site and deploy it to GitHub Pages.

The workflow is defined in `.github/workflows/gatsby.yml`.

### Notes

- The workflow uses `package-lock.json`/npm.
- Contentful credentials must be supplied via GitHub secrets: `SPACE_ID` and `ACCESS_TOKEN`.
