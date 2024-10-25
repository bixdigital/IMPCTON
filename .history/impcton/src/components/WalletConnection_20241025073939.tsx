import { TonConnectUIProvider, useTonConnectUI, useTonWallet } from "@tonconnect/ui-react";
import { useEffect, useState } from "react";

const manifestUrl = 'https://bixdigital.github.io/impcton/manifest.json';

function WalletConnectionContent() {
  const [status, setStatus] = useState<string>("disconnected");
  const [tonConnectUI] = useTonConnectUI();
  const wallet = useTonWallet();

  useEffect(() => {
    if (tonConnectUI) {
      tonConnectUI.onStatusChange((walletStatus) => {
        setStatus(walletStatus ? "connected" : "disconnected");
      });
    }
  }, [tonConnectUI]);

  const isConnected = status === "connected" && wallet !== null;

  const handleConnectWallet = async () => {
    if (tonConnectUI) {
      try {
        await tonConnectUI.connectWallet();
        console.log("Wallet connection initiated");
      } catch (error) {
        console.error("Failed to connect wallet:", error);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <button
        onClick={handleConnectWallet}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
      >
        Connect Wallet
      </button>
      {isConnected && wallet && (
        <div className="mt-4">
          <p className="text-green-500">Wallet connected!</p>
          <p className="mt-2">Address: {wallet.account.address}</p>
          <p className="mt-2">Chain: {wallet.account.chain}</p>
        </div>
      )}
      <p className="mt-2">Status: {status}</p>
    </div>
  );
}

export default function WalletConnection() {
  return (
    <TonConnectUIProvider manifestUrl={manifestUrl}>
      <WalletConnectionContent />
    </TonConnectUIProvider>
  );
}
