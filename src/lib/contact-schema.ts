import { z } from "zod";

export const TOPICS = [
  "Table reservation",
  "Private event",
  "General question",
] as const;

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your name.")
    .max(80, "Name is too long."),
  email: z.string().trim().email("Enter a valid email address.").max(120),
  phone: z
    .string()
    .trim()
    .max(30)
    .regex(/^[0-9+()\-\s.]*$/, "Phone can only contain digits and + ( ) - .")
    .optional()
    .or(z.literal("")),
  topic: z.enum(TOPICS, { message: "Choose a topic." }),
  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Choose a valid date.")
    .optional()
    .or(z.literal("")),
  guests: z.preprocess(
    (v) => (v === "" || v === null ? undefined : v),
    z.coerce
      .number()
      .int()
      .min(1, "At least 1 guest.")
      .max(40, "For more than 40 guests, choose Private event.")
      .optional(),
  ),
  message: z
    .string()
    .trim()
    .min(10, "Tell us a little more (10+ characters).")
    .max(1500, "Message is too long."),
  // Honeypot: real users never see or fill this field.
  website: z.string().max(0).optional().or(z.literal("")),
});

export type ContactInput = z.infer<typeof contactSchema>;

export type FieldErrors = Partial<Record<keyof ContactInput, string>>;

export function fieldErrors(error: z.ZodError): FieldErrors {
  const out: FieldErrors = {};
  for (const issue of error.issues) {
    const key = issue.path[0] as keyof ContactInput | undefined;
    if (key && !out[key]) out[key] = issue.message;
  }
  return out;
}
