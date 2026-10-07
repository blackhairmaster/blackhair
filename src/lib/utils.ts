/** Merge conditional class names. Falsy values are dropped. */
export function cn(...values: Array<string | false | null | undefined>): string {
  return values.filter(Boolean).join(" ");
}

/** Pad a number to two digits: 1 -> "01" */
export function pad2(value: number): string {
  return String(value).padStart(2, "0");
}

/** File name of an asset path, used by the image placeholder. */
export function fileNameFromSrc(src: string): string {
  const clean = src.split("?")[0].split("#")[0];
  return clean.split("/").pop() ?? clean;
}
