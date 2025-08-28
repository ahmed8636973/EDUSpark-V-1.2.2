import { supabaseAdmin } from "./client"

export async function runMigration() {
  try {
    // إنشاء جدول packages
    let { error } = await supabaseAdmin.from("packages").insert([])
    if (error && error.code !== "42P07") { // 42P07 = table already exists
      console.error("Packages table error:", error.message)
    }

    // إنشاء جدول sub_packages
    const { data: subPackagesData, error: subError } = await supabaseAdmin.rpc("create_sub_packages") // لو عندك function
    // أفضل حل: استخدام direct SQL client للـ Postgres أو Supabase pg client

    console.log("Migration executed successfully")
  } catch (err: any) {
    console.error("Migration error:", err.message)
  }
}

runMigration()
