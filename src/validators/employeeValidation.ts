import zod from "zod";

export const employeeSchema = zod
  .object({
    first_name: zod
      .string()
      .min(6)
      .max(10)
      .regex(/^[a-zA-Z]*$/),
    last_name: zod
      .string()
      .min(6)
      .max(10)
      .regex(/^[a-zA-Z]*$/),
    email: zod.string().email(),
    number: zod.string().regex(/^\+94\d{9}$/),
    gender: zod.string().regex(/^[MF]$/),
  })
  .partial();
