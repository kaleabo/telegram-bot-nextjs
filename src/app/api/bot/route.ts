import { NextResponse } from 'next/server';

interface TelegramUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
}

interface TelegramMessage {
  message_id: number;
  from: TelegramUser;
  chat: {
    id: number;
    type: string;
  };
  date: number;
  text?: string;
}

type CommandHandler = (message: TelegramMessage) => string;

// Command handlers
const commands: Record<string, CommandHandler> = {
  '/start': (message) => 
    `Welcome ${message.from.first_name}! 👋\nI'm your bot assistant. Here are my commands:\n` +
    `/start - Show this welcome message\n` +
    `/help - Show available commands\n` +
    `/time - Show current time\n` +
    `Or just send me any message and I'll echo it back!`,
  
  '/help': () => 
    `Available commands:\n` +
    `/start - Start the bot\n` +
    `/help - Show this help message\n` +
    `/time - Show current time`,
  
  '/time': () => {
    const now = new Date();
    return `Current time is: ${now.toLocaleString()}`;
  }
};

export async function POST(req: Request) {
  const body = await req.json();
  const { message }: { message: TelegramMessage } = body;
  
  console.log('Received message:', message);
  
  if (message?.text) {
    const chatId = message.chat.id;
    let responseText = '';

    // Check if the message is a command
    if (message.text.startsWith('/')) {
      const command = message.text.split(' ')[0]; // Get the command part
      const handler = commands[command];
      responseText = handler ? handler(message) : 'Unknown command. Try /help for available commands.';
    } else {
      // Echo back non-command messages
      responseText = `You said: ${message.text}`;
    }
    
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
          text: responseText,
          parse_mode: 'HTML', // Enable HTML formatting
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