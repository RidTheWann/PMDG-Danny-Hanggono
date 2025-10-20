'use client';

import { Card } from '@/components/ui/card';
import { Users, Calendar, TrendingUp, DollarSign } from 'lucide-react';
import type { DataEntry } from '@/lib/db/schema';

export function ReportStats({ data }: { data: DataEntry[] }) {
  const totalPatients = data.length;
  const bpjsCount = data.filter((p) => p.paymentType === 'BPJS').length;
  const umumCount = data.filter((p) => p.paymentType === 'Umum').length;
  const thisMonth = data.filter((p) => {
    const date = new Date(p.date);
    const now = new Date();
    return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
  }).length;

  const stats = [
    {
      title: 'Total Pasien',
      value: totalPatients,
      icon: Users,
      color: 'text-blue-600',
    },
    {
      title: 'Bulan Ini',
      value: thisMonth,
      icon: Calendar,
      color: 'text-green-600',
    },
    {
      title: 'BPJS',
      value: bpjsCount,
      icon: TrendingUp,
      color: 'text-purple-600',
    },
    {
      title: 'Umum',
      value: umumCount,
      icon: DollarSign,
      color: 'text-orange-600',
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title} className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
              <p className="text-3xl font-bold">{stat.value}</p>
            </div>
            <stat.icon className={`h-8 w-8 ${stat.color}`} />
          </div>
        </Card>
      ))}
    </div>
  );
}
