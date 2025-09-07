-- ================================================
-- EXCEL BOT AI - EKSİK TABLOLAR VE VIEW'LAR
-- ================================================

-- 1. YARDIM MERKEZİ TABLOları
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

-- 2. KULLANICI AKTİVİTE TABLOSU
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
CREATE INDEX IF NOT EXISTS idx_user_activities_type ON user_activities(activity_type);

-- 3. BİLDİRİM SİSTEMİ
-- ================================================

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
CREATE INDEX IF NOT EXISTS idx_notifications_type ON notifications(type);

-- 4. POPÜLER İÇERİK VIEW'LARI
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
WHERE is_public = TRUE AND status = 'published' AND rating_count >= 3

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
WHERE is_public = TRUE AND status = 'published' AND rating_count >= 3

ORDER BY rating_average DESC, rating_count DESC, created_at DESC;

-- 5. İSTATİSTİK VIEW'LARI
-- ================================================

-- İstatistikler için view'lar
CREATE OR REPLACE VIEW user_statistics AS
SELECT 
    u.id,
    u.username,
    u.full_name,
    u.reputation_score,
    u.created_at as user_since,
    COUNT(DISTINCT f.id) as formula_count,
    COUNT(DISTINCT m.id) as macro_count,
    COALESCE(AVG(f.rating_average), 0)::numeric(3,2) as avg_formula_rating,
    COALESCE(AVG(m.rating_average), 0)::numeric(3,2) as avg_macro_rating,
    COUNT(DISTINCT fav.id) as favorites_count,
    COUNT(DISTINCT followers.id) as followers_count,
    COUNT(DISTINCT following.id) as following_count,
    SUM(COALESCE(f.view_count, 0) + COALESCE(m.view_count, 0)) as total_views,
    SUM(COALESCE(f.copy_count, 0) + COALESCE(m.download_count, 0)) as total_downloads
FROM users u
LEFT JOIN formulas f ON u.id = f.user_id AND f.status = 'published' AND f.is_public = TRUE
LEFT JOIN macros m ON u.id = m.user_id AND m.status = 'published' AND m.is_public = TRUE
LEFT JOIN user_favorites fav ON u.id = fav.user_id
LEFT JOIN user_follows followers ON u.id = followers.following_id
LEFT JOIN user_follows following ON u.id = following.follower_id
GROUP BY u.id, u.username, u.full_name, u.reputation_score, u.created_at;

-- Günlük istatistikler view'ı
CREATE OR REPLACE VIEW daily_stats AS
SELECT 
    DATE(created_at) as date,
    COUNT(*) FILTER (WHERE DATE(created_at) = CURRENT_DATE) as today_users,
    COUNT(*) as total_users_until_date
FROM users
GROUP BY DATE(created_at)
ORDER BY date DESC;

-- İçerik istatistikleri view'ı
CREATE OR REPLACE VIEW content_statistics AS
SELECT 
    'formulas' as content_type,
    COUNT(*) as total_count,
    COUNT(*) FILTER (WHERE is_public = TRUE AND status = 'published') as public_count,
    COUNT(*) FILTER (WHERE is_featured = TRUE) as featured_count,
    AVG(rating_average)::numeric(3,2) as avg_rating,
    SUM(view_count) as total_views,
    SUM(copy_count) as total_copies,
    MAX(created_at) as latest_content
FROM formulas

UNION ALL

SELECT 
    'macros' as content_type,
    COUNT(*) as total_count,
    COUNT(*) FILTER (WHERE is_public = TRUE AND status = 'published') as public_count,
    COUNT(*) FILTER (WHERE is_featured = TRUE) as featured_count,
    AVG(rating_average)::numeric(3,2) as avg_rating,
    SUM(view_count) as total_views,
    SUM(download_count) as total_downloads,
    MAX(created_at) as latest_content
FROM macros

UNION ALL

SELECT 
    'help_center' as content_type,
    COUNT(*) as total_count,
    COUNT(*) FILTER (WHERE is_published = TRUE) as public_count,
    COUNT(*) FILTER (WHERE is_featured = TRUE) as featured_count,
    AVG(rating_average)::numeric(3,2) as avg_rating,
    SUM(view_count) as total_views,
    0 as total_downloads,
    MAX(created_at) as latest_content
FROM help_center;

-- Kategori istatistikleri view'ı
CREATE OR REPLACE VIEW category_statistics AS
SELECT 
    c.id,
    c.name,
    c.name_en,
    c.color_code,
    COUNT(f.id) as formula_count,
    COUNT(m.id) as macro_count,
    (COUNT(f.id) + COUNT(m.id)) as total_content_count,
    COALESCE(AVG(f.rating_average), 0)::numeric(3,2) as avg_formula_rating,
    COALESCE(AVG(m.rating_average), 0)::numeric(3,2) as avg_macro_rating,
    SUM(COALESCE(f.view_count, 0) + COALESCE(m.view_count, 0)) as total_views
FROM categories c
LEFT JOIN formulas f ON c.id = f.category_id AND f.status = 'published' AND f.is_public = TRUE
LEFT JOIN macros m ON c.id = m.category_id AND m.status = 'published' AND m.is_public = TRUE
GROUP BY c.id, c.name, c.name_en, c.color_code
ORDER BY total_content_count DESC;

-- 6. BAŞLANGIÇ YARDIM MERKEZİ İÇERİKLERİ
-- ================================================

INSERT INTO help_center (title, title_en, content, content_en, excerpt, excerpt_en, category, difficulty_level, slug, is_featured) VALUES
(
    'Excel''e Giriş: Temel Fonksiyonlar', 
    'Introduction to Excel: Basic Functions',
    'Excel''de en çok kullanılan temel fonksiyonları öğrenin. SUM, AVERAGE, COUNT ve daha fazlası...', 
    'Learn the most commonly used basic functions in Excel. SUM, AVERAGE, COUNT and more...',
    'Excel''in temel fonksiyonlarını öğrenmek için başlangıç rehberi',
    'Getting started guide to learn Excel basic functions',
    'tutorial',
    'beginner',
    'excel-giris-temel-fonksiyonlar',
    TRUE
),
(
    'VLOOKUP Nasıl Kullanılır?', 
    'How to Use VLOOKUP?',
    'VLOOKUP fonksiyonu ile veri arama işlemlerini nasıl yapacağınızı adım adım öğrenin...', 
    'Learn step by step how to perform data lookup operations with VLOOKUP function...',
    'VLOOKUP fonksiyonunu kullanarak veri arama',
    'Data lookup using VLOOKUP function',
    'tutorial',
    'intermediate',
    'vlookup-nasil-kullanilir',
    TRUE
),
(
    'Excel Makrolarına Giriş', 
    'Introduction to Excel Macros',
    'VBA makroları ile Excel''de otomatizasyon yapmanın temellerini öğrenin...', 
    'Learn the basics of automation in Excel with VBA macros...',
    'Excel''de makro kullanımının temelleri',
    'Basics of macro usage in Excel',
    'tutorial',
    'advanced',
    'excel-makrolarina-giris',
    FALSE
)
ON CONFLICT (slug) DO NOTHING;
