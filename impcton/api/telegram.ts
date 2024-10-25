// api/telegram.ts
import { NextApiRequest, NextApiResponse } from 'next';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    // Verify if the request is coming from Telegram
    if (req.method === 'POST') {
        const { message } = req.body;
        const chatId = message.chat.id;
        const responseMessage = 'Hello from your Telegram Clicker Game!'; // Modify based on your game's logic

        // Send a response back to the user
        await fetch(`https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: chatId,
                text: responseMessage,
            }),
        });

        res.status(200).json({ status: 'success' });
    } else {
        res.status(405).json({ status: 'Method Not Allowed' });
    }
};

export default handler;
