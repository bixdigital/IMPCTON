import { useState, useEffect, useCallback } from 'react'
import { Button } from "@/components/ui/button"
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
      <Button 
        onClick={handleClick} 
        disabled={cooldown || timeLeft === 0}
        className="mb-4 w-full h-32 text-2xl"
      >
        Click Me!
      </Button>
      <Button 
        onClick={handleUpgrade} 
        disabled={balance < upgradeCost || !canUpgrade}
      >
        Upgrade (Cost: {upgradeCost})
      </Button>
    </Card>
  )
}