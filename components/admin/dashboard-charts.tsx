"use client";

import React from "react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  BarChart, Bar, ResponsiveContainer, PieChart, Pie, Cell,
} from "recharts";

const MONTHLY_DATA = [
  { month: "Jul", contacts: 8,  applications: 5  },
  { month: "Aug", contacts: 12, applications: 9  },
  { month: "Sep", contacts: 10, applications: 7  },
  { month: "Oct", contacts: 18, applications: 14 },
  { month: "Nov", contacts: 15, applications: 11 },
  { month: "Dec", contacts: 22, applications: 18 },
  { month: "Jan", contacts: 28, applications: 22 },
];

const SERVICE_DATA = [
  { name: "Web Dev",  value: 42, color: "#0ea5e9" },
  { name: "Mobile",   value: 22, color: "#a855f7" },
  { name: "AI/ML",    value: 18, color: "#22c55e" },
  { name: "Design",   value: 10, color: "#f97316" },
  { name: "Cloud",    value: 8,  color: "#06b6d4" },
];

const CUSTOM_TOOLTIP_STYLE = {
  contentStyle: {
    background: "var(--bg-secondary)",
    border: "1px solid var(--border)",
    borderRadius: "12px",
    fontSize: "12px",
  },
};

export function DashboardCharts() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      {/* Area chart — full width on lg */}
      <div className="lg:col-span-2 rounded-2xl border border-[var(--border)] bg-[var(--bg-secondary)] p-6">
        <h3 className="font-semibold mb-6">Contacts & Applications (Last 7 months)</h3>
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={MONTHLY_DATA}>
            <defs>
              <linearGradient id="colorContacts" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="#0ea5e9" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}   />
              </linearGradient>
              <linearGradient id="colorApps" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="#a855f7" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#a855f7" stopOpacity={0}   />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis dataKey="month" stroke="var(--text-muted)" tick={{ fontSize: 12 }} />
            <YAxis stroke="var(--text-muted)" tick={{ fontSize: 12 }} />
            <Tooltip {...CUSTOM_TOOLTIP_STYLE} />
            <Area type="monotone" dataKey="contacts"     stroke="#0ea5e9" fill="url(#colorContacts)" strokeWidth={2} name="Contacts"     />
            <Area type="monotone" dataKey="applications" stroke="#a855f7" fill="url(#colorApps)"     strokeWidth={2} name="Applications" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Pie chart */}
      <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-secondary)] p-6">
        <h3 className="font-semibold mb-6">Services Breakdown</h3>
        <ResponsiveContainer width="100%" height={160}>
          <PieChart>
            <Pie data={SERVICE_DATA} cx="50%" cy="50%" innerRadius={45} outerRadius={70} dataKey="value" paddingAngle={3}>
              {SERVICE_DATA.map((entry, i) => (
                <Cell key={i} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip {...CUSTOM_TOOLTIP_STYLE} />
          </PieChart>
        </ResponsiveContainer>
        <div className="space-y-2 mt-2">
          {SERVICE_DATA.map((item) => (
            <div key={item.name} className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: item.color }} />
                <span className="text-[var(--text-secondary)]">{item.name}</span>
              </div>
              <span className="font-semibold">{item.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
