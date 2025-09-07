import { createClient } from '@supabase/supabase-js'

// Supabase credentials
const supabaseUrl = 'https://lvomdwanwkkuirfoxqaa.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx2b21kd2Fud2trdWlyZm94cWFhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcyNTExMDMsImV4cCI6MjA3MjgyNzEwM30.UiT6O6TJJX9ro09cBcEcHz6bdk1-NL6E46_KUWWAiQU'

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types for our database
export interface User {
  id: string
  email: string
  full_name: string
  username: string
  password_hash?: string
  profile_picture_url?: string
  bio?: string
  skill_level?: 'beginner' | 'intermediate' | 'advanced' | 'expert'
  preferred_language?: 'tr' | 'en'
  is_verified?: boolean
  is_premium?: boolean
  reputation_score?: number
  total_contributions?: number
  created_at?: Date
  updated_at?: Date
  last_login_at?: Date
  is_active?: boolean
}

export interface Formula {
  id: string
  user_id: string
  category_id: string
  title: string
  description?: string
  formula_text: string
  explanation?: string
  explanation_en?: string
  example_data?: any
  expected_result?: string
  difficulty_level?: 'beginner' | 'intermediate' | 'advanced' | 'expert'
  excel_version?: string
  tags?: string[]
  is_public?: boolean
  is_featured?: boolean
  view_count?: number
  copy_count?: number
  rating_average?: number
  rating_count?: number
  status?: 'draft' | 'published' | 'archived' | 'rejected'
  created_at?: Date
  updated_at?: Date
  published_at?: Date
}

export interface Macro {
  id: string
  user_id: string
  category_id: string
  title: string
  description?: string
  vba_code: string
  explanation?: string
  explanation_en?: string
  installation_guide?: string
  usage_instructions?: string
  prerequisites?: string
  example_files?: any
  difficulty_level?: 'beginner' | 'intermediate' | 'advanced' | 'expert'
  excel_version?: string
  compatibility?: string[]
  tags?: string[]
  is_public?: boolean
  is_featured?: boolean
  view_count?: number
  download_count?: number
  rating_average?: number
  rating_count?: number
  status?: 'draft' | 'published' | 'archived' | 'rejected'
  created_at?: Date
  updated_at?: Date
  published_at?: Date
}
