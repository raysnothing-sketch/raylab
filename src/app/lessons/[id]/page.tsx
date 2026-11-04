import React from "react";
import { notFound } from "next/navigation";
import { getLessonById } from "@/lib/data";
import LessonClient from "./LessonClient";

export default async function LessonPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const lessonData = await getLessonById(id);

  if (!lessonData) {
    notFound();
  }

  return <LessonClient lessonData={lessonData} />;
}
