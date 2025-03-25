# Telegram Bot with Next.js 15

This is a Telegram bot built with Next.js 15 that uses Next.js's built-in HTTPS support for local development.

## Prerequisites

- Node.js installed
- Telegram account
- Basic knowledge of JavaScript/TypeScript

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a new Telegram bot:
   - Open Telegram and search for "@BotFather"
   - Send `/newbot` command
   - Follow the instructions to name your bot
   - Save the API token you receive

3. Configure environment variables:
   - Copy `.env.local.example` to `.env.local`
   - Add your Telegram bot token to `TELEGRAM_BOT_TOKEN`
   - The `WEBHOOK_URL` is set to `https://localhost:3000/api/bot` by default

4. Start the development server with HTTPS enabled:
```bash
npm run dev
```
This will start the Next.js development server with HTTPS support. You may need to accept the self-signed certificate warning in your browser.

5. Set up the webhook:
```bash
npm run setup-webhook
```

## Usage

Once the bot is set up and running:

1. Find your bot on Telegram (using the username you created)
2. Start a conversation with your bot
3. The bot will echo back any message you send

## Development

The bot's logic is implemented in `src/app/api/bot/route.ts`. You can modify this file to change how the bot responds to messages.

## Environment Variables

- `TELEGRAM_BOT_TOKEN`: Your Telegram bot's API token (from BotFather)
- `WEBHOOK_URL`: The HTTPS URL for your bot's webhook (defaults to https://localhost:3000/api/bot)

## Notes

- The development server uses a self-signed certificate for HTTPS
- For production, you should deploy to a proper hosting service with valid SSL certificates
- Never commit your `.env.local` file or expose your bot token

## License

MIT
