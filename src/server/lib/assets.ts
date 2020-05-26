import { readFileSync } from 'fs';

const getAssetsVersion = (filename = 'manifest.json') => {
  const fileContents = readFileSync(`${__dirname}/../public/${filename}`, 'utf8');
  const manifest = JSON.parse(fileContents);
  // TODO: fix this
  const js = manifest[Object.keys(manifest)[0]];
  const css = manifest[Object.keys(manifest)[1]];
  return { js, css };
};

export { getAssetsVersion };