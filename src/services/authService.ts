import { supabase } from '../lib/supabase'
import bcrypt from 'bcryptjs'
import { DatabaseHistoryItem, UserHistory, AppResult } from '../../types'

export interface LoginCredentials {
  email: string
  password: string
  rememberMe?: boolean
}

export interface RegisterData {
  fullName: string
  email: string
  password: string
  acceptTerms: boolean
}

export class AuthService {
  // Kullanıcı kaydı
  static async register(data: RegisterData) {
    try {
      // Email kontrolü
      const { data: existingUser } = await supabase
        .from('users')
        .select('id')
        .eq('email', data.email)
        .single()

      if (existingUser) {
        throw new Error('Bu email adresi zaten kullanılıyor')
      }

      // Username oluştur (email'den)
      const username = data.email.split('@')[0] + '_' + Math.random().toString(36).substr(2, 5)

      // Şifreyi hashle
      const password_hash = await bcrypt.hash(data.password, 10)

      // Kullanıcıyı veritabanına ekle
      const { data: newUser, error } = await supabase
        .from('users')
        .insert({
          email: data.email,
          full_name: data.fullName,
          username: username,
          password_hash: password_hash,
          is_active: true,
          is_verified: false,
          skill_level: 'beginner',
          preferred_language: 'tr',
          reputation_score: 0,
          total_contributions: 0
        })
        .select()
        .single()

      if (error) {
        console.error('Supabase error:', error)
        throw new Error('Kayıt sırasında bir hata oluştu: ' + error.message)
      }

      return newUser
    } catch (error) {
      console.error('Register error:', error)
      throw error
    }
  }

  // Kullanıcı girişi
  static async login(credentials: LoginCredentials) {
    try {
      // Email ile kullanıcıyı bul
      const { data: user, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', credentials.email)
        .single()

      if (error || !user) {
        throw new Error('Geçersiz email veya şifre')
      }

      // Şifreyi kontrol et
      const isValidPassword = await bcrypt.compare(credentials.password, user.password_hash)
      
      if (!isValidPassword) {
        throw new Error('Geçersiz email veya şifre')
      }

      // Son giriş zamanını güncelle
      await supabase
        .from('users')
        .update({ last_login_at: new Date().toISOString() })
        .eq('id', user.id)

      // Hassas bilgileri kaldır
      const { password_hash, ...safeUser } = user

      // Kullanıcıyı localStorage'a kaydet (opsiyonel)
      if (credentials.rememberMe) {
        localStorage.setItem('currentUser', JSON.stringify(safeUser))
      } else {
        sessionStorage.setItem('currentUser', JSON.stringify(safeUser))
      }

      return safeUser
    } catch (error) {
      console.error('Login error:', error)
      throw error
    }
  }

  // Çıkış yap
  static async logout() {
    localStorage.removeItem('currentUser')
    sessionStorage.removeItem('currentUser')
  }

  // Mevcut kullanıcıyı getir
  static getCurrentUser() {
    const userFromLocal = localStorage.getItem('currentUser')
    const userFromSession = sessionStorage.getItem('currentUser')
    
    if (userFromLocal) {
      return JSON.parse(userFromLocal)
    }
    if (userFromSession) {
      return JSON.parse(userFromSession)
    }
    
    return null
  }

  // Profil güncelle
  static async updateProfile(userId: string, updates: Partial<any>) {
    try {
      const { data, error } = await supabase
        .from('users')
        .update(updates)
        .eq('id', userId)
        .select()
        .single()

      if (error) {
        throw new Error('Profil güncellenirken hata oluştu: ' + error.message)
      }

      // localStorage/sessionStorage'ı güncelle
      const currentUser = this.getCurrentUser()
      if (currentUser) {
        const updatedUser = { ...currentUser, ...data }
        if (localStorage.getItem('currentUser')) {
          localStorage.setItem('currentUser', JSON.stringify(updatedUser))
        } else {
          sessionStorage.setItem('currentUser', JSON.stringify(updatedUser))
        }
      }

      return data
    } catch (error) {
      console.error('Update profile error:', error)
      throw error
    }
  }

  // Şifre sıfırlama isteği
  static async requestPasswordReset(email: string) {
    // Bu gerçek uygulamada email gönderimi yapılmalı
    // Şimdilik sadece simulasyon
    console.log('Password reset requested for:', email)
    return true
  }

  // Geçmiş kaydetme
  static async saveHistory(userId: string, prompt: string, result: AppResult): Promise<UserHistory> {
    try {
      const historyItem: Omit<DatabaseHistoryItem, 'id' | 'created_at' | 'updated_at'> = {
        user_id: userId,
        prompt: prompt,
        result_type: result.type,
        result_data: JSON.stringify(result.data)
      }

      const { data, error } = await supabase
        .from('user_history')
        .insert(historyItem)
        .select()
        .single()

      if (error) {
        console.error('Error saving history:', error)
        throw new Error('Geçmiş kaydedilirken hata oluştu: ' + error.message)
      }

      // Database formatından UI formatına çevir
      const userHistory: UserHistory = {
        id: data.id,
        userId: data.user_id,
        prompt: data.prompt,
        resultType: data.result_type,
        resultData: { type: data.result_type, data: JSON.parse(data.result_data) },
        createdAt: new Date(data.created_at),
        updatedAt: new Date(data.updated_at)
      }

      return userHistory
    } catch (error) {
      console.error('Save history error:', error)
      throw error
    }
  }

  // Kullanıcı geçmişini getir
  static async getUserHistory(userId: string): Promise<UserHistory[]> {
    try {
      const { data, error } = await supabase
        .from('user_history')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(50) // Son 50 kayıt

      if (error) {
        console.error('Error fetching history:', error)
        throw new Error('Geçmiş getirilirken hata oluştu: ' + error.message)
      }

      // Database formatından UI formatına çevir
      const userHistory: UserHistory[] = data.map(item => ({
        id: item.id,
        userId: item.user_id,
        prompt: item.prompt,
        resultType: item.result_type,
        resultData: { type: item.result_type, data: JSON.parse(item.result_data) },
        createdAt: new Date(item.created_at),
        updatedAt: new Date(item.updated_at)
      }))

      return userHistory
    } catch (error) {
      console.error('Get user history error:', error)
      throw error
    }
  }

  // Geçmiş öğesi silme
  static async deleteHistoryItem(userId: string, historyId: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('user_history')
        .delete()
        .eq('id', historyId)
        .eq('user_id', userId) // Güvenlik için kullanıcı kontrolü

      if (error) {
        console.error('Error deleting history item:', error)
        throw new Error('Geçmiş öğesi silinirken hata oluştu: ' + error.message)
      }
    } catch (error) {
      console.error('Delete history item error:', error)
      throw error
    }
  }

  // Tüm geçmişi temizle
  static async clearUserHistory(userId: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('user_history')
        .delete()
        .eq('user_id', userId)

      if (error) {
        console.error('Error clearing history:', error)
        throw new Error('Geçmiş temizlenirken hata oluştu: ' + error.message)
      }
    } catch (error) {
      console.error('Clear history error:', error)
      throw error
    }
  }
}
