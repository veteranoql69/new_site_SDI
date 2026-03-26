"use client";

import Link from "next/link";
import { Github, Twitter, Linkedin, Mail } from "lucide-react";
import { useContact } from "@/components/providers/ContactProvider";

export function Footer() {
    const { openContactModal } = useContact();
    return (
        <footer className="w-full border-t border-white/10 bg-black/40 backdrop-blur-lg mt-20">
            <div className="container mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    {/* Brand Section */}
                    <div className="col-span-1 md:col-span-1">
                        <Link href="/" className="text-xl font-bold tracking-tight text-white mb-4 block">
                            SDI <span className="text-primary">Tecnología</span>
                        </Link>
                        <p className="text-gray-400 text-sm">
                            Innovación en Inteligencia Artificial, IoT y Edge Computing para la industria moderna.
                        </p>
                    </div>

                    {/* Links Section */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">Soluciones</h3>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li><Link href="/soluciones/agentes-ia" className="hover:text-primary transition-colors">Agentes de IA</Link></li>
                            <li><Link href="/soluciones/iot-industrial" className="hover:text-primary transition-colors">IoT Industrial</Link></li>
                            <li><Link href="/soluciones/edge-computing" className="hover:text-primary transition-colors">Edge Computing</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-white font-semibold mb-4">Compañía</h3>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li><Link href="/#" className="hover:text-primary transition-colors">Nosotros</Link></li>
                            <li><Link href="/#" className="hover:text-primary transition-colors">Blog</Link></li>
                            <li><button onClick={() => openContactModal({ title: "Contacto", source: "Footer Link" })} className="hover:text-primary transition-colors">Contacto</button></li>
                        </ul>
                    </div>

                    {/* Social Section */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">Síguenos</h3>
                        <div className="flex gap-4">
                            <a href="#" className="text-gray-400 hover:text-primary transition-colors"><Github size={20} /></a>
                            <a href="#" className="text-gray-400 hover:text-primary transition-colors"><Twitter size={20} /></a>
                            <a href="#" className="text-gray-400 hover:text-primary transition-colors"><Linkedin size={20} /></a>
                            <button onClick={() => openContactModal({ title: "Envíanos un mail", source: "Footer Icon" })} className="text-gray-400 hover:text-primary transition-colors"><Mail size={20} /></button>
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-gray-600">
                        © 2026 SDI Tecnología. Todos los derechos reservados.
                    </p>
                    <div className="flex gap-6 text-sm text-gray-600">
                        <Link href="#" className="hover:text-primary transition-colors">Privacidad</Link>
                        <Link href="#" className="hover:text-primary transition-colors">Términos</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
