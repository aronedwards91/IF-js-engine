export function listWithDeterminer(string: string): string {
  return `${
    ["a", "e", "i", "o", "u"].includes(string.charAt(0)) ? "an" : "a"
  } ${string}`;
}

export function listArrayWithDeterminer(stringArray: Array<string>): string {
  return stringArray
    .map((string, i) => {
      const preface =
        stringArray.length > 1 && i === stringArray.length - 1 ? "and " : "";
      return preface + listWithDeterminer(string);
    })
    .join(", ");
}
