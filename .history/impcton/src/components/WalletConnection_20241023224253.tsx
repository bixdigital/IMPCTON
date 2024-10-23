import { Button } from "@/components/ui/button"
import { WalletIcon } from 'lucide-react'

interface WalletConnectionProps {
  connected: boolean;
  onConnect: () => void;
}

export default function WalletConnection({ connected, onConnect }: WalletConnectionProps) {
  return (
    <Button onClick={onConnect} variant={connected ? "secondary" : "default"}>
      <WalletIcon className="mr-2 h-4 w-4" />
      {connected ? "Connected" : "Connect Wallet"}
    </Button>
  )
}