import React, { useState } from 'react';
import ProgressBar from '@/components/ui/ProgressBar'; // Ensure ProgressBar is default exported
import { motion } from 'framer-motion'; // Import if you wish to use framer-motion animations

interface ClickerGameProps {
  balance: number;
  setBalance: React.Dispatch<React.SetStateAction<number>>;
}

const ClickerGame: React.FC<ClickerGameProps> = ({ balance, setBalance }) => {
  const [clickPower, setClickPower] = useState<number>(1);  // Used if needed later
  const [isRotated, setIsRotated] = useState<boolean>(false); // State to track rotation

  const handleClick = () => {
    setBalance((prev: number) => prev + clickPower);
    setIsRotated((prev) => !prev); // Toggle rotation state on click
  };

  const upgradeClickPower = () => {
    setClickPower((prev: number) => prev + 1);  // Example usage of setClickPower
  };

  return (
    <div className="text-center">
      <h1 className="text-2xl mb-4">Clicker Game</h1>
      
      <motion.img 
        src="/clickable-image.png" // Replace with actual image path
        alt="Clickable"
        onClick={handleClick}
        whileTap={{ scale: 1.1 }}
        className="mx-auto w-32 h-32 cursor-pointer transition transform hover:scale-110 active:animate-bounce"
        initial={{ rotate: 360 }} // Initial rotation
        animate={{ rotate: isRotated ? 360 : 0 }} // Rotate when clicked
        transition={{ duration: 0.0 }} // Transition duration for rotation
      />
      
      <p className="mt-4">Balance: {balance}</p>
      <ProgressBar progress={(balance % 100)} />
      
      <button 
        onClick={upgradeClickPower} 
        className="bg-green-500 text-white px-4 py-2 rounded-lg mt-4 transition transform hover:scale-105"
      >
        Upgrade Click Power
      </button>
    </div>
  );
};

export default ClickerGame;
