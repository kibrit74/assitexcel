-- ================================================
-- EXCEL BOT AI - DATABASE MIGRATION
-- ================================================

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
    example_data JSONB,
    expected_result TEXT,
    difficulty_level VARCHAR(20) CHECK (difficulty_level IN ('beginner', 'intermediate', 'advanced', 'expert')) DEFAULT 'beginner',
    excel_version VARCHAR(50),
    tags TEXT[],
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
    installation_guide TEXT,
    usage_instructions TEXT,
    prerequisites TEXT,
    example_files JSONB,
    difficulty_level VARCHAR(20) CHECK (difficulty_level IN ('beginner', 'intermediate', 'advanced', 'expert')) DEFAULT 'beginner',
    excel_version VARCHAR(50),
    compatibility TEXT[],
    tags TEXT[],
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
    content_id UUID NOT NULL,
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

-- 7. SOSYAL ÖZELLİKLER
-- ================================================

-- Kullanıcı favoriler tablosu
CREATE TABLE IF NOT EXISTS user_favorites (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    content_type VARCHAR(20) NOT NULL,
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

-- Etiketler tablosu
CREATE TABLE IF NOT EXISTS tags (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(50) UNIQUE NOT NULL,
    name_en VARCHAR(50),
    description TEXT,
    color_code VARCHAR(7),
    usage_count INTEGER DEFAULT 0,
    is_featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_tags_name ON tags(name);
CREATE INDEX IF NOT EXISTS idx_tags_usage_count ON tags(usage_count DESC);
