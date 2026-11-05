# -*- coding: utf-8 -*-
import sqlite3

con = sqlite3.connect("raylab.sqlite")
cur = con.cursor()

print("--- LEARNING PATHS ---")
cur.execute("SELECT id, slug, title, estimated_minutes FROM learning_paths")
for r in cur.fetchall():
    print(f"Path: {r[0]} | {r[1]} | {r[2]} | {r[3]}min ({r[3]/60:.1f}h)")

print("\n--- COURSES ---")
cur.execute("SELECT id, slug, title, estimated_minutes FROM courses")
for r in cur.fetchall():
    print(f"Course: {r[0]} | {r[1]} | {r[2]} | {r[3]}min ({r[3]/60:.1f}h)")

print("\n--- LESSONS PER COURSE ---")
cur.execute("""
    SELECT c.id, c.title, count(l.id) 
    FROM courses c
    LEFT JOIN modules m ON m.course_id = c.id
    LEFT JOIN lessons l ON l.module_id = m.id
    GROUP BY c.id
""")
for r in cur.fetchall():
    print(f"{r[0]} ({r[1]}): {r[2]} leçons")

print("\n--- ALL LESSONS ---")
cur.execute("SELECT id, title, estimated_minutes FROM lessons ORDER BY id")
for r in cur.fetchall():
    print(f"  {r[0]} -> {r[1]} ({r[2]} min)")
