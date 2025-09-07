-- ================================================
-- EXCEL BOT AI - COMPLETE DATABASE MIGRATION
-- ================================================
-- Bu dosyayı Supabase Dashboard > SQL Editor'da çalıştırın

-- 1. EXTENSIONS VE TEMEL FONKSİYONLAR
-- ================================================

-- UUID extension'ını etkinleştir
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Updated_at trigger fonksiyonu
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 2. KULLANICI TABLOSU
-- ================================================

-- Kullanıcı tablosu
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    profile_picture_url TEXT,
    bio TEXT,
    skill_level VARCHAR(20) CHECK (skill_level IN ('beginner', 'intermediate', 'advanced', 'expert')) DEFAULT 'beginner',
    preferred_language VARCHAR(10) DEFAULT 'tr',
    is_verified BOOLEAN DEFAULT FALSE,
    is_premium BOOLEAN DEFAULT FALSE,
    reputation_score INTEGER DEFAULT 0,
    total_contributions INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_login_at TIMESTAMP WITH TIME ZONE,
    is_active BOOLEAN DEFAULT TRUE
);

-- Kullanıcı tablosu için indexler
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);
CREATE INDEX IF NOT EXISTS idx_users_reputation ON users(reputation_score DESC);
CREATE INDEX IF NOT EXISTS idx_users_created_at ON users(created_at);

-- Kullanıcı güncelleme trigger'ı
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 3. KATEGORİLER TABLOSU
-- ================================================

-- Kategoriler tablosu
CREATE TABLE IF NOT EXISTS categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    name_en VARCHAR(100) NOT NULL,
    description TEXT,
    description_en TEXT,
    icon_name VARCHAR(50),
    color_code VARCHAR(7), -- hex color
    parent_id UUID REFERENCES categories(id) ON DELETE CASCADE,
    sort_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Kategoriler için indexler
CREATE INDEX IF NOT EXISTS idx_categories_parent ON categories(parent_id);
CREATE INDEX IF NOT EXISTS idx_categories_sort ON categories(sort_order);
CREATE INDEX IF NOT EXISTS idx_categories_active ON categories(is_active);

-- Kategori güncelleme trigger'ı
CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON categories
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Başlangıç kategorileri ekle
INSERT INTO categories (name, name_en, description, description_en, icon_name, color_code) VALUES
('Matematiksel Fonksiyonlar', 'Mathematical Functions', 'SUM, AVERAGE, COUNT gibi temel matematik fonksiyonları', 'Basic math functions like SUM, AVERAGE, COUNT', 'calculator', '#4CAF50'),
('Metin Fonksiyonları', 'Text Functions', 'LEN, CONCATENATE, UPPER gibi metin işleme fonksiyonları', 'Text processing functions like LEN, CONCATENATE, UPPER', 'text_fields', '#2196F3'),
('Tarih ve Zaman', 'Date & Time', 'NOW, DATE, YEAR gibi tarih ve zaman fonksiyonları', 'Date and time functions like NOW, DATE, YEAR', 'schedule', '#FF9800'),
('Mantıksal Fonksiyonlar', 'Logical Functions', 'IF, AND, OR gibi mantıksal işlem fonksiyonları', 'Logical operation functions like IF, AND, OR', 'psychology', '#9C27B0'),
('Arama Fonksiyonları', 'Lookup Functions', 'VLOOKUP, INDEX, MATCH gibi arama fonksiyonları', 'Lookup functions like VLOOKUP, INDEX, MATCH', 'search', '#F44336'),
('Makrolar', 'Macros', 'VBA makroları ve otomatizasyon', 'VBA macros and automation', 'code', '#607D8B'),
('Grafik ve Görselleştirme', 'Charts & Visualization', 'Grafik oluşturma ve veri görselleştirme', 'Chart creation and data visualization', 'bar_chart', '#E91E63')
ON CONFLICT DO NOTHING;

-- 4. FORMÜLLER TABLOSU
-- ================================================

