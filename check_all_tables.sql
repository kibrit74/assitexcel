-- ================================================
-- TÜM TABLOLARI VE VIEW'LARI KONTROL ET
-- ================================================

-- 1. Tüm tabloları listele
SELECT 
    'TABLE' as type,
    table_name as name,
    '' as definition
FROM information_schema.tables 
WHERE table_schema = 'public' 
  AND table_type = 'BASE TABLE'

UNION ALL

-- 2. Tüm view'ları listele  
SELECT 
    'VIEW' as type,
    table_name as name,
    '' as definition
FROM information_schema.views
WHERE table_schema = 'public'

ORDER BY type, name;

-- 3. Kategori sayılarını kontrol et
SELECT COUNT(*) as category_count FROM categories;

-- 4. Yardım merkezi içerik sayısını kontrol et
SELECT COUNT(*) as help_center_count FROM help_center;

-- 5. Tüm trigger'ları listele
SELECT 
    trigger_name,
    event_object_table,
    action_timing,
    event_manipulation
FROM information_schema.triggers
WHERE trigger_schema = 'public'
ORDER BY event_object_table, trigger_name;
