import { createHash } from "crypto";

export function cryptPass(password: string): string {
  const salt = createHash(process.env.ALG as string).update(process.env.SALT as string, "utf8").digest("hex");

  return createHash(process.env.ALG as string).update(password).update(salt).digest("hex");
}

export function verifyPass(password: string, recoveredPassword: string): boolean {
  const encriptedPass = cryptPass(password);

  return encriptedPass === recoveredPassword;
} 
