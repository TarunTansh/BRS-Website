from datetime import date, datetime
from pathlib import Path
import re
import openpyxl

folder = Path('xls')
merged_path = folder / 'BRS_merged_job_fair_data.xlsx'
compare_folder = folder / 'compare'


def normalize_header(value):
    return re.sub(r'\s+', ' ', str(value).strip().lower()) if value is not None else ''


def text(value):
    if value is None:
        return ''
    if isinstance(value, (datetime, date)):
        return value.isoformat()
    return str(value).strip()


def normalize_phone(value):
    digits = re.sub(r'\D', '', text(value))
    return digits[-10:] if len(digits) >= 10 else digits


def normalize_date(value):
    if isinstance(value, datetime):
        return value.date()
    if isinstance(value, date):
        return value
    raw = text(value)
    for fmt in ('%Y-%m-%d', '%d/%m/%Y', '%d-%m-%Y', '%m/%d/%Y', '%d.%m.%Y', '%d/%m/%y', '%d-%m-%y'):
        try:
            return datetime.strptime(raw, fmt).date()
        except ValueError:
            pass
    return None


def header_map(headers):
    return {normalize_header(value): index for index, value in enumerate(headers) if value is not None}


def source_records():
    records = []
    for path in sorted(compare_folder.glob('*.xlsx')):
        book = openpyxl.load_workbook(path, read_only=True, data_only=True)
        for sheet in book.worksheets:
            rows = sheet.iter_rows(values_only=True)
            headers = list(next(rows, ()))
            indexes = header_map(headers)
            for row_number, row in enumerate(rows, 2):
                values = list(row)
                if not any(text(value) for value in values):
                    continue
                get = lambda name: text(values[indexes[name]]) if name in indexes and indexes[name] < len(values) else ''
                records.append({
                    'phone': normalize_phone(get('phone number')),
                    'candidate_name': get('name'),
                    'gender': get('gender'),
                    'date_of_birth': normalize_date(get('date of birth')) or get('date of birth'),
                    'location': get('city') or get('area'),
                    'source_file': path.name,
                    'source_row': row_number,
                })
    return records


def nonempty(value):
    return value not in (None, '')

compare_records = source_records()
compare_by_phone = {}
for record in compare_records:
    if record['phone']:
        compare_by_phone.setdefault(record['phone'], []).append(record)

book = openpyxl.load_workbook(merged_path)
updated = {'Unified Candidates': 0, 'All Source Records': 0}
filled = {}
matched = 0
unmatched = []

for sheet_name in ('Unified Candidates', 'All Source Records'):
    sheet = book[sheet_name]
    headers = [cell.value for cell in sheet[1]]
    indexes = {str(value).strip(): index + 1 for index, value in enumerate(headers) if value is not None}
    phone_column = indexes['Phone Number']
    target_fields = {
        'Candidate Name': 'candidate_name',
        'Location': 'location',
        'Gender': 'gender',
        'Date of Birth': 'date_of_birth',
    }
    if 'Age' in indexes:
        target_fields['Age'] = None
    for row_number in range(2, sheet.max_row + 1):
        phone_value = normalize_phone(sheet.cell(row_number, phone_column).value)
        matches = compare_by_phone.get(phone_value, []) if phone_value else []
        if not matches:
            continue
        matched += 1 if sheet_name == 'Unified Candidates' else 0
        for target, source_key in target_fields.items():
            if source_key is None or target not in indexes:
                continue
            target_cell = sheet.cell(row_number, indexes[target])
            if nonempty(target_cell.value):
                continue
            source_value = next((item[source_key] for item in matches if nonempty(item[source_key])), '')
            if not nonempty(source_value):
                continue
            target_cell.value = source_value
            if target == 'Date of Birth' and isinstance(source_value, date):
                target_cell.number_format = 'dd-mm-yyyy'
            updated[sheet_name] += 1
            filled[target] = filled.get(target, 0) + 1

    if 'Age' in indexes and 'Date of Birth' in indexes:
        for row_number in range(2, sheet.max_row + 1):
            birth_date = normalize_date(sheet.cell(row_number, indexes['Date of Birth']).value)
            sheet.cell(row_number, indexes['Age']).value = ''
            if birth_date:
                age_years = date.today().year - birth_date.year - ((date.today().month, date.today().day) < (birth_date.month, birth_date.day))
                if 0 <= age_years <= 100:
                    sheet.cell(row_number, indexes['Age']).value = age_years

# Report compare phone numbers that do not exist in the unified candidate sheet.
unified = book['Unified Candidates']
unified_phone_column = next(index + 1 for index, cell in enumerate(unified[1]) if cell.value == 'Phone Number')
unified_phones = {normalize_phone(unified.cell(row, unified_phone_column).value) for row in range(2, unified.max_row + 1)}
for phone_number, records in compare_by_phone.items():
    if phone_number not in unified_phones:
        unmatched.append((phone_number, records[0]['source_file'], records[0]['source_row']))

# Keep rows with the original ordering, but place more complete rows first.
final_columns = ['Candidate Name', 'Phone Number', 'Location', 'Highest Qualification', 'Gender', 'Date of Birth', 'Experience Years', 'Experience Months', 'Client Name', 'Remarks', 'RC Name', 'Age']
for sheet_name in ('Unified Candidates', 'All Source Records'):
    sheet = book[sheet_name]
    headers = [cell.value for cell in sheet[1]]
    indexes = [headers.index(column) for column in final_columns if column in headers]
    rows = [list(row) for row in sheet.iter_rows(min_row=2, values_only=True)]
    indexed = list(enumerate(rows))
    indexed.sort(key=lambda item: (-sum(item[1][index] not in (None, '') for index in indexes), item[0]))
    sheet.delete_rows(2, sheet.max_row)
    for _, row in indexed:
        sheet.append(row)
    dob_column = headers.index('Date of Birth') + 1
    for row_number in range(2, sheet.max_row + 1):
        if isinstance(sheet.cell(row_number, dob_column).value, (date, datetime)):
            sheet.cell(row_number, dob_column).number_format = 'dd-mm-yyyy'

readme = book['Read Me']
readme.append(['Compare update', f'Filled blank fields from {len(compare_records)} compare responses matched by normalized phone number. Existing values were not overwritten.'])
readme.append(['Fields filled', ', '.join(f'{field}: {count}' for field, count in filled.items()) or 'None'])
readme.append(['Unmatched compare phones', len(unmatched)])
book.save(merged_path)
print('Compare records:', len(compare_records))
print('Unique compare phones:', len(compare_by_phone))
print('Matched unified candidates:', matched)
print('Fields filled:', filled)
print('Unmatched unique phones:', len(unmatched))
for item in unmatched[:20]:
    print('UNMATCHED', item)
