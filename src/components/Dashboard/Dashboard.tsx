import React from 'react';
import { StatsCard } from './StatsCard';
import { ActivityChart } from './ActivityChart';
import { RecentActivity } from './RecentActivity';
import { SystemStatus } from './SystemStatus';
import { Package, ShoppingCart, AlertTriangle, TrendingUp } from 'lucide-react';

export const Dashboard: React.FC = () => {
  return (
    <div className="p-6 space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total de Itens"
          value="1,234"
          change="+12%"
          trend="up"
          color="primary"
          icon={Package}
        />
        <StatsCard
          title="Ordens Ativas"
          value="23"
          change="+5%"
          trend="up"
          color="success"
          icon={ShoppingCart}
        />
        <StatsCard
          title="Alertas"
          value="3"
          change="-8%"
          trend="down"
          color="warning"
          icon={AlertTriangle}
        />
        <StatsCard
          title="Eficiência"
          value="96.5%"
          change="+2.1%"
          trend="up"
          color="accent"
          icon={TrendingUp}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ActivityChart />
        </div>
        <div>
          <SystemStatus />
        </div>
      </div>

      {/* Recent Activity */}
      <RecentActivity />
    </div>
  );
};