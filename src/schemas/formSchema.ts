/**
 * File: src/schemas/formSchema.ts
 */

import { z } from "zod";

export const formSchema = z.object({
  name: z.string().min(4, "4文字未満の名前は名前じゃない").max(10, "長すぎる"),
  email: z.string().email({ message: "ただしくない" }),
  age: z.number().min(0, "生まれてない").max(200, "生きすぎ"),
});
