import React from "react";
import { prisma } from "@/lib/prisma";
import { MessageSquare, UserCheck, Briefcase, FolderOpen, TrendingUp, Users } from "lucide-react";
import { DashboardCharts } from "@/components/admin/dashboard-charts";

async function getStats() {
  const [contacts, applications, jobs, projects, teamMembers] = await Promise.all([
    prisma.contact.count(),
    prisma.application.count(),
    prisma.job.count({ where: { isActive: true } }),
    prisma.project.count({ where: { published: true } }),
    prisma.teamMember.count({ where: { isActive: true } }),
  ]);

  const newContacts     = await prisma.contact.count({ where: { status: "NEW" } });
  const pendingApps     = await prisma.application.count({ where: { status: "PENDING" } });

  return { contacts, applications, jobs, projects, teamMembers, newContacts, pendingApps };
}

export default async function DashboardPage() {
  const stats = await getStats();

  const cards = [
    { label: "Total Contacts",      value: stats.contacts,     badge: stats.newContacts,   badgeLabel: "new",     icon: MessageSquare, color: "from-blue-500 to-cyan-500"   },
    { label: "Applications",        value: stats.applications, badge: stats.pendingApps,   badgeLabel: "pending", icon: UserCheck,     color: "from-purple-500 to-pink-500" },
    { label: "Active Job Postings", value: stats.jobs,         badge: null,                badgeLabel: "",        icon: Briefcase,     color: "from-green-500 to-teal-500"  },
    { label: "Published Projects",  value: stats.projects,     badge: null,                badgeLabel: "",        icon: FolderOpen,    color: "from-orange-500 to-red-500"  },
    { label: "Team Members",        value: stats.teamMembers,  badge: null,                badgeLabel: "",        icon: Users,         color: "from-sky-500 to-indigo-500"  },
    { label: "Success Rate",        value: "98%",              badge: null,                badgeLabel: "",        icon: TrendingUp,    color: "from-amber-500 to-yellow-500"},
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-bold">Dashboard</h1>
        <p className="text-[var(--text-muted)] mt-1">Welcome back. Here&apos;s an overview of Cyberfun&apos;s activity.</p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((card) => (
          <div key={card.label} className="rounded-2xl border border-[var(--border)] bg-[var(--bg-secondary)] p-6 relative overflow-hidden group hover:border-cyber-500/30 transition-colors">
            <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl ${card.color} opacity-10 rounded-bl-3xl`} />
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-[var(--text-muted)] mb-2">{card.label}</p>
                <p className="text-3xl font-display font-bold">{card.value}</p>
                {card.badge !== null && card.badge !== undefined && card.badge > 0 && (
                  <span className="inline-flex items-center gap-1 text-xs text-cyber-400 bg-cyber-500/10 px-2 py-0.5 rounded-full mt-2">
                    +{card.badge} {card.badgeLabel}
                  </span>
                )}
              </div>
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center`}>
                <card.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <DashboardCharts />

      {/* Quick actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-secondary)] p-6">
          <h3 className="font-semibold mb-4 flex items-center gap-2"><MessageSquare className="w-4 h-4 text-cyber-400" /> Recent Activity</h3>
          <div className="space-y-3">
            {[
              { text: "New contact from TechCorp India",     time: "2 min ago",  dot: "bg-green-400" },
              { text: "Job application for Senior Engineer", time: "15 min ago", dot: "bg-blue-400"  },
              { text: "Project published: FinTech Dashboard",time: "1 hour ago", dot: "bg-purple-400"},
              { text: "New team member added: Neha Gupta",   time: "3 hours ago",dot: "bg-orange-400"},
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 text-sm">
                <div className={`w-2 h-2 rounded-full ${item.dot} shrink-0`} />
                <span className="flex-1 text-[var(--text-secondary)]">{item.text}</span>
                <span className="text-[var(--text-muted)] text-xs">{item.time}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-secondary)] p-6">
          <h3 className="font-semibold mb-4">Quick Stats</h3>
          <div className="space-y-3">
            {[
              { label: "Contacts this week",     value: "12", change: "+40%", up: true  },
              { label: "Applications this month",value: "28", change: "+15%", up: true  },
              { label: "Avg response time",      value: "4h",  change: "-30%", up: false },
              { label: "Project completion rate",value: "97%", change: "+2%",  up: true  },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between">
                <span className="text-sm text-[var(--text-muted)]">{item.label}</span>
                <div className="flex items-center gap-2">
                  <span className="font-semibold">{item.value}</span>
                  <span className={`text-xs px-1.5 py-0.5 rounded-full ${item.up ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400"}`}>
                    {item.change}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
