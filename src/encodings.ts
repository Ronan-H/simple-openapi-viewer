// base-id doesn't have a corresponding types package.
// Functions I'm using are just: encode(string), decode(string)
// @ts-ignore
import { base62 } from 'base-id';

// Encode/decode hex adapted from: https://stackoverflow.com/q/21647928
function unicodeToHex(str: string) {
  let hex = '';
  for(let i = 0;i < str.length; i++) {
      hex += '' + str.charCodeAt(i).toString(16);
  }
  return hex;
}

function hexToUnicode(hex: string) {
  let str = '';
  for (var i = 0; i < hex.length; i += 2) {
    str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
  }
  return str;
}

function unicodeToBase62(unicodeStr: string) {
  const hex = unicodeToHex(unicodeStr);
  return base62.encode(hex);
}

function base62ToUnicode(base62Str: string) {
  const hex = base62.decode(base62Str);
  return hexToUnicode(hex);
}

export default {
  unicodeToHex,
  hexToUnicode,
  unicodeToBase62,
  base62Unicode: base62ToUnicode,
};
