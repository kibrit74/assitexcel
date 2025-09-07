import React, { useState } from 'react';
import ModernFooter from './ModernFooter';

// Icon Components
const CheckIcon = () => (
    <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
);

const StarIcon = () => (
    <svg className="w-5 h-5 text-yellow-500 fill-current" viewBox="0 0 24 24">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
);

const RocketIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
);

const CrownIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3l3 6 4-8 4 8 3-6v16H5V3z" />
    </svg>
);

const ShieldIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2L3 7v7c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5z" />
    </svg>
);

const PricingPage: React.FC = () => {
    const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');
    const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

    const plans = [
        {
            id: 'free',
            name: 'Ücretsiz',
            icon: <RocketIcon />,
            price: {
                monthly: 0,
                yearly: 0
            },
            credits: 50,
            description: 'Başlamak için mükemmel',
            features: [
                '50 ücretsiz kredi',
                '~16 formül VEYA 2 makro',
                'Temel Excel formülleri',
                'Türkçe doğal dil desteği',
                'Standart yanıt süresi',
                'Topluluk desteği',
                'Web arayüzü erişimi'
            ],
            limitations: [
                'Sınırlı kredi',
                'Gelişmiş özellikler yok',
                'Öncelikli destek yok'
            ],
            buttonText: 'Ücretsiz Başla',
            popular: false,
            color: 'slate',
            creditInfo: 'Formül: 3 kredi • Makro: 25 kredi'
        },
        {
            id: 'basic',
            name: 'Basic',
            icon: <CrownIcon />,
            price: {
                monthly: 19,
                yearly: 190
            },
            credits: 250,
            description: 'Bireysel kullanıcılar için',
            features: [
                '250 aylık kredi',
                '~83 formül VEYA 10 makro',
                'Hibrit kullanım (60 formül + 5 makro)',
                'Gelişmiş Excel formülleri',
                'VBA Makro desteği',
                'Hızlı yanıt süresi',
                'E-posta desteği',
                'Formül geçmişi ve favoriler'
            ],
            limitations: [
                'API erişimi yok',
                'Takım özellikleri yok'
            ],
            buttonText: 'Basic Planı Seç',
            popular: true,
            color: 'emerald',
            creditInfo: 'Formül: 3 kredi • Makro: 25 kredi'
        },
        {
            id: 'pro',
            name: 'Pro',
            icon: <ShieldIcon />,
            price: {
                monthly: 79,
                yearly: 790
            },
            credits: 2500,
            description: 'Profesyoneller ve takımlar için',
            features: [
                '2500 aylık kredi',
                '~833 formül VEYA 100 makro',
                'Hibrit kullanım (500 formül + 25 makro)',
                'Tüm formül türleri',
                'Gelişmiş VBA Makro desteği',
                'Anlık yanıt süresi',
                '7/24 öncelikli destek',
                'API erişimi',
                'Takım yönetimi paneli',
                'Özel formül şablonları',
                'Batch işlem desteği'
            ],
            limitations: [],
            buttonText: 'Pro Planı Seç',
            popular: false,
            color: 'purple',
            creditInfo: 'Formül: 3 kredi • Makro: 25 kredi'
        }
    ];

    const faqs = [
        {
            question: 'Ücretsiz deneme süresi var mı?',
            answer: 'Evet! Basic planı 14 gün ücretsiz deneyebilirsiniz. Kredi kartı gerekmez. Ayrıca ücretsiz planla 50 kredi ile hemen başlayabilirsiniz.'
        },
        {
            question: 'Kredi sistemi nasıl çalışır?',
            answer: 'Her formül oluşturma 3 kredi, her makro kodu oluşturma 25 kredi harcar. Kredileriniz her ay yenilenir. Kullanmadığınız krediler bir sonraki aya geçmez.'
        },
        {
            question: 'Karma kullanım nasıl hesaplanır?',
            answer: 'Örnek: 60 formül (180 kredi) + 5 makro (125 kredi) = 305 kredi toplamda. Bu karma kullanım için Basic plan (250 kredi) yeterli olmaz, Pro plan (2500 kredi) gerekir.'
        },
        {
            question: 'İstediğim zaman planımı değiştirebilir miyim?',
            answer: 'Elbette! Planınızı istediğiniz zaman yükseltebilir veya düşürebilirsiniz. Değişiklikler bir sonraki fatura döneminde geçerli olur.'
        },
        {
            question: 'Pro plan için özel fiyatlandırma var mı?',
            answer: 'Evet, 5+ kullanıcı için özel fiyatlandırma ve kurumsal özellikler sunuyoruz. Detaylar için bizimle iletişime geçin.'
        }
    ];

    const testimonials = [
        {
            name: 'Ahmet Yılmaz',
            role: 'Finansal Analist',
            company: 'Tech Corp',
            content: 'Kredi sistemi çok pratik! Aylık 250 kredi ile tüm işlerimi hallettim. Excel\'de harcadığım zaman %70 azaldı.',
            rating: 5
        },
        {
            name: 'Zeynep Kaya',
            role: 'Veri Uzmanı',
            company: 'StartupX',
            content: 'Formül ve makro karma kullanımı mükemmel! 19 dolara bu kadar özellik gerçekten değerli.',
            rating: 5
        },
        {
            name: 'Mehmet Demir',
            role: 'İş Zekası Müdürü',
            company: 'BigCo',
            content: 'Pro planın 2500 kredisi ekip için fazlasıyla yeterli. API entegrasyonu ile workflow\'umuza mükemmel uyum sağladı.',
            rating: 5
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-white via-emerald-50/30 to-white">
            {/* Hero Section */}
            <section className="relative overflow-hidden py-20 sm:py-32">
                {/* Background decoration */}
                <div className="absolute inset-0 -z-10">
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-100 rounded-full opacity-20 blur-3xl"></div>
                    <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-100 rounded-full opacity-20 blur-3xl"></div>
                </div>

                <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        {/* Hero Icon */}
                        <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-emerald-100 to-emerald-50 rounded-3xl shadow-xl mb-8 ring-4 ring-white ring-opacity-50">
                            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none">
                                {/* Credit/Dollar icon */}
                                <rect x="3" y="5" width="18" height="14" rx="3" fill="#10b981" fillOpacity="0.1" stroke="#10b981" strokeWidth="1.8"/>
                                <circle cx="12" cy="12" r="6" fill="none" stroke="#10b981" strokeWidth="1.5" strokeDasharray="2 2" opacity="0.6"/>
                                <text x="12" y="16" fill="#10b981" fontSize="8" fontWeight="bold" fontFamily="monospace" textAnchor="middle">$</text>
                                <circle cx="8" cy="8" r="1" fill="#10b981" fillOpacity="0.4"/>
                                <circle cx="16" cy="8" r="1" fill="#10b981" fillOpacity="0.4"/>
                                <circle cx="8" cy="16" r="1" fill="#10b981" fillOpacity="0.4"/>
                                <circle cx="16" cy="16" r="1" fill="#10b981" fillOpacity="0.4"/>
                                <rect x="10" y="6" width="4" height="1" rx="0.5" fill="#10b981" fillOpacity="0.6"/>
                                <text x="12" y="10" fill="#10b981" fontSize="4" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">KREDI</text>
                            </svg>
                        </div>

                        <h1 className="text-4xl sm:text-7xl font-bold mb-6 font-['Poppins',_'Inter',_sans-serif]">
                            <span className="block text-slate-800 mb-2">Planınızı</span>
                            <span className="relative inline-block">
                                <span className="relative z-10 bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-600 bg-clip-text text-transparent animate-gradient-x">
                                    Seçin
                                </span>
                                <span className="absolute inset-0 bg-emerald-200 blur-2xl opacity-30"></span>
                            </span>
                        </h1>

                        <p className="text-xl lg:text-2xl text-slate-600 mb-12 max-w-3xl mx-auto leading-relaxed font-['Inter',_sans-serif]">
                            İhtiyacınıza uygun planı seçin ve 
                            <span className="font-semibold text-emerald-600"> Excel'de verimliliğinizi </span>
                            artırın. Tüm planlar iptal garantili.
                        </p>

                        {/* Billing Toggle */}
                        <div className="flex items-center justify-center gap-4 mb-12">
                            <span className={`text-lg font-medium ${billingPeriod === 'monthly' ? 'text-slate-800' : 'text-slate-500'}`}>
                                Aylık
                            </span>
                            <button
                                onClick={() => setBillingPeriod(billingPeriod === 'monthly' ? 'yearly' : 'monthly')}
                                className="relative w-16 h-8 bg-emerald-100 rounded-full p-1 transition-colors hover:bg-emerald-200"
                            >
                                <div className={`w-6 h-6 bg-emerald-600 rounded-full shadow-md transform transition-transform ${
                                    billingPeriod === 'yearly' ? 'translate-x-8' : 'translate-x-0'
                                }`}></div>
                            </button>
                            <span className={`text-lg font-medium ${billingPeriod === 'yearly' ? 'text-slate-800' : 'text-slate-500'}`}>
                                Yıllık
                                <span className="ml-2 text-sm text-emerald-600 font-bold">2 ay ücretsiz!</span>
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Pricing Cards */}
            <section className="py-20">
                <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {plans.map((plan) => (
                            <div
                                key={plan.id}
                                className={`relative bg-gradient-to-br from-white to-${plan.color}-50/30 rounded-3xl border ${
                                    plan.popular ? 'border-emerald-300 shadow-2xl scale-105' : 'border-slate-200 shadow-xl'
                                } p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2`}
                                onMouseEnter={() => setSelectedPlan(plan.id)}
                                onMouseLeave={() => setSelectedPlan(null)}
                            >
                                {plan.popular && (
                                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                                        <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg">
                                            EN POPÜLER
                                        </div>
                                    </div>
                                )}

                                <div className="text-center mb-6">
                                    <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-${plan.color}-100 to-${plan.color}-50 rounded-2xl mb-4`}>
                                        <div className={`text-${plan.color}-600`}>
                                            {plan.icon}
                                        </div>
                                    </div>
                                    <h3 className="text-2xl font-bold text-slate-800 mb-2 font-['Poppins',_sans-serif]">{plan.name}</h3>
                                    <p className="text-slate-600">{plan.description}</p>
                                </div>

                                <div className="text-center mb-8">
                                    <div className="flex items-end justify-center gap-1">
                                        <span className="text-5xl font-bold text-slate-800">
                                            {billingPeriod === 'monthly' ? plan.price.monthly : plan.price.yearly}
                                        </span>
                                        <span className="text-xl text-slate-600 mb-2">$</span>
                                        <span className="text-slate-500 mb-2">/{billingPeriod === 'monthly' ? 'ay' : 'yıl'}</span>
                                    </div>
                                    
                                    {/* Kredi bilgisi */}
                                    <div className="bg-emerald-50 rounded-lg p-3 mt-4">
                                        <p className="text-emerald-800 font-semibold text-sm">
                                            {plan.credits} kredi/ay
                                        </p>
                                        {plan.creditInfo && (
                                            <p className="text-emerald-600 text-xs mt-1">
                                                {plan.creditInfo}
                                            </p>
                                        )}
                                    </div>
                                    
                                    {billingPeriod === 'yearly' && plan.price.yearly > 0 && (
                                        <p className="text-sm text-emerald-600 mt-2">
                                            Yıllık {Math.round((plan.price.monthly * 12 - plan.price.yearly) / (plan.price.monthly * 12) * 100)}% tasarruf
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-4 mb-8">
                                    {plan.features.map((feature, index) => (
                                        <div key={index} className="flex items-start gap-3">
                                            <div className="flex-shrink-0 w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center mt-0.5">
                                                <CheckIcon />
                                            </div>
                                            <span className="text-slate-700">{feature}</span>
                                        </div>
                                    ))}
                                    {plan.limitations.map((limitation, index) => (
                                        <div key={index} className="flex items-start gap-3 opacity-60">
                                            <div className="flex-shrink-0 w-6 h-6 bg-slate-100 rounded-full flex items-center justify-center mt-0.5">
                                                <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </div>
                                            <span className="text-slate-500 line-through">{limitation}</span>
                                        </div>
                                    ))}
                                </div>

                                <button className={`w-full py-4 px-6 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 ${
                                    plan.popular 
                                        ? 'bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white shadow-lg'
                                        : plan.id === 'enterprise'
                                        ? 'bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white shadow-lg'
                                        : 'bg-white hover:bg-slate-50 text-slate-800 border-2 border-slate-200'
                                }`}>
                                    {plan.buttonText}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Comparison */}
            <section className="py-20 bg-gradient-to-b from-white to-emerald-50/30">
                <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl sm:text-5xl font-bold text-slate-800 mb-4 font-['Poppins',_sans-serif]">
                            Detaylı Karşılaştırma
                        </h2>
                        <p className="text-xl text-slate-600">Tüm özelliklerimizi karşılaştırın</p>
                    </div>

                    <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-gradient-to-r from-emerald-50 to-emerald-100">
                                        <th className="text-left p-6 font-semibold text-slate-800">Özellikler</th>
                                        <th className="text-center p-6 font-semibold text-slate-800">Ücretsiz</th>
                                        <th className="text-center p-6 font-semibold text-slate-800 bg-emerald-100">Basic</th>
                                        <th className="text-center p-6 font-semibold text-slate-800">Pro</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[
                                        { feature: 'Aylık Kredi', free: '50', basic: '250', pro: '2500' },
                                        { feature: 'Tahmini Formül Sayısı', free: '~16', basic: '~83', pro: '~833' },
                                        { feature: 'Tahmini Makro Sayısı', free: '~2', basic: '~10', pro: '~100' },
                                        { feature: 'VBA Makro Desteği', free: '✗', basic: '✓', pro: '✓' },
                                        { feature: 'API Erişimi', free: '✗', basic: '✗', pro: '✓' },
                                        { feature: 'Öncelikli Destek', free: '✗', basic: '✓', pro: '✓' },
                                        { feature: '7/24 Telefon Desteği', free: '✗', basic: '✗', pro: '✓' },
                                        { feature: 'Takım Yönetimi', free: '✗', basic: '✗', pro: '✓' },
                                        { feature: 'Özel Eğitim', free: '✗', basic: '✗', pro: '✓' },
                                    ].map((row, index) => (
                                        <tr key={index} className={index % 2 === 0 ? 'bg-slate-50' : 'bg-white'}>
                                            <td className="p-6 font-medium text-slate-700">{row.feature}</td>
                                            <td className="text-center p-6">
                                                {row.free === '✓' ? (
                                                    <CheckIcon />
                                                ) : row.free === '✗' ? (
                                                    <svg className="w-5 h-5 text-slate-300 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                    </svg>
                                                ) : (
                                                    <span className="text-slate-600 font-semibold">{row.free}</span>
                                                )}
                                            </td>
                                            <td className="text-center p-6 bg-emerald-50/50">
                                                {row.basic === '✓' ? (
                                                    <CheckIcon />
                                                ) : row.basic === '✗' ? (
                                                    <svg className="w-5 h-5 text-slate-300 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                    </svg>
                                                ) : (
                                                    <span className="text-slate-600 font-semibold">{row.basic}</span>
                                                )}
                                            </td>
                                            <td className="text-center p-6">
                                                {row.pro === '✓' ? (
                                                    <CheckIcon />
                                                ) : row.pro === '✗' ? (
                                                    <svg className="w-5 h-5 text-slate-300 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                    </svg>
                                                ) : (
                                                    <span className="text-slate-600 font-semibold">{row.pro}</span>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-20">
                <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl sm:text-5xl font-bold text-slate-800 mb-4 font-['Poppins',_sans-serif]">
                            Müşterilerimiz Ne Diyor?
                        </h2>
                        <p className="text-xl text-slate-600">Binlerce mutlu kullanıcıdan bazıları</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {testimonials.map((testimonial, index) => (
                            <div key={index} className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow">
                                <div className="flex gap-1 mb-4">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <StarIcon key={i} />
                                    ))}
                                </div>
                                <p className="text-slate-700 mb-6 italic">"{testimonial.content}"</p>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                                        <span className="text-emerald-600 font-bold">{testimonial.name.charAt(0)}</span>
                                    </div>
                                    <div>
                                        <p className="font-semibold text-slate-800">{testimonial.name}</p>
                                        <p className="text-sm text-slate-600">{testimonial.role}, {testimonial.company}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-20 bg-gradient-to-b from-emerald-50/30 to-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl sm:text-5xl font-bold text-slate-800 mb-4 font-['Poppins',_sans-serif]">
                            Sıkça Sorulan Sorular
                        </h2>
                    </div>

                    <div className="space-y-6">
                        {faqs.map((faq, index) => (
                            <div key={index} className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-shadow">
                                <h3 className="text-lg font-semibold text-slate-800 mb-2">{faq.question}</h3>
                                <p className="text-slate-600">{faq.answer}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-br from-emerald-600 to-emerald-700">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl sm:text-5xl font-bold text-white mb-6 font-['Poppins',_sans-serif]">
                        Hemen Başlayın
                    </h2>
                    <p className="text-xl text-emerald-100 mb-8">
                        14 gün ücretsiz deneme. Kredi kartı gerekmez. İstediğiniz zaman iptal edin.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="px-8 py-4 bg-white hover:bg-slate-50 text-emerald-700 font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200">
                            Ücretsiz Deneyin
                        </button>
                        <button className="px-8 py-4 bg-emerald-800 hover:bg-emerald-900 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200">
                            Satış Ekibiyle Konuşun
                        </button>
                    </div>
                </div>
            </section>

            <ModernFooter />
        </div>
    );
};

export default PricingPage;
