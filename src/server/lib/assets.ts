import { readFileSync } from 'fs';

const getAssetsVersion = (filename = 'manifest.json') => {
  const fileContents = readFileSync(`${__dirname}/../public/${filename}`, 'utf8');
  const manifest = JSON.parse(fileContents);

  const jsEntry = Object.keys(manifest).find(k => manifest[k].endsWith('js'));
  const cssEntry = Object.keys(manifest).find(k => manifest[k].endsWith('css'));

  const js = manifest[jsEntry!];
  const css = manifest[cssEntry!];

  return { js, css };
};

export { getAssetsVersion };