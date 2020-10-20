export function throwError(error) {
  throw new Error (`Error ${error.code}: ${error.message}`);
};