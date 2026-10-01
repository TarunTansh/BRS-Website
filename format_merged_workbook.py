from datetime import date, datetime
from pathlib import Path
from openpyxl import load_workbook
from openpyxl.styles import Font, PatternFill, Alignment
from openpyxl.utils import get_column_letter

path = Path('xls/BRS_merged_job_fair_data.xlsx')
book = load_workbook(path)

for sheet_name in ('Unified Candidates', 'All Source Records'):
    sheet = book[sheet_name]
    headers = [cell.value for cell in sheet[1]]
    dob_columns = [i + 1 for i, header in enumerate(headers) if str(header).strip().lower() == 'date of birth']
    for column in dob_columns:
        for row in range(2, sheet.max_row + 1):
            cell = sheet.cell(row, column)
            if isinstance(cell.value, datetime):
                cell.value = cell.value.date()
            if isinstance(cell.value, date):
                cell.number_format = 'dd-mm-yyyy'

# Put the most complete fields first; preserve original order for ties.
sheet = book['Unified Candidates']
headers = [cell.value for cell in sheet[1]]
counts = {
    index: sum(sheet.cell(row, index).value not in (None, '') for row in range(2, sheet.max_row + 1))
    for index in range(1, sheet.max_column + 1)
}
order = sorted(range(1, sheet.max_column + 1), key=lambda index: (-counts[index], index))
for sheet_name in ('Unified Candidates', 'All Source Records'):
    source = book[sheet_name]
    source_columns = list(source.iter_cols())
    source.delete_cols(1, source.max_column)
    for new_index, old_index in enumerate(order, start=1):
        for row_index, cell in enumerate(source_columns[old_index - 1], start=1):
            target = source.cell(row_index, new_index, cell.value)
            if row_index > 1 and str(source_columns[old_index - 1][0].value).strip().lower() == 'date of birth' and isinstance(cell.value, (date, datetime)):
                target.number_format = 'dd-mm-yyyy'
    fill = PatternFill('solid', fgColor='128C7E')
    for cell in source[1]:
        cell.font = Font(bold=True, color='FFFFFF')
        cell.fill = fill
        cell.alignment = Alignment(horizontal='center', vertical='center', wrap_text=True)
    source.freeze_panes = 'A2'
    source.auto_filter.ref = source.dimensions
    for cells in source.columns:
        width = min(max(max((len(str(cell.value or '')) for cell in cells[:100]), default=10) + 2, 12), 36)
        source.column_dimensions[get_column_letter(cells[0].column)].width = width

readme = book['Read Me']
readme.append(['Column ordering', 'Unified Candidates and All Source Records are ordered by non-empty field count, highest completeness first. Ties retain the previous order.'])
readme.append(['Date format', 'Date of Birth is formatted as dd-mm-yyyy.'])
book.save(path)
print('Updated', path)
print('Column order:', [headers[index - 1] for index in order])
print('Fill counts:', [counts[index] for index in order])
