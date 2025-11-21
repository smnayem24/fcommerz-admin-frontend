export function removeEmptyKeys(obj) {
  if (obj === undefined || obj === null) {
    return {};
  }

  return Object.keys(obj).reduce((acc, key) => {
    if (obj[key] !== null && obj[key] !== undefined && obj[key] !== "") {
      acc[key] = obj[key];
    }
    return acc;
  }, {});
}