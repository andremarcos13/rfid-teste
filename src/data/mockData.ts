import { InventoryItem, Order, Alert, PickingLocation } from '../types';

export const mockInventoryItems: InventoryItem[] = [
  {
    id: '1',
    name: 'Capacete de Segurança',
    category: 'EPI',
    rfidTag: 'RFID001',
    location: 'A-01-03',
    quantity: 25,
    status: 'available',
    lastUpdated: new Date('2024-01-15T10:30:00')
  },
  {
    id: '2',
    name: 'Luvas de Proteção',
    category: 'EPI',
    rfidTag: 'RFID002',
    location: 'A-02-01',
    quantity: 150,
    status: 'available',
    lastUpdated: new Date('2024-01-15T09:15:00')
  },
  {
    id: '3',
    name: 'Paracetamol 500mg',
    category: 'Medicamento',
    rfidTag: 'RFID003',
    location: 'B-01-05',
    quantity: 8,
    status: 'available',
    lastUpdated: new Date('2024-01-15T14:20:00')
  },
  {
    id: '4',
    name: 'Óculos de Proteção',
    category: 'EPI',
    rfidTag: 'RFID004',
    location: 'A-01-07',
    quantity: 42,
    status: 'available',
    lastUpdated: new Date('2024-01-15T11:45:00')
  },
  {
    id: '5',
    name: 'Ibuprofeno 400mg',
    category: 'Medicamento',
    rfidTag: 'RFID005',
    location: 'B-02-03',
    quantity: 3,
    status: 'available',
    lastUpdated: new Date('2024-01-15T13:10:00')
  }
];

export const mockOrders: Order[] = [
  {
    id: 'ORD001',
    items: [
      { itemId: '1', quantity: 5, location: 'A-01-03' },
      { itemId: '2', quantity: 10, location: 'A-02-01' }
    ],
    status: 'picking',
    qrCode: 'QR_ORD001_2024',
    createdAt: new Date('2024-01-15T15:30:00')
  },
  {
    id: 'ORD002',
    items: [
      { itemId: '3', quantity: 2, location: 'B-01-05' }
    ],
    status: 'pending',
    qrCode: 'QR_ORD002_2024',
    createdAt: new Date('2024-01-15T16:00:00')
  }
];

export const mockAlerts: Alert[] = [
  {
    id: 'ALT001',
    type: 'low_stock',
    message: 'Estoque baixo: Ibuprofeno 400mg (3 unidades restantes)',
    timestamp: new Date('2024-01-15T16:15:00'),
    severity: 'medium'
  },
  {
    id: 'ALT002',
    type: 'unauthorized_removal',
    message: 'Retirada não autorizada detectada no setor A-01',
    timestamp: new Date('2024-01-15T15:45:00'),
    severity: 'high'
  }
];

export const mockPickingLocations: PickingLocation[] = [
  { id: 'A-01-03', zone: 'A', shelf: '01', position: '03', isActive: true, hasItem: true },
  { id: 'A-02-01', zone: 'A', shelf: '02', position: '01', isActive: true, hasItem: true },
  { id: 'A-01-07', zone: 'A', shelf: '01', position: '07', isActive: false, hasItem: true },
  { id: 'B-01-05', zone: 'B', shelf: '01', position: '05', isActive: false, hasItem: true },
  { id: 'B-02-03', zone: 'B', shelf: '02', position: '03', isActive: false, hasItem: true }
];