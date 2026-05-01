import React from "react";
import { getAllTeamMembers } from "@/actions/team";
import { TeamManager } from "@/components/admin/team-manager";

export default async function TeamPage() {
  const members = await getAllTeamMembers();
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold">Team Members</h1>
        <p className="text-[var(--text-muted)] mt-1">Manage your team roster</p>
      </div>
      <TeamManager members={members} />
    </div>
  );
}
