# Excel Add-in İkonları

Bu klasör Excel Add-in için gerekli ikon dosyalarını içerir.

## Gerekli İkon Boyutları

Aşağıdaki ikon dosyalarını oluşturmanız gerekiyor:

- `icon-16.png` - 16x16 piksel (toolbar icon)
- `icon-32.png` - 32x32 piksel (default icon)
- `icon-64.png` - 64x64 piksel (high resolution)
- `icon-80.png` - 80x80 piksel (large icon)
- `icon-192.png` - 192x192 piksel (PWA icon)
- `favicon.ico` - 32x32 piksel (browser favicon)

## İkon Tasarım Önerileri

1. **Tasarım**: Excel temasına uygun yeşil tonları (#10b981)
2. **Sembol**: AI/robot başı veya Excel formül sembolu (fx)
3. **Arka Plan**: Şeffaf veya açık yeşil gradient
4. **Format**: PNG (şeffaflık için) veya ICO (favicon için)

## İkon Oluşturma Araçları

- [Favicon.io](https://favicon.io/) - Ücretsiz favicon oluşturucu
- [Real Favicon Generator](https://realfavicongenerator.net/) - Profesyonel favicon seti
- [Canva](https://canva.com) - Online tasarım aracı
- [GIMP](https://gimp.org) - Ücretsiz görüntü editörü
- [Adobe Illustrator](https://adobe.com/illustrator) - Profesyonel vektör editörü

## Mevcut İkon Durumu

❌ icon-16.png - Oluşturulacak
❌ icon-32.png - Oluşturulacak  
❌ icon-64.png - Oluşturulacak
❌ icon-80.png - Oluşturulacak
❌ icon-192.png - Oluşturulacak
❌ favicon.ico - Oluşturulacak

## Hızlı Çözüm

Geliştirme aşamasında, placeholder olarak aşağıdaki URL'leri kullanabilirsiniz:

```xml
<!-- manifest.xml içinde geçici olarak -->
<bt:Image id="ExcelBotAI.Icon16" DefaultValue="https://via.placeholder.com/16x16/10b981/ffffff?text=AI" />
<bt:Image id="ExcelBotAI.Icon32" DefaultValue="https://via.placeholder.com/32x32/10b981/ffffff?text=AI" />
<bt:Image id="ExcelBotAI.Icon80" DefaultValue="https://via.placeholder.com/80x80/10b981/ffffff?text=AI" />
```

## Üretim Öncesi Yapılacaklar

1. Profesyonel ikonlar tasarlatın
2. Tüm boyutlarda ikonları oluşturun
3. manifest.xml ve index.html dosyalarındaki URL'leri güncelleyin
4. İkonları CDN'e yükleyin veya public klasörde barındırın
