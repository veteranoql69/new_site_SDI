"use client";

import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { ChatButton } from "@/components/ui/ChatButton";

// El proceso va primero. IoT y Edge se quedan en el menú; los agentes de IA son
// una pieza más y se llega a ellos desde Capacidades y el pie.
const navLinks = [
  { name: "Cómo trabajamos", href: "/#como-trabajamos" },
  { name: "IoT industrial", href: "/soluciones/iot-industrial", section: "/soluciones/iot-industrial" },
  { name: "Edge y visión", href: "/soluciones/edge-computing", section: "/soluciones/edge-computing" },
  { name: "Contacto", href: "/#contacto" },
];

export function Navbar() {
  const pathname = usePathname();
  // El menú queda abierto solo en la ruta donde se abrió: al navegar se cierra solo.
  const [openOn, setOpenOn] = useState<string | null>(null);
  const menuOpen = openOn === pathname;
  const setMenuOpen = (open: boolean | ((prev: boolean) => boolean)) =>
    setOpenOn((prev) => {
      const next = typeof open === "function" ? open(prev === pathname) : open;
      return next ? pathname : null;
    });

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpenOn(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-40 border-b border-grid bg-paper/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-[1240px] items-center justify-between gap-6 px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5" aria-label="SDI Tecnología, inicio">
          <Image src="/logo_oficial.png" alt="" width={36} height={30} priority style={{ height: 30, width: "auto" }} />
          <span className="font-display text-lg font-bold tracking-[-0.02em] text-ink">SDI Tecnología</span>
        </Link>

        <nav aria-label="Principal" className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => {
            const active = Boolean(link.section && pathname.startsWith(link.section));
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`rounded-[3px] px-3 py-2 text-[0.92rem] font-medium transition-colors ${
                  active ? "bg-sdi-wash text-sdi-strong" : "text-ink-soft hover:bg-band hover:text-ink"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <ChatButton section="Navbar" className="!px-4 !py-2 max-sm:!hidden" />
          <button
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-[3px] text-ink hover:bg-band lg:hidden"
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={menuOpen}
            aria-controls="menu-movil"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={22} aria-hidden /> : <Menu size={22} aria-hidden />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav id="menu-movil" aria-label="Principal" className="border-t border-grid bg-paper lg:hidden">
          <ul className="mx-auto max-w-[1240px] px-4 py-2 sm:px-6">
            {navLinks.map((link) => (
              <li key={link.href} className="border-b border-grid last:border-b-0">
                <Link href={link.href} className="block py-3.5 text-base font-medium text-ink">
                  {link.name}
                </Link>
              </li>
            ))}
            <li className="py-3 sm:hidden">
              <ChatButton section="Menú móvil" className="w-full" />
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
