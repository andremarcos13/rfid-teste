export interface InventoryItem {
  id: string;
  name: string;
  category: 'EPI' | 'Medicamento';
  rfidTag: string;
  location: string;
  quantity: number;
  status: 'available' | 'reserved' | 'out';
  lastUpdated: Date;
}

export interface Order {
  id: string;
  items: Array<{
    itemId: string;
    quantity: number;
    location: string;
  }>;
  status: 'pending' | 'picking' | 'completed' | 'cancelled';
  qrCode: string;
  createdAt: Date;
  completedAt?: Date;
}

export interface PickingLocation {
  id: string;
  zone: string;
  shelf: string;
  position: string;
  isActive: boolean;
  hasItem: boolean;
}

export interface Alert {
  id: string;
  type: 'unauthorized_removal' | 'low_stock' | 'system_error';
  message: string;
  timestamp: Date;
  severity: 'low' | 'medium' | 'high';
}