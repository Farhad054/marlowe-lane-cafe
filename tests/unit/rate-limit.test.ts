import { beforeEach, describe, expect, it } from "vitest";
import { rateLimit, resetRateLimits } from "@/lib/rate-limit";

beforeEach(resetRateLimits);

describe("rateLimit", () => {
  it("allows up to the limit then blocks with a retry-after", () => {
    for (let i = 0; i < 3; i++)
      expect(rateLimit("a", 3, 60_000, 1000).ok).toBe(true);
    const blocked = rateLimit("a", 3, 60_000, 1000);
    expect(blocked.ok).toBe(false);
    expect(blocked.retryAfter).toBe(60);
  });

  it("tracks keys independently", () => {
    rateLimit("a", 1, 60_000, 0);
    expect(rateLimit("a", 1, 60_000, 0).ok).toBe(false);
    expect(rateLimit("b", 1, 60_000, 0).ok).toBe(true);
  });

  it("resets after the window", () => {
    rateLimit("a", 1, 1000, 0);
    expect(rateLimit("a", 1, 1000, 500).ok).toBe(false);
    expect(rateLimit("a", 1, 1000, 1001).ok).toBe(true);
  });
});
