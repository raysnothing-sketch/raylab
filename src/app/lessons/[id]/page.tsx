import React from "react";
import { notFound } from "next/navigation";
import { getLessonById } from "@/lib/data";
import { dbQuery } from "@/lib/db";
import LessonClient from "./LessonClient";

export async function generateStaticParams() {
  const lessons = await dbQuery<{ id: string }>("SELECT id FROM lessons");
  return lessons.map((l) => ({ id: l.id }));
}

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
