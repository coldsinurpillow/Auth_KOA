import crypto from "crypto";

export const encrypt = (data: string)=> {
  const key = "U3VwZXIgY29tcGxleCBwYXNzd29yZA=="
  const cipher = crypto.createCipheriv("aes256", key, Buffer.alloc(16, 0));
  let encrypted: string = cipher.update(data, "utf-8", "hex");
  encrypted += cipher.final("hex");
  return encrypted;
}