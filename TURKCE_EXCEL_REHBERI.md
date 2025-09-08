# 🇹🇷 Türkçe Excel Online - Eklenti Yükleme Rehberi

## ⚡ Hızlı Başlangıç

### 1. Excel Online'ı Açın
- [office.com](https://office.com) → Oturum açın
- **Excel** uygulamasını seçin
- **Boş çalışma kitabı** oluşturun

### 2. Eklenti Yükleme (3 Farklı Yol)

#### 🥇 Microsoft Resmi Yöntemi (2024)
```
Home (Giriş) → Add-ins (Eklentiler) → More Settings (Daha Fazla Ayar) → Upload My Add-in (Eklentimi Karşıya Yükle)
```

#### 🥈 Alternatif Yöntem 1
- Üst menüde farklı sekmeleri (Home, Insert, View) kontrol edin
- **Add-ins**, **Eklentiler**, **Office Add-ins** kelimelerini arayın

#### 🥉 Alternatif Yöntem 2
```
... (3 nokta menü) → Add-ins → Upload My Add-in
```

## 📋 Aranacak Buton İsimleri

### Ana Butonlar:
- ✅ **Ekle** (Insert)
- ✅ **Office Eklentileri** 
- ✅ **Eklentiler** / **Add-ins**
- ✅ **Uygulamalar** / **Apps**

### İkinci Seviye Butonlar:
- ✅ **EKLENTİLERİM** / **MY ADD-INS**
- ✅ **Eklentimi Karşıya Yükle** / **Upload My Add-in**
- ✅ **Eklentilerimi Yönet** / **Manage My Add-ins**

## 🔧 Sorun Giderme

### "Eklenti butonları görünmüyor"
1. **F5** tuşuna basın (sayfayı yenileyin)
2. Farklı sekmeleri kontrol edin (**Giriş**, **Ekle**, **Görünüm**)
3. **...** (Diğer komutlar) menüsüne bakın
4. Browser console'da debug scriptini çalıştırın

### Debug Scripti Kullanımı
```javascript
// Browser'da F12 → Console → Bu kodu yapıştır:
// debug_turkce_excel.js dosyasının içeriğini kopyala-yapıştır
```

### Manifest URL'i
```
https://YOUR_NGROK_URL.ngrok.io/manifest.xml
```

## 🚀 Excel Desktop (Masaüstü) için

### Güvenilir Katalog Ekleme:
1. **Dosya** → **Seçenekler** → **Güven Merkezi**
2. **Güven Merkezi Ayarları** → **Güvenilir Eklenti Katalogları**
3. URL ekle: `https://YOUR_NGROK_URL.ngrok.io`
4. ✅ **Güvenilir** işaretini koy
5. Excel'i yeniden başlat

### Eklenti Yükleme:
```
Ekle → Eklentilerim → Paylaşılan Klasör → ExcelBot AI → Ekle
```

## ⚠️ Dikkat Edilecekler

- 🔄 Ngrok URL'i her seferinde değişir
- ⏰ Ngrok ücretsiz plan 8 saat sınırı var
- 🔒 HTTPS gerekli (SSL sertifika)
- 🌐 İnternet bağlantısı şart

## 📞 Yardım

Hala sorun yaşıyorsanız:
1. **ADDIN_TROUBLESHOOTING.md** dosyasına bakın
2. Console'da hata mesajlarını kontrol edin
3. GitHub Issues'da soru sorun

---

**💡 İpucu:** İlk defa yükleme biraz zaman alabilir. Sabırlı olun! 🚀
