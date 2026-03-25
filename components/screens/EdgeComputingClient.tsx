"use client";

import { motion } from "framer-motion";
import { Eye, Server, Zap, ArrowRight } from "lucide-react";
import Image from "next/image";

export function EdgeComputingClient() {
    return (
        <div className="min-h-screen pt-24 pb-12 px-4 sm:px-8 bg-black selection:bg-primary/30 relative overflow-hidden">

            {/* Background Hero Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/images/edge-hero.png"
                    alt="Edge Computing City Background"
                    fill
                    className="object-cover opacity-30"
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
                        Edge <span className="text-primary drop-shadow-[0_0_15px_rgba(0,242,234,0.5)]">Computing</span>
                    </h1>
                    <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-10">
                        Inteligencia Artificial donde ocurren los datos. Latencia cero, máxima privacidad y procesamiento crítico sin depender de la nube.
                    </p>
                </motion.div>
            </section>

            {/* Feature Sections */}
            <section className="container mx-auto max-w-6xl space-y-32 relative z-10">

                {/* Traffic Engineering */}
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="inline-flex items-center gap-2 text-primary mb-4 border border-primary/20 bg-primary/10 px-3 py-1 rounded-full text-sm">
                            <Eye size={16} />
                            <span className="font-semibold">Ingeniería de Tránsito</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Visión Artificial Urbana</h2>
                        <p className="text-gray-400 text-lg mb-6">
                            Transformamos cámaras existentes en sensores inteligentes. Realizamos conteo vehicular, clasificación, cálculo de matrices Origen-Destino y detección de patentes (LPR) en tiempo real.
                        </p>
                        <ul className="space-y-3 text-gray-300">
                            <li className="flex items-center gap-3"><ArrowRight size={16} className="text-primary" /> Conteo y clasificación vehicular (Decreto 30)</li>
                            <li className="flex items-center gap-3"><ArrowRight size={16} className="text-primary" /> LPR de alta precisión</li>
                            <li className="flex items-center gap-3"><ArrowRight size={16} className="text-primary" /> Análisis de flujo y congestión</li>
                        </ul>
                    </motion.div>
                    <div className="relative h-[400px] rounded-2xl overflow-hidden border border-white/10 group">
                        <Image
                            src="/images/edge-traffic.png"
                            alt="Traffic Engineering Computer Vision"
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        {/* Overlay UI Mockup */}
                        <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-md p-4 rounded-xl border border-primary/30">
                            <div className="flex justify-between items-center bg-transparent">
                                <div>
                                    <p className="text-xs text-primary font-mono">DETECTED OBJECTS</p>
                                    <p className="text-xl font-bold text-white">24 VEH / MIN</p>
                                </div>
                                <div className="h-2 w-24 bg-gray-700 rounded-full overflow-hidden">
                                    <div className="h-full bg-primary w-[70%] animate-pulse" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Local Inference / Privacy */}
                <div className="grid md:grid-cols-2 gap-12 items-center md:flex-row-reverse">
                    <div className="order-2 md:order-1 relative h-[400px] rounded-2xl overflow-hidden border border-white/10 group">
                        <Image
                            src="/images/edge-inference.png"
                            alt="Local Inference Server"
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
                            <Server size={16} />
                            <span className="font-semibold">Procesamiento On-Premise</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Potencia Local, Privacidad Total</h2>
                        <p className="text-gray-400 text-lg mb-6">
                            Ejecutamos modelos de lenguaje (DeepSeek, Llama) y redes neuronales directamente en tu infraestructura. Tus datos nunca salen de tu red, garantizando cumplimiento normativo y seguridad absoluta.
                        </p>
                        <ul className="space-y-3 text-gray-300">
                            <li className="flex items-center gap-3"><ArrowRight size={16} className="text-secondary" /> Servidores de inferencia dedicados</li>
                            <li className="flex items-center gap-3"><ArrowRight size={16} className="text-secondary" /> Sin costos recurrentes de API en la nube</li>
                            <li className="flex items-center gap-3"><ArrowRight size={16} className="text-secondary" /> Operación continua offline</li>
                        </ul>
                    </motion.div>
                </div>

                {/* Use Cases / Speed */}
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="inline-flex items-center gap-2 text-accent mb-4 border border-accent/20 bg-accent/10 px-3 py-1 rounded-full text-sm">
                            <Zap size={16} />
                            <span className="font-semibold">Baja Latencia</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Respuestas en Milisegundos</h2>
                        <p className="text-gray-400 text-lg mb-6">
                            Para aplicaciones críticas donde cada milisegundo cuenta. Control de calidad en líneas de producción, seguridad perimetral reactiva y sistemas autónomos que requieren decisiones instantáneas.
                        </p>
                    </motion.div>
                    <div className="relative h-[400px] rounded-2xl overflow-hidden border border-white/10 group">
                        <Image
                            src="/images/edge-low-latency.png"
                            alt="High Speed Low Latency Data"
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                </div>

            </section>

            {/* CTA Section */}
            <section className="container mx-auto max-w-4xl mt-32 text-center p-12 rounded-3xl bg-gradient-to-b from-white/5 to-transparent border border-white/10 relative z-10">
                <h2 className="text-3xl font-bold mb-6">Despliega IA en tu infraestructura</h2>
                <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
                    Evaluamos tu hardware existente o diseñamos la solución de borde perfecta para tus necesidades.
                </p>
                <button className="bg-primary text-black font-bold py-3 px-8 rounded-full hover:shadow-[0_0_20px_rgba(0,242,234,0.4)] transition-shadow">
                    Contactar Ingeniero
                </button>
            </section>

        </div>
    );
}
