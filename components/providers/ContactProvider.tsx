"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { ContactModal } from "@/components/ui/ContactModal";

interface ContactMetadata {
    title?: string;
    source?: string;
}

interface ContactContextType {
    openContactModal: (metadata?: ContactMetadata) => void;
    closeContactModal: () => void;
}

const ContactContext = createContext<ContactContextType | undefined>(undefined);

export function ContactProvider({ children }: { children: ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);
    const [metadata, setMetadata] = useState<ContactMetadata | undefined>(undefined);

    const openContactModal = (meta?: ContactMetadata) => {
        setMetadata(meta);
        setIsOpen(true);
    };
    const closeContactModal = () => {
        setIsOpen(false);
        setMetadata(undefined);
    };

    return (
        <ContactContext.Provider value={{ openContactModal, closeContactModal }}>
            {children}
            <ContactModal 
                isOpen={isOpen} 
                onClose={closeContactModal} 
                title={metadata?.title}
                source={metadata?.source}
            />
        </ContactContext.Provider>
    );
}

export function useContact() {
    const context = useContext(ContactContext);
    if (context === undefined) {
        throw new Error("useContact must be used within a ContactProvider");
    }
    return context;
}
