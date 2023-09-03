# TeXLa Frontend

This is the frontend of the graphical LaTeX editor TeXLa.

## Dependencies

First, install the dependencies with:

```shell
npm install
```

## Developing

Development speed can be increased by using a dev server. To start the dev server, run:

```shell
npm run dev
```

The dev version of the frontend is interoperable with any running backend out of the box.
Expect some desynchronization issues to happen due to the in-place updates the vite dev server does.
These are exclusive to the dev server and will not happen in production.

## Building

To create a production version of TeXLa as an SPA (single-page application), run:

```bash
npm run build
```

The output will be written to the `build` directory.
