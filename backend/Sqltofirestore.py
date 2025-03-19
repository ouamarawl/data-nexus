import firebase_admin
from firebase_admin import credentials, firestore
import json

# تحميل مفاتيح Firebase
cred = credentials.Certificate("path/to/serviceAccountKey.json")
firebase_admin.initialize_app(cred)

# الاتصال بـ Firestore
db = firestore.client()

# تحميل بيانات JSON
json_file_path = "nexus-data.json"
with open(json_file_path, "r", encoding="utf-8") as file:
    data = json.load(file)

# رفع البيانات إلى Firestore
for collection_name, records in data.items():
    collection_ref = db.collection(collection_name)
    
    for record in records:
        doc_ref = collection_ref.add(record)  # إضافة كل سجل كمستند مستقل
        print(f"تمت إضافة {record} إلى {collection_name}")

print("🎉 تم رفع البيانات إلى Firestore بنجاح!")
