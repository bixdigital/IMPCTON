'use client'

import { TonConnectUIProvider, TonConnectButton, useTonConnectUI, useTonWallet } from "@tonconnect/ui-react"
import { useEffect, useState } from "react"

const manifestUrl = 'https://spare-lime-fly.myfilebase.com/ipfs/QmcveTgo9rM3qpmwPDitbQXaA9Z6wCFYaXDGBxCAiD3Eo4'

function WalletConnectionContent() {
  const [status, setStatus] = useState<string>("disconnected")
  const [tonConnectUI] = useTonConnectUI()
  const wallet = useTonWallet()

  useEffect(() => {
    if (tonConnectUI) {
      tonConnectUI.onStatusChange((walletStatus) => {
        setStatus(walletStatus ? "connected" : "disconnected")
      })
    }
  }, [tonConnectUI])

  const isConnected = status === "connected" && wallet !== null

  return (
    <div className="flex flex-col items-center justify-center">
      <TonConnectButton />
      {isConnected && wallet && (
        <div className="mt-4">
          <p className="text-green-500">Wallet connected!</p>
          <p className="mt-2">Address: {wallet.account.address}</p>
          <p className="mt-2">Chain: {wallet.account.chain}</p>
        </div>
      )}
      <p className="mt-2">Status: {status}</p>
    </div>
  )
}

export default function WalletConnection() {
  return (
    <TonConnectUIProvider manifestUrl=https://spare-lime-fly.myfilebase.com/ipfs/QmdsSgWZCdtkSmuEaac77RDKGjt6Z5XappXEAQweF7fhyQ
      <WalletConnectionContent />
    </TonConnectUIProvider>
  )
}
