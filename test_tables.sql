-- Oluşturulan tabloları kontrol et
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
  AND table_type = 'BASE TABLE'
ORDER BY table_name;

-- Kategorileri kontrol et
SELECT name, name_en, color_code FROM categories;
