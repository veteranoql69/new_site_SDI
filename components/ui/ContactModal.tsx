"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, CheckCircle2, AlertCircle, Building2, User, Mail, MessageSquare } from "lucide-react";

interface ContactModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    source?: string;
}

export function ContactModal({ isOpen, onClose, title, source }: ContactModalProps) {
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        company: "",
        message: "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...formData,
                    source: source || "General Website"
                }),
            });

            if (response.ok) {
                setStatus("success");
                setFormData({ name: "", email: "", company: "", message: "" });
                setTimeout(() => {
                    onClose();
                    setStatus("idle");
                }, 3000);
            } else {
                setStatus("error");
            }
        } catch (error) {
            setStatus("error");
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-md"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="fixed left-1/2 top-1/2 z-[101] w-full max-w-lg -translate-x-1/2 -translate-y-1/2 p-4"
                    >
                        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-black/40 p-8 shadow-2xl backdrop-blur-2xl">
                            {/* Decorative Glow */}
                            <div className="absolute -left-20 -top-20 h-40 w-40 rounded-full bg-primary/20 blur-3xl" />
                            <div className="absolute -right-20 -bottom-20 h-40 w-40 rounded-full bg-secondary/20 blur-3xl" />

                            <button
                                onClick={onClose}
                                className="absolute right-6 top-6 text-gray-400 hover:text-white transition-colors"
                            >
                                <X size={24} />
                            </button>

                            <div className="relative z-10">
                                <h2 className="text-3xl font-bold text-white mb-2">{title || "Hablemos"}</h2>
                                <p className="text-gray-400 mb-8">Cuéntanos sobre tu proyecto y cómo podemos impulsarlo con IA.</p>

                                {status === "success" ? (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.5 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="flex flex-col items-center justify-center py-12 text-center"
                                    >
                                        <div className="mb-4 rounded-full bg-primary/20 p-4">
                                            <CheckCircle2 size={48} className="text-primary" />
                                        </div>
                                        <h3 className="text-xl font-bold text-white mb-2">Mensaje Enviado</h3>
                                        <p className="text-gray-400">Gracias por contactarnos. Te responderemos muy pronto.</p>
                                    </motion.div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                                                    <User size={14} className="text-primary" /> Nombre
                                                </label>
                                                <input
                                                    required
                                                    type="text"
                                                    value={formData.name}
                                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                    className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-white focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/50"
                                                    placeholder="Tu nombre"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                                                    <Mail size={14} className="text-primary" /> Email
                                                </label>
                                                <input
                                                    required
                                                    type="email"
                                                    value={formData.email}
                                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                    className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-white focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/50"
                                                    placeholder="nombre@empresa.com"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                                                <Building2 size={14} className="text-primary" /> Empresa (Opcional)
                                            </label>
                                            <input
                                                type="text"
                                                value={formData.company}
                                                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                                className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-white focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/50"
                                                placeholder="Nombre de tu empresa"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                                                <MessageSquare size={14} className="text-primary" /> Mensaje
                                            </label>
                                            <textarea
                                                required
                                                rows={4}
                                                value={formData.message}
                                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                                className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-white focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/50 resize-none"
                                                placeholder="¿Cómo podemos ayudarte?"
                                            />
                                        </div>

                                        {status === "error" && (
                                            <div className="flex items-center gap-2 text-sm text-red-400 bg-red-400/10 p-3 rounded-xl border border-red-400/20">
                                                <AlertCircle size={16} />
                                                Hubo un error al enviar. Por favor intenta de nuevo.
                                            </div>
                                        )}

                                        <button
                                            disabled={status === "loading"}
                                            type="submit"
                                            className="group relative w-full overflow-hidden rounded-xl bg-primary px-8 py-4 font-bold text-black transition-all hover:shadow-[0_0_20px_rgba(0,242,234,0.4)] disabled:opacity-50"
                                        >
                                            <span className="relative z-10 flex items-center justify-center gap-2">
                                                {status === "loading" ? "Enviando..." : "Enviar Mensaje"}
                                                {status !== "loading" && <Send size={18} className="group-hover:translate-x-1 transition-transform" />}
                                            </span>
                                        </button>
                                    </form>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
