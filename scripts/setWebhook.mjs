import axios from 'axios';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables from .env.local
dotenv.config({ path: resolve(__dirname, '../.env.local') });

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const VERCEL_URL = process.env.VERCEL_URL || 'your-project.vercel.app'; // Replace with your Vercel URL after first deployment

async function setWebhook() {
  if (!TELEGRAM_BOT_TOKEN) {
    console.error('Error: TELEGRAM_BOT_TOKEN is not set in .env.local');
    process.exit(1);
  }

  try {
    const webhookUrl = `https://${VERCEL_URL}/api/bot`;
    console.log(`Setting webhook to: ${webhookUrl}`);
    
    const response = await axios.get(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/setWebhook?url=${webhookUrl}`
    );
    
    console.log('Webhook set successfully:', response.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error setting webhook:', error.response?.data || error.message);
    } else {
      console.error('Error setting webhook:', error);
    }
    process.exit(1);
  }
}

setWebhook(); 