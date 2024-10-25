import { useState, useEffect, useRef, useMemo } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface SpinWheelProps {
  balance: number;
  setBalance: React.Dispatch<React.SetStateAction<number>>;
}

const SpinWheel: React.FC<SpinWheelProps> = ({ balance, setBalance }) => {
  const [canSpin, setCanSpin] = useState(true);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [reward, setReward] = useState(0);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const segments = useMemo(() => [
    { label: "10", value: 10 },
    { label: "20", value: 20 },
    { label: "30", value: 30 },
    { label: "40", value: 40 },
    { label: "50", value: 50 },
    { label: "100", value: 100 },
    { label: "200", value: 200 },
    { label: "500", value: 500 },
  ], []);

  // Ensures initial state and countdown logic on load
  useEffect(() => {
    // Logic to handle localStorage state and countdown
  }, []);

  const handleSpin = () => {
    if (!canSpin) return;
    setIsSpinning(true);
    
    // Spin duration setup
    const spinDuration = 3000;
    const spins = Math.floor(Math.random() * 5) + 5;
    const totalRotation = spins * 360 + Math.floor(Math.random() * 360);

    const startSpin = () => {
      // Animation logic for spinning here
      setReward(rewardAmount);
      setBalance(prevBalance => prevBalance + rewardAmount);  // Update balance
    };

    startSpin();
  };

  useEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      if (ctx) {
        // Drawing wheel logic
      }
    }
  }, [segments, balance]);

  return (
    <Card className="p-6 text-center bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold mb-4 text-white drop-shadow-md">Spin the Wheel!</h2>
      <div className="relative w-64 h-64 mx-auto mb-4">
        <canvas ref={canvasRef} width={256} height={256} />
      </div>
      <Button onClick={handleSpin} disabled={!canSpin || isSpinning} className="mt-4">
        {isSpinning ? 'Spinning...' : 'Spin the Wheel'}
      </Button>
      {reward > 0 && (
        <p className="mt-4 text-lg font-bold text-green-500">
          You won: {reward}!
        </p>
      )}
    </Card>
  );
};

export default SpinWheel;
