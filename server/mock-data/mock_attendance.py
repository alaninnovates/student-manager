from supabase import create_client
from dotenv import load_dotenv
import pandas as pd
import os
import json
import random

load_dotenv()

client = create_client(os.getenv("SUPABASE_URL"), os.getenv("SUPABASE_SERVICE_KEY"))


def gen_mock_attendance(num_classes):
    attendance = []
    for _ in range(num_classes):
        rand = random.random()
        if rand < 0.77:
            attendance.append("present")
        elif rand < 0.85:
            attendance.append("late")
        elif rand < 0.95:
            attendance.append("absent")
        else:
            attendance.append("excused")
    return attendance


def gen_level():
    rand = random.random()
    if rand < 0.5:
        return "beginner"
    elif rand < 0.8:
        return "intermediate"
    else:
        return "advanced"


def insert_students():
    """
    id,name,grade,parent_email,parent_cell
    """
    students = pd.read_csv("mock_students.csv")
    students_parsed = []
    for row in students.to_dict(orient="records"):
        students_parsed.append(
            {
                "name": row["name"],
                "grade": row["grade"],
                "parent_emails": [row["parent_email"]],
                "parent_cells": [row["parent_cell"]],
                "organization": 2,
            }
        )

    client.from_("students").insert(students_parsed).execute()


def insert_classes():
    classes = json.loads(open("mock_classes.json").read())
    client.from_("classes").insert(classes).execute()


def gen_students_classes():
    """
    id,name,grade,parent_cells,parent_emails,organization
    """
    students = pd.read_csv("inserted_students.csv")
    """
    id,name,dates,organization,start_date,end_date
    """
    classes = pd.read_csv("inserted_classes.csv")
    students_classes = []
    for class_row in classes.to_dict(orient="records"):
        num_students = random.randint(15, 20)
        selected_students = random.sample(students["id"].tolist(), num_students)
        for student_id in selected_students:
            students_classes.append(
                {
                    "student_id": student_id,
                    "class_id": class_row["id"],
                    "organization": 2,
                    "level": gen_level(),
                    "attended_statuses": gen_mock_attendance(
                        len(class_row["dates"].split(","))
                    ),
                }
            )
    print(len(students_classes))
    client.from_("attendance").insert(students_classes).execute()


gen_students_classes()
