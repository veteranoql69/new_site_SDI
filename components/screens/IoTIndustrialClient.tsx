"use client";

import { motion } from "framer-motion";
import { Truck, Activity, Box, ArrowRight } from "lucide-react";
import Image from "next/image";
import { useContact } from "@/components/providers/ContactProvider";

export function IoTIndustrialClient() {
    const { openContactModal } = useContact();
    return (
        <div className="min-h-screen pt-24 pb-12 px-4 sm:px-8 bg-black selection:bg-primary/30 relative overflow-hidden">

            {/* Background Hero Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/images/iot-hero.png"
                    alt="IoT Network Background"
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
                        IoT <span className="text-primary drop-shadow-[0_0_15px_rgba(0,242,234,0.5)]">Industrial</span>
                    </h1>
                    <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-10">
                        Conectamos el mundo físico con el digital. Monitoreo en tiempo real, gemelos digitales y optimización logística impulsada por datos.
                    </p>
                </motion.div>
            </section>

            {/* Feature Sections */}
            <section className="container mx-auto max-w-6xl space-y-32 relative z-10">

                {/* Logistics Tracking */}
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="inline-flex items-center gap-2 text-primary mb-4 border border-primary/20 bg-primary/10 px-3 py-1 rounded-full text-sm">
                            <Truck size={16} />
                            <span className="font-semibold">Logística Inteligente</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Control Total de la Cadena de Suministro</h2>
                        <p className="text-gray-400 text-lg mb-6">
                            Visualiza cada activo en movimiento. Nuestra plataforma integra GPS y sensores IoT para darte una visión holística de tu flota y carga, permitiendo decisiones proactivas ante imprevistos.
                        </p>
                        <ul className="space-y-3 text-gray-300">
                            <li className="flex items-center gap-3"><ArrowRight size={16} className="text-primary" /> Tracking en tiempo real</li>
                            <li className="flex items-center gap-3"><ArrowRight size={16} className="text-primary" /> Alertas preventivas y predictivas</li>
                            <li className="flex items-center gap-3"><ArrowRight size={16} className="text-primary" /> Optimización de rutas dinámica</li>
                        </ul>
                    </motion.div>
                    <div className="relative h-[400px] rounded-2xl overflow-hidden border border-white/10 group">
                        <Image
                            src="/images/iot-logistics.png"
                            alt="Logistics Digital Twin Interface"
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                </div>

                {/* Sensors & Monitoring */}
                <div className="grid md:grid-cols-2 gap-12 items-center md:flex-row-reverse">
                    <div className="order-2 md:order-1 relative h-[400px] rounded-2xl overflow-hidden border border-white/10 group">
                        <Image
                            src="/images/iot-sensors.png"
                            alt="Industrial Smart Sensor"
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
                            <Activity size={16} />
                            <span className="font-semibold">Sensores Avanzados</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Captura Cada Pulso de tu Operación</h2>
                        <p className="text-gray-400 text-lg mb-6">
                            Desde temperatura hasta vibración. Desplegamos redes de sensores robustas que alimentan tus sistemas con datos precisos, permitiendo mantenimiento predictivo y asegurando la calidad.
                        </p>
                        <ul className="space-y-3 text-gray-300">
                            <li className="flex items-center gap-3"><ArrowRight size={16} className="text-secondary" /> Telemetría industrial de alta frecuencia</li>
                            <li className="flex items-center gap-3"><ArrowRight size={16} className="text-secondary" /> Protocolos seguros (MQTT, CoAP)</li>
                            <li className="flex items-center gap-3"><ArrowRight size={16} className="text-secondary" /> Edge processing para alertas inmediatas</li>
                        </ul>
                    </motion.div>
                </div>

                {/* Digital Twins */}
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="inline-flex items-center gap-2 text-accent mb-4 border border-accent/20 bg-accent/10 px-3 py-1 rounded-full text-sm">
                            <Box size={16} />
                            <span className="font-semibold">Gemelos Digitales</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Simula, Predice, Optimiza</h2>
                        <p className="text-gray-400 text-lg mb-6">
                            Crea réplicas virtuales vivas de tus activos físicos. Utiliza la IA para simular escenarios, prever fallos y optimizar el rendimiento sin arriesgar la operación real.
                        </p>
                    </motion.div>
                    <div className="relative h-[400px] rounded-2xl overflow-hidden border border-white/10 group">
                        <Image
                            src="/images/iot-digital-twin.png"
                            alt="Digital Twin 3D Visualization"
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="bg-black/60 backdrop-blur-sm px-4 py-2 rounded-full border border-accent/30 text-accent text-sm font-mono opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-4 group-hover:translate-y-0 duration-300">
                                SISTEMA ACTIVO
                            </div>
                        </div>
                    </div>
                </div>

            </section>

            {/* CTA Section */}
            <section className="container mx-auto max-w-4xl mt-32 text-center p-12 rounded-3xl bg-gradient-to-b from-white/5 to-transparent border border-white/10 relative z-10">
                <h2 className="text-3xl font-bold mb-6">Conecta tu industria al futuro</h2>
                <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
                    Descubre cómo el IoT puede desbloquear eficiencias ocultas en tu operación.
                </p>
                <button 
                    onClick={() => openContactModal({ title: "Consultar Solución IoT Industrial", source: "IoT Industrial" })}
                    className="bg-primary text-black font-bold py-3 px-8 rounded-full hover:shadow-[0_0_20px_rgba(0,242,234,0.4)] transition-shadow"
                >
                    Consultar Solución
                </button>
            </section>

        </div>
    );
}
