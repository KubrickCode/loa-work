import { z } from "zod";

declare module "zod" {
  interface ZodNumber {
    int32(): this;
  }
}

export const INT32_MAX = Math.pow(2, 31) - 1;
export const INT32_MIN = -Math.pow(2, 31);

z.ZodNumber.prototype.int32 = function () {
  return this.int().min(INT32_MIN).max(INT32_MAX);
};

export { z };
