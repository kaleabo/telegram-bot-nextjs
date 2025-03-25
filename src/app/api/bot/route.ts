import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body = await req.json();
  const { message } = body;
  
  console.log('Received message:', message);
  
  if (message?.text) {
    const chatId = message.chat.id;
    const text = `You said: ${message.text}`;
    
    try {
      const botToken = process.env.TELEGRAM_BOT_TOKEN;
      if (!botToken) {
        throw new Error('TELEGRAM_BOT_TOKEN is not configured');
      }

      await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: text,
        }),
      });
      
      return NextResponse.json({ status: 'ok' });
    } catch (error) {
      console.error('Error sending message:', error);
      return NextResponse.json(
        { error: 'Failed to send message' }, 
        { status: 500 }
      );
    }
  } else {
    return NextResponse.json({ status: 'no text received' });
  }
} 