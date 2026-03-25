"use client";

import { Bot, Cpu, Network } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';

const solutions = [
    {
        title: "Agentes de IA",
        description: "Desde chatbots de atención al cliente hasta sistemas multi-agente complejos capaces de ejecutar tareas autónomas.",
        icon: Bot,
        href: "/soluciones/agentes-ia"
    },
    {
        title: "IoT Industrial",
        description: "Conectamos sensores y maquinaria para capturar datos en tiempo real, optimizando procesos productivos.",
        icon: Network,
        href: "/soluciones/iot-industrial"
    },
    {
        title: "Edge Computing",
        description: "Procesamiento de IA en el borde (on-premise) para latencia cero y máxima privacidad de datos.",
        icon: Cpu,
        href: "/soluciones/edge-computing"
    },
];

export function SolutionsSection() {
    return (
        <section id="soluciones" className="relative w-full py-24">
            <div className="container mx-auto px-4">
                <div className="mb-16 text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-white sm:text-5xl">
                        Soluciones <span className="text-primary">Inteligentes</span>
                    </h2>
                    <p className="mt-4 text-lg text-gray-400">
                        Tecnología de vanguardia adaptada a tu industria.
                    </p>
                </div>

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {solutions.map((solution, index) => (
                        <GlassCard
                            key={index}
                            index={index}
                            {...solution}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
