import { useState } from 'react';
import { Button } from "@/components/ui/button";
import ProgressBar from '@/components/ui/ProgressBar'; // Assume you have a progress-bar component

export default function ClickerGame({ balance, setBalance }) {
  const [clickPower, setClickPower] = useState(1);
  const [energy, setEnergy] = useState(50); // Starting energy

  const handleClick = () => {
    if (energy > 0) {
      setBalance(prev => prev + clickPower);
      setEnergy(prev => prev - 1); // Reduce energy with each click
    }
  };

  return (
    <div className="text-center">
      <div className="relative">
        <img src="/path-to-your-coin-image.png" alt="Coin" className="w-32 h-32 mx-auto" />
        <p className="text-xl font-bold mt-4">{balance} tokens</p>
      </div>

      <div className="mt-4">
        <ProgressBar value={energy} max={100} className="bg-green-500 h-2 rounded-full" />
        <p className="mt-2">Energy: {energy}/100</p>
      </div>

      <Button 
        className="mt-4 bg-yellow-500 text-black px-6 py-2 rounded-lg"
        onClick={handleClick}
        disabled={energy === 0}
      >
        Tap!
      </Button>

      <Button 
        className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-lg"
        onClick={() => setEnergy(100)} // Reset energy button
      >
        Recharge
      </Button>
    </div>
  );
}