-- Formüller tablosu
CREATE TABLE IF NOT EXISTS formulas (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    category_id UUID NOT NULL REFERENCES categories(id) ON DELETE SET NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    formula_text TEXT NOT NULL,
    explanation TEXT,
    explanation_en TEXT,
    example_data JSONB, -- örnek veri yapısı
    expected_result TEXT, -- beklenen sonuç
    difficulty_level VARCHAR(20) CHECK (difficulty_level IN ('beginner', 'intermediate', 'advanced', 'expert')) DEFAULT 'beginner',
    excel_version VARCHAR(50), -- Excel 2016, 365, etc.
    tags TEXT[], -- etiketler array
    is_public BOOLEAN DEFAULT TRUE,
    is_featured BOOLEAN DEFAULT FALSE,
    view_count INTEGER DEFAULT 0,
    copy_count INTEGER DEFAULT 0,
    rating_average DECIMAL(3,2) DEFAULT 0.00,
    rating_count INTEGER DEFAULT 0,
    status VARCHAR(20) CHECK (status IN ('draft', 'published', 'archived', 'rejected')) DEFAULT 'published',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    published_at TIMESTAMP WITH TIME ZONE
);

-- Formüller tablosu indexleri
CREATE INDEX IF NOT EXISTS idx_formulas_user_id ON formulas(user_id);
CREATE INDEX IF NOT EXISTS idx_formulas_category_id ON formulas(category_id);
CREATE INDEX IF NOT EXISTS idx_formulas_public ON formulas(is_public);
CREATE INDEX IF NOT EXISTS idx_formulas_featured ON formulas(is_featured);
CREATE INDEX IF NOT EXISTS idx_formulas_rating ON formulas(rating_average DESC);
CREATE INDEX IF NOT EXISTS idx_formulas_views ON formulas(view_count DESC);
CREATE INDEX IF NOT EXISTS idx_formulas_created_at ON formulas(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_formulas_status ON formulas(status);
CREATE INDEX IF NOT EXISTS idx_formulas_tags ON formulas USING GIN(tags);

-- Formül güncelleme trigger'ı
CREATE TRIGGER update_formulas_updated_at BEFORE UPDATE ON formulas
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 5. MAKROLAR TABLOSU
-- ================================================

-- Makrolar tablosu
CREATE TABLE IF NOT EXISTS macros (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    category_id UUID NOT NULL REFERENCES categories(id) ON DELETE SET NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    vba_code TEXT NOT NULL,
    explanation TEXT,
    explanation_en TEXT,
    installation_guide TEXT, -- kurulum rehberi
    usage_instructions TEXT, -- kullanım talimatları
    prerequisites TEXT, -- ön koşullar
    example_files JSONB, -- örnek dosya linkleri
    difficulty_level VARCHAR(20) CHECK (difficulty_level IN ('beginner', 'intermediate', 'advanced', 'expert')) DEFAULT 'beginner',
    excel_version VARCHAR(50), -- Excel 2016, 365, etc.
    compatibility TEXT[], -- uyumluluk bilgileri
    tags TEXT[], -- etiketler
    is_public BOOLEAN DEFAULT TRUE,
    is_featured BOOLEAN DEFAULT FALSE,
    view_count INTEGER DEFAULT 0,
    download_count INTEGER DEFAULT 0,
    rating_average DECIMAL(3,2) DEFAULT 0.00,
    rating_count INTEGER DEFAULT 0,
    status VARCHAR(20) CHECK (status IN ('draft', 'published', 'archived', 'rejected')) DEFAULT 'published',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    published_at TIMESTAMP WITH TIME ZONE
);

-- Makrolar tablosu indexleri
CREATE INDEX IF NOT EXISTS idx_macros_user_id ON macros(user_id);
CREATE INDEX IF NOT EXISTS idx_macros_category_id ON macros(category_id);
CREATE INDEX IF NOT EXISTS idx_macros_public ON macros(is_public);
CREATE INDEX IF NOT EXISTS idx_macros_featured ON macros(is_featured);
CREATE INDEX IF NOT EXISTS idx_macros_rating ON macros(rating_average DESC);
CREATE INDEX IF NOT EXISTS idx_macros_downloads ON macros(download_count DESC);
CREATE INDEX IF NOT EXISTS idx_macros_created_at ON macros(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_macros_status ON macros(status);
CREATE INDEX IF NOT EXISTS idx_macros_tags ON macros USING GIN(tags);

-- Makro güncelleme trigger'ı
CREATE TRIGGER update_macros_updated_at BEFORE UPDATE ON macros
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 6. PUANLAMA SİSTEMİ
-- ================================================

-- Puanlama sistemi tablosu
CREATE TABLE IF NOT EXISTS ratings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    content_id UUID NOT NULL, -- formula_id or macro_id
    content_type VARCHAR(20) NOT NULL CHECK (content_type IN ('formula', 'macro')),
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    is_helpful BOOLEAN,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, content_id, content_type)
);

