export const base64ArrayEncoder = <T,>(origin: Array<T>): string =>
  btoa(encodeURIComponent(JSON.stringify(origin)));
