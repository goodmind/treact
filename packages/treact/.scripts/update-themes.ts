#!/usr/bin/env ./node_modules/.bin/ts-node --project .scripts
import axios from 'axios';
import * as t from 'babel-types';
import * as fs from 'fs';
import * as JSZip from 'jszip';
import * as path from 'path';
import { promisify } from 'util';
import { parse } from './gen-themes';

const jszip = new JSZip();
const themesDir = path.join(__dirname, '..', 'src/app/themes');

const writeFile = promisify(fs.writeFile);
const download = (theme: string, name: string, meta) => axios({
  method: 'get',
  url: theme,
  responseType: 'arraybuffer',
}).then(response => {
  const type = response.headers['content-type'];
  if (type.includes('text/plain')) {
    return response.data.toString();
  } else if (type.includes('application/octet-stream')) {
    return jszip.loadAsync(response.data);
  } else {
    return Promise.reject('unknown type');
  }
}).then(async file => {
  const dest = path.join(themesDir, name);
  const save = (file, content) => writeFile(path.join(dest, file), content);
  const saveTheme = (theme, meta, bg?) => save('index.ts', parse(theme, meta, bg));

  if (file instanceof JSZip) {
    const zip = file;
    const background = zip.file(/.jpg/)[0];
    const theme = await zip.file('colors.tdesktop-theme').async('string');

    await save(
      background.name,
      await background.async('nodebuffer'));
    await saveTheme(theme, meta, `./${background.name}`);
  } else {
    // console.log(typeof file);
    await saveTheme(file, meta);
  }
});

const defaultThemeFile =
  'https://raw.githubusercontent.com/telegramdesktop/tdesktop/dev/Telegram/Resources/colors.palette';
const nightThemeBundle =
  'https://github.com/telegramdesktop/tdesktop/raw/dev/Telegram/Resources/night.tdesktop-theme';

const themes = [
  download(defaultThemeFile, 'default', [
    t.objectProperty(t.identifier('builtin'), t.booleanLiteral(true)),
  ]),
  download(nightThemeBundle, 'night', [
    t.objectProperty(t.identifier('builtin'), t.booleanLiteral(true)),
    t.objectProperty(t.identifier('nightMode'), t.booleanLiteral(true)),
  ]),
];

Promise.all(themes);


