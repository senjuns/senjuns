/**
 * Pad the number with leading zeros to the length
 *
 * @param {number} num - The number to be padded with 0s.
 * @param {number} length - The length of targeted number
 * @returns {string} - The result
 */
export function padLeadingZeros(num: number, length: number): string {
  let result = num + '';
  while (result.length < length) result = '0' + result;
  return result;
}
