"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Calendar, Users, TrendingUp, ArrowRight } from "lucide-react";
import { useContact } from "@/components/providers/ContactProvider";

export function AgentesIAClient() {
    const { openContactModal } = useContact();
    return (
        <div className="min-h-screen pt-24 pb-12 px-4 sm:px-8 bg-black selection:bg-primary/30">

            {/* Background Hero Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/images/ai-hero.png"
                    alt="AI Neural Network Background"
                    fill
                    className="object-cover opacity-20"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-black" />
            </div>

            {/* Hero Section */}
            <section className="container mx-auto max-w-6xl mb-24 text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6">
                        Agentes de <span className="text-primary drop-shadow-[0_0_15px_rgba(0,242,234,0.5)]">IA</span>
                    </h1>
                    <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-10">
                        Automatización inteligente que entiende, conversa y ejecuta. Desde la captación de leads hasta la gestión operativa compleja.
                    </p>
                </motion.div>
            </section>

            {/* Feature Sections */}
            <section className="container mx-auto max-w-6xl space-y-32 relative z-10">

                {/* Lead Optimization */}
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="inline-flex items-center gap-2 text-primary mb-4 border border-primary/20 bg-primary/10 px-3 py-1 rounded-full text-sm">
                            <TrendingUp size={16} />
                            <span className="font-semibold">Optimización de Leads</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Convierte más con Scoring Automático</h2>
                        <p className="text-gray-400 text-lg mb-6">
                            Nuestros agentes no solo responden, califican. Identifica los prospectos más valiosos en tiempo real basándose en sus intenciones y comportamiento, priorizando tu fuerza de ventas donde realmente importa.
                        </p>
                        <ul className="space-y-3 text-gray-300">
                            <li className="flex items-center gap-3"><ArrowRight size={16} className="text-primary" /> Calificación inmediata (Lead Scoring)</li>
                            <li className="flex items-center gap-3"><ArrowRight size={16} className="text-primary" /> Seguimiento automatizado por WhatsApp</li>
                            <li className="flex items-center gap-3"><ArrowRight size={16} className="text-primary" /> Integración con tu CRM preferido</li>
                        </ul>
                    </motion.div>
                    <div className="relative h-[400px] rounded-2xl overflow-hidden border border-white/10 group">
                        <Image
                            src="/images/ai-lead-scoring.png"
                            alt="AI Lead Scoring Dashboard"
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                </div>

                {/* Chat & Scheduling */}
                <div className="grid md:grid-cols-2 gap-12 items-center md:flex-row-reverse">
                    <div className="order-2 md:order-1 relative h-[400px] rounded-2xl overflow-hidden border border-white/10 group">
                        <Image
                            src="/images/ai-chat.png"
                            alt="AI Chat Scheduling Interface"
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="order-1 md:order-2"
                    >
                        <div className="inline-flex items-center gap-2 text-secondary mb-4 border border-secondary/20 bg-secondary/10 px-3 py-1 rounded-full text-sm">
                            <Calendar size={16} />
                            <span className="font-semibold">Gestión 24/7</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Chatbots que Agendan por Ti</h2>
                        <p className="text-gray-400 text-lg mb-6">
                            Olvídate de perder citas. Nuestros agentes conversacionales (Gea Studio) atienden consultas, verifican disponibilidad y agendan reuniones directamente en tu calendario, sin intervención humana.
                        </p>
                        <ul className="space-y-3 text-gray-300">
                            <li className="flex items-center gap-3"><ArrowRight size={16} className="text-secondary" /> Atención omnicanal (Web, WhatsApp, RRSS)</li>
                            <li className="flex items-center gap-3"><ArrowRight size={16} className="text-secondary" /> Sincronización en tiempo real</li>
                            <li className="flex items-center gap-3"><ArrowRight size={16} className="text-secondary" /> Recordatorios automáticos para reducir inasistencias</li>
                        </ul>
                    </motion.div>
                </div>

                {/* Multi-Agent Systems */}
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="inline-flex items-center gap-2 text-accent mb-4 border border-accent/20 bg-accent/10 px-3 py-1 rounded-full text-sm">
                            <Users size={16} />
                            <span className="font-semibold">Sistemas Multi-Agente</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Orquestación de Tareas Complejas</h2>
                        <p className="text-gray-400 text-lg mb-6">
                            Cuando un solo bot no basta. Desplegamos enjambres de agentes especializados que colaboran para resolver flujos de trabajo intrincados, desde soporte técnico nivel 2 hasta operaciones logísticas.
                        </p>
                    </motion.div>
                    <div className="relative h-[400px] rounded-2xl overflow-hidden border border-white/10 group">
                        <Image
                            src="/images/ai-multi-agent.png"
                            alt="Multi-Agent System Visualization"
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                </div>

            </section>

            {/* CTA Section */}
            <section className="container mx-auto max-w-4xl mt-32 text-center p-12 rounded-3xl bg-gradient-to-b from-white/5 to-transparent border border-white/10">
                <h2 className="text-3xl font-bold mb-6">¿Listo para automatizar tu negocio?</h2>
                <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
                    Agenda una demo y ve a nuestros agentes en acción transformando procesos reales.
                </p>
                <button 
                    onClick={() => openContactModal({ title: "Solicitar Demo de Agentes IA", source: "Agentes IA" })}
                    className="bg-primary text-black font-bold py-3 px-8 rounded-full hover:shadow-[0_0_20px_rgba(0,242,234,0.4)] transition-shadow"
                >
                    Solicitar Demo
                </button>
            </section>

        </div>
    );
}
