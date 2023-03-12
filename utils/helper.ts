export function base64ToString(b64: string) {
  return Buffer.from(b64, "base64").toString();
}

export function stringToBase64(str: string) {
  return Buffer.from(str).toString("base64");
}
