import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface SpinWheelProps {
  balance: number;
  setBalance: React.Dispatch<React.SetStateAction<number>>;
}

export default function SpinWheel({ balance, setBalance }: SpinWheelProps) {
  const [canSpin, setCanSpin] = useState(true)
  const [timeLeft, setTimeLeft] = useState(0)

  useEffect(() => {
    const lastSpinTime = localStorage.getItem('lastSpinTime')
    if (lastSpinTime) {
      const timeDiff = Date.now() - parseInt(lastSpinTime)
      if (timeDiff < 4 * 60 * 60 * 1000) {
        setCanSpin(false)
        setTimeLeft(4 * 60 * 60 * 1000 - timeDiff)
      }
    }

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1000) {
          setCanSpin(true)
          clearInterval(timer)
          return 0
        }
        return prevTime - 1000
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const handleSpin = () => {
    if (!canSpin) return

    const reward = Math.floor(Math.random() * 1000) + 1
    setBalance((prevBalance) => prevBalance + reward)
    setCanSpin(false)
    setTimeLeft(4 * 60 * 60 * 1000)
    localStorage.setItem('lastSpinTime', Date.now().toString())
  }

  return (
    <Card className="p-6 text-center">
      <h2 className="text-2xl font-bold mb-4">Spin the Wheel!</h2>
      <div className="w-64 h-64 mx-auto mb-4 rounded-full border-4 border-yellow-400 flex items-center justify-center">
        <div className="text-4xl font-bold">
          {canSpin ? 'SPIN!' : `${Math.floor(timeLeft / 60000)}:${Math.floor((timeLeft % 60000) / 1000).toString().padStart(2, '0')}`}
        </div>
      </div>
      <Button onClick={handleSpin} disabled={!canSpin}>
        Spin the Wheel
      </Button>
    </Card>
  )
}