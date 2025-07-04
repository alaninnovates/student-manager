from supabase import create_client
from dotenv import load_dotenv
import pandas as pd
import os
import json
from datetime import datetime

load_dotenv()

client = create_client(
    os.getenv("SUPABASE_URL"),
    os.getenv("SUPABASE_SERVICE_KEY")
)

files = os.listdir('out')

def insert_classes():
    to_write = []
    for file in files:
        with open(f'out/{file}', 'r') as f:
            data = json.load(f)
            class_name = data['class_name']
            class_dates = data['class_dates']
            to_write.append({
                'name': class_name,
                'dates': [
                    datetime.fromtimestamp(date).strftime('%Y-%m-%d') for date in class_dates
                ],
                'organization': 1,
            })
    client.table('classes').insert(to_write).execute()

classes = json.load(open('classes.json', 'r'))
students = json.load(open('students.json', 'r'))

def insert_students():
    student_metadata = []
    for file in files:
        with open(f'out/{file}', 'r') as f:
            data = json.load(f)
            for student in data['students']:
                # print(student['name'])
                if student['name'] in [s['name'] for s in students]:
                    # print('continuing on', student['name'])
                    continue
                if student['name'] not in [s['name'] for s in student_metadata]:
                    student_metadata.append({
                        'name': student['name'],
                        'grade': student['grade'] if student['grade'] not in (None, float('nan')) else 0,
                        'parent_cells': [str(student['parent_cells'])] if not pd.isna(student['parent_cells']) else [],
                        'parent_emails': [student['parent_email']] if not pd.isna(student['parent_email']) else [],
                        'organization': 1,
                    })
                else:
                    for s in student_metadata:
                        if s['name'] == student['name']:
                            if str(student['parent_cells']) not in s['parent_cells'] and not pd.isna(student['parent_cells']):
                                s['parent_cells'].append(str(student['parent_cells']))
                            if student['parent_email'] not in s['parent_emails'] and not pd.isna(student['parent_email']):
                                s['parent_emails'].append(student['parent_email'])
                            break
    client.table('students').insert(student_metadata).execute()

def insert_attendance():
    attendance_data = []
    for file in files:
        with open(f'out/{file}', 'r') as f:
            data = json.load(f)
            class_id = next((c['id'] for c in classes if c['name'] == data['class_name']), None)
            for student in data['students']:
                student_id = next((s['id'] for s in students if s['name'] == student['name']), None)
                if student_id is None or class_id is None:
                    print('Error: Student or class not found for', student['name'], 'in', data['class_name'])
                    print('Student ID:', student_id, 'Class ID:', class_id)
                    exit(1)
                attendance_data.append({
                    'student_id': student_id,
                    'class_id': class_id,
                    'level': student['level'],
                    'attended_statuses': student['attended_statuses'],
                    'organization': 1,
                })
    client.table('attendance').insert(attendance_data).execute()

if __name__ == '__main__':
    insert_attendance()