import { compareSync, hashSync } from "bcryptjs";

export function HashPass(password) {
  const output = hashSync(password, 12);
  return output;
}
export function VerifyPass(password, hashedPassword) {
  const output = compareSync(password, hashedPassword);
  return output;
}
