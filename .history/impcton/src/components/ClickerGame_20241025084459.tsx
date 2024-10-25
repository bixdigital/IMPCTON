// src/components/ClickerGame.tsx
import React, { useState } from 'react';
import ProgressBar from '@/components/ui/ProgressBar';
import { motion } from 'framer-motion';

interface ClickerGameProps {
    balance: number;
    setBalance: React.Dispatch<React.SetStateAction<number>>;
}

const ClickerGame: React.FC<ClickerGameProps> = ({ balance, setBalance }) => {
    const [clickPower, setClickPower] = useState<number>(1);

    const handleClick = async () => {
        // Call Telegram bot with /click command
        await fetch(`/api/telegram`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ command: '/click' }),
        });
        setBalance((prev: number) => prev + clickPower);
    };

    const handleReward = async () => {
        await fetch(`/api/telegram`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ command: '/reward' }),
        });
    };

    const upgradeClickPower = () => {
        setClickPower((prev) => prev + 1); // Increment click power
    };

    return (
        <div className="text-center">
            <h1 className="text-2xl mb-4">Clicker Game</h1>
            <motion.img
                src="/clickable-image.png"
                alt="Clickable"
                onClick={handleClick}
                whileTap={{ scale: 1.1 }}
                className="mx-auto w-32 h-32 cursor-pointer transition transform hover:scale-110 active:animate-bounce"
            />
            <p className="mt-4">Balance: {balance}</p>
            <ProgressBar progress={(balance % 100)} />
            <p className="mt-2">Click Power: {clickPower}</p>
            <button
                onClick={upgradeClickPower}
                className="bg-green-500 text-white px-4 py-2 rounded-lg mt-4 transition transform hover:scale-105"
            >
                Upgrade Click Power
            </button>
            <button
                onClick={handleReward}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4 transition transform hover:scale-105"
            >
                Claim Reward
            </button>
        </div>
    );
};

export default ClickerGame;
