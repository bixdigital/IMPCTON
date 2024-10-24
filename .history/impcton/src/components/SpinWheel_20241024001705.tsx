import { useState, useEffect, useRef, useCallback } from 'react'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface SpinWheelProps {
  balance: number;
  setBalance: React.Dispatch<React.SetStateAction<number>>;
}

export default function SpinWheel({ balance, setBalance }: SpinWheelProps) {
  const [canSpin, setCanSpin] = useState(true)
  const [timeLeft, setTimeLeft] = useState(0)
  const [isSpinning, setIsSpinning] = useState(false)
  const [reward, setReward] = useState(0)
  const [spinCount, setSpinCount] = useState(0) // Track number of spins

  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Define segments and their rewards
  const segments = [
    { label: "10", value: 10 },
    { label: "20", value: 20 },
    { label: "30", value: 30 },
    { label: "40", value: 40 },
    { label: "50", value: 50 },
    { label: "100", value: 100 },
    { label: "200t", value: 200 },
    { label: "500", value: 500 },
  ]

  useEffect(() => {
    const lastSpinData = JSON.parse(localStorage.getItem('lastSpinData') || '{}')
    const { lastSpinTime, count } = lastSpinData

    if (lastSpinTime) {
      const timeDiff = Date.now() - lastSpinTime
      if (timeDiff < 4 * 60 * 60 * 1000) {
        setCanSpin(false)
        setTimeLeft(4 * 60 * 60 * 1000 - timeDiff)
        setSpinCount(count || 0)
      } else {
        // Reset if cooldown period is over
        localStorage.removeItem('lastSpinData')
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

  const drawWheel = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const { width, height } = canvas
    const centerX = width / 2
    const centerY = height / 2
    const radius = Math.min(width, height) / 2 - 20
    const segmentAngle = (2 * Math.PI) / segments.length

    segments.forEach((segment, index) => {
      const startAngle = index * segmentAngle
      const endAngle = startAngle + segmentAngle

      // Draw the segment
      ctx.beginPath()
      ctx.moveTo(centerX, centerY)
      ctx.arc(centerX, centerY, radius, startAngle, endAngle)
      ctx.closePath()

      // Set color
      ctx.fillStyle = index % 2 === 0 ? '#f39c12' : '#f1c40f' // Alternate colors
      ctx.fill()

      // Draw the label
      ctx.save()
      ctx.translate(centerX, centerY)
      ctx.rotate(startAngle + segmentAngle / 2)
      ctx.fillStyle = 'black'
      ctx.fillText(segment.label, radius / 2, 0)
      ctx.restore()
    })
  }, [segments])

  const handleSpin = () => {
    if (!canSpin || spinCount >= 3) return

    setIsSpinning(true)
    const spinDuration = 3000 // Spin duration in milliseconds
    const spins = Math.floor(Math.random() * 5) + 5 // Random number of spins
    const totalRotation = spins * 360 + Math.floor(Math.random() * 360) // Total rotation

    const spinAnimation = () => {
      const startTime = performance.now()
      const animate = (currentTime: number) => {
        const elapsedTime = currentTime - startTime
        const progress = Math.min(elapsedTime / spinDuration, 1)

        // Apply easing function
        const easing = progress < 0.5 ? 4 * progress * progress * progress : 1 - Math.pow(-2 * progress + 2, 3) / 2
        const currentRotation = totalRotation * easing

        // Rotate the wheel
        if (canvasRef.current) {
          const ctx = canvasRef.current.getContext('2d')
          if (ctx) {
            ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
            ctx.save()
            ctx.translate(canvasRef.current.width / 2, canvasRef.current.height / 2)
            ctx.rotate((currentRotation * Math.PI) / 180)
            ctx.translate(-canvasRef.current.width / 2, -canvasRef.current.height / 2)
            drawWheel()
            ctx.restore()
          }
        }

        if (progress < 1) {
          requestAnimationFrame(animate)
        } else {
          // Calculate the reward after the spin ends
          const rewardIndex = Math.floor(((currentRotation % 360) / 360) * segments.length)
          const rewardAmount = segments[(rewardIndex + segments.length - 1) % segments.length].value
          setReward(rewardAmount)
          setBalance((prevBalance) => prevBalance + rewardAmount)
          setSpinCount((prevCount) => prevCount + 1)

          // Store spin count and time in local storage
          const lastSpinData = {
            lastSpinTime: Date.now(),
            count: (spinCount + 1) % 3 === 0 ? 0 : spinCount + 1,
          }
          localStorage.setItem('lastSpinData', JSON.stringify(lastSpinData))

          if (lastSpinData.count === 0) {
            setCanSpin(false)
            setTimeLeft(4 * 60 * 60 * 1000)
          }

          setIsSpinning(false)
        }
      }
      requestAnimationFrame(animate)
    }

    spinAnimation()
  }

  useEffect(() => {
    drawWheel()
  }, [drawWheel])

  return (
    <Card className="p-6 text-center">
      <h2 className="text-2xl font-bold mb-4">Spin the Wheel!</h2>
      <div className="relative w-64 h-64 mx-auto mb-4">
        <canvas
          ref={canvasRef}
          width={256}
          height={256}
          className="rounded-full border-4 border-yellow-400"
        />
        <img
          src="/spin-arrow.png" // Ensure the image path is correct and that it exists in the public folder
          alt="Spin Arrow"
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16"
          style={{ zIndex: 10 }} // Ensure the arrow is on top of the wheel
        />
      </div>
      <Button onClick={handleSpin} disabled={!canSpin || spinCount >= 3} className={`mt-4 ${canSpin && spinCount < 3 ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-400 cursor-not-allowed'}`}>
        {isSpinning ? 'Spinning...' : 'Spin the Wheel'}
      </Button>
      {reward > 0 && (
        <p className="mt-4 text-lg font-bold text-green-500">
          You won: {reward}!
        </p>
      )}
      {!canSpin && (
        <p className="mt-4 text-red-500">
          You need to wait {Math.ceil(timeLeft / 1000)} seconds to spin again.
        </p>
      )}
      {/* Display current balance */}
      <p className="mt-4 text-lg">Current Balance: {balance}</p>
    </Card>
  )
}
