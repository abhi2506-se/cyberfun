import React from "react";
import { getApplications } from "@/actions/jobs";
import { ApplicationsTable } from "@/components/admin/applications-table";

export default async function ApplicationsPage() {
  const applications = await getApplications();
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold">Job Applications</h1>
        <p className="text-[var(--text-muted)] mt-1">{applications.length} total applications</p>
      </div>
      <ApplicationsTable applications={applications} />
    </div>
  );
}
