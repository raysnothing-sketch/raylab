import React from "react";
import { notFound } from "next/navigation";
import { getProjectBySlug, getProjects } from "@/lib/data";
import ProjectClient from "./ProjectClient";

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return <ProjectClient project={project} />;
}
