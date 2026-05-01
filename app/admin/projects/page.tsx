import React from "react";
import { getAllProjects } from "@/actions/projects";
import { ProjectsManager } from "@/components/admin/projects-manager";

export default async function ProjectsPage() {
  const projects = await getAllProjects();
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold">Projects / Portfolio</h1>
        <p className="text-[var(--text-muted)] mt-1">Manage your portfolio projects</p>
      </div>
      <ProjectsManager projects={projects} />
    </div>
  );
}
