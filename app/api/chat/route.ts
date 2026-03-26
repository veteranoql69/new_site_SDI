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

    let data = await response.json();
    
    // Filter out potential [SYSTEM_DATA] blocks from the AI response string
    // if the n8n response contains the message in a 'output' or 'text' field
    const responseText = data.output || data.text || (typeof data === 'string' ? data : JSON.stringify(data));
    
    if (typeof responseText === 'string') {
      const cleanText = responseText.replace(/\[SYSTEM_DATA\][\s\S]*?\[\/SYSTEM_DATA\]/g, '').trim();
      
      // Update the data object with cleaned text
      if (data.output) data.output = cleanText;
      if (data.text) data.text = cleanText;
      if (typeof data === 'string') data = cleanText;
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Chat API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
