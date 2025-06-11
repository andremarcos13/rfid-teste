import React, { useState } from 'react';
import { UserIdentification } from './UserIdentification';
import { QRCodeScanner } from './QRCodeScanner';
import { OrderPreview } from './OrderPreview';
import { PickingInterface } from './PickingInterface';
import { RFIDMap } from './RFIDMap';

type FlowStep = 'identification' | 'qr-scan' | 'order-preview' | 'picking' | 'rfid-map';

export const UserFlowManager: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<FlowStep>('identification');
  const [userData, setUserData] = useState<{ id: string; name: string } | null>(null);
  const [orderData, setOrderData] = useState<any>(null);
  const [qrCode, setQrCode] = useState<string>('');
  const [collectedItems, setCollectedItems] = useState<string[]>([]);

  const handleUserIdentified = (userId: string, userName: string) => {
    setUserData({ id: userId, name: userName });
    setCurrentStep('qr-scan');
  };

  const handleQRScanned = (code: string, order: any) => {
    setQrCode(code);
    setOrderData(order);
    setCurrentStep('order-preview');
  };

  const handleStartCollection = () => {
    setCurrentStep('picking');
  };

  const handleItemCollected = (itemId: string) => {
    setCollectedItems(prev => [...prev, itemId]);
  };

  const handlePickingComplete = () => {
    setCurrentStep('rfid-map');
  };

  const handleFlowComplete = () => {
    // Reset flow
    setCurrentStep('identification');
    setUserData(null);
    setOrderData(null);
    setQrCode('');
    setCollectedItems([]);
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'identification':
        return <UserIdentification onUserIdentified={handleUserIdentified} />;

      case 'qr-scan':
        return (
          <QRCodeScanner
            userName={userData?.name || ''}
            onQRScanned={handleQRScanned}
          />
        );

      case 'order-preview':
        return (
          <OrderPreview
            orderData={orderData}
            qrCode={qrCode}
            onStartCollection={handleStartCollection}
          />
        );

      case 'picking':
        return (
          <PickingInterface
            orderData={orderData}
            onItemCollected={handleItemCollected}
            onPickingComplete={handlePickingComplete}
          />
        );

      case 'rfid-map':
        return (
          <RFIDMap
            orderData={orderData}
            collectedItems={collectedItems}
            onComplete={handleFlowComplete}
            onBackToHome={handleFlowComplete}
          />
        );

      default:
        return <UserIdentification onUserIdentified={handleUserIdentified} />;
    }
  };

  return renderCurrentStep();
};