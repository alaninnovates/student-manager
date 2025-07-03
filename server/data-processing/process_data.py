import pandas as pd
import json
import os

files = os.listdir('data')

def is_int(value):
    try:
        int(value)
        return True
    except ValueError:
        return False

def get_level(level):
    level = level.strip().lower()
    if level.startswith('beg'):
        return 'beginner'
    elif level.startswith('int'):
        return 'intermediate'
    elif level.startswith('adv'):
        return 'advanced'

def process_attended_statuses(attended_statuses):
    new_statuses = []
    for status in attended_statuses:
        if pd.isna(status) or status == '':
            new_statuses.append('absent')
            continue
        status = status.strip().lower()
        if status.startswith('in'):
            new_statuses.append('present')
        elif status.startswith('out'):
            new_statuses.append('absent')
        elif status.startswith('excused'):
            new_statuses.append('excused')
        elif status.startswith('late'):
            new_statuses.append('late')
        else:
            print('Unknown status:', status)
            exit(1)
    return new_statuses

for file in files:
    file_path = os.path.join('data', file)
    out_file_path = os.path.join('out', file + '.json')
    df = pd.read_excel(file_path)
    class_name = df.iloc[0, 0]
    print(class_name)
    class_dates = [pd.to_datetime(date).timestamp() for date in df.iloc[0, 6:]]
    students = []
    for index, row in df.iterrows():
        if index == 0:
            continue
        name = row.iloc[1].strip().title()
        grade = is_int(row.iloc[2]) and int(row.iloc[2]) or None
        level = get_level(row.iloc[3])
        parent_cells = row.iloc[4]
        parent_email = row.iloc[5]
        # print(name, grade, level, parent_cells, parent_email)
        attended_statuses = process_attended_statuses(row.iloc[6:].tolist())
        # print(attended_statuses)
        students.append({
            'name': name,
            'grade': grade,
            'level': level,
            'parent_cells': parent_cells,
            'parent_email': parent_email,
            'attended_statuses': attended_statuses
        })
    class_data = {
        'class_name': class_name,
        'class_dates': class_dates,
        'students': students
    }
    with open(out_file_path, 'w') as out_file:
        json.dump(class_data, out_file, indent=4)