-- Puanlama tablosu indexleri
CREATE INDEX IF NOT EXISTS idx_ratings_user_id ON ratings(user_id);
CREATE INDEX IF NOT EXISTS idx_ratings_content ON ratings(content_id, content_type);
CREATE INDEX IF NOT EXISTS idx_ratings_rating ON ratings(rating);
CREATE INDEX IF NOT EXISTS idx_ratings_created_at ON ratings(created_at DESC);

-- Rating güncelleme trigger'ı
CREATE TRIGGER update_ratings_updated_at BEFORE UPDATE ON ratings
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Formül ve makro rating güncellemesi için trigger fonksiyonu
CREATE OR REPLACE FUNCTION update_content_rating_stats()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' OR TG_OP = 'UPDATE' THEN
        IF NEW.content_type = 'formula' THEN
            UPDATE formulas SET 
                rating_average = (
                    SELECT ROUND(AVG(rating)::numeric, 2) 
                    FROM ratings 
                    WHERE content_id = NEW.content_id AND content_type = 'formula'
                ),
                rating_count = (
                    SELECT COUNT(*) 
                    FROM ratings 
                    WHERE content_id = NEW.content_id AND content_type = 'formula'
                )
            WHERE id = NEW.content_id;
        ELSIF NEW.content_type = 'macro' THEN
            UPDATE macros SET 
                rating_average = (
                    SELECT ROUND(AVG(rating)::numeric, 2) 
                    FROM ratings 
                    WHERE content_id = NEW.content_id AND content_type = 'macro'
                ),
                rating_count = (
                    SELECT COUNT(*) 
                    FROM ratings 
                    WHERE content_id = NEW.content_id AND content_type = 'macro'
                )
            WHERE id = NEW.content_id;
        END IF;
    ELSIF TG_OP = 'DELETE' THEN
        IF OLD.content_type = 'formula' THEN
            UPDATE formulas SET 
                rating_average = (
                    SELECT COALESCE(ROUND(AVG(rating)::numeric, 2), 0) 
                    FROM ratings 
                    WHERE content_id = OLD.content_id AND content_type = 'formula'
                ),
                rating_count = (
                    SELECT COUNT(*) 
                    FROM ratings 
                    WHERE content_id = OLD.content_id AND content_type = 'formula'
                )
            WHERE id = OLD.content_id;
        ELSIF OLD.content_type = 'macro' THEN
            UPDATE macros SET 
                rating_average = (
                    SELECT COALESCE(ROUND(AVG(rating)::numeric, 2), 0) 
                    FROM ratings 
                    WHERE content_id = OLD.content_id AND content_type = 'macro'
                ),
                rating_count = (
                    SELECT COUNT(*) 
                    FROM ratings 
                    WHERE content_id = OLD.content_id AND content_type = 'macro'
                )
            WHERE id = OLD.content_id;
        END IF;
    END IF;
    
    RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

-- Rating trigger'ı
CREATE TRIGGER trigger_update_content_rating_stats
    AFTER INSERT OR UPDATE OR DELETE ON ratings
    FOR EACH ROW EXECUTE FUNCTION update_content_rating_stats();

-- 7. YARDIM MERKEZİ
-- ================================================

