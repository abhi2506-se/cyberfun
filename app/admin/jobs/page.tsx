import React from "react";
import { getAllJobs } from "@/actions/jobs";
import { JobsManager } from "@/components/admin/jobs-manager";

export default async function JobsPage() {
  const jobs = await getAllJobs();
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold">Job Postings</h1>
        <p className="text-[var(--text-muted)] mt-1">Manage your career opportunities</p>
      </div>
      <JobsManager jobs={jobs} />
    </div>
  );
}
