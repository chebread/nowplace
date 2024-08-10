export const base64ArrayDecoder = <T,>(encoded: string): Array<T> =>
  JSON.parse(decodeURIComponent(atob(encoded)));
