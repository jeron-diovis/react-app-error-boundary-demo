# Demo: disable `react-error-overlay` in create-react-app

Based on [this SO question](https://stackoverflow.com/questions/46589819/disable-error-overlay-in-development-mode).

This repo demonstrates how you can turn `react-error-overlay` from a mandatory-thing-you-never-asked-for into a handy-opt-in-feature.

## Why ever need this?

See discussion under [this answer](https://stackoverflow.com/a/47400249/3437433)

In very short:

> When developing error boundary components and styling/testing how they look, this is an extremely annoying feature. It slows down development and adds no value. You should allow developers to decide whether they want this feature turned on or not

## What you should observe

When checkbox `Enable react-error-overlay` is off, after clicking "explode" button:
* it'll immediately show error fallback element.
* in console you'll see message `Following error has been caught by <ErrorBoundary> component ...`

When checkbox is on:
* react-error-overlay will appear as it does by default in react-app
* in console you'll see `Uncaught Error ...`

## How it works

In general, it's based on [this answer](https://stackoverflow.com/a/54549601/3437433).

It sets up a global error handler – to intercept uncaught errors before react-error-overlay does, and handle them in a special way.

And it provides customized ErrorBoundary component (based on [react-error-boundary](https://github.com/bvaughn/react-error-boundary) package), which marks errors handled by it as caught, so our global handler can decide whether to show overlay.

Unfortunately, using `event.stopImmediatePropagation()` is not appropriate (see comment under the mentioned answer), since it breaks all error-boundaries too.
So instead, to "disable" overlay we'll just hide it via `display: none`.

## Implementation

See these files:
* [setupReactAppOverlayErrorHandler.ts](/src/setupReactAppOverlayErrorHandler.ts)
* [ErrorBoundary.tsx](/src/ErrorBoundary.tsx)
plus actual setup in `src/index.tsx`.

Feel free to copy and integrate this into your project, if you find it any useful.
