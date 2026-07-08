export type OS = "mac" | "windows" | "other";

export function detectOS(): OS {
  const ua = navigator.userAgent;
  if (/Mac OS X|Macintosh/.test(ua)) return "mac";
  if (/Windows/.test(ua)) return "windows";
  return "other";
}
