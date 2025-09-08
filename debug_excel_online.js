// Excel Online Add-in Test Script
// Browser console'da çalıştırarak Excel Online'daki add-in yükleme butonlarını bulun

console.log("🔍 Excel Online Add-in Buton Tarayıcısı");

// Potansiel buton selectorları
const selectors = [
  // Ana butonlar
  'button[aria-label*="Add-ins"]',
  'button[aria-label*="Insert"]',
  'button[aria-label*="Apps"]',
  'button[title*="Add-ins"]',
  'button[title*="Insert"]',
  
  // Metin içeriği
  'button:contains("Add-ins")',
  'button:contains("Insert")',
  'button:contains("Office Add-ins")',
  'button:contains("Get Add-ins")',
  'button:contains("Apps")',
  
  // Class tabanlı
  '.ms-Button[data-automation-id*="add"]',
  '.ms-Button[data-automation-id*="insert"]',
  
  // Modern Office UI
  '[role="button"][aria-label*="Add"]',
  '[role="button"][aria-label*="Insert"]'
];

selectors.forEach(selector => {
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

// Metin bazlı arama
const allButtons = Array.from(document.querySelectorAll('button, [role="button"]'));
const addinsRelated = allButtons.filter(btn => {
  const text = (btn.textContent || btn.getAttribute('aria-label') || btn.getAttribute('title') || '').toLowerCase();
  return text.includes('add') || text.includes('insert') || text.includes('app') || text.includes('eklenti');
});

console.log("\n📋 Tüm İlgili Butonlar:");
addinsRelated.forEach((btn, i) => {
  console.log(`${i+1}. "${btn.textContent || btn.getAttribute('aria-label') || btn.getAttribute('title')}"`);
});

console.log("\n💡 İpucu: Yukarıdaki butonlardan birini tıklayarak add-in yükleme menüsüne ulaşabilirsiniz.");
