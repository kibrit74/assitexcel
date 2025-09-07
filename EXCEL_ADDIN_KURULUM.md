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

Uygulama `https://localhost:5173` adresinde çalışmaya başlayacaktır.

### 3. Ngrok ile Public URL Oluşturma

#### Ngrok Kurulumu

1. [ngrok.com](https://ngrok.com) adresinden ücretsiz hesap oluşturun
2. Ngrok'u indirin: [https://ngrok.com/download](https://ngrok.com/download)
3. Ngrok'u PATH'e ekleyin veya proje klasörüne kopyalayın

#### Ngrok Yapılandırması

```bash
# Ngrok hesabınızla authentication yapın
ngrok config add-authtoken YOUR_AUTH_TOKEN
```

#### Public Tunnel Oluşturma

```bash
# Yeni bir terminal penceresi açın ve çalıştırın:
ngrok http https://localhost:5173

# Çıktı şöyle görünecektir:
# Forwarding https://abc123.ngrok.io -> https://localhost:5173
```

**ÖNEMLİ:** Ngrok size `https://abc123.ngrok.io` gibi bir URL verecektir. Bu URL'i kopyalayın.

### 4. Manifest Dosyasını Güncelleme

`manifest.xml` dosyasını açın ve tüm `https://localhost:5173` URL'lerini ngrok URL'iniz ile değiştirin:

```xml
<!-- Örnek: localhost yerine ngrok URL'ini kullanın -->
<SourceLocation DefaultValue="https://abc123.ngrok.io" />
<bt:Url id="ExcelBotAI.Taskpane.Url" DefaultValue="https://abc123.ngrok.io" />
<!-- Icon URL'lerini de güncellemeyi unutmayın -->
<IconUrl DefaultValue="https://abc123.ngrok.io/icon-32.png" />
```

### 5. Excel'e Eklentiyi Yükleme

#### Yöntem 1: Office 365 / Excel Online

1. Excel Online'ı açın: [office.com](https://office.com)
2. Yeni bir çalışma kitabı oluşturun
3. **Ekle** > **Eklentiler** > **Eklentilerim** seçeneğine tıklayın
4. **Özel Eklentiler** sekmesine geçin
5. **URL'den Ekle** seçeneğini seçin
6. Manifest URL'sini girin: `https://abc123.ngrok.io/manifest.xml`
7. **Ekle** butonuna tıklayın

#### Yöntem 2: Excel Desktop (Windows)

1. Excel'i açın ve yeni bir çalışma kitabı oluşturun
2. **Dosya** > **Seçenekler** > **Güven Merkezi** > **Güven Merkezi Ayarları**
3. **Güvenilir Eklenti Katalogları** seçeneğine gidin
4. Katalog URL'si olarak ngrok URL'inizi ekleyin: `https://abc123.ngrok.io`
5. Excel'i yeniden başlatın
6. **Ekle** > **Eklentilerim** > **Paylaşılan Klasör**
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

## 🔧 Sorun Giderme

### SSL Sertifika Hatası

Tarayıcınız SSL sertifikasını kabul etmiyorsa:
1. `https://localhost:5173` adresini tarayıcıda açın
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

## 📝 Geliştirici Notları

### Yerel Geliştirme (Ngrok olmadan)

Sadece yerel test için:
1. Excel'de self-signed sertifikaları kabul ettirin
2. `manifest.xml`'de `https://localhost:5173` kullanın
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

## 💡 İpuçları

1. **Hızlı Test:** Değişikliklerinizi test etmek için Excel'deki eklentiyi yenilemeniz yeterli (F5 veya görev bölmesini kapatıp açın)
2. **Debugging:** Chrome DevTools kullanarak debugging yapabilirsiniz (F12)
3. **Performance:** Büyük veri setleri ile çalışırken Excel API'nin batch operasyonlarını kullanın
4. **Güvenlik:** Production'da hassas verileri (API anahtarları vb.) environment variable'larda saklayın

## ❓ Yardım ve Destek

Sorun yaşarsanız:
1. GitHub Issues'a bakın
2. Console'daki hata mesajlarını kontrol edin
3. Excel'in eklenti loglarını inceleyin: `%temp%\OfficeAddins`

---

✨ **İyi çalışmalar!** Excel'de AI gücünü kullanmaya hazırsınız! 🎉
