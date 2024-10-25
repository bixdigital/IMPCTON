import React, { useState } from 'react';
import Modal from '@/components/ui/modal'; // Ensure this path is correct
import Button from '@/components/ui/Button'; // Ensure this path is correct

interface WalletConnectionProps {
  connected: boolean;
  onConnect: () => void;
}

const WalletConnection: React.FC<WalletConnectionProps> = ({ connected, onConnect }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleConnect = () => {
    onConnect(); // Example usage of the onConnect function
    setModalOpen(false); // Close modal after connection
  };

  return (
    <div>
      <Button onClick={() => setModalOpen(true)}>Connect Wallet</Button>
      {modalOpen && (
        <Modal>
          <h2>Select Wallet</h2>
          <Button onClick={handleConnect}>Tonkeeper</Button>
          <Button onClick={handleConnect}>Tonhub</Button>
          <Button onClick={() => setModalOpen(false)}>Cancel</Button>
        </Modal>
      )}
    </div>
  );
};

export default WalletConnection;
