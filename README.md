# Demo: disable `react-error-overlay` in create-react-app

Demonstrates how [react-app-error-boundary](https://www.npmjs.com/package/react-app-error-boundary) package works.

## How to use

```sh
git clone https://github.com/jeron-diovis/react-app-error-boundary-demo.git
cd react-app-error-boundary-demo
npm install
npm start
```
Open `http://localhost:3000`

## What you should observe

When checkbox `Enable react-error-overlay` is off, after clicking "explode" button:
* it'll immediately show error fallback element.
* in console you'll see message `Following error has been caught by <ErrorBoundary> component ...`

When checkbox is on:
* react-error-overlay will appear as it does by default in react-app
* in console you'll see `Uncaught Error ...`
