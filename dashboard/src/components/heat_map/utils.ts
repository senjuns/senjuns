/**
 * Apply unshift function to immutable array.
 * @param {Array<any>} immutableObj - immutable object
 * @param {any} value - parameter for unshift function
 * @returns {Array<any>} mutated array
 */
export function unshiftImmutableArray(
  immutableObj: Array<any>,
  value: any
): Array<any> {
  const mutableObj = [...immutableObj];
  mutableObj.unshift(value);
  return mutableObj;
}
