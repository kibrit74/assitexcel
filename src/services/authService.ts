import { supabase } from '../lib/supabase'
import bcrypt from 'bcryptjs'

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
}
