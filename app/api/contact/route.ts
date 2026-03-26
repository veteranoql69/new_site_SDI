import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const webhookUrl = process.env.CONTACT_FORM_WEBHOOK_URL;

        if (!webhookUrl) {
            console.error("CONTACT_FORM_WEBHOOK_URL is not defined");
            return NextResponse.json({ error: "Configuration error" }, { status: 500 });
        }

        const response = await fetch(webhookUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                ...body,
                submittedAt: new Date().toISOString(),
                source: "Website Contact Form"
            }),
        });

        if (!response.ok) {
            throw new Error(`n8n responded with ${response.status}`);
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Contact API Error:", error);
        return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
    }
}
