"use client";

import Link from "next/link";
import { useEffect, useId, useState } from "react";
import { NAV } from "@/lib/site";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const id = useId();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        className="focus-light flex h-11 w-11 items-center justify-center rounded-full border border-cream/40"
        aria-expanded={open}
        aria-controls={id}
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((o) => !o)}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          aria-hidden="true"
        >
          {open ? (
            <path d="M4 4l12 12M16 4L4 16" />
          ) : (
            <path d="M3 6h14M3 10h14M3 14h14" />
          )}
        </svg>
      </button>
      <nav
        id={id}
        aria-label="Mobile"
        hidden={!open}
        className="absolute inset-x-0 top-16 border-t border-cream/15 bg-espresso px-5 pb-6 pt-2 shadow-xl"
      >
        <ul className="flex flex-col">
          {NAV.map((n) => (
            <li key={n.href}>
              <Link
                href={n.href}
                onClick={() => setOpen(false)}
                className="focus-light block border-b border-cream/10 py-3.5 text-lg"
              >
                {n.label}
              </Link>
            </li>
          ))}
        </ul>
        <Link
          href="/#contact"
          onClick={() => setOpen(false)}
          className="btn btn-primary focus-light mt-5 w-full"
        >
          Book a table
        </Link>
      </nav>
    </div>
  );
}
