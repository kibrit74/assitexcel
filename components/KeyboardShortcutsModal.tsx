
import React, { useEffect } from 'react';

interface KeyboardShortcutsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Shortcut: React.FC<{ keys: string; description: string }> = ({ keys, description }) => (
    <div className="flex justify-between items-center p-2 bg-slate-100/80 rounded">
        <span className="text-slate-600 text-sm">{description}</span>
        <kbd className="px-2 py-1 text-sm font-semibold text-slate-800 bg-slate-200 border border-slate-300 rounded-md">{keys}</kbd>
    </div>
);

const KeyboardIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 8h.01"></path><path d="M12 8h.01"></path><path d="M14 8h.01"></path><path d="M16 8h.01"></path><path d="M8 12h.01"></path><path d="M10 12h.01"></path><path d="M12 12h.01"></path><path d="M14 12h.01"></path><path d="M16 12h.01"></path><path d="M8 16h.01"></path><path d="M10 16h.01"></path><path d="M12 16h.01"></path><rect width="20" height="16" x="2" y="4" rx="2"></rect></svg>
);


export const KeyboardShortcutsModal: React.FC<KeyboardShortcutsModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div 
        className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-labelledby="shortcuts-title"
    >
      <div 
        className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[80vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white/80 backdrop-blur-sm border-b border-slate-200 px-6 py-4 flex justify-between items-center">
          <h2 id="shortcuts-title" className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <span className="text-emerald-600"><KeyboardIcon /></span> Excel Klavye Kısayolları
          </h2>
          <button onClick={onClose} className="text-slate-500 hover:text-slate-800" aria-label="Kapat">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            <div>
                <h3 className="font-bold text-emerald-700 mb-2">Sık Kullanılanlar</h3>
                <div className="space-y-2">
                    <Shortcut keys="Ctrl + C" description="Kopyala" />
                    <Shortcut keys="Ctrl + V" description="Yapıştır" />
                    <Shortcut keys="Ctrl + X" description="Kes" />
                    <Shortcut keys="Ctrl + Z" description="Geri Al" />
                    <Shortcut keys="Ctrl + Y" description="İleri Al" />
                    <Shortcut keys="Ctrl + S" description="Kaydet" />
                    <Shortcut keys="Ctrl + P" description="Yazdır" />
                </div>
            </div>
            <div>
                <h3 className="font-bold text-emerald-700 mb-2">Gezinme</h3>
                <div className="space-y-2">
                    <Shortcut keys="Ctrl + ↓" description="Veri sonuna git" />
                    <Shortcut keys="Ctrl + ↑" description="Veri başına git" />
                    <Shortcut keys="Ctrl + →" description="Veri sağına git" />
                    <Shortcut keys="Ctrl + ←" description="Veri soluna git" />
                    <Shortcut keys="Ctrl + Home" description="A1 hücresine git" />
                    <Shortcut keys="Ctrl + End" description="Son hücreye git" />
                </div>
            </div>
            <div>
                <h3 className="font-bold text-emerald-700 mb-2">Seçim</h3>
                <div className="space-y-2">
                    <Shortcut keys="Ctrl + A" description="Tümünü Seç" />
                    <Shortcut keys="Shift + Space" description="Tüm satırı seç" />
                    <Shortcut keys="Ctrl + Space" description="Tüm sütunu seç" />
                    <Shortcut keys="Ctrl + Shift + ↓" description="Aşağı doğru seç" />
                    <Shortcut keys="Ctrl + Shift + →" description="Sağa doğru seç" />
                </div>
            </div>
             <div>
                <h3 className="font-bold text-emerald-700 mb-2">Formüller</h3>
                <div className="space-y-2">
                    <Shortcut keys="F2" description="Hücreyi düzenle" />
                    <Shortcut keys="Shift + F3" description="Formül Ekle penceresi" />
                    <Shortcut keys="Alt + Enter" description="Hücre içinde alt satır" />
                    <Shortcut keys="Ctrl + '" description="Üstteki formülü kopyala" />
                    <Shortcut keys="Ctrl + Shift + U" description="Formül çubuğunu genişlet" />
                </div>
            </div>
            <div>
                <h3 className="font-bold text-emerald-700 mb-2">Biçimlendirme</h3>
                <div className="space-y-2">
                    <Shortcut keys="Ctrl + B" description="Kalın" />
                    <Shortcut keys="Ctrl + I" description="İtalik" />
                    <Shortcut keys="Ctrl + U" description="Altı Çizili" />
                    <Shortcut keys="Ctrl + 1" description="Hücreleri Biçimlendir" />
                    <Shortcut keys="Ctrl + Shift + $" description="Para Birimi Biçimi" />
                    <Shortcut keys="Ctrl + Shift + %" description="Yüzde Biçimi" />
                </div>
            </div>
            <div>
                <h3 className="font-bold text-emerald-700 mb-2">Veri Yönetimi</h3>
                <div className="space-y-2">
                    <Shortcut keys="Ctrl + F" description="Bul" />
                    <Shortcut keys="Ctrl + H" description="Bul ve Değiştir" />
                    <Shortcut keys="Ctrl + T" description="Tablo Oluştur" />
                    <Shortcut keys="Ctrl + Shift + L" description="Filtre Uygula/Kaldır" />
                    <Shortcut keys="Alt + ↓" description="Filtre listesini aç" />
                    <Shortcut keys="F5" description="Git..." />
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};