-- Yardım merkezi tablosu
CREATE TABLE IF NOT EXISTS help_center (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    title_en VARCHAR(255),
    content TEXT NOT NULL,
    content_en TEXT,
    excerpt TEXT, -- kısa özet
    excerpt_en TEXT,
    category VARCHAR(100) NOT NULL, -- 'tutorial', 'faq', 'troubleshooting', 'tips'
    subcategory VARCHAR(100),
    difficulty_level VARCHAR(20) CHECK (difficulty_level IN ('beginner', 'intermediate', 'advanced', 'expert')) DEFAULT 'beginner',
    tags TEXT[],
    featured_image_url TEXT,
    video_url TEXT, -- YouTube, Vimeo etc.
    related_formulas UUID[], -- ilgili formül ID'leri
    related_macros UUID[], -- ilgili makro ID'leri
    author_id UUID REFERENCES users(id) ON DELETE SET NULL,
    view_count INTEGER DEFAULT 0,
    helpful_count INTEGER DEFAULT 0, -- "Bu yardımcı oldu mu?" yes sayısı
    not_helpful_count INTEGER DEFAULT 0, -- "Bu yardımcı oldu mu?" no sayısı
    rating_average DECIMAL(3,2) DEFAULT 0.00,
    rating_count INTEGER DEFAULT 0,
    is_published BOOLEAN DEFAULT TRUE,
    is_featured BOOLEAN DEFAULT FALSE,
    sort_order INTEGER DEFAULT 0,
    meta_description TEXT, -- SEO için
    meta_keywords TEXT[], -- SEO için
    slug VARCHAR(255) UNIQUE, -- URL için
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    published_at TIMESTAMP WITH TIME ZONE
);

-- Yardım merkezi indexleri
CREATE INDEX IF NOT EXISTS idx_help_center_category ON help_center(category);
CREATE INDEX IF NOT EXISTS idx_help_center_subcategory ON help_center(subcategory);
CREATE INDEX IF NOT EXISTS idx_help_center_published ON help_center(is_published);
CREATE INDEX IF NOT EXISTS idx_help_center_featured ON help_center(is_featured);
CREATE INDEX IF NOT EXISTS idx_help_center_views ON help_center(view_count DESC);
CREATE INDEX IF NOT EXISTS idx_help_center_helpful ON help_center(helpful_count DESC);
CREATE INDEX IF NOT EXISTS idx_help_center_rating ON help_center(rating_average DESC);
CREATE INDEX IF NOT EXISTS idx_help_center_created_at ON help_center(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_help_center_slug ON help_center(slug);
CREATE INDEX IF NOT EXISTS idx_help_center_tags ON help_center USING GIN(tags);

-- Yardım merkezi güncelleme trigger'ı
CREATE TRIGGER update_help_center_updated_at BEFORE UPDATE ON help_center
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Yardım merkezi değerlendirme tablosu
CREATE TABLE IF NOT EXISTS help_center_ratings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    help_center_id UUID NOT NULL REFERENCES help_center(id) ON DELETE CASCADE,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    is_helpful BOOLEAN, -- "Bu yardımcı oldu mu?" cevabı
    comment TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, help_center_id)
);

-- Yardım merkezi rating indexleri
CREATE INDEX IF NOT EXISTS idx_help_center_ratings_user ON help_center_ratings(user_id);
CREATE INDEX IF NOT EXISTS idx_help_center_ratings_content ON help_center_ratings(help_center_id);

