export function pruneObj(obj: { [key: string]: any }): void {
  Object.keys(obj).forEach(
    (key) => (obj[key] === undefined || obj[key] === null) && delete obj[key]
  );
}

export function keepTrue(obj: { [key: string]: any }): void {
  Object.keys(obj).forEach((key) => !obj[key] && delete obj[key]);
}
