import { useState, useEffect, useCallback } from 'react'
import { Card } from "@/components/ui/card"

interface ClickerGameProps {
  balance: number;
  setBalance: React.Dispatch<React.SetStateAction<number>>;
}

export default function ClickerGame({ balance, setBalance }: ClickerGameProps) {
  const [clicks, setClicks] = useState(0)
  const [multiplier, setMultiplier] = useState(1)
  const [cooldown, setCooldown] = useState(false)
  const [timeLeft, setTimeLeft] = useState(30)
  const [upgradeCost, setUpgradeCost] = useState(500)
  const [canUpgrade, setCanUpgrade] = useState(true)

  const handleClick = useCallback(() => {
    if (cooldown || timeLeft === 0) return

    setClicks((prevClicks) => {
      const newClicks = prevClicks + 1
      setBalance((prevBalance) => prevBalance + multiplier)
      return newClicks
    })

    setCooldown(true)
    setTimeout(() => setCooldown(false), 100)
  }, [cooldown, timeLeft, multiplier, setBalance])

  const handleUpgrade = () => {
    if (balance >= upgradeCost && canUpgrade) {
      setBalance((prevBalance) => prevBalance - upgradeCost)
      setMultiplier((prevMultiplier) => prevMultiplier + 1)
      setUpgradeCost((prevCost) => prevCost * 2)
      setCanUpgrade(false)
      setTimeout(() => setCanUpgrade(true), 12 * 60 * 60 * 1000)
    }
  }

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [timeLeft])

  useEffect(() => {
    if (clicks >= 500) {
      setTimeLeft(0)
    }
  }, [clicks])

  return (
    <Card className="p-6 text-center">
      <h2 className="text-2xl font-bold mb-4">Clicker Game</h2>
      <p className="mb-2">Clicks: {clicks} | Multiplier: {multiplier}x</p>
      <p className="mb-4">Time left: {timeLeft}s</p>
      
      <div 
        className="mb-4 cursor-pointer w-full h-48 sm:h-64 md:h-72 lg:h-80 xl:h-96 flex justify-center items-center"
        onClick={handleClick}
        disabled={cooldown || timeLeft === 0}
      >
        <img 
          src="/workspaces/impc-test/impcton/public/impcton logo.png" 
          alt="Click Me" 
          className="object-contain h-full w-auto"
        />
      </div>

      <button 
        onClick={handleUpgrade} 
        disabled={balance < upgradeCost || !canUpgrade}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-400"
      >
        Upgrade (Cost: {upgradeCost})
      </button>
    </Card>
  )
}
