import decToHex from './decToHex';

export default (len: number = 10) => {
  const arr = new Uint8Array(len / 2);

  window.crypto.getRandomValues(arr);

  return Array.from(arr, decToHex).join('');
};
