"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useContact } from "@/components/providers/ContactProvider";

export function Hero() {
    const { openContactModal } = useContact();
    return (
        <div className="relative z-10 flex flex-col items-center gap-8">
            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                    duration: 0.8,
                    ease: [0, 0.71, 0.2, 1.01],
                    scale: {
                        type: "spring",
                        damping: 5,
                        stiffness: 100,
                        restDelta: 0.001
                    }
                }}
                className="relative w-64 h-32 sm:w-80 sm:h-40"
            >
                <Image
                    src="/logo.png"
                    alt="SDI Tecnología Logo"
                    fill
                    className="object-contain drop-shadow-[0_0_25px_rgba(0,242,234,0.3)] mix-blend-screen"
                    priority
                />
            </motion.div>

            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="max-w-2xl text-lg text-gray-400 sm:text-xl"
            >
                Líderes en implementación de <span className="text-secondary font-semibold">Inteligencia Artificial</span>,
                IoT y Edge Computing.
            </motion.p>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="flex gap-4 flex-col sm:flex-row"
            >
                <Link
                    href="/#soluciones"
                    className="rounded-full bg-primary px-8 py-3 font-semibold text-black transition hover:shadow-[0_0_20px_rgba(0,242,234,0.4)] hover:scale-105 active:scale-95 cursor-pointer text-center"
                >
                    Explorar Soluciones
                </Link>
                <button
                    onClick={() => openContactModal({ title: "Contáctanos", source: "Hero" })}
                    className="rounded-full border border-gray-700 bg-card px-8 py-3 font-semibold text-white transition hover:border-primary hover:bg-white/5 hover:scale-105 active:scale-95 cursor-pointer text-center"
                >
                    Contáctanos
                </button>
            </motion.div>
        </div>
    );
}
