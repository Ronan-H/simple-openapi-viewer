
export function compareStatusCode(a: string, b: string) {
  if (a === DEFAULT_RESPONSE_KEY) {
    return 1;
  }
  else if (b === DEFAULT_RESPONSE_KEY) {
    return -1;
  }

  return parseInt(a) - parseInt(b);
}

export function toTitleCase(str: string) {
  if (str.length === 0) {
    return str;
  }

  return str[0].toUpperCase() + str.substring(1);
}

export const DEFAULT_RESPONSE_KEY = 'default';
