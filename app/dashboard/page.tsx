"use client";

import { useEffect, useState } from "react";
import { PieChart, Pie, Tooltip, Cell, LineChart, Line, CartesianGrid, XAxis, YAxis } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

// Define the type for the structure of rows in the response
interface AnalyticsRow {
  dimensionValues: { value: string }[];
  metricValues: { value: string }[];
}

export default function DashboardPage() {
  const [visitCount, setVisitCount] = useState(0);
  const [realtimeUsers, setRealtimeUsers] = useState(0);
  const [countryData, setCountryData] = useState<{ name: string; value: number }[]>([]);

  const [pageViews, setPageViews] = useState(0);

  useEffect(() => {
    const current = parseInt(localStorage.getItem("dashboardVisits") || "0");
    localStorage.setItem("dashboardVisits", (current + 1).toString());
    setVisitCount(current + 1);

    fetch("/api/analytics")
      .then((res) => res.json())
      .then((data) => {
        const users = data.rows?.[0]?.metricValues?.[0]?.value || 0;
        const views = data.rows?.[0]?.metricValues?.[1]?.value || 0;
        setRealtimeUsers(parseInt(users));
        setPageViews(parseInt(views));

        // Handle country-level data
        const countryStats = (data.rows as AnalyticsRow[])?.map((row) => ({
          name: row.dimensionValues[0]?.value || "Unknown",
          value: parseInt(row.metricValues[0]?.value) || 0,
        })) || [];
        setCountryData(countryStats);
      });
  }, []);

  const data = [
    { name: "Visits", value: visitCount },
    { name: "Remaining", value: 100 - visitCount },
  ];

  const lineData = [
    { name: "Jan", visits: 10 },
    { name: "Feb", visits: 20 },
    { name: "Mar", visits: 30 },
    { name: "Apr", visits: 40 },
  ];

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-4">Rouge Company Dashboard</h1>

      {/* 1 Row 2 Columns */}
      <section className="grid grid-cols-2 gap-8">
        {/* Left Column - Visit Analytics */}
        <div>
          <h2 className="text-xl font-semibold">Visit Analytics</h2>
          <p className="mt-2">Total Visits on This Browser: <strong>{visitCount}</strong></p>
          <div className="mt-4 w-60 h-60">
            <PieChart width={240} height={240}>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {data.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </div>
        </div>

        {/* Right Column - Real-time Active Users */}
        <div>
          <h2 className="text-xl font-semibold">Real-time Active Users</h2>
          <p className="text-lg mt-2">Currently Active: <strong>{realtimeUsers}</strong></p>
        </div>
      </section>

      {/* Additional Sections Below */}
      <section className="mt-8">
        <h2 className="text-xl font-semibold">Page Views</h2>
        <p className="text-lg mt-2">Total Page Views: <strong>{pageViews}</strong></p>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold">User Distribution by Country</h2>
        <LineChart width={600} height={300} data={countryData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="value" stroke="#82ca9d" />
        </LineChart>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold">Visit Trends (Line Chart)</h2>
        <LineChart width={600} height={300} data={lineData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="visits" stroke="#8884d8" />
        </LineChart>
      </section>
    </main>
  );
}
