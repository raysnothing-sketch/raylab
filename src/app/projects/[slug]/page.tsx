import React from "react";
import { notFound } from "next/navigation";
import { getProjectBySlug } from "@/lib/data";
import ProjectClient from "./ProjectClient";

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
