import Link from "next/link";
import { NAV, SITE } from "@/lib/site";
import { MobileNav } from "./mobile-nav";

export function Header() {
  return (
    <header className="on-dark sticky top-0 z-50 bg-espresso text-cream">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <Link
          href="/"
          className="focus-light font-display text-xl font-semibold tracking-tight"
        >
          {SITE.short}
          <span className="text-crema"> Café</span>
        </Link>
        <nav aria-label="Primary" className="hidden items-center gap-7 md:flex">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="focus-light text-[0.95rem] hover:text-crema"
            >
              {n.label}
            </Link>
          ))}
          <Link
            href="/#contact"
            className="btn btn-primary focus-light !min-h-10 !px-5 !py-1.5"
          >
            Book a table
          </Link>
        </nav>
        <MobileNav />
      </div>
    </header>
  );
}
