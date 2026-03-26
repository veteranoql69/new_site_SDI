"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronRight } from "lucide-react";
import Image from "next/image";

import { useContact } from "@/components/providers/ContactProvider";

const navLinks = [
    { name: "Agentes de IA", href: "/soluciones/agentes-ia" },
    { name: "IoT Industrial", href: "/soluciones/iot-industrial" },
    { name: "Edge Computing", href: "/soluciones/edge-computing" },
];

export function Navbar() {
    const { openContactModal } = useContact();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                    ? "bg-black/80 backdrop-blur-xl border-b border-white/10 py-4"
                    : "bg-transparent py-6"
                    }`}
            >
                <div className="container mx-auto px-6 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="relative w-10 h-10">
                            <Image
                                src="/logo.png"
                                alt="SDI Logo"
                                fill
                                className="object-contain filter brightness-0 invert group-hover:drop-shadow-[0_0_8px_rgba(0,242,234,0.8)] transition-all"
                            />
                        </div>
                        <span className="text-xl font-bold tracking-tight text-white group-hover:text-primary transition-colors">
                            SDI <span className="text-primary">Tecnología</span>
                        </span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="text-sm font-medium text-gray-300 hover:text-primary transition-colors hover:drop-shadow-[0_0_5px_rgba(0,242,234,0.5)]"
                            >
                                {link.name}
                            </Link>
                        ))}
                        <button
                            onClick={openContactModal}
                            className="bg-white/10 hover:bg-white/20 text-white px-5 py-2 rounded-full text-sm font-semibold transition-all border border-white/10 hover:border-primary/50"
                        >
                            Contacto
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden text-white hover:text-primary transition-colors"
                        onClick={() => setIsMobileMenuOpen(true)}
                    >
                        <Menu size={28} />
                    </button>
                </div>
            </motion.nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: "100%" }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-3xl md:hidden flex flex-col"
                    >
                        <div className="p-6 flex justify-end">
                            <button
                                className="text-white hover:text-primary transition-colors"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                <X size={32} />
                            </button>
                        </div>
                        <div className="flex-1 flex flex-col items-center justify-center gap-8 p-8">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="text-2xl font-bold text-white hover:text-primary transition-colors flex items-center gap-2"
                                >
                                    {link.name} <ChevronRight size={20} className="text-primary" />
                                </Link>
                            ))}
                            <div className="w-full h-px bg-white/10 my-4" />
                            <Link
                                href="https://wa.me/56912345678"
                                target="_blank"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="bg-primary text-black px-8 py-3 rounded-full text-lg font-bold hover:shadow-[0_0_20px_rgba(0,242,234,0.4)] transition-shadow w-full max-w-xs text-center"
                            >
                                Solicitar Demo
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
