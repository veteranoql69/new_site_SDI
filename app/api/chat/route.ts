import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { sessionId, message } = body;

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    // Use environment variable for the n8n webhook URL
    // Defaulting to a placeholder if not set
    const N8N_URL = process.env.N8N_WEBHOOK_URL;

    if (!N8N_URL) {
      console.error('N8N_WEBHOOK_URL is not defined in environment variables');
      return NextResponse.json({ error: 'Configuración de IA no disponible.' }, { status: 500 });
    }

    const response = await fetch(N8N_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sessionId: sessionId || 'default-session',
        message: message,
      }),
    }).catch(err => {
      console.error('Fetch failed to n8n:', err.message);
      return null;
    });

    if (!response) {
      return NextResponse.json({ error: 'No se pudo establecer conexión con el motor de IA.' }, { status: 503 });
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('n8n error:', errorData);
      return NextResponse.json({ 
        error: 'El flujo de n8n falló internamente.', 
        details: errorData.message || 'Workflow execution failed' 
      }, { status: 500 });
    }

    const data = await response.json();
    
    // The n8n workflow returns the AI response in the main JSON body or a nested structure
    // Based on the workflow: "AI Agent" -> "Respond to Webhook" sends the result
    return NextResponse.json(data);
  } catch (error) {
    console.error('Chat API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
