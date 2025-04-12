'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { Overview } from '@/components/overview';
import { getTotalVisitCount } from '@/lib/redis';
import { Overview2 } from '@/components/overview2';

interface CountryStat {
  name: string;
  value: number;
}

export default function Dashboard() {
  const [visitCount, setVisitCount] = useState<number>(0);
  const [countryData, setCountryData] = useState<CountryStat[]>([]);

  useEffect(() => {
    fetch('/api/visit')
      .then((res) => res.json())
      .then((data) => {
        setVisitCount(data.count);
      });

    const fetchGAData = async () => {
      const response = await fetch('/api/ga');
      const data = await response.json();
      const countryStats: CountryStat[] = data?.rows?.map((row: any) => ({
        name: row.dimensionValues[0]?.value,
        value: parseInt(row.metricValues[0]?.value) || 0,
      })) || [];

      setCountryData(countryStats);
    };

    fetchGAData();
  }, []);

  return (
    <div className="flex flex-col space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
        <Card>
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold mb-2">Total Visits</h2>
            <p className="text-3xl font-bold">{visitCount}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold mb-2">Real-time Country Analytics</h2>
            <Overview2 data={countryData} />
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardContent className="p-6">
          <Overview />
        </CardContent>
      </Card>
    </div>
  );
}
