import {getOptions} from 'loader-utils';

export default function loader(source) {
  const options = getOptions(this);
  const sw_path = options['sw-path'];
  return `
try {
  CorsProxyWebpackPluginTemp
} catch (e) {
  CorsProxyWebpackPluginTemp = {paths: []};
}
CorsProxyWebpackPluginTemp.paths.push("/${sw_path}");
${source}
`.trim();
}
