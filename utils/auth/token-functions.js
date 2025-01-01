import { sign, verify } from "jsonwebtoken";

export function JenerateAccessToken(payload) {
  const token = sign({ ...payload }, process.env.PRIVATE_KEY, {
    expiresIn: "30s",
  });
  return token;
}
export function VerifyAccessToken(token) {
  try {
    const payload = verify(token, process.env.PRIVATE_KEY);
    return payload;
  } catch (error) {
    return false;
  }
}
//-----------------------------------
export function JenerateRefreshToken(payload) {
  const token = sign({ ...payload }, process.env.PRIVATE_KEY, {
    expiresIn: "15d",
  });
  return token;
}
export function VerifyRefreshToken(token) {
  try {
    const payload = verify(token, process.env.PRIVATE_KEY);
    return payload;
  } catch (error) {
    return false;
  }
}
