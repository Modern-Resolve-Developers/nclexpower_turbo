import { z } from "zod";

export const RowSchema = z.object({
  mrsn: z
    .array(
      z.object({
        label: z.string(),
        value: z.any(),
        xvalue: z.number(),
      })
    )
    .refine(data => data.filter(item => item.value).length === 4)
});

export type MrsnValidationType = z.infer<typeof RowSchema>;
