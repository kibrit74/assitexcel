# Excel Add-in Kurulum Kılavuzu 🚀

Bu kılavuz, ExcelBot AI uygulamasını Excel eklentisi olarak nasıl kuracağınızı adım adım açıklar.

## 📋 Gereksinimler

- Node.js (v16 veya üzeri)
- Microsoft Excel (Office 365, Excel 2016 veya üzeri)
- Ngrok hesabı (ücretsiz)
- Chocolatey veya Scoop (mkcert kurulumu için)

## 🛠️ Kurulum Adımları

### 1. SSL Sertifikası Oluşturma

Öncelikle mkcert'i yükleyin:

```bash
# Windows (Chocolatey ile)
choco install mkcert

# Windows (Scoop ile)
scoop bucket add extras
scoop install mkcert

# Alternatif: Manuel kurulum
# https://github.com/FiloSottile/mkcert/releases adresinden indirin
```

Sertifikaları oluşturun:

```bash
# Proje klasöründe çalıştırın
npm run generate-cert
```

Bu komut `certs` klasörü oluşturup içine SSL sertifikalarını yerleştirecektir.

### 2. Uygulamayı HTTPS ile Başlatma

```bash
# Bağımlılıkları yükleyin
npm install

# HTTPS ile development server'ı başlatın
npm run start:addin
```

Uygulama `https://localhost:5174` adresinde çalışmaya başlayacaktır.

### 3. Localhost Üzerinde Çalışma (Ngrok Olmadan)

#### SSL Sertifikası Kontrolü

1. **Sertifikaların mevcut olduğunu kontrol edin:**
   - Proje klasöründe `localhost+2.pem` ve `localhost+2-key.pem` dosyalarının olduğunu doğrulayın
   - Bu dosyalar 2. adımda oluşturulmuş olmalıdır

2. **HTTPS sunucusunun çalıştığını doğrulayın:**
   ```bash
   npm run dev
   ```
   - Tarayıcınızda `https://localhost:5174` adresine gidin
   - Güvenlik uyarısı alırsanız "Gelişmiş" > "localhost'a git" seçeneğini kullanın

#### Localhost URL'ini Kullanma

**ÖNEMLİ:** Excel Add-in'i sadece `https://localhost:5174` URL'ini kullanacaktır. Ngrok gerekmez!

### 3.5. Manifest Dosyasını Kontrol Etme

`manifest.xml` dosyasının localhost URL'lerini kullandığından emin olun:

```xml
<!-- Localhost URL'lerinin doğru olduğunu kontrol edin -->
<SourceLocation DefaultValue="https://localhost:5174" />
<bt:Url id="ExcelBotAI.Taskpane.Url" DefaultValue="https://localhost:5174" />
<!-- Icon URL'lerinin de localhost'u kullandığını kontrol edin -->
<IconUrl DefaultValue="https://localhost:5174/icon-32.png" />
```

**✅ Avantaj:** Localhost kullanımında manifest dosyasını sürekli güncellemenize gerek yoktur!

### 4. Add-in'i Yeniden Yükleyin (Türkçe Excel)

#### 🔄 Türkçe Excel Masaüstü Uygulaması İçin:

1. **Geliştirici sekmesine gidin**
   - Excel'de üst menü çubuğunda **"Geliştirici"** sekmesini bulun
   - Eğer Geliştirici sekmesi görünmüyorsa:
     - **Dosya** > **Seçenekler** > **Şeridi Özelleştir**
     - Sağ tarafta **"Geliştirici"** kutusunu işaretleyin
     - **Tamam**'a tıklayın

2. **Add-in'ler > Office Add-in'leri**
   - **Geliştirici** sekmesinde **"Add-in'ler"** grubunu bulun
   - **"Office Add-in'leri"** butonuna tıklayın
   - Açılan pencerede **"Eklentilerim"** sekmesini seçin

3. **Dosyalarım sekmesinde Karşıya Yükle**
   - **"Dosyalarım"** sekmesine geçin
   - **"Karşıya Yükle"** veya **"Gözat"** butonuna tıklayın
   - Dosya gezgininde proje klasörünüzü bulun

4. **`manifest.xml` dosyasını seçin**
   - Proje klasöründeki `manifest.xml` dosyasını seçin
   - **"Aç"** butonuna tıklayın
   - **"Ekle"** veya **"Yükle"** butonuna tıklayın

