# `@kancolle/browser`

[![Version](https://img.shields.io/npm/v/@kancolle/browser.svg)](https://www.npmjs.com/package/@kancolle/browser)
[![Build](https://img.shields.io/travis/kcwiki/kancolle-browser.svg)](https://travis-ci.org/kcwiki/kancolle-browser)
[![Dependencies](https://img.shields.io/david/kcwiki/kancolle-browser.svg)](https://david-dm.org/kcwiki/kancolle-browser)
[![Dev Dependencies](https://img.shields.io/david/dev/kcwiki/kancolle-browser.svg)](https://david-dm.org/kcwiki/kancolle-browser?type=dev)

Minimal Electron-based KanColle browser.

Currently, it is used in [kancolle-data](https://github.com/kcwiki/kancolle-data) as a dev dependency to get `api_start2` response automatically (or almost automatically).

## Install

```sh
yarn add --dev @kancolle/browser
```

## Usage

Save raw `api_start2` response:

```sh
yarn kancolle-browser --save-api-and-exit path/to/api_start2
```

Use `--log` to enable game API logging and `--dev` to open devtools.

## TODO

- Electron 5 (`webview` `disablewebsecurity` "doesn't work")
- Automate login/clicking part?