-- Yardım merkezi rating güncellemesi için trigger
CREATE OR REPLACE FUNCTION update_help_center_stats()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' OR TG_OP = 'UPDATE' THEN
        UPDATE help_center SET 
            rating_average = (
                SELECT COALESCE(ROUND(AVG(rating)::numeric, 2), 0) 
                FROM help_center_ratings 
                WHERE help_center_id = NEW.help_center_id AND rating IS NOT NULL
            ),
            rating_count = (
                SELECT COUNT(*) 
                FROM help_center_ratings 
                WHERE help_center_id = NEW.help_center_id AND rating IS NOT NULL
            ),
            helpful_count = (
                SELECT COUNT(*) 
                FROM help_center_ratings 
                WHERE help_center_id = NEW.help_center_id AND is_helpful = TRUE
            ),
            not_helpful_count = (
                SELECT COUNT(*) 
                FROM help_center_ratings 
                WHERE help_center_id = NEW.help_center_id AND is_helpful = FALSE
            )
        WHERE id = NEW.help_center_id;
    ELSIF TG_OP = 'DELETE' THEN
        UPDATE help_center SET 
            rating_average = (
                SELECT COALESCE(ROUND(AVG(rating)::numeric, 2), 0) 
                FROM help_center_ratings 
                WHERE help_center_id = OLD.help_center_id AND rating IS NOT NULL
            ),
            rating_count = (
                SELECT COUNT(*) 
                FROM help_center_ratings 
                WHERE help_center_id = OLD.help_center_id AND rating IS NOT NULL
            ),
            helpful_count = (
                SELECT COUNT(*) 
                FROM help_center_ratings 
                WHERE help_center_id = OLD.help_center_id AND is_helpful = TRUE
            ),
            not_helpful_count = (
                SELECT COUNT(*) 
                FROM help_center_ratings 
                WHERE help_center_id = OLD.help_center_id AND is_helpful = FALSE
            )
        WHERE id = OLD.help_center_id;
    END IF;
    
    RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_help_center_stats
    AFTER INSERT OR UPDATE OR DELETE ON help_center_ratings
    FOR EACH ROW EXECUTE FUNCTION update_help_center_stats();

-- 8. SOSYAL ÖZELLİKLER
-- ================================================

-- Kullanıcı aktivite logu tablosu
CREATE TABLE IF NOT EXISTS user_activities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    activity_type VARCHAR(50) NOT NULL, -- 'view', 'copy', 'download', 'rate', 'comment'
    content_type VARCHAR(20) NOT NULL, -- 'formula', 'macro', 'help_center'
    content_id UUID NOT NULL,
    metadata JSONB, -- ek bilgiler
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_user_activities_user_id ON user_activities(user_id);
CREATE INDEX IF NOT EXISTS idx_user_activities_content ON user_activities(content_type, content_id);
CREATE INDEX IF NOT EXISTS idx_user_activities_created_at ON user_activities(created_at DESC);

-- Kullanıcı favoriler tablosu
CREATE TABLE IF NOT EXISTS user_favorites (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    content_type VARCHAR(20) NOT NULL, -- 'formula', 'macro'
    content_id UUID NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, content_type, content_id)
);

CREATE INDEX IF NOT EXISTS idx_user_favorites_user_id ON user_favorites(user_id);
CREATE INDEX IF NOT EXISTS idx_user_favorites_content ON user_favorites(content_type, content_id);

-- Kullanıcı takip sistemi tablosu
CREATE TABLE IF NOT EXISTS user_follows (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    follower_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    following_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(follower_id, following_id),
    CHECK(follower_id != following_id)
);

CREATE INDEX IF NOT EXISTS idx_user_follows_follower ON user_follows(follower_id);
CREATE INDEX IF NOT EXISTS idx_user_follows_following ON user_follows(following_id);

-- Bildirimler tablosu
CREATE TABLE IF NOT EXISTS notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    type VARCHAR(50) NOT NULL, -- 'new_follower', 'new_rating', 'content_featured', etc.
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    data JSONB, -- ek veriler
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_is_read ON notifications(is_read);
CREATE INDEX IF NOT EXISTS idx_notifications_created_at ON notifications(created_at DESC);

