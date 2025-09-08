# Excel Add-in Sorun Giderme

## 🚨 Yaygın Sorunlar ve Çözümler

### 0. "Eklenti yükleme seçeneklerini bulamıyorum" (Excel Online)
**Çözüm (Microsoft Resmi Yöntemi):**

1. Excel Online'da üst menüde **Home** (Giriş) sekmesine tıklayın
2. **Add-ins** (Eklentiler) butonunu bulun
3. **More Settings** (Daha Fazla Ayar) butonuna tıklayın
4. Açılan **Office Add-ins** (Office Eklentileri) dialog penceresinde **Upload My Add-in** (Eklentimi Karşıya Yükle) butonunu kullanın

**⚠️ Önemli:** Excel Online arayüzü düzenli olarak güncellenir, bu nedenle butonların tam konumu ve isimleri değişebilir. Aşağıdaki alternatif yolları da deneyebilirsiniz.

**📝 Türkçe Excel'de Aranacak Buton İsimleri:**
- Ekle / Insert
- Office Eklentileri
- Eklentilerim
- Eklentimi Karşıya Yükle
- Uygulamalar
- Mağaza
- Eklenti Al

### 1. "Eklenti yüklenemiyor" hatası
**Çözüm:**
- Excel'i tamamen kapat ve yeniden aç
- Manifest.xml dosyasının doğru konumda olduğunu kontrol et
- Excel'in güncel sürümde olduğunu kontrol et

### 2. "Güvenilmeyen kaynak" uyarısı
**Çözüm:**
- "Güven" veya "Trust" butonuna tıkla
- Excel güvenlik ayarlarından Vercel domain'ini güvenilir listeye ekle

### 3. Eklenti görünmüyor
**Çözüm:**
```powershell
# Excel cache'i temizle
Remove-Item "$env:LOCALAPPDATA\Microsoft\Office\16.0\Wef\*" -Recurse -Force
```

### 4. Office.js yüklenmeme sorunu
**Çözüm:**
- İnternet bağlantınızı kontrol edin
- Güvenlik duvarı ayarlarını kontrol edin
- https://assitexcel.vercel.app adresine tarayıcıdan erişmeyi deneyin

## 🔧 Manuel Kurulum Adımları

1. Excel'i **Yönetici olarak çalıştır**
2. **Dosya** > **Seçenekler** > **Güven Merkezi**
3. **Güven Merkezi Ayarları** > **Güvenilir Eklenti Katalogları**
4. Yeni katalog ekle: `https://assitexcel.vercel.app`
5. "Güvenilir" işaretle ve Excel'i yeniden başlat

## 📝 Logları Kontrol Etme

Excel'de F12 tuşuna basarak Developer Tools'u aç ve Console'da hataları kontrol et.

## 🆘 Son Çare

Eğer hiçbiri çalışmazsa:
1. Excel'i tamamen kaldır ve yeniden yükle
2. Office'i onar: Denetim Masası > Programlar > Office > Değiştir > Hızlı Onarım
