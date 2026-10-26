import { describe, expect, it } from "vitest";
import { contactSchema, fieldErrors } from "@/lib/contact-schema";

const valid = {
  name: "Ada Lovelace",
  email: "ada@example.com",
  topic: "Table reservation",
  message: "A table for four on Saturday, please.",
};

describe("contactSchema", () => {
  it("accepts a minimal valid inquiry", () => {
    expect(contactSchema.safeParse(valid).success).toBe(true);
  });

  it("accepts optional fields as empty strings (as a form sends them)", () => {
    expect(
      contactSchema.safeParse({ ...valid, phone: "", date: "", website: "" })
        .success,
    ).toBe(true);
  });

  it("treats an empty guests field as not provided", () => {
    const r = contactSchema.safeParse({ ...valid, guests: "" });
    expect(r.success).toBe(true);
    if (r.success) expect(r.data.guests).toBeUndefined();
  });

  it("coerces guests from a string and enforces bounds", () => {
    expect(contactSchema.parse({ ...valid, guests: "4" }).guests).toBe(4);
    expect(contactSchema.safeParse({ ...valid, guests: "0" }).success).toBe(
      false,
    );
    expect(contactSchema.safeParse({ ...valid, guests: "41" }).success).toBe(
      false,
    );
  });

  it("rejects bad email, short message, unknown topic and bad phone", () => {
    const r = contactSchema.safeParse({
      ...valid,
      email: "nope",
      message: "short",
      topic: "Spam",
      phone: "abc",
    });
    expect(r.success).toBe(false);
    if (!r.success)
      expect(Object.keys(fieldErrors(r.error)).sort()).toEqual([
        "email",
        "message",
        "phone",
        "topic",
      ]);
  });

  it("rejects a filled honeypot", () => {
    expect(
      contactSchema.safeParse({ ...valid, website: "http://spam" }).success,
    ).toBe(false);
  });
});
