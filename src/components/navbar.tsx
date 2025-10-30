"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Inicio" },
  { href: "/01-componentes", label: "Componentes" },
  { href: "/02-use-state", label: "useState" },
  { href: "/03-use-effect", label: "useEffect" },
  { href: "/04-pokemon", label: "Pokemon" },
  { href: "/05-server-client", label: "Server/Client" },
  { href: "/06-server-action", label: "Server Action" },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 z-10 w-full bg-blue-600 shadow-lg">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="shrink-0">
            <h1 className="text-xl font-bold text-white">React + Next.js</h1>
          </div>

          <ul className="scrollbar-hide flex gap-x-4 overflow-x-auto px-4 font-mono text-sm text-white">
            {links.map((link) => (
              <Link key={link.href} href={link.href}>
                {link.label}
              </Link>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
