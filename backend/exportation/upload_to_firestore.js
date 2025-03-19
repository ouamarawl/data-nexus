const admin = require("firebase-admin");
const fs = require("fs");

// 🔹 تحميل مفاتيح Firebase (قم بتحديث المسار حسب موقع الملف)
const serviceAccount = require("./firebase-admin-key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

// 🔹 تحميل بيانات JSON
const jsonFilePath = "nexus-data.json";

fs.readFile(jsonFilePath, "utf8", async (err, data) => {
  if (err) {
    console.error("❌ فشل في قراءة ملف JSON:", err);
    return;
  }

  try {
    const jsonData = JSON.parse(data);

    // 🔹 رفع البيانات إلى Firestore
    for (const [collectionName, records] of Object.entries(jsonData)) {
      const collectionRef = db.collection(collectionName);

      for (const record of records) {
        await collectionRef.add(record); // إضافة كل سجل كمستند منفصل
      }

      console.log(`✅ تم رفع البيانات من الجدول: ${collectionName}`);
    }

    console.log("🚀 جميع البيانات رفعت بنجاح إلى Firestore!");
  } catch (parseError) {
    console.error("❌ خطأ في تحليل JSON:", parseError);
  }
});
