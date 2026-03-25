"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

interface GlassCardProps {
    title: string;
    description: string;
    icon: LucideIcon;
    className?: string;
    index?: number;
    href?: string;
}

export function GlassCard({ title, description, icon: Icon, className, index = 0, href }: GlassCardProps) {
    const CardContent = (
        <div className="relative z-10 flex h-full flex-col justify-between">
            <div>
                <div className="mb-4 inline-flex items-center justify-center rounded-lg bg-surface-light/10 p-3 text-primary ring-1 ring-white/10 backdrop-blur-md transition-colors group-hover:bg-primary/20 group-hover:text-white">
                    <Icon size={24} />
                </div>
                <h3 className="mb-2 text-xl font-bold text-white transition-colors group-hover:text-primary">
                    {title}
                </h3>
                <p className="text-sm leading-relaxed text-gray-400">
                    {description}
                </p>
            </div>
            <div className="mt-4 flex items-center text-sm font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                Saber más <span className="ml-2">→</span>
            </div>
        </div>
    );

    const containerClasses = twMerge(
        "group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-lg transition-all duration-300 hover:border-primary/50 hover:bg-white/10 hover:shadow-[0_0_30px_rgba(0,242,234,0.1)]",
        className
    );

    const MotionComponent = motion.div;

    if (href) {
        return (
            <MotionComponent
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className={containerClasses}
            >
                <Link href={href} className="block h-full">
                    {CardContent}
                </Link>
            </MotionComponent>
        );
    }

    return (
        <MotionComponent
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -5 }}
            className={containerClasses}
        >
            {CardContent}
        </MotionComponent>
    );
}
