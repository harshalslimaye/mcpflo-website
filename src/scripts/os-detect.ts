export type OS = "mac" | "windows" | "android" | "other";

export function detectOS(): OS {
  const ua = navigator.userAgent;
  if (/Android/.test(ua)) return "android";
  if (/Mac OS X|Macintosh/.test(ua)) return "mac";
  if (/Windows/.test(ua)) return "windows";
  return "other";
}