-- Etiketler tablosu (tag management)
CREATE TABLE IF NOT EXISTS tags (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(50) UNIQUE NOT NULL,
    name_en VARCHAR(50),
    description TEXT,
    color_code VARCHAR(7), -- hex color
    usage_count INTEGER DEFAULT 0,
    is_featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_tags_name ON tags(name);
CREATE INDEX IF NOT EXISTS idx_tags_usage_count ON tags(usage_count DESC);

-- 9. POPÜLER İÇERİK VIEW'LARI
-- ================================================

-- Popüler formüller view'ı
CREATE OR REPLACE VIEW popular_formulas AS
SELECT 
    f.*,
    u.username as author_username,
    u.full_name as author_name,
    c.name as category_name,
    c.color_code as category_color,
    -- Popülerlik skoru hesaplama (rating * 40 + view_count * 0.1 + copy_count * 2)
    (f.rating_average * 40 + f.view_count * 0.1 + f.copy_count * 2) as popularity_score
FROM formulas f
JOIN users u ON f.user_id = u.id
JOIN categories c ON f.category_id = c.id
WHERE f.is_public = TRUE AND f.status = 'published'
ORDER BY popularity_score DESC, f.rating_average DESC, f.created_at DESC;

-- Popüler makrolar view'ı
CREATE OR REPLACE VIEW popular_macros AS
SELECT 
    m.*,
    u.username as author_username,
    u.full_name as author_name,
    c.name as category_name,
    c.color_code as category_color,
    -- Popülerlik skoru hesaplama (rating * 40 + view_count * 0.1 + download_count * 3)
    (m.rating_average * 40 + m.view_count * 0.1 + m.download_count * 3) as popularity_score
FROM macros m
JOIN users u ON m.user_id = u.id
JOIN categories c ON m.category_id = c.id
WHERE m.is_public = TRUE AND m.status = 'published'
ORDER BY popularity_score DESC, m.rating_average DESC, m.created_at DESC;

-- En çok yıldızlı içerikler view'ı
CREATE OR REPLACE VIEW top_rated_content AS
SELECT 
    'formula' as content_type,
    id,
    title,
    description,
    user_id,
    category_id,
    rating_average,
    rating_count,
    view_count,
    created_at
FROM formulas
WHERE is_public = TRUE AND status = 'published' AND rating_count >= 5

UNION ALL

SELECT 
    'macro' as content_type,
    id,
    title,
    description,
    user_id,
    category_id,
    rating_average,
    rating_count,
    view_count as view_count,
    created_at
FROM macros
WHERE is_public = TRUE AND status = 'published' AND rating_count >= 5

ORDER BY rating_average DESC, rating_count DESC, created_at DESC;

-- 10. İSTATİSTİK VIEW'LARI
-- ================================================

-- İstatistikler için view'lar
CREATE OR REPLACE VIEW user_statistics AS
SELECT 
    u.id,
    u.username,
    u.full_name,
    u.reputation_score,
    COUNT(DISTINCT f.id) as formula_count,
    COUNT(DISTINCT m.id) as macro_count,
    COALESCE(AVG(f.rating_average), 0) as avg_formula_rating,
    COALESCE(AVG(m.rating_average), 0) as avg_macro_rating,
    COUNT(DISTINCT fav.id) as favorites_count,
    COUNT(DISTINCT followers.id) as followers_count,
    COUNT(DISTINCT following.id) as following_count
FROM users u
LEFT JOIN formulas f ON u.id = f.user_id AND f.status = 'published'
LEFT JOIN macros m ON u.id = m.user_id AND m.status = 'published'
LEFT JOIN user_favorites fav ON u.id = fav.user_id
LEFT JOIN user_follows followers ON u.id = followers.following_id
LEFT JOIN user_follows following ON u.id = following.follower_id
GROUP BY u.id, u.username, u.full_name, u.reputation_score;

-- Günlük istatistikler view'ı
CREATE OR REPLACE VIEW daily_stats AS
SELECT 
    DATE(created_at) as date,
    COUNT(*) FILTER (WHERE created_at >= CURRENT_DATE) as today_users,
    COUNT(*) as total_users
FROM users
GROUP BY DATE(created_at)
ORDER BY date DESC;

-- ================================================
-- MİGRATION TAMAMLANDI! 🎉
-- ================================================

-- Kontrol sorgusu - Oluşturulan tabloları listele
SELECT table_name, table_type 
FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;
