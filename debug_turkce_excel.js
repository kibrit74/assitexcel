// Türkçe Excel Online Add-in Test Scripti
// Browser console'da çalıştırarak Türkçe Excel Online'daki eklenti butonlarını bulun

console.log("🔍 Türkçe Excel Online Eklenti Buton Tarayıcısı");

// Türkçe buton selectorları
const turkceSelectors = [
  // Ana butonlar (Türkçe)
  'button[aria-label*="Ekle"]',
  'button[aria-label*="Eklenti"]',
  'button[aria-label*="Office"]',
  'button[aria-label*="Uygulama"]',
  'button[title*="Ekle"]',
  'button[title*="Eklenti"]',
  
  // İngilizce (fallback)
  'button[aria-label*="Add-ins"]',
  'button[aria-label*="Insert"]',
  'button[aria-label*="Apps"]',
  'button[title*="Add-ins"]',
  'button[title*="Insert"]'
];

console.log("📋 Türkçe Excel'de Aranacak Kelimeler:");
const turkceKelimeler = [
  "ekle", "eklenti", "eklentiler", "eklentilerim",
  "karşıya yükle", "office eklentileri", 
  "uygulama", "uygulamalar", "mağaza",
  "giriş", "ana sayfa", "insert", "add-ins"
];

turkceSelectors.forEach(selector => {
  try {
    const elements = document.querySelectorAll(selector);
    if (elements.length > 0) {
      console.log(`✅ Bulunan: ${selector}`);
      elements.forEach((el, i) => {
        console.log(`   ${i+1}. ${el.textContent || el.getAttribute('aria-label') || el.getAttribute('title')}`);
      });
    }
  } catch (e) {
    // Geçersiz selector, atla
  }
});

// Türkçe metin bazlı arama
const allButtons = Array.from(document.querySelectorAll('button, [role="button"], .ms-Button'));
const turkceButons = allButtons.filter(btn => {
  const text = (btn.textContent || btn.getAttribute('aria-label') || btn.getAttribute('title') || '').toLowerCase();
  return turkceKelimeler.some(kelime => text.includes(kelime));
});

console.log("\n🇹🇷 Türkçe İlgili Butonlar:");
turkceButons.forEach((btn, i) => {
  const text = btn.textContent || btn.getAttribute('aria-label') || btn.getAttribute('title') || 'İsimsiz Buton';
  console.log(`${i+1}. "${text}"`);
  // Butona tıklama fonksiyonu ekle
  console.log(`   Tıklamak için: turkceButons[${i}].click()`);
});

// Sekme analizi
const tabs = Array.from(document.querySelectorAll('[role="tab"], .ms-Pivot-link'));
console.log("\n📑 Mevcut Sekmeler:");
tabs.forEach((tab, i) => {
  const text = tab.textContent || tab.getAttribute('aria-label') || '';
  if (text) {
    console.log(`${i+1}. "${text}"`);
  }
});

console.log("\n💡 Kullanım:");
console.log("1. Yukarıdaki listeden uygun butonu bulun");
console.log("2. turkceButons[INDEX].click() komutuyla tıklayın");
console.log("3. Örnek: turkceButons[0].click()");

// Otomatik buton arama
console.log("\n🔍 Otomatik Arama...");
const potansiyelButonlar = allButtons.filter(btn => {
  const text = (btn.textContent || '').toLowerCase();
  return text.includes('ekle') || text.includes('eklenti') || text.includes('office');
});

if (potansiyelButonlar.length > 0) {
  console.log("✅ Potansiyel eklenti butonları bulundu!");
  potansiyelButonlar.forEach((btn, i) => {
    console.log(`${i+1}. "${btn.textContent}" - Konumu: ${btn.offsetParent ? 'Görünür' : 'Gizli'}`);
  });
} else {
  console.log("❌ Açık eklenti butonu bulunamadı. Farklı sekmeler deneyin.");
}

window.turkceButons = turkceButons; // Global erişim için
