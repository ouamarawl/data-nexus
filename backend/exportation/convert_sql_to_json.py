import re
import json

# تحديد مسار ملف SQL الصحيح
sql_file_path = "nexus-data.sql"  # تأكد من أن الملف موجود في هذا المسار

# قراءة محتوى ملف SQL
try:
    with open(sql_file_path, "r", encoding="utf-8") as file:
        sql_content = file.readlines()  # قراءة الأسطر وحفظها في قائمة
except FileNotFoundError:
    print(f"❌ الملف {sql_file_path} غير موجود! تأكد من المسار الصحيح.")
    exit()

# تخزين البيانات المنظمة
structured_data = {}
current_table = None
columns = []

for line in sql_content:
    line = line.strip()

    # التحقق من بداية جملة INSERT
    table_match = re.match(r"INSERT INTO `(\w+)` \((.*?)\) VALUES", line)
    if table_match:
        current_table = table_match.group(1)
        columns = [col.strip("` ") for col in table_match.group(2).split(",")]
        structured_data[current_table] = []
        continue

    # التحقق من وجود بيانات فعلية
    if current_table and line.startswith("("):
        values_match = re.findall(r"\((.*?)\)", line)
        for value_set in values_match:
            values = re.split(r",(?=(?:[^']*'[^']*')*[^']*$)", value_set)
            values = [val.strip(" '") for val in values]
            row = dict(zip(columns, values))
            structured_data[current_table].append(row)

# حفظ البيانات في ملف JSON
json_file_path = "nexus-data.json"
with open(json_file_path, "w", encoding="utf-8") as json_file:
    json.dump(structured_data, json_file, indent=4, ensure_ascii=False)

print(f"✅ تم تحويل بيانات SQL إلى JSON وحفظها في {json_file_path}")
