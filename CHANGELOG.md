# Changelog

## [1.0.3] - 2022-12-13

## UI
- Added support for WARN label.

## Other
- Add ignored build files. Thanks to [sam0324sam](https://github.com/sam0324sam) for reporting this.

## [1.0.2] - 2022-07-21

## UI
- Another possible fix for default font issue (#1).
- Added `Gainsboro` font color.
- Changed default font-family of log-view to `Consolas, Menlo,Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace, serif`. Same as [gvalkov/tailon](https://github.com/gvalkov/tailon/blob/master/frontend/scss/vars.scss#L4)

## [1.0.1] - 2022-07-21

## UI
- Possible fix for default font issue (#1).
- Toolbar fonts will now be changed too.
- Reduced the default font size from 15px to 13px.

## [1.0.0] - 2022-07-06
First of all, I am not familiar with GO or JavaScript. I learned them while I was trying to make this better. \
So you may find some codes here and there that were not meant to be and I apologize for that.

## UI
- A bunch of CSS tweaks
- Wrapped lines mode will have alternative colors between lines.
- Configuration dialog will now be hidden when clicking elsewhere.
- The logs will now fit most of the screens properly.
- Added the option to change background color and font color. Thanks to [nurzico/tailon](https://github.com/nurzico/tailon).
- Added labels for log levels. Thanks to [fquinto/tailon](https://github.com/fquinto/tailon) for the code. I added the rest of them.
- Added labels for all the HTTP methods.
- Added the ability to clear search field with escape button. Thanks to [bformet/tailon](https://github.com/bformet/tailon/commit/03d08ab3b36c9b982c09754d93ecfb8fdbd54284)
- Favicon is now displaying properly.
- Added a separate configuration for UI changes.
- Added the option for changing font type.
- Download file option now opens in a new window.
- Changed toolbar icons. They were from:
  - [Eraser](https://www.svgrepo.com/svg/72555/eraser)
  - [Settings](https://www.svgrepo.com/svg/10074/settings)
  - [Download](https://www.svgrepo.com/svg/14689/download)
  - [UI Tools](https://www.reshot.com/free-svg-icons/item/tool-YANDWEVLTJ/)
- Added a range slider to change font size. It is from [W3Schools](https://www.w3schools.com/howto/howto_js_rangeslider.asp).

## CLI
- Added command line `lines-to-tail` and `lines-of-history`. Thanks to [ebbeknudsen/tailon](https://github.com/ebbeknudsen/tailon/commit/944862f466790dfe67715c8c82f6edbd5605915a)
- Formatted help message.

## Config File
- Added the ability to load files from config.toml. Thanks to [joshuaboniface/tailon](https://github.com/joshuaboniface/tailon/commit/8d1a949e563a719938c1d74be693e49d57e246ed).  \
You can view the example in [README](README.md#config-file) or [config.toml](config.toml). This code would only load multiple files from toml file but shows only the last one when using command line. I somehow managed to fix this. I am not sure how reliable it is. I just put one or two lines in 314-316 lines in main.go file. But in my testing it worked fine.

## Dependencies
- Updated frontend dependencies:
  - autoprefixer: 8.6.1 -> 10.4.7
  - clean-css: 4.1.11 -> 5.3.0
  - clean-css-cli: 4.1.11 -> 5.6.0
  - debounce: 1.1.0 -> 1.2.1
  - node-sass: 4.11.0 -> 7.0.1
  - npm: 6.13.4 -> 8.13.2
  - postcss-cli: 5.0.0 -> 10.0.0
  - sockjs-client: 1.3.0 -> 1.6.1
  - uglify-js: 3.4.4 -> 3.16.2
  - vue: 2.5.16 -> 2.7.2
  - vue-loading-overlay: 2.1.0 -> 3.4.2
  - vue-multiselect: 2.1.0 -> 2.1.6
- Added `@mdi/font` as a dependency.
- Updated updated materialdesignicons webfonts and css in `dist` folder from v5.8.55 -> v6.9.96.
- Updated sockjsv2 -> sockjsv3 in `server.go` file. Thanks to [GChuf/tailon](https://github.com/GChuf/tailon/commit/5684abaf7cae3722e1a659afcf0ff2ea8172a707).

## Development
- Added developement requirements and steps in  [README](README.md). Huge thanks to [fquinto/tailon](https://github.com/fquinto/tailon) for including how to build in their README.
- Added `license`, `description`, `scripts`, `keywords`, `bugs` and `homepage` fields in `package.json` file.
- Added `npm run` commands to build frontend and tailon.
   - `npm run build` will build dependencies, upgrade them, delete old .css and .js files and rebuilds them and exits.
   - `npm run build-and-watch` will also build dependencies, upgrade them, delete old .css and .js files and rebuilds them and watches for changes in frontend files. This requires [entr](https://github.com/eradman/entr).
   - `npm run build-tailon` will build tailon for your arch and exits.
   - `npm run build-frontend-and-tailon` will build dependencies, upgrade them, delete old .css and .js files, rebuilds them and also build tailon and exits.

## Docker
- Added Dockerfile healthcheck.
- Removed `upx` dependency.
- Added multi-arch docker images, built with GitHub Actions.

## Miscellaneous
- `make all` command in frontend directory will beautify all the .js files and .css files that it creates.
- Favicon location was moved from `frontend/dist` directory to `frontend/dist/static/favicon` folder.
- Added `grep -v` command. Thanks to [alexeykobzev/tailon](https://github.com/alexeykobzev/tailon/commit/034b17b66c08d8ab3430b6e1521821969ddb7d99).
- `make README.md` command in root folder is broken. I have commented it out.