#### ⚠️ Önemli Notlar:
- Manifest dosyasının localhost URL'lerini kullandığından emin olun (`https://localhost:5174`)
- Excel'i yönetici olarak çalıştırmanız gerekebilir
- Güvenlik uyarıları çıkarsa **"Güven"** veya **"Devam Et"** seçeneğini seçin
- HTTPS sunucusunun (`npm run dev`) çalıştığından emin olun

### 5. Alternatif: Excel Online Kullanın (Türkçe Excel)

#### 🌐 Excel Online ile Add-in Yükleme (Önerilen Yöntem)

**✅ Türkçe Excel Online Arayüzü İçin:**

### 🔍 Excel Online Menü Yapısı:
- **Dosya** 
- **Giriş** (Ana sayfa)
- **Ekle** 
- **Sayfa Düzeni**
- **Formüller** 
- **Veri** 
- **Gözden Geçir** 
- **Görünüm** 
- **Yardım**

### ✅ Adım Adım Yükleme:

#### 1. **Excel Online'da Ekle Sekmesi:**
1. [office.com](https://office.com) adresinden Excel Online'ı açın
2. Yeni bir çalışma kitabı oluşturun veya mevcut birini açın
3. Üst menüde **"Ekle"** sekmesine tıklayın
4. **"Office Eklentileri"** butonunu bulun ve tıklayın

#### 2. **Eklenti Mağazasından:**
1. Açılan pencerede **"Mağaza"** sekmesini seçin
2. Arama kutusuna **"ExcelBot"** veya **"AI"** yazın
3. Eklentinizi bulun ve **"Ekle"** butonuna tıklayın

#### 3. **Manuel Yükleme (Geliştirici Modu):**
1. **"Eklentilerim"** sekmesine geçin
2. **"Dosyalarım"** alt sekmesini seçin
3. **"Karşıya Yükle"** butonuna tıklayın
4. Localhost URL'lerini içeren `manifest.xml` dosyasını seçin
5. **"Yükle"** butonuna tıklayın

**💡 İpucu:** Localhost kullanımında manifest dosyasını sürekli güncellemenize gerek yoktur!

### 🚫 Yaygın Hatalar ve Çözümleri:

**Hata:** "Geçerli bir Eklenti değil"
**Çözüm:** 
- Manifest.xml dosyasının doğru formatta olduğundan emin olun
- Ngrok URL'lerinin güncel olduğunu kontrol edin
- XML syntax hatalarını düzeltin

**Hata:** "Güvenlik sertifikası sorunu"
**Çözüm:**
- HTTPS bağlantısının çalıştığını doğrulayın
- Ngrok tunnel'ının aktif olduğunu kontrol edin
- Tarayıcıda sertifika uyarılarını kabul edin

#### Yöntem 2: Excel Masaüstü (Windows - Türkçe)

1. Excel'i açın ve yeni bir çalışma kitabı oluşturun
2. **Dosya** > **Seçenekler** > **Güven Merkezi** > **Güven Merkezi Ayarları**
3. **Güvenilir Eklenti Katalogları** seçeneğine gidin
4. Katalog URL'si olarak ngrok URL'inizi ekleyin: `https://abc123.ngrok.io`
5. "Güvenilir" seçeneğini işaretleyin ve Excel'i yeniden başlatın
6. **Ekle** > **Eklentilerim** > **Paylaşılan Klasör** (veya **Office Eklentileri**)
7. ExcelBot AI'yi listeden seçin ve **Ekle**'ye tıklayın

#### Yöntem 3: Sideloading (Geliştirici Modu)

1. `manifest.xml` dosyasını bilgisayarınıza indirin
2. Excel'de **Ekle** > **Eklentilerim** > **Eklentilerim**
3. **Paylaşılan Klasör** sekmesinde **Gözat** butonuna tıklayın
4. İndirdiğiniz `manifest.xml` dosyasını seçin
5. **Aç** ve ardından **Ekle** butonlarına tıklayın

### 6. Eklentiyi Kullanma

1. Excel ribbon'da (üst menü) **Ana Sayfa** sekmesinde **AI Yardımcı** grubunu bulun
2. **ExcelBot AI** butonuna tıklayın
3. Sağ tarafta görev bölmesi (task pane) açılacaktır
4. Artık Excel içinden AI destekli formül ve makro oluşturabilirsiniz!

#### Temel İşlemler:

**📊 Formül Üretme:**
- Türkçe açıklama girin: "Bu ayın toplam satışlarını hesapla"
- AI size Excel formülü önerecektir
- "Excel'e Yaz" butonuyla formülü seçili hücreye yazın

**🤖 VBA Makro Oluşturma:**
- Makro istediğinizi yazın: "Boş satırları sil"
- Oluşturulan VBA kodunu kopyalayın
- Alt+F11 ile VBA Editor'ü açıp yapıştırın

**📋 Geçmiş Yönetimi:**
- Daha önce oluşturduğunuz formülleri görüntüleyin
- Profil sayfanızdan geçmiş formülleri tekrar kullanın
- İstenmeyen formülleri silin

## 🔧 Sorun Giderme

### SSL Sertifika Hatası

Tarayıcınız SSL sertifikasını kabul etmiyorsa:
1. `https://localhost:5174` adresini tarayıcıda açın
2. "Gelişmiş" seçeneğine tıklayın
3. "localhost'a devam et (güvenli değil)" seçeneğini seçin

### Ngrok Bağlantı Sorunları

- Ngrok ücretsiz plan session süresi sınırlıdır (8 saat)
- Session sona erdiğinde ngrok'u yeniden başlatın ve yeni URL ile manifest'i güncelleyin
- Ngrok tunnel'ı her başlatıldığında farklı bir URL oluşturur

### Excel'de Eklenti Görünmüyor

1. Excel'i tamamen kapatıp yeniden açın
2. Önbelleği temizleyin: `%LOCALAPPDATA%\Microsoft\Office\16.0\Wef\`
3. Internet Explorer'da güvenlik ayarlarını kontrol edin (Excel, IE ayarlarını kullanır)

### 🚑 Acil Durum İçin Hızlı Çözümler:
1. Excel'i **yönetici olarak** çalıştırın
2. Manifest dosyasını tekrar yükleyin 
3. İnternet bağlantınızı kontrol edin
4. Tarayıcı önbelleğini temizleyip Excel Online'da deneyin
5. Güvenlik ayarlarından eklentiye izin verildiğinden emin olun

**📝 Detaylı sorun giderme:** `ADDIN_TROUBLESHOOTING.md` dosyasına bakın.

## 📝 Geliştirici Notları

### Yerel Geliştirme (Ngrok olmadan)

Sadece yerel test için:
1. Excel'de self-signed sertifikaları kabul ettirin
2. `manifest.xml`'de `https://localhost:5174` kullanın
3. Bu yöntem sadece geliştirme ortamı içindir

### Üretim Dağıtımı

Üretim için:
1. Uygulamayı gerçek bir HTTPS sunucusuna deploy edin (Vercel, Netlify, Azure vb.)
2. Manifest'teki tüm URL'leri production URL'leri ile güncelleyin
3. Microsoft AppSource'a yayınlamayı düşünün

## 🔗 Faydalı Linkler

- [Office Add-ins Dokümantasyonu](https://docs.microsoft.com/en-us/office/dev/add-ins/)
- [Excel JavaScript API](https://docs.microsoft.com/en-us/office/dev/add-ins/reference/overview/excel-add-ins-reference-overview)
- [Ngrok Dokümantasyonu](https://ngrok.com/docs)
- [Manifest XML Schema](https://docs.microsoft.com/en-us/office/dev/add-ins/reference/manifest/officeapp)

## 🎯 Excel Add-in Özel Özellikleri

### Otomatik Excel Verisi Yükleme
Eklenti Excel içinde çalıştığında:
- Mevcut çalışma kitabındaki tüm sayfalar otomatik yüklenir
- Veri analizi otomatik başlatılır
- Dosya yükleme adımı atlanır

### Formül Excel'e Doğrudan Yazma
- Oluşturulan formüller seçili hücreye doğrudan yazılır
- "Excel'e Yaz" butonu ile tek tıkla formül eklenir
- Canlı formül önizleme desteklenir

### VBA Makro Entegrasyonu
- Makro kodları otomatik panoya kopyalanır
- VBA editörüne (Alt+F11) kolay yapıştırma
- Office güvenlik kısıtlamaları nedeniyle manuel yapıştırma gereklidir

## 🔧 Gelişmiş Yapılandırma

### Environment Variables (.env dosyası)
```bash
# Proje kök dizininde .env dosyası oluşturun
GEMINI_API_KEY=your_gemini_api_key_here
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
```

### SSL Sertifika Sorunları
Windows'ta mkcert sorunları:
```bash
# Chocolatey ile mkcert kurulumu
choco install mkcert

# Root CA sertifikalarını yükle
mkcert -install

# Localhost için sertifika oluştur
mkcert -key-file ./certs/localhost-key.pem -cert-file ./certs/localhost.pem localhost 127.0.0.1 ::1
```

### Vite HTTPS Yapılandırması
`vite.config.ts` dosyasının HTTPS ayarları:
```typescript
export default defineConfig(({ mode }) => ({
  server: {
    https: {
      key: fs.readFileSync('./certs/localhost-key.pem'),
      cert: fs.readFileSync('./certs/localhost.pem'),
    },
    port: 5174,
    host: true, // External erişim için
    cors: true
  }
}));
```

## 🚀 Farklı Deployment Seçenekleri

### 1. Vercel Deployment
```bash
# Vercel CLI yükle
npm i -g vercel

# Deploy et
vercel --prod

# Custom domain bağla
vercel domains add yourdomain.com
```

### 2. Netlify Deployment
```bash
# Build komutu
npm run build

# Netlify'a manuel upload veya GitHub entegrasyonu
# netlify.toml dosyası:
[build]
  command = "npm run build"
  publish = "dist"
```

### 3. Azure Static Web Apps
```bash
# Azure CLI ile deployment
az staticwebapp create --name excelbot-ai --source https://github.com/yourusername/yourrepo
```

## 📱 Mobil ve Tablet Desteği

### Excel Mobile Apps
- iOS ve Android Excel uygulamaları eklentileri destekler
- Responsive tasarım sayesinde küçük ekranlarda da kullanılabilir
- Touch-friendly arayüz elementleri

### Excel Online
- Tam özellikli add-in desteği
- Cross-platform uyumluluğu
- Gerçek zamanlı işbirliği

## 🔒 Güvenlik ve İzinler

### Required Permissions
`manifest.xml`'de tanımlanan izinler:
- `ReadWriteDocument`: Excel dosyasını okuma/yazma
- `ReadAllDocument`: Tüm sayfalara erişim

### Güvenlik Best Practices
1. **API Anahtarları**: Environment variables kullanın
2. **HTTPS**: Her zaman SSL sertifikası kullanın
3. **CORS**: Sadece gerekli domainlere izin verin
4. **Input Validation**: Kullanıcı girişlerini doğrulayın

## 💡 İpuçları ve En İyi Uygulamalar

### Geliştirme
1. **Hızlı Test:** Değişikliklerinizi test etmek için Excel'deki eklentiyi yenilemeniz yeterli (F5 veya görev bölmesini kapatıp açın)
2. **Debugging:** Chrome DevTools kullanarak debugging yapabilirsiniz (F12)
3. **Hot Reload:** Vite dev server otomatik yenileme sağlar
4. **Error Handling:** Excel API hatalarını yakala ve kullanıcı dostu mesajlar göster

### Performance
1. **Batch Operations:** Büyük veri setleri ile çalışırken Excel API'nin batch operasyonlarını kullanın
2. **Lazy Loading:** Büyük komponenleri lazy load edin
3. **Memoization:** React.memo ve useMemo kullanın
4. **Virtual Scrolling:** Büyük tablolar için virtual scrolling implementasyonu

### Güvenlik
1. **Environment Variables:** Production'da hassas verileri (API anahtarları vb.) environment variable'larda saklayın
2. **Input Sanitization:** Kullanıcı girdilerini temizleyin
3. **Rate Limiting:** API çağrılarını sınırlandırın
4. **Error Logging:** Hataları güvenli şekilde loglayın

## 🏢 Enterprise Deployment

### Microsoft 365 Admin Center
1. SharePoint App Catalog'a yükleyin
2. Organizasyon genelinde dağıtın
3. Merkezi yönetim ve güvenlik politikaları

### Group Policy
```xml
<!-- Administrative template for domain deployment -->
<policy name="ExcelBotAI" displayName="ExcelBot AI Add-in">
  <key>HKEY_CURRENT_USER\Software\Microsoft\Office\16.0\WEF\Developer</key>
  <valueName>EnableLogging</valueName>
  <value>1</value>
</policy>
```

## ❓ Yardım ve Destek

Sorun yaşarsanız:
1. GitHub Issues'a bakın
2. Console'daki hata mesajlarını kontrol edin
3. Excel'in eklenti loglarını inceleyin: `%temp%\OfficeAddins`

---

✨ **İyi çalışmalar!** Excel'de AI gücünü kullanmaya hazırsınız! 🎉
