import React, { useState, useEffect } from 'react';

// --- Category Icons (moved from data/helpContent.ts) ---
export const SearchIcon: React.FC = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>;
export const TextIcon: React.FC = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 12a4 4 0 0 0 0-8H6v8"/><path d="M15 20a4 4 0 0 0 0-8H6v8H15Z"/></svg>;
export const IfIcon: React.FC = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="M16 10.5c-1-.5-2-1-2.5-2.5s-1.5-2-2.5-2"/><path d="m9 14 3-3"/></svg>;
export const DateIcon: React.FC = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/><path d="M8 2v4"/><path d="M16 2v4"/></svg>;
export const LayersIcon: React.FC = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 2 7 5-7 5-7-5 7-5Z"/><path d="m2 12 7 5 7-5"/><path d="m2 17 7 5 7-5"/></svg>;
export const CalculatorIcon: React.FC = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="16" height="20" x="4" y="2" rx="2"/><path d="M8 6h8"/><path d="M8 10h8"/><path d="M8 14h8"/><path d="M8 18h8"/></svg>;
export const RobotIcon: React.FC = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 16h4"/><path d="M12 12V8H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg>;
export const MoneyIcon: React.FC = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="8"/><path d="M12 18V6"/><path d="M16 14h-8"/></svg>;
export const ToolsIcon: React.FC = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 22h10"/><path d="M12 15V3l-2.4 2.4"/><path d="m14.4 5.4 2.6-2.6"/><path d="M18 10h4V6h-4"/><path d="M22 14h-4v-4h4"/><path d="m14.4 12.6 2.6 2.6"/><path d="M6 10H2v4h4"/><path d="m9.6 12.6-2.6 2.6"/></svg>;
export const GlobeIcon: React.FC = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>;
export const TrendingUpIcon: React.FC = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>;
export const StarIcon: React.FC<{ isFilled: boolean; onClick: (e: React.MouseEvent) => void; className?: string }> = ({ isFilled, onClick, className }) => (
    <svg 
        onClick={onClick}
        xmlns="http://www.w3.org/2000/svg" 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill={isFilled ? "currentColor" : "none"} 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className={className}
    >
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
    </svg>
);


// --- Reusable Animation Utilities ---
const commonTextStyle: React.CSSProperties = {
    fontSize: "8px",
    fontFamily: "sans-serif",
    fill: "#475569",
    transition: "opacity 0.3s ease-in-out",
};
const formulaTextStyle: React.CSSProperties = {
    ...commonTextStyle,
    fontFamily: "monospace",
    fontSize: "9px",
};

const StepIndicator: React.FC<{ current: number, total: number }> = ({ current, total }) => (
    <text x="195" y="15" textAnchor="end" style={{...commonTextStyle, fontSize: "7px", fill: "#94a3b8"}}>Adım: {current + 1}/{total}</text>
);

const useAnimation = (stepCount: number, interval: number = 2500) => {
    const [step, setStep] = useState(0);
    useEffect(() => {
        const intervalId = setInterval(() => {
            setStep(prevStep => (prevStep + 1) % stepCount);
        }, interval);
        return () => clearInterval(intervalId);
    }, [stepCount, interval]);
    return step;
};

// --- SVG Illustrations ---
export const SvgWrapper: React.FC<{ children: React.ReactNode, onClick: () => void }> = ({ children, onClick }) => (
    <div className="flex items-center justify-center cursor-pointer hover:scale-105 transition-transform w-full h-full" onClick={onClick}>
        <svg width="100%" viewBox="0 0 200 150" className="bg-slate-50 rounded-lg p-2 border border-slate-200">
            {children}
        </svg>
    </div>
);

// --- Animated SVG Components ---

export const AnimatedVlookupSVG = () => {
    const totalSteps = 7;
    const step = useAnimation(totalSteps);
    const getOpacity = (visibleFromStep: number, visibleUntilStep?: number) => {
        if (visibleUntilStep !== undefined) {
            return (step >= visibleFromStep && step <= visibleUntilStep) ? 1 : 0;
        }
        return (step >= visibleFromStep ? 1 : 0);
    }
    const isVisible = (visibleOnStep: number) => step === visibleOnStep;

    return (
        <>
            <defs>
                <marker id="arrowhead-vlookup-anim" markerWidth="5" markerHeight="3.5" refX="2.5" refY="1.75" orient="auto">
                    <polygon points="0 0, 5 1.75, 0 3.5" fill="#10b981" />
                </marker>
            </defs>
            {/* Base Table */}
            <g>
                <rect x="50" y="30" width="100" height="80" fill="#fff" stroke="#cbd5e1" />
                {/* Table Data */}
                <line x1="100" y1="30" x2="100" y2="110" stroke="#e2e8f0" />
                <text x="75" y="45" textAnchor="middle" style={{ ...commonTextStyle, fontWeight: "bold" }}>Ürün ID</text>
                <text x="125" y="45" textAnchor="middle" style={{ ...commonTextStyle, fontWeight: "bold" }}>Fiyat</text>
                <text x="75" y="65" textAnchor="middle" style={commonTextStyle}>A-101</text>
                <text x="125" y="65" textAnchor="middle" style={commonTextStyle}>₺150</text>
                <text x="75" y="85" textAnchor="middle" style={commonTextStyle}>A-102</text>
                <text x="125" y="85" textAnchor="middle" style={commonTextStyle}>₺200</text>
                <text x="75" y="105" textAnchor="middle" style={commonTextStyle}>A-103</text>
                <text x="125" y="105" textAnchor="middle" style={commonTextStyle}>₺250</text>
            </g>

            {/* Input Cell for lookup value */}
            <g>
                <text x="25" y="85" textAnchor="middle" style={{ ...commonTextStyle, fill: "#15803d" }}>Aranan:</text>
                <rect x="10" y="90" width="30" height="15" fill="#fff" stroke="#10b981" />
                <text x="25" y="100" textAnchor="middle" style={{ ...commonTextStyle, fontWeight: "bold" }}>A-102</text>
            </g>

            {/* Formula Text Area */}
            <text x="5" y="135" style={formulaTextStyle}>
                =DÜŞEYARA(
                <tspan fill="#ef4444" style={{ fontWeight: "bold", opacity: getOpacity(1) }}>A-102</tspan>
                <tspan style={{ opacity: getOpacity(2) }}>; </tspan>
                <tspan fill="#3b82f6" style={{ fontWeight: "bold", opacity: getOpacity(2) }}>Tablo</tspan>
                <tspan style={{ opacity: getOpacity(3) }}>; </tspan>
                <tspan fill="#f97316" style={{ fontWeight: "bold", opacity: getOpacity(4) }}>2</tspan>
                <tspan style={{ opacity: getOpacity(4) }}>; </tspan>
                <tspan fill="#8b5cf6" style={{ fontWeight: "bold", opacity: getOpacity(4) }}>YANLIŞ</tspan>
                <tspan style={{ opacity: getOpacity(4) }}>)</tspan>
            </text>
            
            {/* Step 1: Highlight lookup value */}
            <rect x="10" y="90" width="30" height="15" fill="none" stroke="#ef4444" strokeWidth="2" style={{opacity: isVisible(1) ? 1: 0, transition: 'opacity 0.3s'}}/>

            {/* Step 2: Highlight table */}
            <rect x="50" y="30" width="100" height="80" fill="#3b82f6" fillOpacity="0.1" stroke="#3b82f6" strokeWidth="1.5" style={{opacity: isVisible(2) ? 1: 0, transition: 'opacity 0.3s'}}/>

            {/* Step 3: Scan and find row */}
            <g style={{opacity: isVisible(3) ? 1 : 0, transition: 'opacity 0.3s'}}>
                <path d="M 40 97.5 H 60" stroke="#ef4444" strokeWidth="1.5" fill="none" />
                <rect x="51" y="52" width="48" height="20" fill="none" stroke="#ef4444" strokeWidth="1.5">
                    <animate attributeName="y" values="52; 72; 72" dur="1.5s" fill="freeze" />
                </rect>
                <text x="10" y="62" textAnchor="start" style={{...commonTextStyle, fill:"#ef4444"}}>Aranıyor...</text>
            </g>
            
            {/* Step 4: Highlight column index */}
            <rect x="100.5" y="30.5" width="49" height="79" fill="#f97316" fillOpacity="0.2" style={{opacity: isVisible(4) ? 1 : 0, transition: 'opacity 0.3s'}} />
            <text x="125" y="20" textAnchor="middle" style={{...commonTextStyle, fill: "#f97316", fontWeight: "bold", opacity: isVisible(4) ? 1 : 0, transition: 'opacity 0.3s'}}>Sütun 2</text>
            
            {/* Step 5: Pinpoint the result */}
            <rect x="51" y="72" width="98" height="20" fill="none" stroke="#10b981" strokeWidth="2" style={{opacity: getOpacity(5, 6) ? 1 : 0, transition: 'opacity 0.3s'}}/>
            <circle cx="125" cy="85" r="0" fill="#10b981" fillOpacity="0.5" style={{opacity: isVisible(5) ? 1 : 0, transition: 'opacity 0.3s'}}>
                 <animate attributeName="r" from="0" to="10" dur="0.5s" fill="freeze" />
                 <animate attributeName="r" from="10" to="0" dur="0.5s" begin="0.5s" fill="freeze" />
            </circle>

            {/* Step 6: Extract the result */}
            <g style={{ opacity: isVisible(6) ? 1 : 0 }}>
                <path d="M 125 85 h 40" stroke="#10b981" strokeWidth="1.5" fill="none" markerEnd="url(#arrowhead-vlookup-anim)">
                    <animate attributeName="stroke-dasharray" from="0 40" to="40 0" dur="0.8s" fill="freeze" />
                </path>
                <g transform="translate(0 0)">
                    <animateTransform attributeName="transform" type="translate" from="0 0" to="0 -5" dur="0.4s" begin="0.8s" fill="freeze" />
                    <rect x="170" y="77.5" width="30" height="15" fill="#dcfce7" />
                    <text x="185" y="87.5" textAnchor="middle" style={{ ...commonTextStyle, fontWeight: 'bold', fill: "#15803d" }}>₺200</text>
                </g>
            </g>
            
            <StepIndicator current={step} total={totalSteps} />
        </>
    );
};

export const AnimatedWebServiceSVG = () => {
    const step = useAnimation(3, 2000);
    return (
        <>
            <text x="100" y="20" textAnchor="middle" style={{...commonTextStyle, fontWeight: 'bold'}}>WEB SERVİSİ (WEBSERVICE)</text>
            <StepIndicator current={step} total={3} />
            {/* Globe (Web Service) */}
            <g transform="translate(40, 75)">
                <circle cx="0" cy="0" r="20" fill="#e0f2fe" stroke="#0ea5e9" />
                <path d="M -17 0 h 34" stroke="#7dd3fc" />
                <path d="M 0 -17 v 34" stroke="#7dd3fc" />
                <path d="M -12 -12 l 24 24" stroke="#7dd3fc" />
                 <path d="M -12 12 l 24 -24" stroke="#7dd3fc" />
                <text x="0" y="30" textAnchor="middle" style={commonTextStyle}>API</text>
            </g>
            {/* Excel Cell */}
            <g transform="translate(140, 65)">
                <rect width="50" height="20" fill="#fff" stroke="#94a3b8" />
                <text x="25" y="14" textAnchor="middle" style={{...commonTextStyle, fill: step === 2 ? '#16a34a' : '#a1a1aa'}}>{step === 2 ? 'Veri Geldi' : '...'}</text>
            </g>

            {/* Arrow */}
            <path d="M 65 75 L 135 75" stroke="#0ea5e9" strokeWidth="2" markerEnd="url(#arrowhead-vlookup-anim)" style={{opacity: step >= 1 ? 1: 0, transition: 'opacity 0.3s'}}>
                 <animate attributeName="stroke-dasharray" from="0 70" to="70 0" dur="1s" fill="freeze" style={{display: step === 1 ? 'inline' : 'none'}}/>
            </path>
             <text x="100" y="60" textAnchor="middle" style={{...commonTextStyle, opacity: step === 0 ? 1 : 0}}>1. URL'den veri istenir</text>
             <text x="100" y="60" textAnchor="middle" style={{...commonTextStyle, opacity: step === 1 ? 1 : 0, fill: '#0ea5e9'}}>2. Veri çekiliyor...</text>
             <text x="100" y="60" textAnchor="middle" style={{...commonTextStyle, opacity: step === 2 ? 1 : 0, fill: '#16a34a'}}>3. Veri hücreye yazılır</text>
        </>
    )
};
export const AnimatedFilterXmlSVG = () => {
    const step = useAnimation(3, 2500);
    return (
        <>
            <text x="100" y="20" textAnchor="middle" style={{...commonTextStyle, fontWeight: 'bold'}}>XML FİLTRELE (FILTERXML)</text>
            <StepIndicator current={step} total={3} />
            {/* XML/HTML Source */}
            <g transform="translate(10, 40)">
                <rect width="110" height="100" fill="#f1f5f9" stroke="#94a3b8"/>
                <text x="5" y="15" style={{...formulaTextStyle, fontSize: '7px'}}>{'<'}veri{'>'}</text>
                <text x="15" y="30" style={{...formulaTextStyle, fontSize: '7px'}}>{'<'}ürün{'>'}Elma{'<'}/ürün{'>'}</text>
                <text x="15" y="45" style={{...formulaTextStyle, fontSize: '7px'}}>{'<'}fiyat{'>'}<tspan style={{fill: step >= 1 ? '#ef4444' : '#475569', fontWeight: 'bold'}}>150</tspan>{'<'}/fiyat{'>'}</text>
                <text x="5" y="60" style={{...formulaTextStyle, fontSize: '7px'}}>{'<'}/veri{'>'}</text>
            </g>

             {/* Excel Cell */}
            <g transform="translate(140, 75)">
                <rect width="50" height="20" fill="#fff" stroke="#94a3b8" />
                <text x="25" y="14" textAnchor="middle" style={{...commonTextStyle, fill: step === 2 ? '#16a34a' : '#a1a1aa'}}>{step === 2 ? '150' : '...'}</text>
            </g>

            {/* Path Arrow */}
            <path d="M 125 85 L 135 85" stroke="#16a34a" strokeWidth="1.5" style={{opacity: step === 2 ? 1: 0, transition: 'opacity 0.3s'}}/>
            
            <text x="5" y="135" style={{...formulaTextStyle, opacity: step >= 1 ? 1: 0}}>...<tspan fill="#ef4444">"//fiyat"</tspan>)</text>

             <text x="10" y="30" style={{...commonTextStyle, opacity: step === 0 ? 1 : 0}}>1. Web'den gelen XML veri</text>
             <text x="10" y="30" style={{...commonTextStyle, opacity: step === 1 ? 1 : 0, fill: '#ef4444'}}>2. XPath ile eleman seçilir</text>
             <text x="10" y="30" style={{...commonTextStyle, opacity: step === 2 ? 1 : 0, fill: '#16a34a'}}>3. Veri hücreye aktarılır</text>
        </>
    )
};
export const AnimatedCfHighlightRowSVG = () => {
    const step = useAnimation(3, 2000);
    const rows = [
        { status: "Bitti", color: "#dcfce7"},
        { status: "Devam", color: "#fff"},
        { status: step >= 1 ? "Bitti" : "Devam", color: step >= 2 ? "#dcfce7" : "#fff"}
    ];
    return (
        <>
            <text x="100" y="20" textAnchor="middle" style={{...commonTextStyle, fontWeight: 'bold'}}>Koşullu Biçimlendirme: Satır Vurgula</text>
            <StepIndicator current={step} total={3} />
            <g transform="translate(30, 40)">
                 {rows.map((row, i) => (
                    <g key={i}>
                        <rect y={i * 25} width="140" height="20" fill={row.color} stroke="#cbd5e1" style={{transition:'fill 0.5s'}}/>
                        <text x="30" y={i * 25 + 14} textAnchor="middle" style={commonTextStyle}>Proje {i+1}</text>
                        <text x="100" y={i * 25 + 14} textAnchor="middle" style={commonTextStyle}>{row.status}</text>
                    </g>
                 ))}
                 <rect x="-1" y="49" width="142" height="22" stroke="#ef4444" strokeWidth="1.5" fill="none" style={{opacity: step === 1 ? 1 : 0, transition: 'opacity 0.3s'}}/>
            </g>
             <text x="5" y="135" style={{...formulaTextStyle, opacity: step === 0 ? 1 : 0}}>Kural: =$B1="Bitti"</text>
             <text x="10" y="30" style={{...commonTextStyle, opacity: step === 0 ? 1 : 0}}>1. Kural belirlenir</text>
             <text x="10" y="30" style={{...commonTextStyle, opacity: step === 1 ? 1 : 0, fill: '#ef4444'}}>2. Hücre değeri değişir</text>
             <text x="10" y="30" style={{...commonTextStyle, opacity: step === 2 ? 1 : 0, fill: '#16a34a'}}>3. Satır otomatik renklenir</text>
        </>
    )
};
export const AnimatedSubtotalSVG = () => {
    const step = useAnimation(4, 2000);
    const data = [
        { cat: "A", val: 10, visible: true},
        { cat: "B", val: 20, visible: step < 1 ? true : false},
        { cat: "A", val: 30, visible: true},
        { cat: "B", val: 40, visible: step < 1 ? true : false}
    ];
    return (
        <>
            <text x="100" y="15" textAnchor="middle" style={{...commonTextStyle, fontWeight: 'bold'}}>ALTTOPLAM (SUBTOTAL)</text>
            <StepIndicator current={step} total={4} />
            <g transform="translate(50, 25)">
                {data.map((d, i) => (
                    <g key={i} style={{opacity: d.visible ? 1 : 0, transition: 'opacity 0.5s'}}>
                        <rect y={i * 20} width="100" height="18" fill="#fff" stroke="#cbd5e1"/>
                        <text x="25" y={i*20+12} textAnchor="middle" style={commonTextStyle}>{d.cat}</text>
                        <text x="75" y={i*20+12} textAnchor="middle" style={commonTextStyle}>{d.val}</text>
                    </g>
                ))}
                <rect y="85" width="100" height="20" fill="#f1f5f9" stroke="#94a3b8"/>
                <text x="25" y="97" textAnchor="middle" style={{...commonTextStyle, fontWeight:'bold'}}>TOPLAM:</text>
                <text x="75" y="97" textAnchor="middle" style={{...commonTextStyle, fontWeight:'bold', fill: step >= 2 ? '#16a34a' : '#ef4444'}}>{step < 2 ? 100 : 40}</text>
            </g>
            <text x="5" y="135" style={{...formulaTextStyle, opacity: step === 0 ? 1 : 0}}>=TOPLA(C2:C5)</text>
            <text x="5" y="135" style={{...formulaTextStyle, opacity: step >= 2 ? 1 : 0}}>=ALTTOPLAM(9; C2:C5)</text>
            <text x="10" y="120" style={{...commonTextStyle, opacity: step === 1 ? 1 : 0, fill:'#3b82f6'}}>Filtre: Kategori = "A"</text>
        </>
    )
};
export const AnimatedAggregateSVG = () => {
    const step = useAnimation(3, 2000);
    const data = [10, 20, "#YOK!", 40];
    const sum = step < 2 ? "#YOK!" : "70";
    return (
         <>
            <text x="100" y="15" textAnchor="middle" style={{...commonTextStyle, fontWeight: 'bold'}}>TOPLAMA (AGGREGATE)</text>
            <StepIndicator current={step} total={3} />
            <g transform="translate(70, 25)">
                {data.map((d, i) => (
                    <g key={i}>
                        <rect y={i * 20} width="60" height="18" fill={i === 2 ? '#fee2e2' : '#fff'} stroke="#cbd5e1"/>
                        <text x="30" y={i*20+12} textAnchor="middle" style={{...commonTextStyle, fill: i === 2 ? '#b91c1c' : '#475569'}}>{d}</text>
                    </g>
                ))}
                <rect y="85" width="60" height="20" fill="#f1f5f9" stroke="#94a3b8"/>
                <text x="30" y="97" textAnchor="middle" style={{...commonTextStyle, fontWeight:'bold', fill: step < 2 ? '#b91c1c' : '#16a34a'}}>{sum}</text>
            </g>
             <text x="5" y="135" style={{...formulaTextStyle, opacity: step === 0 ? 1 : 0}}>=TOPLA(A1:A4)</text>
             <text x="5" y="135" style={{...formulaTextStyle, opacity: step >= 1 ? 1 : 0}}>=TOPLAMA(9; 6; A1:A4)</text>
             <text x="10" y="120" style={{...commonTextStyle, opacity: step === 1 ? 1 : 0, fill:'#ef4444'}}>6 = Hataları yoksay</text>
        </>
    )
};
export const AnimatedRandbetweenSVG = () => {
    const step = useAnimation(5, 800);
    const nums = [73, 12, 98, 45, 66];
    return (
        <>
            <text x="100" y="20" textAnchor="middle" style={{...commonTextStyle, fontWeight: 'bold'}}>RASTGELEARADA (RANDBETWEEN)</text>
            <StepIndicator current={step} total={5} />
            <g transform="translate(80, 40)">
                <rect width="40" height="80" fill="#fff" stroke="#94a3b8"/>
                <text x="20" y="45" textAnchor="middle" style={{...formulaTextStyle, fontSize: '18px', fill: '#16a34a'}}>{nums[step]}</text>
            </g>
             <text x="5" y="135" style={{...formulaTextStyle}}>=RASTGELEARADA(10; 100)</text>
        </>
    )
};
export const AnimatedConvertSVG = () => {
    const step = useAnimation(2, 2000);
    return (
        <>
            <text x="100" y="20" textAnchor="middle" style={{...commonTextStyle, fontWeight: 'bold'}}>ÇEVİR (CONVERT)</text>
            <StepIndicator current={step} total={2} />
             {/* Input */}
            <g transform="translate(20, 60)">
                <rect width="60" height="30" fill="#fff" stroke="#94a3b8"/>
                <text x="30" y="20" textAnchor="middle" style={{...commonTextStyle, fontSize: '12px'}}>10 kg</text>
            </g>
             {/* Output */}
            <g transform="translate(120, 60)">
                <rect width="60" height="30" fill="#dcfce7" stroke="#16a34a"/>
                <text x="30" y="20" textAnchor="middle" style={{...commonTextStyle, fontSize: '12px', opacity: step === 1 ? 1: 0}}>{(10 * 2.20462).toFixed(2)} lb</text>
            </g>
            <path d="M 85 75 L 115 75" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrowhead-vlookup-anim)" style={{opacity: step >= 0 ? 1: 0}}/>
             <text x="5" y="135" style={{...formulaTextStyle, opacity: step === 0 ? 1 : 0}}>=ÇEVİR(A1; "kg"; "lbm")</text>
        </>
    )
};

export const AnimatedMacroRefreshPivotsSVG = () => {
    const step = useAnimation(4, 2000);
    const barHeight = step >= 3 ? 60 : 20;
    return (
        <>
            <text x="100" y="15" textAnchor="middle" style={{ ...commonTextStyle, fontWeight: "bold" }}>Tüm Pivotları Yenile</text>
            <StepIndicator current={step} total={4} />
            {/* Data Source Table */}
            <g transform="translate(10, 40)">
                <rect width="70" height="60" fill="#fff" stroke="#94a3b8" />
                <text x="35" y="15" textAnchor="middle" style={commonTextStyle}>Veri Kaynağı</text>
                <text x="35" y="35" textAnchor="middle" style={commonTextStyle}>Ürün A: <tspan fill={step >= 1 ? "#ef4444" : "#475569"} style={{transition: 'fill 0.3s'}}>{step >= 1 ? '300' : '100'}</tspan></text>
            </g>
            {/* Pivot Chart */}
            <g transform="translate(100, 30)">
                <text x="50" y="10" textAnchor="middle" style={commonTextStyle}>Pivot Grafik</text>
                <rect x="30" y={80 - barHeight} width="40" height={barHeight} fill="#3b82f6" style={{transition: 'all 0.5s ease-in-out'}}/>
                <line x1="10" y1="80" x2="90" y2="80" stroke="#94a3b8" />
            </g>
            {/* Refresh Icon */}
            <g transform="translate(90, 80)" style={{opacity: step === 2 ? 1 : 0, transition: 'opacity 0.3s'}}>
                 <path d="M21 12a9 9 0 1 1-6.22-8.66" fill="none" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" transform="scale(0.8)"/>
                 <polyline points="21 3 21 8 16 8" fill="none" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" transform="scale(0.8)"/>
            </g>
            <text x="10" y="130" style={{...commonTextStyle, opacity: step === 0 ? 1 : 0}}>1. Orijinal Veri & Pivot</text>
            <text x="10" y="130" style={{...commonTextStyle, fill: '#ef4444', opacity: step === 1 ? 1 : 0}}>2. Kaynak veri değişir</text>
            <text x="10" y="130" style={{...commonTextStyle, fill: '#16a34a', opacity: step === 2 ? 1 : 0}}>3. Makro çalışır (Yenile)</text>
            <text x="10" y="130" style={{...commonTextStyle, fill: '#3b82f6', opacity: step === 3 ? 1 : 0}}>4. Pivot Grafik güncellenir</text>
        </>
    );
};

export const AnimatedMacroFormatAsTableSVG = () => {
    const step = useAnimation(4, 1500);
    const hasBanding = step >= 3;
    const hasHeader = step >= 2;
    return (
        <>
            <text x="100" y="15" textAnchor="middle" style={{ ...commonTextStyle, fontWeight: "bold" }}>Seçili Alanı Tablo Yap</text>
            <StepIndicator current={step} total={4} />
            {/* Data Grid */}
            <g transform="translate(40, 30)">
                {/* Header */}
                <rect width="120" height="20" fill={hasHeader ? "#4f46e5" : "#fff"} stroke="#94a3b8" style={{transition:'fill 0.3s'}}/>
                <text x="30" y="14" textAnchor="middle" style={{...commonTextStyle, fontWeight: 'bold', fill: hasHeader ? 'white' : 'black'}}>Başlık 1</text>
                <text x="90" y="14" textAnchor="middle" style={{...commonTextStyle, fontWeight: 'bold', fill: hasHeader ? 'white' : 'black'}}>Başlık 2</text>
                {/* Rows */}
                <rect y="20" width="120" height="20" fill={hasBanding ? '#eef2ff' : '#fff'} stroke="#94a3b8" style={{transition:'fill 0.3s'}}/>
                <rect y="40" width="120" height="20" fill="#fff" stroke="#94a3b8" />
                <rect y="60" width="120" height="20" fill={hasBanding ? '#eef2ff' : '#fff'} stroke="#94a3b8" style={{transition:'fill 0.3s'}}/>
            </g>
            {/* Selection */}
            <rect x="39" y="29" width="122" height="82" fill="none" stroke="#4f46e5" strokeWidth="2" strokeDasharray="3 3" style={{opacity: step === 1 ? 1 : 0, transition: 'opacity 0.3s'}} />
            {/* Filter Buttons */}
            <g fill="#a5b4fc" style={{opacity: hasHeader ? 1 : 0, transition: 'opacity 0.3s'}}>
                <path d="M 85 45 l 5 5 l 5 -5 z" />
                <path d="M 145 45 l 5 5 l 5 -5 z" />
            </g>
            <text x="10" y="130" style={{...commonTextStyle, opacity: step === 0 ? 1 : 0}}>1. Ham veri aralığı</text>
            <text x="10" y="130" style={{...commonTextStyle, fill: '#4f46e5', opacity: step === 1 ? 1 : 0}}>2. Alan seçilir</text>
            <text x="10" y="130" style={{...commonTextStyle, opacity: step === 2 ? 1 : 0}}>3. Başlıklar biçimlenir</text>
            <text x="10" y="130" style={{...commonTextStyle, opacity: step === 3 ? 1 : 0}}>4. Satırlar renklendirilir</text>
        </>
    );
};

export const AnimatedMacroSendEmailSVG = () => {
    const step = useAnimation(4, 1500);
    const ExcelIcon = ({x, y, style}:any) => (
         <g transform={`translate(${x}, ${y})`} style={style}>
            <path d="M 2 10 L 2 2 Q 2 0 4 0 L 15 0 L 25 10 L 25 28 Q 25 30 23 30 L 4 30 Q 2 30 2 28 Z" fill="#dcfce7" stroke="#16a34a" />
            <text x="13.5" y="22" textAnchor="middle" style={{...commonTextStyle, fontSize: '5px'}}>Rapor.xlsx</text>
        </g>
    );
    const EmailWindow = ({style}: any) => (
        <g style={style}>
            <rect x="50" y="30" width="140" height="90" rx="5" fill="#fff" stroke="#94a3b8" />
            <line x1="50" y1="50" x2="190" y2="50" stroke="#e2e8f0" />
            <line x1="50" y1="70" x2="190" y2="70" stroke="#e2e8f0" />
            <text x="60" y="44" style={commonTextStyle}>Konu: Rapor</text>
            <text x="60" y="64" style={commonTextStyle}>Ek: </text>
            <g transform="translate(75, 56) scale(0.6)"><ExcelIcon x={0} y={0}/></g>
        </g>
    );
    return (
        <>
            <text x="100" y="15" textAnchor="middle" style={{ ...commonTextStyle, fontWeight: "bold" }}>E-posta ile Gönder</text>
            <StepIndicator current={step} total={4} />
            <ExcelIcon x={20} y={60} style={{transition: 'all 0.5s', transform: step >=2 ? 'translate(75px, 56px) scale(0.6)' : 'translate(20px, 60px) scale(1)'}} />
            <path d="M 50 75 L 80 75" stroke="#4f46e5" strokeWidth="2" style={{opacity: step === 1 ? 1 : 0, transition: 'opacity 0.3s'}}/>
            <EmailWindow style={{opacity: step >= 2 ? 1 : 0, transform: step >= 3 ? 'scale(1.1)' : 'scale(1)', transition: 'all 0.5s'}}/>
        </>
    );
};

export const AnimatedMacroAddHeaderFooterSVG = () => {
    const step = useAnimation(3, 1500);
    const Page = ({x, y, p, total}: any) => (
        <g transform={`translate(${x}, ${y})`}>
            <rect width="50" height="70" fill="#fff" stroke="#94a3b8"/>
            <text x="10" y="10" style={{...commonTextStyle, fontSize: '5px', opacity: step >= 1 ? 1 : 0, transition: 'opacity 0.3s'}}>Şirket Adı</text>
            <text x="45" y="65" textAnchor="end" style={{...commonTextStyle, fontSize: '5px', opacity: step >= 2 ? 1 : 0, transition: 'opacity 0.3s'}}>Sayfa {p}/{total}</text>
        </g>
    );
    return (
        <>
            <text x="100" y="15" textAnchor="middle" style={{ ...commonTextStyle, fontWeight: "bold" }}>Üstbilgi/Altbilgi Ekle</text>
            <StepIndicator current={step} total={3} />
            <Page x={40} y={40} p={1} total={3}/>
            <Page x={75} y={40} p={2} total={3}/>
            <Page x={110} y={40} p={3} total={3}/>
            <text x="10" y="130" style={{...commonTextStyle, opacity: step === 0 ? 1 : 0}}>1. Orijinal sayfalar</text>
            <text x="10" y="130" style={{...commonTextStyle, opacity: step === 1 ? 1 : 0}}>2. Üstbilgi eklenir</text>
            <text x="10" y="130" style={{...commonTextStyle, opacity: step === 2 ? 1 : 0}}>3. Altbilgi eklenir</text>
        </>
    );
};


// --- EXISTING SVGs ---
export const AnimatedIndexMatchSVG = () => {
    const step = useAnimation(5);
    const isVisible = (s: number) => step === s;
    return (
        <>
            <text x="100" y="15" textAnchor="middle" style={{...commonTextStyle, fontWeight: 'bold'}}>İNDİS + KAÇINCI</text>
            <StepIndicator current={step} total={5} />
            {/* Table */}
            <g>
                <rect x="20" y="30" width="160" height="80" fill="#fff" stroke="#cbd5e1" />
                <line x1="80" y1="30" x2="80" y2="110" stroke="#e2e8f0" />
                <line x1="140" y1="30" x2="140" y2="110" stroke="#e2e8f0" />
                <text x="50" y="45" textAnchor="middle" style={{...commonTextStyle, fontWeight: 'bold'}}>Fiyat</text>
                <text x="110" y="45" textAnchor="middle" style={{...commonTextStyle, fontWeight: 'bold'}}>Ürün ID</text>
                <text x="50" y="65" textAnchor="middle" style={commonTextStyle}>₺150</text>
                <text x="110" y="65" textAnchor="middle" style={commonTextStyle}>A-101</text>
                <text x="50" y="85" textAnchor="middle" style={commonTextStyle}>₺200</text>
                <text x="110" y="85" textAnchor="middle" style={commonTextStyle}>A-102</text>
                <text x="50" y="105" textAnchor="middle" style={commonTextStyle}>₺250</text>
                <text x="110" y="105" textAnchor="middle" style={commonTextStyle}>A-103</text>
            </g>
             {/* KAÇINCI Part */}
            <g style={{opacity: isVisible(0) || isVisible(1) ? 1: 0, transition: 'opacity 0.3s'}}>
                 <text x="10" y="135" style={formulaTextStyle}>KAÇINCI("A-102"; B:B; 0)</text>
                 <rect x="80" y="30" width="60" height="80" fill="#3b82f6" fillOpacity="0.1" stroke="#3b82f6" strokeWidth="1.5" style={{opacity: isVisible(0) ? 1 : 0}} />
                 <rect x="80" y="70" width="60" height="20" fill="#ef4444" fillOpacity="0.2" stroke="#ef4444" strokeWidth="1.5" style={{opacity: isVisible(1) ? 1 : 0}} />
                 <text x="170" y="80" style={{...formulaTextStyle, fill: '#ef4444', fontWeight: 'bold', opacity: isVisible(1) ? 1 : 0}}> = 3</text>
            </g>
             {/* İNDİS Part */}
            <g style={{opacity: step >= 2 ? 1: 0, transition: 'opacity 0.3s'}}>
                 <text x="10" y="135" style={formulaTextStyle}>İNDİS(A:A; <tspan fill="#ef4444" fontWeight="bold">3</tspan>)</text>
                 <rect x="20" y="30" width="60" height="80" fill="#10b981" fillOpacity="0.1" stroke="#10b981" strokeWidth="1.5" style={{opacity: isVisible(2) ? 1 : 0}} />
                 <rect x="20" y="70" width="60" height="20" fill="#10b981" fillOpacity="0.2" stroke="#10b981" strokeWidth="2" style={{opacity: isVisible(3) ? 1 : 0}} />
                 <text x="170" y="80" style={{...formulaTextStyle, fill: '#10b981', fontWeight: 'bold', opacity: step >= 4 ? 1 : 0}}> = ₺200</text>
            </g>
        </>
    )
};
export const AnimatedIfSVG = () => {
    const step = useAnimation(4, 2000);
    const value = step < 2 ? 75 : 40;
    const result = value > 50 ? "Geçti" : "Kaldı";
    const resultColor = value > 50 ? "#16a34a" : "#ef4444";
    const isChecking = step === 0 || step === 2;
    const isShowingResult = step === 1 || step === 3;

    return (
        <>
            <text x="100" y="15" textAnchor="middle" style={{ ...commonTextStyle, fontWeight: "bold" }}>EĞER (IF)</text>
            <StepIndicator current={step} total={4} />
            
            {/* Value Cell */}
            <rect x="80" y="30" width="40" height="20" fill="#fff" stroke="#94a3b8" />
            <text x="100" y="44" textAnchor="middle" style={{ ...commonTextStyle, fontSize: "10px" }}>{value}</text>

            {/* Condition Check */}
            <g style={{ opacity: isChecking ? 1 : 0, transition: 'opacity 0.3s' }}>
                <path d="M 100 50 v 15" stroke="#94a3b8" strokeDasharray="2,2" />
                <rect x="70" y="65" width="60" height="20" fill="#f1f5f9" stroke="#94a3b8" rx="10"/>
                <text x="100" y="79" textAnchor="middle" style={commonTextStyle}>Not {'>'} 50?</text>
            </g>

            {/* True/False Paths */}
            <path d="M 70 75 h -30 v 20 h 30" fill="none" stroke="#16a34a" style={{opacity: isShowingResult && value > 50 ? 1 : 0.2}} />
            <text x="20" y="109" textAnchor="middle" style={{ ...commonTextStyle, fill: "#16a34a", opacity: isShowingResult && value > 50 ? 1 : 0.2 }}>DOĞRU</text>
            
            <path d="M 130 75 h 30 v 20 h -30" fill="none" stroke="#ef4444" style={{opacity: isShowingResult && value <= 50 ? 1 : 0.2}}/>
            <text x="180" y="109" textAnchor="middle" style={{ ...commonTextStyle, fill: "#ef4444", opacity: isShowingResult && value <= 50 ? 1 : 0.2}}>YANLIŞ</text>
            
            {/* Result */}
            <g style={{ opacity: isShowingResult ? 1 : 0, transition: 'opacity 0.3s' }}>
                <rect x="75" y="120" width="50" height="20" fill={resultColor + "20"} stroke={resultColor} />
                <text x="100" y="134" textAnchor="middle" style={{ ...commonTextStyle, fill: resultColor, fontWeight: 'bold' }}>{result}</text>
            </g>
        </>
    );
};
export const AnimatedConcatSVG = () => {
    const step = useAnimation(3, 1500);
    return (
        <>
            <text x="100" y="15" textAnchor="middle" style={{ ...commonTextStyle, fontWeight: "bold" }}>BİRLEŞTİR (CONCAT)</text>
            <StepIndicator current={step} total={3} />
            {/* Cell A1 */}
            <g>
                <rect x="10" y="50" width="50" height="20" fill="#fff" stroke="#94a3b8" />
                <text x="35" y="64" textAnchor="middle" style={commonTextStyle}>İsim</text>
            </g>
             {/* Cell B1 */}
            <g>
                <rect x="70" y="50" width="50" height="20" fill="#fff" stroke="#94a3b8" />
                <text x="95" y="64" textAnchor="middle" style={commonTextStyle}>Soyisim</text>
            </g>
            {/* Result Cell */}
            <g>
                <rect x="40" y="100" width="120" height="20" fill="#dcfce7" stroke="#16a34a" />
                <text x="100" y="114" textAnchor="middle" style={{ ...commonTextStyle, opacity: step === 2 ? 1 : 0 }}>İsim Soyisim</text>
            </g>
            {/* Arrows */}
            <path d="M 35 70 v 25 h 5" fill="none" stroke="#3b82f6" strokeWidth="1.5" style={{ opacity: step >= 1 ? 1 : 0 }}>
                 <animate attributeName="stroke-dasharray" from="0 30" to="30 0" dur="0.5s" fill="freeze" style={{ display: step === 1 ? 'inline' : 'none' }} />
            </path>
            <path d="M 95 70 v 25 h -5" fill="none" stroke="#3b82f6" strokeWidth="1.5" style={{ opacity: step >= 1 ? 1 : 0 }}>
                 <animate attributeName="stroke-dasharray" from="0 30" to="30 0" dur="0.5s" begin="0.2s" fill="freeze" style={{ display: step === 1 ? 'inline' : 'none' }} />
            </path>
            <text x="5" y="135" style={formulaTextStyle}>=A1 & " " & B1</text>
        </>
    );
};
export const AnimatedLeftRightMidSVG = () => {
    const step = useAnimation(3, 2000);
    const text = "İstanbul";
    let highlighted = "";
    let formula = "";
    if (step === 0) {
        highlighted = "İsta";
        formula = '=SOLDAN(A1; 4)';
    } else if (step === 1) {
        highlighted = "bul";
        formula = '=SAĞDAN(A1; 3)';
    } else {
        highlighted = "nbu";
        formula = '=PARÇAAL(A1; 5; 3)';
    }

    return (
        <>
            <text x="100" y="15" textAnchor="middle" style={{ ...commonTextStyle, fontWeight: "bold" }}>Metin Parçalama</text>
            <StepIndicator current={step} total={3} />
            <rect x="50" y="50" width="100" height="25" fill="#fff" stroke="#94a3b8" />
            <text x="100" y="67" textAnchor="middle" style={{...commonTextStyle, fontSize: "14px", fontFamily: "monospace"}}>{text}</text>

            <rect x="70" y="100" width="60" height="25" fill="#dcfce7" stroke="#16a34a" />
            <text x="100" y="117" textAnchor="middle" style={{...commonTextStyle, fontSize: "14px", fill: '#16a34a', fontWeight: 'bold'}}>{highlighted}</text>
            
            <text x="100" y="140" textAnchor="middle" style={formulaTextStyle}>{formula}</text>
        </>
    );
};
export const AnimatedSumifSVG = () => {
    const step = useAnimation(4, 2000);
    const data = [
        { cat: 'Elma', val: 10, isMatch: true },
        { cat: 'Armut', val: 20, isMatch: false },
        { cat: 'Elma', val: 30, isMatch: true },
        { cat: 'Kiraz', val: 40, isMatch: false },
    ];
    return (
        <>
             <text x="100" y="15" textAnchor="middle" style={{...commonTextStyle, fontWeight: 'bold'}}>ETOPLA (SUMIF)</text>
             <StepIndicator current={step} total={4} />
             {/* Table */}
             <g transform="translate(40, 30)">
                {data.map((d, i) => (
                    <g key={i}>
                        <rect y={i * 22} width="120" height="20" fill={step >= 1 && d.isMatch ? '#dcfce7' : '#fff'} stroke="#cbd5e1" style={{transition:'fill 0.3s'}}/>
                        <text x="30" y={i*22+14} textAnchor="middle" style={commonTextStyle}>{d.cat}</text>
                        <text x="90" y={i*22+14} textAnchor="middle" style={{...commonTextStyle, fontWeight: step >= 2 && d.isMatch ? 'bold' : 'normal', fill: step >= 2 && d.isMatch ? '#15803d' : '#475569'}}>{d.val}</text>
                    </g>
                ))}
                <line x1="60" y1="0" x2="60" y2="88" stroke="#e2e8f0" />
            </g>
             {/* Result */}
            <rect x="100" y="125" width="40" height="20" fill="#f0fdf4" stroke="#22c55e"/>
            <text x="120" y="139" textAnchor="middle" style={{...commonTextStyle, fontWeight: 'bold', opacity: step === 3 ? 1 : 0}}>{10+30}</text>

            <text x="5" y="135" style={{...formulaTextStyle, opacity: step === 0 ? 1 : 0}}>=ETOPLA(A:A; "Elma"; B:B)</text>
        </>
    );
};
export const AnimatedTodayNowSVG = () => {
    const today = new Date();
    const day = today.getDate();
    const [time, setTime] = useState(today.toLocaleTimeString('tr-TR', {hour: '2-digit', minute:'2-digit'}));

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date().toLocaleTimeString('tr-TR', {hour: '2-digit', minute:'2-digit'}));
        }, 1000);
        return () => clearInterval(timer);
    }, []);
    const step = useAnimation(2, 2500);

    return (
        <>
            <text x="100" y="15" textAnchor="middle" style={{ ...commonTextStyle, fontWeight: "bold" }}>BUGÜN / ŞİMDİ</text>
            <StepIndicator current={step} total={2} />
             {/* Calendar Icon */}
            <g transform="translate(65, 40)">
                <rect width="70" height="60" rx="5" fill="#fff" stroke="#94a3b8"/>
                <rect width="70" height="15" rx="5" fill="#ef4444" stroke="#ef4444"/>
                <text x="35" y="45" textAnchor="middle" style={{...commonTextStyle, fontSize: "24px", fill: "#475569"}}>{day}</text>
                <text x="35" y="75" textAnchor="middle" style={{...commonTextStyle, fontSize: "12px", fill: "#475569", opacity: step === 1 ? 1 : 0, transition: "opacity 0.5s"}}>{time}</text>
            </g>
            <text x="100" y="135" textAnchor="middle" style={formulaTextStyle}>
                {step === 0 ? "=BUGÜN()" : "=ŞİMDİ()"}
            </text>
        </>
    );
};
export const AnimatedFilterSVG = () => {
    const step = useAnimation(3, 2000);
    const data = [
        { dept: 'Satış', val: 100, isMatch: true },
        { dept: 'İK', val: 150, isMatch: false },
        { dept: 'Satış', val: 200, isMatch: true },
        { dept: 'Pazarlama', val: 250, isMatch: false },
    ];
    return (
        <>
            <text x="100" y="15" textAnchor="middle" style={{...commonTextStyle, fontWeight: 'bold'}}>FİLTRELE (FILTER)</text>
            <StepIndicator current={step} total={3} />
             {/* Source Table */}
            <g transform="translate(10, 30)">
                {data.map((d, i) => (
                    <g key={i} style={{opacity: step === 1 && !d.isMatch ? 0.3 : 1, transition: 'all 0.5s', transform: step === 2 && !d.isMatch ? 'scale(0)' : 'scale(1)'}}>
                        <rect y={i * 22} width="80" height="20" fill={step === 1 && d.isMatch ? '#dcfce7' : '#fff'} stroke="#cbd5e1"/>
                        <text x="25" y={i*22+14} textAnchor="middle" style={commonTextStyle}>{d.dept}</text>
                        <text x="65" y={i*22+14} textAnchor="middle" style={commonTextStyle}>{d.val}</text>
                    </g>
                ))}
            </g>
             {/* Result Table */}
            <g transform="translate(110, 30)" style={{opacity: step === 2 ? 1 : 0}}>
                <rect y="0" width="80" height="20" fill="#f0fdf4" stroke="#22c55e" />
                <text x="25" y="14" textAnchor="middle" style={commonTextStyle}>Satış</text>
                <text x="65" y="14" textAnchor="middle" style={commonTextStyle}>100</text>
                <rect y="22" width="80" height="20" fill="#f0fdf4" stroke="#22c55e" />
                <text x="25" y="36" textAnchor="middle" style={commonTextStyle}>Satış</text>
                <text x="65" y="36" textAnchor="middle" style={commonTextStyle}>200</text>
            </g>
             <text x="5" y="135" style={{...formulaTextStyle, opacity: step === 0 ? 1 : 0}}>=FİLTRELE(A:B; A:A="Satış")</text>
        </>
    )
};
export const AnimatedUniqueSVG = () => {
    const step = useAnimation(3, 2000);
    const data = ["Elma", "Armut", "Elma", "Kiraz"];
    const isDuplicate = (i: number) => i === 2;
    return (
         <>
            <text x="100" y="15" textAnchor="middle" style={{...commonTextStyle, fontWeight: 'bold'}}>BENZERSİZ (UNIQUE)</text>
            <StepIndicator current={step} total={3} />
             {/* Source List */}
            <g transform="translate(30, 30)">
                {data.map((d, i) => (
                    <g key={i} style={{transition: 'all 0.5s', opacity: step === 2 && isDuplicate(i) ? 0 : 1}}>
                        <rect y={i * 22} width="60" height="20" fill={step === 1 && isDuplicate(i) ? '#fee2e2' : '#fff'} stroke="#cbd5e1" />
                        <text x="30" y={i*22+14} textAnchor="middle" style={commonTextStyle}>{d}</text>
                    </g>
                ))}
            </g>
             {/* Result List */}
            <g transform="translate(110, 30)" style={{opacity: step === 2 ? 1 : 0}}>
                <rect y="0" width="60" height="20" fill="#f0fdf4" stroke="#22c55e" />
                <text x="30" y="14" textAnchor="middle" style={commonTextStyle}>Elma</text>
                <rect y="22" width="60" height="20" fill="#f0fdf4" stroke="#22c55e" />
                <text x="30" y="36" textAnchor="middle" style={commonTextStyle}>Armut</text>
                 <rect y="44" width="60" height="20" fill="#f0fdf4" stroke="#22c55e" />
                <text x="30" y="58" textAnchor="middle" style={commonTextStyle}>Kiraz</text>
            </g>
             <text x="5" y="135" style={{...formulaTextStyle, opacity: step === 0 ? 1 : 0}}>=BENZERSİZ(A:A)</text>
        </>
    );
};
export const AnimatedIferrorSVG = () => {
    const step = useAnimation(3, 2000);
    return (
        <>
            <text x="100" y="15" textAnchor="middle" style={{ ...commonTextStyle, fontWeight: "bold" }}>EĞERHATA (IFERROR)</text>
            <StepIndicator current={step} total={3} />
            <text x="100" y="50" textAnchor="middle" style={formulaTextStyle}>=DÜŞEYARA("X", ...)</text>
            
            <rect x="70" y="70" width="60" height="25" fill={step === 0 ? "#fee2e2" : "#e0e7ff"} stroke={step === 0 ? "#ef4444" : "#4f46e5"}/>
            <text x="100" y="87" textAnchor="middle" style={{...commonTextStyle, fontSize: "12px", fill: step === 0 ? "#b91c1c" : "#3730a3", fontWeight: 'bold'}}>
                {step === 0 ? "#YOK!" : "Bulunamadı"}
            </text>
            <g style={{opacity: step >= 1 ? 1 : 0, transition: 'opacity 0.5s'}}>
                 <text x="100" y="130" textAnchor="middle" style={formulaTextStyle}>=EĞERHATA( <tspan>DÜŞEYARA(...)</tspan> ; <tspan fill="#4f46e5">"Bulunamadı"</tspan> )</text>
            </g>
        </>
    )
};
export const AnimatedTrimSVG = () => {
    const step = useAnimation(2, 2000);
    const before = "  Excel   Harika  ";
    const after = "Excel Harika";
    return (
        <>
            <text x="100" y="15" textAnchor="middle" style={{ ...commonTextStyle, fontWeight: "bold" }}>KIRP (TRIM)</text>
            <StepIndicator current={step} total={2} />
            <rect x="20" y="60" width="160" height="30" fill="#fff" stroke="#94a3b8" />
            <text x="100" y="80" textAnchor="middle" style={{...commonTextStyle, fontSize: "12px", fontFamily: "monospace", whiteSpace: "pre"}}>
                {step === 0 ? before : after}
            </text>
            <text x="26" y="80" fill="#ef4444" style={{...formulaTextStyle, opacity: step === 0 ? 1 : 0}}>__</text>
            <text x="75" y="80" fill="#ef4444" style={{...formulaTextStyle, opacity: step === 0 ? 1 : 0}}>___</text>
            <text x="160" y="80" fill="#ef4444" style={{...formulaTextStyle, opacity: step === 0 ? 1 : 0}}>__</text>
            <text x="100" y="130" textAnchor="middle" style={formulaTextStyle}>=KIRP(A1)</text>
        </>
    );
};
export const AnimatedLenSVG = () => {
    const step = useAnimation(7, 500);
    const text = "Excel";
    return (
        <>
            <text x="100" y="15" textAnchor="middle" style={{ ...commonTextStyle, fontWeight: "bold" }}>UZUNLUK (LEN)</text>
            <rect x="60" y="60" width="80" height="30" fill="#fff" stroke="#94a3b8" />
            <text x="100" y="80" textAnchor="middle" style={{...commonTextStyle, fontSize: "14px"}}>
                {text.split("").map((char, i) => (
                    <tspan key={i} fill={step === i ? '#16a34a' : '#475569'}>{char}</tspan>
                ))}
            </text>
            <text x="100" y="130" textAnchor="middle" style={{...formulaTextStyle, fontSize: "16px"}}>
                {step < 5 ? step + 1 : '5'}
            </text>
        </>
    );
};
export const AnimatedUpperLowerProperSVG = () => {
    const step = useAnimation(3, 2000);
    const textStates = ["eXceL", "EXCEL", "excel", "Excel"];
    const formulaStates = ["=BÜYÜKHARF(A1)", "=KÜÇÜKHARF(A1)", "=YAZIM.DÜZENİ(A1)"];
    return (
        <>
            <text x="100" y="15" textAnchor="middle" style={{...commonTextStyle, fontWeight: "bold" }}>Büyük/Küçük Harf</text>
            <rect x="60" y="60" width="80" height="30" fill="#fff" stroke="#94a3b8" />
            <text x="100" y="80" textAnchor="middle" style={{...commonTextStyle, fontSize: "14px"}}>{textStates[step]}</text>
            <text x="100" y="130" textAnchor="middle" style={formulaTextStyle}>{formulaStates[step]}</text>
        </>
    );
};
export const AnimatedSumifsSVG = () => {
    const step = useAnimation(5, 2000);
    const data = [
        { cat: 'Elma', reg: 'Batı', val: 10, match1: true, match2: false },
        { cat: 'Armut', reg: 'Doğu', val: 20, match1: false, match2: true },
        { cat: 'Elma', reg: 'Doğu', val: 30, match1: true, match2: true },
        { cat: 'Elma', reg: 'Doğu', val: 40, match1: true, match2: true },
    ];
    return (
        <>
            <text x="100" y="15" textAnchor="middle" style={{...commonTextStyle, fontWeight: 'bold'}}>ÇOKETOPLA (SUMIFS)</text>
            <StepIndicator current={step} total={5} />
            <g transform="translate(20, 30)">
                 {data.map((d, i) => (
                    <g key={i}>
                        <rect y={i * 22} width="160" height="20" fill={
                            step === 2 && d.match1 && d.match2 ? '#dcfce7' : 
                            (step === 1 && d.match1 ? '#fef9c3' : (step === 0 && d.match2 ? '#e0f2fe' : '#fff'))
                            } stroke="#cbd5e1" style={{transition:'fill 0.3s'}}/>
                        <text x="25" y={i*22+14} textAnchor="middle" style={commonTextStyle}>{d.cat}</text>
                        <text x="75" y={i*22+14} textAnchor="middle" style={commonTextStyle}>{d.reg}</text>
                        <text x="135" y={i*22+14} textAnchor="middle" style={{...commonTextStyle, fontWeight: step >= 3 && d.match1 && d.match2 ? 'bold' : 'normal'}}>{d.val}</text>
                    </g>
                ))}
            </g>
            <text x="10" y="130" style={{...commonTextStyle, opacity: step === 0 ? 1 : 0}}>Koşul 1: Bölge="Doğu"</text>
            <text x="10" y="130" style={{...commonTextStyle, opacity: step === 1 ? 1 : 0}}>Koşul 2: Kategori="Elma"</text>
            <text x="10" y="130" style={{...commonTextStyle, opacity: step === 2 ? 1 : 0}}>Kesişim bulunur</text>
             <rect x="140" y="125" width="40" height="20" fill="#f0fdf4" stroke="#22c55e"/>
            <text x="160" y="139" textAnchor="middle" style={{...commonTextStyle, fontWeight: 'bold', opacity: step >= 4 ? 1 : 0}}>{30+40}</text>
        </>
    );
};
export const AnimatedCountifSVG = () => {
    const step = useAnimation(3, 2000);
    const data = ["Elma", "Armut", "Elma", "Kiraz", "Elma"];
    return (
        <>
            <text x="100" y="15" textAnchor="middle" style={{...commonTextStyle, fontWeight: 'bold'}}>EĞERSAY (COUNTIF)</text>
            <StepIndicator current={step} total={3} />
            <g transform="translate(30, 30)">
                {data.map((d, i) => (
                    <g key={i}>
                        <rect y={i * 22} width="60" height="20" fill={step >= 1 && d === 'Elma' ? '#dcfce7' : '#fff'} stroke="#cbd5e1" style={{transition:'fill 0.3s'}} />
                        <text x="30" y={i*22+14} textAnchor="middle" style={commonTextStyle}>{d}</text>
                    </g>
                ))}
            </g>
            <g transform="translate(110, 60)">
                <text x="30" y="0" textAnchor="middle" style={{...commonTextStyle}}>Sayı:</text>
                <rect width="60" height="30" fill="#f0fdf4" stroke="#22c55e" />
                <text x="30" y="20" textAnchor="middle" style={{...commonTextStyle, fontSize: '14px', fontWeight: 'bold', opacity: step === 2 ? 1: 0}}>3</text>
            </g>
            <text x="5" y="140" style={{...formulaTextStyle, opacity: step === 0 ? 1 : 0}}>=EĞERSAY(A:A; "Elma")</text>
        </>
    );
};
export const AnimatedWorkdaySVG = () => {
    const step = useAnimation(3, 2000);
    const days = ["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"];
    return (
        <>
            <text x="100" y="15" textAnchor="middle" style={{ ...commonTextStyle, fontWeight: "bold" }}>İŞGÜNÜ (WORKDAY)</text>
            <StepIndicator current={step} total={3} />
            <g transform="translate(5, 50)">
                 {days.map((d, i) => (
                    <g key={i}>
                        <rect x={i * 28} width="26" height="20" fill={i < 5 ? '#fff' : '#e2e8f0'} stroke="#94a3b8" />
                        <text x={i*28+13} y="14" textAnchor="middle" style={commonTextStyle}>{d}</text>
                    </g>
                 ))}
                 <rect x="28" y="0" width="26" height="20" fill="#f0fdf4" stroke="#22c55e" style={{opacity: step === 0 ? 1 : 0}}/>
                 <path d="M 41 20 v 10" stroke="#3b82f6" style={{opacity: step === 1 ? 1 : 0}}/>
                 <path d="M 69 20 v 10" stroke="#3b82f6" style={{opacity: step === 1 ? 1 : 0}}/>
                 <path d="M 97 20 v 10" stroke="#3b82f6" style={{opacity: step === 1 ? 1 : 0}}/>
                 <rect x="84" y="0" width="26" height="20" fill="#fef9c3" stroke="#f59e0b" style={{opacity: step === 2 ? 1 : 0}}/>
            </g>
            <text x="100" y="130" textAnchor="middle" style={formulaTextStyle}>=İŞGÜNÜ(Salı; 3)</text>
        </>
    );
};
export const AnimatedSortSVG = () => {
    const step = useAnimation(2, 2000);
    const initialPos = [0, 1, 2];
    const sortedPos = [1, 2, 0];
    const data = [8, 3, 5];
    return (
        <>
            <text x="100" y="15" textAnchor="middle" style={{ ...commonTextStyle, fontWeight: "bold" }}>SIRALA (SORT)</text>
            <StepIndicator current={step} total={2} />
             {data.map((d, i) => (
                 <g key={i} transform={`translate(80, ${40 + (step === 0 ? initialPos[i] : sortedPos[i]) * 25})`} style={{transition: 'transform 0.5s'}}>
                     <rect width="40" height="20" fill="#fff" stroke="#94a3b8" />
                    <text x="20" y="14" textAnchor="middle" style={commonTextStyle}>{d}</text>
                 </g>
             ))}
             <text x="100" y="130" textAnchor="middle" style={formulaTextStyle}>=SIRALA(A1:A3)</text>
        </>
    );
};
export const AnimatedXlookupSVG = () => {
    const step = useAnimation(6, 2000);
    return (
        <>
            <text x="100" y="15" textAnchor="middle" style={{...commonTextStyle, fontWeight: 'bold'}}>ÇAPRAZARA (XLOOKUP)</text>
            <StepIndicator current={step} total={6} />
             {/* Table */}
            <g>
                <rect x="20" y="30" width="160" height="80" fill="#fff" stroke="#cbd5e1" />
                <line x1="80" y1="30" x2="80" y2="110" stroke="#e2e8f0" />
                <text x="50" y="45" textAnchor="middle" style={{...commonTextStyle, fontWeight: 'bold'}}>Ad</text>
                <text x="130" y="45" textAnchor="middle" style={{...commonTextStyle, fontWeight: 'bold'}}>ID</text>
                <text x="50" y="65" textAnchor="middle" style={commonTextStyle}>Ayşe</text>
                <text x="130" y="65" textAnchor="middle" style={commonTextStyle}>101</text>
                <text x="50" y="85" textAnchor="middle" style={commonTextStyle}>Fatma</text>
                <text x="130" y="85" textAnchor="middle" style={commonTextStyle}>102</text>
            </g>

            {/* Step 1: Highlight lookup value */}
            <rect x="130" y="120" width="40" height="20" fill="none" stroke="#ef4444" strokeWidth="1.5" style={{opacity: step === 0 ? 1: 0, transition: 'opacity 0.3s'}}/>
            <text x="100" y="135" style={{...formulaTextStyle}}>ÇAPRAZARA(<tspan fill="#ef4444" style={{opacity: step >= 0 ? 1 : 0}}>102</tspan>...)</text>
            
             {/* Step 2: Highlight lookup array */}
            <rect x="80" y="30" width="100" height="80" fill="#3b82f6" fillOpacity="0.1" stroke="#3b82f6" strokeWidth="1.5" style={{opacity: step === 1 ? 1: 0, transition: 'opacity 0.3s'}}/>
            <text x="100" y="135" style={{...formulaTextStyle}}>...(<tspan fill="#ef4444">102</tspan>; <tspan fill="#3b82f6" style={{opacity: step >= 1 ? 1 : 0}}>ID Sütunu</tspan>...)</text>

            {/* Step 3: Highlight return array (to the left) */}
            <rect x="20" y="30" width="60" height="80" fill="#10b981" fillOpacity="0.1" stroke="#10b981" strokeWidth="1.5" style={{opacity: step === 2 ? 1: 0, transition: 'opacity 0.3s'}}/>
            <text x="100" y="135" style={{...formulaTextStyle}}>...(<tspan fill="#ef4444">102</tspan>; <tspan fill="#3b82f6">ID Sütunu</tspan>; <tspan fill="#10b981" style={{opacity: step >= 2 ? 1 : 0}}>Ad Sütunu</tspan>)</text>

            {/* Step 4: Scan and find */}
            <rect x="81" y="70" width="98" height="20" fill="none" stroke="#ef4444" strokeWidth="1.5" style={{opacity: step === 3 ? 1: 0}} />

            {/* Step 5: Jump left */}
             <path d="M 81 80 C 60 80, 60 80, 50 80" fill="none" stroke="#10b981" strokeWidth="2" strokeDasharray="3,3" style={{opacity: step === 4 ? 1: 0}}>
                <animate attributeName="stroke-dashoffset" from="30" to="0" dur="1s" fill="freeze" />
            </path>
            <rect x="21" y="70" width="58" height="20" fill="none" stroke="#10b981" strokeWidth="1.5" style={{opacity: step === 4 ? 1: 0}} />

             {/* Step 6: Result */}
            <text x="15" y="85" textAnchor="middle" style={{...commonTextStyle, fill: '#16a34a', opacity: step === 5 ? 1:0, fontWeight:'bold'}}>Fatma</text>
        </>
    );
};
export const AnimatedIndirectSVG = () => {
    const step = useAnimation(5, 1800);
    return (
        <>
            <text x="100" y="15" textAnchor="middle" style={{...commonTextStyle, fontWeight: 'bold'}}>DOLAYLI (INDIRECT)</text>
            <StepIndicator current={step} total={5} />

            <rect x="20" y="40" width="40" height="20" fill="#fff" stroke="#94a3b8" />
            <text x="40" y="54" textAnchor="middle" style={commonTextStyle}>A1: "C5"</text>

            <rect x="140" y="90" width="40" height="20" fill="#fff" stroke="#94a3b8" />
            <text x="160" y="104" textAnchor="middle" style={commonTextStyle}>C5: "Veri"</text>

            <rect x="20" y="120" width="100" height="20" fill="#f0fdf4" stroke="#22c55e" />
            <text x="70" y="134" textAnchor="middle" style={{...formulaTextStyle, opacity: step === 4 ? 1 : 0}}>"Veri"</text>
            
            <text x="10" y="100" style={formulaTextStyle}>=DOLAYLI(A1)</text>

            <path d="M 70 120 V 60 H 40" fill="none" stroke="#ef4444" strokeWidth="1.5" style={{opacity: step === 1 ? 1 : 0}}/>
            <path d="M 40 50 C 60 20, 140 20, 160 90" fill="none" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="3,3" style={{opacity: step === 2 ? 1 : 0}}/>
            <path d="M 160 110 V 130 H 70" fill="none" stroke="#10b981" strokeWidth="1.5" style={{opacity: step === 3 ? 1 : 0}}/>
        </>
    );
};
export const AnimatedOffsetSVG = () => {
    const step = useAnimation(4, 1500);
    return (
        <>
            <text x="100" y="15" textAnchor="middle" style={{...commonTextStyle, fontWeight: 'bold'}}>KAYDIR (OFFSET)</text>
            <StepIndicator current={step} total={4} />
            <g transform="translate(40, 30)">
                {[...Array(3)].map((_, i) =>
                    [...Array(3)].map((_, j) => (
                         <rect key={`${i}-${j}`} x={j*40} y={i*30} width="38" height="28" fill="#fff" stroke="#cbd5e1"/>
                    ))
                )}
                <rect x="0" y="0" width="38" height="28" fill="#fef9c3" stroke="#f59e0b" style={{opacity: step >=0 ? 1 : 0}} />
                <text x="19" y="18" style={commonTextStyle}>A1</text>
                 <rect x="40" y="60" width="38" height="28" fill="#dcfce7" stroke="#16a34a" style={{opacity: step >=3 ? 1 : 0}}/>
                <text x="59" y="78" style={{...commonTextStyle, fill: step >= 3 ? '#166534' : 'transparent'}}>B3</text>
            </g>
             <path d="M 59 44 V 74" fill="none" stroke="#ef4444" strokeWidth="1.5" markerEnd="url(#arrowhead-vlookup-anim)" style={{opacity: step === 1 ? 1 : 0}}/>
             <text x="65" y="64" style={{...commonTextStyle, fill: '#ef4444', opacity: step === 1 ? 1 : 0}}>2 satır</text>
             <path d="M 59 74 H 89" fill="none" stroke="#3b82f6" strokeWidth="1.5" markerEnd="url(#arrowhead-vlookup-anim)" style={{opacity: step === 2 ? 1 : 0}}/>
             <text x="65" y="86" style={{...commonTextStyle, fill: '#3b82f6', opacity: step === 2 ? 1 : 0}}>1 sütun</text>

            <text x="100" y="135" textAnchor="middle" style={formulaTextStyle}>=KAYDIR(A1; 2; 1)</text>
        </>
    );
};
export const AnimatedRowColSVG = () => {
    const step = useAnimation(2, 2000);
    return (
        <>
            <text x="100" y="15" textAnchor="middle" style={{...commonTextStyle, fontWeight: 'bold'}}>SATIR / SÜTUN</text>
            <StepIndicator current={step} total={2} />
             <g transform="translate(40, 30)">
                {[...Array(3)].map((_, i) => (
                    <g key={i}>
                         <text x="-10" y={i*30+18} textAnchor="middle" style={{...commonTextStyle, fill: step === 0 ? '#ef4444' : '#94a3b8'}}>{i+1}</text>
                         <text y="-5" x={i*40+19} textAnchor="middle" style={{...commonTextStyle, fill: step === 1 ? '#3b82f6' : '#94a3b8'}}>{String.fromCharCode(65+i)}</text>
                    </g>
                ))}
                <rect x="80" y="30" width="38" height="28" fill="#fef9c3" stroke="#f59e0b"/>
                <text x="99" y="48" style={commonTextStyle}>C2</text>
            </g>
             <text x="100" y="135" textAnchor="middle" style={formulaTextStyle}>
                 {step === 0 ? '=SATIR(C2) → ' : '=SÜTUN(C2) → '}
                 <tspan fontWeight="bold" fill={step === 0 ? '#ef4444' : '#3b82f6'}>{step === 0 ? '2' : '3'}</tspan>
            </text>
        </>
    );
};
export const AnimatedAndOrSVG = () => {
    const step = useAnimation(4, 2000);
    const cond1 = { text: "A1>50", val: 70, isTrue: true };
    const cond2 = { text: 'B1="Evet"', val: step < 2 ? "Evet" : "Hayır", isTrue: step < 2 };
    const formula = step % 2 === 0 ? "VE" : "YADA";
    const result = formula === "VE" ? (cond1.isTrue && cond2.isTrue) : (cond1.isTrue || cond2.isTrue);
    return (
        <>
            <text x="100" y="15" textAnchor="middle" style={{...commonTextStyle, fontWeight: 'bold'}}>VE / YADA</text>
            <StepIndicator current={step} total={4} />
            <g transform="translate(20, 50)">
                 <rect width="70" height="20" fill={cond1.isTrue ? '#dcfce7' : '#fee2e2'} stroke={cond1.isTrue ? '#16a34a' : '#ef4444'} />
                 <text x="35" y="14" textAnchor="middle" style={commonTextStyle}>{cond1.text} → DOĞRU</text>
            </g>
             <g transform="translate(110, 50)">
                 <rect width="70" height="20" fill={cond2.isTrue ? '#dcfce7' : '#fee2e2'} stroke={cond2.isTrue ? '#16a34a' : '#ef4444'} />
                 <text x="35" y="14" textAnchor="middle" style={commonTextStyle}>{cond2.text} → {cond2.isTrue ? 'DOĞRU' : 'YANLIŞ'}</text>
            </g>
            <text x="100" y="100" textAnchor="middle" style={{...formulaTextStyle, fontSize: "12px"}}>{formula}</text>
             <g transform="translate(75, 120)">
                 <rect width="50" height="20" fill={result ? '#dcfce7' : '#fee2e2'} stroke={result ? '#16a34a' : '#ef4444'} />
                 <text x="25" y="14" textAnchor="middle" style={{...commonTextStyle, fontWeight:'bold'}}>{result ? 'DOĞRU' : 'YANLIŞ'}</text>
            </g>
        </>
    );
};
export const AnimatedIfsSVG = () => {
    const step = useAnimation(5, 1800);
    const val = 85;
    return (
        <>
            <text x="100" y="15" textAnchor="middle" style={{...commonTextStyle, fontWeight: 'bold'}}>ÇOKEĞER (IFS)</text>
            <StepIndicator current={step} total={5} />
            <text x="10" y="40" style={commonTextStyle}>Puan: {val}</text>
            
            <text x="10" y="60" style={{...commonTextStyle, fill: step === 1 ? '#ef4444' : '#a1a1aa'}}>1. {val}{'>'} 90? → YANLIŞ</text>
            <path d="M 80 55 H 180" stroke="#ef4444" strokeWidth="1.5" style={{opacity: step === 1 ? 1 : 0}} />
            
            <text x="10" y="80" style={{...commonTextStyle, fill: step === 2 ? '#16a34a' : '#a1a1aa'}}>2. {val}{'>'} 80? → DOĞRU</text>
            <path d="M 80 75 H 180" stroke="#16a34a" strokeWidth="1.5" style={{opacity: step === 2 ? 1 : 0}} />

            <text x="10" y="100" style={{...commonTextStyle, fill:'#a1a1aa', opacity: step >= 3 ? 0.3 : 1}}>3. {val}{'>'} 70? ...</text>

            <rect x="140" y="120" width="40" height="20" fill="#f0fdf4" stroke="#22c55e" style={{opacity: step >= 3 ? 1 : 0}} />
            <text x="160" y="134" textAnchor="middle" style={{...commonTextStyle, fontWeight: 'bold', opacity: step >= 4 ? 1 : 0}}> "B" </text>
        </>
    );
};
export const AnimatedSwitchSVG = () => {
    const step = useAnimation(4, 1800);
    const val = 2;
    const cases = [
        { c: 1, r: "Düşük", match: false },
        { c: 2, r: "Orta", match: true },
        { c: 3, r: "Yüksek", match: false },
    ];
    return (
        <>
            <text x="100" y="15" textAnchor="middle" style={{...commonTextStyle, fontWeight: 'bold'}}>DEĞİŞTİR (SWITCH)</text>
            <StepIndicator current={step} total={4} />
            <text x="10" y="40" style={commonTextStyle}>Değer: {val}</text>
            {cases.map((c, i) => (
                <g key={i} transform={`translate(10, ${60 + i*20})`} style={{opacity: step > i ? 1 : 0}}>
                    <text x="0" style={{...commonTextStyle, fill: step === i+1 ? (c.match ? '#16a34a' : '#ef4444') : '#a1a1aa'}}>
                        {val} == {c.c} ? → {c.match ? 'EVET' : 'HAYIR'}
                    </text>
                </g>
            ))}
             <rect x="140" y="120" width="40" height="20" fill="#f0fdf4" stroke="#22c55e" style={{opacity: step === 3 ? 1 : 0}} />
            <text x="160" y="134" textAnchor="middle" style={{...commonTextStyle, fontWeight: 'bold', opacity: step === 3 ? 1 : 0}}> "Orta" </text>
        </>
    );
};
export const AnimatedIsBlankSVG = () => {
    const step = useAnimation(4, 2000);
    const isCheckingBlank = step < 2;
    return (
        <>
            <text x="100" y="15" textAnchor="middle" style={{...commonTextStyle, fontWeight: 'bold'}}>EBOŞSA (ISBLANK)</text>
            <StepIndicator current={step} total={4} />
            <g transform="translate(30,50)">
                <rect width="50" height="30" fill="#fff" stroke="#94a3b8" />
                <text x="25" y="20" textAnchor="middle" style={commonTextStyle}>A1 (Boş)</text>
            </g>
             <g transform="translate(120,50)">
                <rect width="50" height="30" fill="#fff" stroke="#94a3b8" />
                <text x="25" y="20" textAnchor="middle" style={commonTextStyle}>B1 ("Dolu")</text>
            </g>
            
            <path d="M 100 100 V 80 H" x2="55" stroke="#ef4444" strokeWidth="1.5" style={{opacity: isCheckingBlank && step === 1 ? 1 : 0}}>
                 <animate attributeName="d" from="M 100 100 V 80 H 55" to={isCheckingBlank ? "M 100 100 V 80 H 55" : "M 100 100 V 80 H 145"} dur="0.5s" fill="freeze" />
            </path>
            
            <text x="100" y="100" textAnchor="middle" style={formulaTextStyle}>{isCheckingBlank ? '=EBOŞSA(A1)' : '=EBOŞSA(B1)'}</text>
             <g transform="translate(75, 120)">
                 <rect width="50" height="20" fill={isCheckingBlank ? '#dcfce7' : '#fee2e2'} stroke={isCheckingBlank ? '#16a34a' : '#ef4444'} style={{opacity: step % 2 !== 0 ? 1 : 0}}/>
                 <text x="25" y="14" textAnchor="middle" style={{...commonTextStyle, fontWeight:'bold', opacity: step % 2 !== 0 ? 1 : 0}}>{isCheckingBlank ? 'DOĞRU' : 'YANLIŞ'}</text>
            </g>
        </>
    );
};
export const AnimatedSubstituteSVG = () => {
    const step = useAnimation(3, 1500);
    const texts = ["Excel-Rapor", "Excel/Rapor", "Excel/Rapor"];
    return (
        <>
            <text x="100" y="15" textAnchor="middle" style={{...commonTextStyle, fontWeight: 'bold'}}>YERİNEKOY (SUBSTITUTE)</text>
            <StepIndicator current={step} total={3} />
            <rect x="40" y="60" width="120" height="30" fill="#fff" stroke="#94a3b8"/>
            <text x="100" y="80" textAnchor="middle" style={{...commonTextStyle, fontSize: "12px"}}>
                Excel<tspan fill={step === 1 ? '#ef4444' : '#475569'}>{step > 0 ? "/" : "-"}</tspan>Rapor
            </text>
            <text x="100" y="130" textAnchor="middle" style={formulaTextStyle}>=YERİNEKOY(A1; "-"; "/")</text>
        </>
    );
};
export const AnimatedFindSVG = () => {
    const step = useAnimation(5, 800);
    const text = "user@domain";
    return (
        <>
            <text x="100" y="15" textAnchor="middle" style={{...commonTextStyle, fontWeight: 'bold'}}>MBUL (FIND)</text>
             <rect x="40" y="60" width="120" height="30" fill="#fff" stroke="#94a3b8"/>
             <text x="100" y="80" textAnchor="middle" style={{...commonTextStyle, fontSize: "14px"}}>{text}</text>
             <path d={`M ${58 + step * 8} 85 L ${58 + step * 8} 95`} stroke="#ef4444" style={{opacity: step < 4 ? 1:0}}/>
             <rect x={58 + 4 * 8 - 4} y="70" width="12" height="14" fill="none" stroke="#16a34a" strokeWidth="1.5" style={{opacity: step >= 4 ? 1:0}}/>

            <text x="100" y="130" textAnchor="middle" style={formulaTextStyle}>=MBUL("@"; A1) → <tspan fontWeight="bold" style={{opacity: step >= 4 ? 1 : 0}}>5</tspan></text>
        </>
    );
};
export const AnimatedAverageifSVG = () => {
    const step = useAnimation(4, 2000);
    const data = [
        { cat: 'Elma', val: 10, isMatch: true },
        { cat: 'Armut', val: 20, isMatch: false },
        { cat: 'Elma', val: 30, isMatch: true },
    ];
    return (
        <>
            <text x="100" y="15" textAnchor="middle" style={{...commonTextStyle, fontWeight: 'bold'}}>EĞERORTALAMA (AVERAGEIF)</text>
            <StepIndicator current={step} total={4} />
            {/* Table */}
            <g transform="translate(40, 30)">
                {data.map((d, i) => (
                    <g key={i}>
                        <rect y={i * 22} width="120" height="20" fill={step >= 1 && d.isMatch ? '#dcfce7' : '#fff'} stroke="#cbd5e1" style={{transition:'fill 0.3s'}}/>
                        <text x="30" y={i*22+14} textAnchor="middle" style={commonTextStyle}>{d.cat}</text>
                        <text x="90" y={i*22+14} textAnchor="middle" style={{...commonTextStyle, fontWeight: step >= 2 && d.isMatch ? 'bold' : 'normal', fill: step >= 2 && d.isMatch ? '#15803d' : '#475569'}}>{d.val}</text>
                    </g>
                ))}
            </g>
             {/* Result */}
            <rect x="100" y="125" width="60" height="20" fill="#f0fdf4" stroke="#22c55e"/>
            <text x="130" y="139" textAnchor="middle" style={{...commonTextStyle, fontWeight: 'bold', opacity: step === 3 ? 1 : 0}}>{(10+30)/2}</text>
            <text x="5" y="135" style={{...formulaTextStyle, opacity: step === 2 ? 1: 0, transition: 'opacity 0.3s'}}>(10+30)/2</text>
        </>
    );
};
export const AnimatedSumProductSVG = () => {
    const step = useAnimation(4, 2000);
    const data = [{qty: 5, price: 10}, {qty: 3, price: 20}, {qty: 4, price: 15}];
    const products = data.map(d => d.qty * d.price);
    const total = products.reduce((a, b) => a + b, 0);
    return (
        <>
            <text x="100" y="15" textAnchor="middle" style={{...commonTextStyle, fontWeight: 'bold'}}>TOPLA.ÇARPIM (SUMPRODUCT)</text>
            <StepIndicator current={step} total={4} />
            {/* Table */}
            <g transform="translate(20, 30)">
                <text x="25" y="15" textAnchor="middle" style={{...commonTextStyle, fontWeight: 'bold'}}>Adet</text>
                <text x="75" y="15" textAnchor="middle" style={{...commonTextStyle, fontWeight: 'bold'}}>Fiyat</text>
                {data.map((d, i) => (
                    <g key={i} transform={`translate(0, ${25 + i * 25})`}>
                        <rect width="50" height="20" fill="#fff" stroke="#cbd5e1"/>
                        <rect x="50" width="50" height="20" fill="#fff" stroke="#cbd5e1"/>
                        <text x="25" y="14" textAnchor="middle" style={commonTextStyle}>{d.qty}</text>
                        <text x="75" y="14" textAnchor="middle" style={commonTextStyle}>{d.price}</text>
                    </g>
                ))}
            </g>
             {/* Calculation lines */}
             {data.map((d, i) => (
                <g key={i}>
                    <path d={`M 70 ${57.5 + i * 25} H 120`} stroke="#ef4444" strokeWidth="1.5" style={{opacity: step === 1 ? 1 : 0}}/>
                    <text x="130" y={61.5 + i * 25} style={{...commonTextStyle, fill: "#ef4444", opacity: step >= 2 ? 1:0}}>= {products[i]}</text>
                </g>
             ))}
             {/* Total */}
             <rect x="125" y="115" width="40" height="20" fill="#f0fdf4" stroke="#22c55e"/>
             <text x="145" y="129" textAnchor="middle" style={{...commonTextStyle, fontWeight: 'bold', opacity: step === 3 ? 1: 0}}>{total}</text>
        </>
    );
};
export const AnimatedMinMaxSVG = () => {
    const step = useAnimation(6, 1000);
    const data = [15, 8, 22, 12, 30];
    const maxVal = Math.max(...data);
    return (
        <>
            <text x="100" y="15" textAnchor="middle" style={{...commonTextStyle, fontWeight: 'bold'}}>MAK (MAX)</text>
            <StepIndicator current={step} total={6} />
            <g transform="translate(40, 50)">
                 {data.map((d, i) => (
                    <g key={i} transform={`translate(${i * 25}, 0)`}>
                        <rect width="20" height="40" fill="#fff" stroke="#cbd5e1"/>
                        <text x="10" y="25" textAnchor="middle" style={commonTextStyle}>{d}</text>
                    </g>
                 ))}
                 <rect x={step*25} width="20" height="40" fill="#fef9c3" stroke="#f59e0b" style={{opacity: step < 5 ? 1:0, transition:'opacity 0.3s'}}/>
                 <rect x={data.indexOf(maxVal) * 25} width="20" height="40" fill="#dcfce7" stroke="#16a34a" style={{opacity: step === 5 ? 1:0}}/>
            </g>
            <text x="100" y="130" textAnchor="middle" style={formulaTextStyle}>=MAK(A1:E1) → <tspan fontWeight="bold" style={{opacity: step === 5 ? 1 : 0}}>{maxVal}</tspan></text>
        </>
    );
};
export const AnimatedNetworkdaysSVG = () => {
    const step = useAnimation(3, 1500);
    const days = ["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"];
    return (
        <>
            <text x="100" y="15" textAnchor="middle" style={{ ...commonTextStyle, fontWeight: "bold" }}>TAMİŞGÜNÜ (NETWORKDAYS)</text>
            <StepIndicator current={step} total={3} />
            <g transform="translate(5, 50)">
                 {days.map((d, i) => (
                    <g key={i}>
                        <rect x={i * 28} width="26" height="20" fill={i < 5 ? '#fff' : '#fee2e2'} stroke="#94a3b8" />
                        <text x={i*28+13} y="14" textAnchor="middle" style={commonTextStyle}>{d}</text>
                    </g>
                 ))}
                 <rect x="0" y="0" width="26" height="20" fill="#f0fdf4" stroke="#22c55e" />
                 <rect x={28*4} y="0" width="26" height="20" fill="#f0fdf4" stroke="#22c55e" />
                 {step >= 1 && [0,1,2,3,4].map(i => (
                     <rect key={i} x={i*28} width="26" height="20" fill="#dcfce7" style={{opacity: step === 1 ? 0.8 : 0}}>
                         <animate attributeName="opacity" from="0" to="0.8" dur="0.2s" begin={`${i*0.1}s`} fill="freeze"/>
                     </rect>
                 ))}
            </g>
            <text x="100" y="130" textAnchor="middle" style={formulaTextStyle}>Sonuç: <tspan fontWeight="bold" style={{opacity: step === 2 ? 1:0}}>5</tspan></text>
        </>
    );
};
export const AnimatedDateSVG = () => {
    const step = useAnimation(3, 1500);
    return (
        <>
            <text x="100" y="15" textAnchor="middle" style={{ ...commonTextStyle, fontWeight: "bold" }}>TARİH (DATE)</text>
            <StepIndicator current={step} total={3} />
            <g transform="translate(10, 60)" style={{opacity: step === 0 ? 1 : 0.5, transition: 'all 0.5s', transform: step >=1 ? 'translate(70, 60)' : 'translate(10, 60)'}}>
                <rect width="40" height="20" fill="#fff" stroke="#94a3b8"/><text x="20" y="14" textAnchor="middle" style={commonTextStyle}>2023</text>
            </g>
            <g transform="translate(60, 60)" style={{opacity: step === 0 ? 1 : 0.5, transition: 'all 0.5s', transform: step >=1 ? 'translate(70, 60)' : 'translate(60, 60)'}}>
                <rect width="40" height="20" fill="#fff" stroke="#94a3b8"/><text x="20" y="14" textAnchor="middle" style={commonTextStyle}>10</text>
            </g>
             <g transform="translate(110, 60)" style={{opacity: step === 0 ? 1 : 0.5, transition: 'all 0.5s', transform: step >=1 ? 'translate(70, 60)' : 'translate(110, 60)'}}>
                <rect width="40" height="20" fill="#fff" stroke="#94a3b8"/><text x="20" y="14" textAnchor="middle" style={commonTextStyle}>25</text>
            </g>
             <g transform="translate(70, 110)">
                <rect width="60" height="20" fill="#f0fdf4" stroke="#22c55e" />
                <text x="30" y="14" textAnchor="middle" style={{...commonTextStyle, opacity: step === 2 ? 1 : 0}}>25.10.2023</text>
             </g>
        </>
    );
};
export const AnimatedDatepartsSVG = () => {
    const step = useAnimation(4, 1500);
    return (
        <>
            <text x="100" y="15" textAnchor="middle" style={{ ...commonTextStyle, fontWeight: "bold" }}>YIL / AY / GÜN</text>
            <StepIndicator current={step} total={4} />
            <g transform="translate(70, 40)">
                <rect width="60" height="20" fill="#fff" stroke="#94a3b8" />
                <text x="30" y="14" textAnchor="middle" style={commonTextStyle}>25.10.2023</text>
            </g>
            <g transform={`translate(${[30, 80, 130][step-1]}, 110)`} style={{opacity: step > 0 ? 1 : 0}}>
                <rect width="40" height="20" fill="#f0fdf4" stroke="#22c55e"/>
                <text x="20" y="14" textAnchor="middle" style={commonTextStyle}>{["2023", "10", "25"][step-1]}</text>
            </g>
             <path d="M 100 60 V 100" stroke="#94a3b8" style={{opacity: step > 0 ? 1: 0}} />
        </>
    );
};
export const AnimatedEdateSVG = () => {
    const step = useAnimation(3, 1500);
    return (
        <>
            <text x="100" y="15" textAnchor="middle" style={{ ...commonTextStyle, fontWeight: "bold" }}>SERİTARİH (EDATE)</text>
            <StepIndicator current={step} total={3} />
            <rect x="20" y="60" width="60" height="20" fill="#fff" stroke="#94a3b8" />
            <text x="50" y="74" textAnchor="middle" style={commonTextStyle}>15.01.2023</text>
            <text x="100" y="45" textAnchor="middle" style={{...commonTextStyle, opacity: step >= 1 ? 1 : 0, fill: '#3b82f6'}}>+3 Ay</text>
            <rect x="120" y="60" width="60" height="20" fill="#f0fdf4" stroke="#22c55e" />
            <text x="150" y="74" textAnchor="middle" style={{...commonTextStyle, opacity: step === 2 ? 1:0}}>15.04.2023</text>
            <path d="M 80 70 H 120" stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#arrowhead-vlookup-anim)" style={{opacity: step >= 1 ? 1 : 0}}/>
        </>
    );
};
export const AnimatedEomonthSVG = () => {
    const step = useAnimation(3, 1500);
    return (
        <>
            <text x="100" y="15" textAnchor="middle" style={{ ...commonTextStyle, fontWeight: "bold" }}>SERİAY (EOMONTH)</text>
            <StepIndicator current={step} total={3} />
            <rect x="20" y="60" width="60" height="20" fill="#fff" stroke="#94a3b8" />
            <text x="50" y="74" textAnchor="middle" style={commonTextStyle}>15.01.2023</text>
            <text x="100" y="45" textAnchor="middle" style={{...commonTextStyle, opacity: step >= 1 ? 1 : 0, fill: '#3b82f6'}}>+1 Ay</text>
            <rect x="120" y="60" width="60" height="20" fill="#f0fdf4" stroke="#22c55e" />
            <text x="150" y="74" textAnchor="middle" style={{...commonTextStyle, opacity: step === 2 ? 1:0}}>28.02.2023</text>
            <path d="M 80 70 H 120" stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#arrowhead-vlookup-anim)" style={{opacity: step >= 1 ? 1 : 0}}/>
        </>
    );
};
export const AnimatedWeekdaySVG = () => {
    const step = useAnimation(2, 2000);
    const days = ["Pzt", "Sal", "Çar", "Per", "Cum"];
    return (
        <>
            <text x="100" y="15" textAnchor="middle" style={{...commonTextStyle, fontWeight: "bold"}}>HAFTANINGÜNÜ (WEEKDAY)</text>
             <g transform="translate(10, 50)">
                <text x="0" y="10" style={commonTextStyle}>15.05.2024 → Çarşamba</text>
                {days.map((d, i) => (
                    <g key={d} transform={`translate(${30 + i * 28}, 40)`}>
                        <rect width="26" height="20" fill={i === 2 && step ===1 ? '#dcfce7' : '#fff'} stroke="#94a3b8"/>
                        <text x="13" y="14" textAnchor="middle" style={commonTextStyle}>{i+2}</text>
                    </g>
                ))}
            </g>
            <text x="100" y="130" textAnchor="middle" style={formulaTextStyle}>Sonuç: <tspan fontWeight="bold" style={{opacity: step === 1 ? 1 : 0}}>4</tspan></text>
        </>
    );
};
export const AnimatedWeeknumSVG = () => {
    const step = useAnimation(2, 2000);
    return (
        <>
            <text x="100" y="15" textAnchor="middle" style={{...commonTextStyle, fontWeight: "bold"}}>HAFTASAY (WEEKNUM)</text>
            <rect x="60" y="60" width="80" height="30" fill="#fff" stroke="#94a3b8"/>
            <text x="100" y="80" textAnchor="middle" style={commonTextStyle}>25.03.2024</text>
            <text x="100" y="130" textAnchor="middle" style={formulaTextStyle}>Yılın <tspan fontWeight="bold" fill="#16a34a" style={{opacity: step === 1 ? 1 : 0}}>13</tspan>. Haftası</text>
        </>
    );
};
export const AnimatedSequenceSVG = () => {
    const step = useAnimation(6, 500);
    return (
        <>
            <text x="100" y="15" textAnchor="middle" style={{ ...commonTextStyle, fontWeight: "bold" }}>SIRA (SEQUENCE)</text>
            <g transform="translate(80, 25)">
                {[...Array(5)].map((_, i) => (
                    <g key={i} transform={`translate(0, ${i*20})`}>
                        <rect width="40" height="18" fill="#f0fdf4" stroke="#22c55e" style={{opacity: step > i ? 1 : 0}}/>
                        <text x="20" y="12" textAnchor="middle" style={{...commonTextStyle, opacity: step > i ? 1 : 0}}>{i+1}</text>
                    </g>
                ))}
            </g>
            <text x="100" y="140" textAnchor="middle" style={formulaTextStyle}>=SIRA(5)</text>
        </>
    );
};
export const AnimatedPmtSVG = () => {
    const step = useAnimation(2, 2000);
    return (
        <>
            <text x="100" y="15" textAnchor="middle" style={{...commonTextStyle, fontWeight: "bold"}}>DEVRESEL ÖDEME (PMT)</text>
            <text x="10" y="40" style={commonTextStyle}>Kredi: 100.000</text>
            <text x="10" y="60" style={commonTextStyle}>Faiz: %1</text>
            <text x="10" y="80" style={commonTextStyle}>Vade: 36 Ay</text>
            <g transform="translate(120, 50)">
                 <rect width="70" height="30" fill="#fef2f2" stroke="#ef4444" style={{opacity: step === 1 ? 1: 0}}/>
                 <text x="35" y="20" textAnchor="middle" style={{...commonTextStyle, fontWeight: 'bold', fill: '#991b1b', opacity: step === 1 ? 1 : 0}}>-3.321,43 ₺</text>
            </g>
        </>
    );
};
export const AnimatedFvSVG = () => {
    const step = useAnimation(4, 1500);
    return (
        <>
            <text x="100" y="15" textAnchor="middle" style={{...commonTextStyle, fontWeight: "bold"}}>GELECEKTEKİ DEĞER (FV)</text>
            <rect x="20" y="40" width="30" height="80" fill="#fef9c3" stroke="#fcd34d" />
            <rect x="20" y={120 - (step * 20)} width="30" height={step * 20} fill="#fde047" style={{transition: 'all 0.5s'}}/>
            <path d="M 60 80 H 120" stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#arrowhead-vlookup-anim)"/>
             <g transform="translate(130, 70)">
                 <rect width="60" height="30" fill="#dcfce7" stroke="#16a34a"/>
                 <text x="30" y="20" textAnchor="middle" style={{...commonTextStyle, fontWeight: 'bold', fill: '#14532d', opacity: step === 3 ? 1 : 0}}>15.868 ₺</text>
            </g>
        </>
    );
};
export const AnimatedPvSVG = () => {
    const step = useAnimation(2, 2000);
    return (
        <>
            <text x="100" y="15" textAnchor="middle" style={{...commonTextStyle, fontWeight: "bold"}}>BUGÜNKÜ DEĞER (PV)</text>
            <text x="10" y="40" style={{...commonTextStyle, fontSize: '10px'}}>Gelecekteki Değer</text>
            <g transform="translate(10, 50)">
                 <rect width="70" height="30" fill="#dbeafe" stroke="#3b82f6" />
                 <text x="35" y="20" textAnchor="middle" style={{...commonTextStyle, fontWeight: 'bold', fill: '#1e3a8a'}}>10.000 ₺</text>
            </g>
            <path d="M 85 65 h 30" stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#arrowhead-vlookup-anim)" style={{opacity: step > 0 ? 1 : 0}} />
            <text x="10" y="110" style={{...commonTextStyle, fontSize: '10px'}}>Bugünkü Değer</text>
            <g transform="translate(120, 50)" style={{opacity: step > 0 ? 1 : 0}}>
                 <rect width="70" height="30" fill="#dcfce7" stroke="#16a34a" />
                 <text x="35" y="20" textAnchor="middle" style={{...commonTextStyle, fontWeight: 'bold', fill: '#14532d'}}>8.264 ₺</text>
            </g>
        </>
    );
};
export const AnimatedNperSVG = () => {
    const step = useAnimation(5, 1000);
    const total = 100;
    return (
        <>
            <text x="100" y="15" textAnchor="middle" style={{...commonTextStyle, fontWeight: "bold"}}>DÖNEM SAYISI (NPER)</text>
            <rect x="20" y="60" width="160" height="20" fill="#f1f5f9" stroke="#94a3b8" />
            <rect x="20" y="60" width={(total - (step*20)) / total * 160} height="20" fill="#3b82f6" style={{transition: 'width 0.5s'}}/>
            <text x="100" y="50" textAnchor="middle" style={commonTextStyle}>Kredi Bakiyesi</text>
            <text x="100" y="120" textAnchor="middle" style={{...formulaTextStyle, fontWeight: 'bold'}}>
                Dönem: <tspan fill="#16a34a">{step}</tspan>
            </text>
        </>
    );
};
export const AnimatedPowerQuerySVG = () => {
    const step = useAnimation(3, 1500);
    const File = ({x, y, style}: any) => (
        <g transform={`translate(${x}, ${y})`} style={style}>
            <rect width="25" height="30" fill="#dcfce7" stroke="#16a34a" rx="2"/>
            <path d="M 5 10 H 20 M 5 15 H 20 M 5 20 H 15" stroke="#6ee7b7" strokeWidth="1"/>
        </g>
    );
    return (
        <>
            <text x="100" y="15" textAnchor="middle" style={{...commonTextStyle, fontWeight: "bold"}}>Power Query: Klasörden Birleştir</text>
            <File x={10} y={40} style={{transition:'transform 0.5s', transform: step >=1 ? 'translateX(70px)' : 'translateX(0)'}}/>
            <File x={10} y={80} style={{transition:'transform 0.5s', transform: step >=1 ? 'translateX(70px)' : 'translateX(0)'}}/>
            <rect x="70" y="30" width="50" height="90" fill="#fef9c3" stroke="#fcd34d" rx="4"/>
            <text x="95" y="25" textAnchor="middle" style={commonTextStyle}>Klasör</text>
            <path d="M 125 75 H 145" stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#arrowhead-vlookup-anim)" style={{opacity: step === 2 ? 1:0}}/>
            <g transform="translate(150, 50)" style={{opacity: step === 2 ? 1:0}}>
                <rect width="45" height="60" fill="#fff" stroke="#94a3b8" rx="2"/>
                <text x="22.5" y="10" textAnchor="middle" style={commonTextStyle}>BİRLEŞİK</text>
                 <path d="M 5 20 H 40 M 5 30 H 40 M 5 40 H 40" stroke="#6ee7b7" strokeWidth="1"/>
            </g>
        </>
    );
};

export const AnimatedMacroDeleteDuplicatesSVG = () => {
    const step = useAnimation(3, 2000);
    const data = ["Elma", "Armut", "Elma", "Kiraz", "Armut"];
    const isDuplicate = (index: number) => (step === 1 && (index === 2 || index === 4));
    const isVisible = (index: number) => !(step === 2 && (index === 2 || index === 4));

    return (
        <>
            <text x="100" y="20" textAnchor="middle" style={{ ...commonTextStyle, fontWeight: "bold" }}>Yinelenenleri Sil</text>
            <StepIndicator current={step} total={3} />
            <g transform="translate(60, 40)">
                {data.map((item, i) => (
                    <g key={i} style={{ opacity: isVisible(i) ? 1 : 0, transition: 'opacity 0.5s' }}>
                        <rect y={i * 20} width="80" height="18" fill={isDuplicate(i) ? "#fecaca" : "#fff"} stroke="#cbd5e1" style={{ transition: 'fill 0.3s' }}/>
                        <text x="40" y={i * 20 + 13} textAnchor="middle" style={commonTextStyle}>{item}</text>
                    </g>
                ))}
            </g>
        </>
    );
};

export const AnimatedMacroAutofitSVG = () => {
    const step = useAnimation(2, 2000);
    return (
        <>
            <text x="100" y="20" textAnchor="middle" style={{ ...commonTextStyle, fontWeight: "bold" }}>Sütunları Otomatik Sığdır</text>
            <StepIndicator current={step} total={2} />
            <rect x="20" y="40" width={step === 0 ? "60" : "120"} height="80" fill="#fff" stroke="#cbd5e1" style={{transition: 'width 0.5s'}}/>
            <rect x="80" y="40" width={step === 0 ? "100" : "50"} height="80" fill="#fff" stroke="#cbd5e1" style={{transition: 'all 0.5s'}}/>
            <text x="25" y="60" style={commonTextStyle}>Kısa Metin</text>
            <text x="25" y="80" style={commonTextStyle}>Bu çok daha uzun bir metin</text>
            <text x="85" y="60" style={commonTextStyle}>Veri</text>
        </>
    );
};

export const AnimatedMacroSaveAsPDFSVG = () => {
    const step = useAnimation(2, 1500);
    const ExcelIcon = () => <path d="M 2 10 L 2 2 Q 2 0 4 0 L 15 0 L 25 10 L 25 28 Q 25 30 23 30 L 4 30 Q 2 30 2 28 Z" fill="#dcfce7" stroke="#16a34a" />;
    const PdfIcon = () => <path d="M 2 10 L 2 2 Q 2 0 4 0 L 15 0 L 25 10 L 25 28 Q 25 30 23 30 L 4 30 Q 2 30 2 28 Z" fill="#fee2e2" stroke="#b91c1c" />;

    return (
        <>
            <text x="100" y="20" textAnchor="middle" style={{ ...commonTextStyle, fontWeight: "bold" }}>PDF Olarak Kaydet</text>
            <StepIndicator current={step} total={2} />
            <g transform="translate(40, 60)">
                <ExcelIcon />
                <text x="13.5" y="22" textAnchor="middle" style={{...commonTextStyle, fontSize: '5px'}}>Rapor.xlsx</text>
            </g>
            <path d="M 80 75 L 120 75" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrowhead-vlookup-anim)" style={{opacity: step === 1 ? 1: 0, transition: 'opacity 0.5s'}}/>
            <g transform={`translate(${step === 1 ? 130 : 220}, 60)`} style={{transition: 'transform 0.5s'}}>
                <PdfIcon />
                <text x="13.5" y="22" textAnchor="middle" style={{...commonTextStyle, fontSize: '5px'}}>Rapor.pdf</text>
            </g>
        </>
    );
};

export const AnimatedMacroUnhideSheetsSVG = () => {
    const step = useAnimation(2, 2000);
    return (
        <>
            <text x="100" y="20" textAnchor="middle" style={{ ...commonTextStyle, fontWeight: "bold" }}>Gizli Sayfaları Göster</text>
            <StepIndicator current={step} total={2} />
            <rect x="20" y="120" width="40" height="15" fill="#16a34a" stroke="#065f46" rx="2"/>
            <text x="40" y="130" textAnchor="middle" style={{...commonTextStyle, fontSize: '6px', fill:'white'}}>Sayfa1</text>
            
            <rect x="65" y="120" width="40" height="15" fill={step === 0 ? "#d1d5db" : "#16a34a"} stroke="#6b7280" rx="2" style={{transition: 'fill 0.5s'}}/>
            <text x="85" y="130" textAnchor="middle" style={{...commonTextStyle, fontSize: '6px', fill:step === 0 ? '#4b5563' : 'white'}}>Gizli1</text>
            
            <rect x="110" y="120" width="40" height="15" fill="#16a34a" stroke="#065f46" rx="2"/>
            <text x="130" y="130" textAnchor="middle" style={{...commonTextStyle, fontSize: '6px', fill:'white'}}>Sayfa2</text>
        </>
    );
};

export const AnimatedMacroFormulasToValuesSVG = () => {
    const step = useAnimation(2, 2000);
    const formulaText = "=A1+B1";
    const valueText = "30";
    return (
        <>
            <text x="100" y="20" textAnchor="middle" style={{ ...commonTextStyle, fontWeight: "bold" }}>Formülü Değere Çevir</text>
            <StepIndicator current={step} total={2} />
            <rect x="50" y="60" width="100" height="30" fill="#fff" stroke="#cbd5e1"/>
            <text x="100" y="78" textAnchor="middle" style={{...formulaTextStyle, fill: step === 0 ? '#059669' : '#475569'}}>
                {step === 0 ? formulaText : valueText}
            </text>
            <rect x="5" y="110" width="190" height="20" fill="#f1f5f9" stroke="#cbd5e1"/>
            <text x="10" y="123" style={formulaTextStyle}>Fx: {formulaText}</text>
            <rect x="5" y="110" width="190" height="20" fill="#ef4444" fillOpacity="0.5" style={{opacity: step === 1 ? 1 : 0, transition: 'opacity 0.5s'}}/>
        </>
    );
};
export const AnimatedMacroSortSheetsSVG = () => {
    const step = useAnimation(2, 2000);
    const initialOrder = ["Z Raporu", "A Raporu", "M Raporu"];
    const sortedOrder = ["A Raporu", "M Raporu", "Z Raporu"];
    const currentOrder = step === 0 ? initialOrder : sortedOrder;
    return (
        <>
            <text x="100" y="20" textAnchor="middle" style={{ ...commonTextStyle, fontWeight: "bold" }}>Sayfaları Sırala</text>
            <StepIndicator current={step} total={2} />
            {currentOrder.map((name, i) => (
                <g key={name} transform={`translate(${20 + i * 55}, 80)`} style={{transition:'transform 0.5s'}}>
                     <rect width="50" height="15" fill="#16a34a" stroke="#065f46" rx="2"/>
                     <text x="25" y="10" textAnchor="middle" style={{...commonTextStyle, fontSize: '6px', fill:'white'}}>{name}</text>
                </g>
            ))}
        </>
    );
};

export const AnimatedMacroDeleteEmptyRowsSVG = () => {
    const step = useAnimation(3, 2000);
    const rows = [
        { y: 40, data: ["Elma", "10"], empty: false },
        { y: 60, data: ["", ""], empty: true },
        { y: 80, data: ["Armut", "15"], empty: false },
        { y: 100, data: ["", ""], empty: true },
        { y: 120, data: ["Kiraz", "20"], empty: false },
    ];

    return (
        <>
            <text x="100" y="20" textAnchor="middle" style={{ ...commonTextStyle, fontWeight: "bold" }}>Boş Satırları Sil</text>
            <StepIndicator current={step} total={3} />
            {/* Table */}
            <g>
                {rows.map((row, i) => (
                    <g key={i} transform={step === 2 && row.y > 60 ? (row.y > 80 ? 'translate(0, -40)' : 'translate(0, -20)') : 'translate(0,0)'} style={{transition: 'transform 0.5s ease-in-out', opacity: (step === 2 && row.empty) ? 0 : 1}}>
                        <rect x="50" y={row.y} width="100" height="20" fill={step === 1 && row.empty ? "#fecaca" : "#fff"} stroke="#cbd5e1" style={{transition: 'fill 0.3s'}}/>
                        <text x="75" y={row.y + 14} textAnchor="middle" style={commonTextStyle}>{row.data[0]}</text>
                        <text x="125" y={row.y + 14} textAnchor="middle" style={commonTextStyle}>{row.data[1]}</text>
                    </g>
                ))}
                 <line x1="100" y1="40" x2="100" y2="140" stroke="#e2e8f0" style={{opacity: step === 2 ? 0 : 1}} />
            </g>
            <text x="10" y="30" style={{...commonTextStyle, opacity: step === 0 ? 1 : 0}}>1. Orijinal tablo</text>
            <text x="10" y="30" style={{...commonTextStyle, fill: '#ef4444', opacity: step === 1 ? 1 : 0}}>2. Boş satırlar bulunur</text>
            <text x="10" y="30" style={{...commonTextStyle, fill: '#16a34a', opacity: step === 2 ? 1 : 0}}>3. Boş satırlar silinir</text>
        </>
    );
};

export const AnimatedMacroExportSheetsSVG = () => {
    const step = useAnimation(4, 1500);

    const sheetPositions = [
        { x: step >= 2 ? 20 : 75, y: step >= 2 ? 100 : 60, opacity: step >= 2 ? 1: 0 },
        { x: step >= 3 ? 85 : 75, y: step >= 3 ? 100 : 60, opacity: step >= 3 ? 1: 0 },
        { x: step >= 1 ? 150 : 75, y: step >= 1 ? 100 : 60, opacity: step >= 1 ? 1: 0 }
    ];
    
    const FileIcon = ({x, y, name, style}: any) => (
        <g transform={`translate(${x}, ${y})`} style={style}>
            <path d="M 2 10 L 2 2 Q 2 0 4 0 L 15 0 L 25 10 L 25 28 Q 25 30 23 30 L 4 30 Q 2 30 2 28 Z" fill="#dcfce7" stroke="#16a34a" />
            <path d="M 15 0 L 15 8 Q 15 10 17 10 L 25 10" fill="none" stroke="#16a34a"/>
            <text x="13.5" y="22" textAnchor="middle" style={{...commonTextStyle, fontSize: '5px'}}>{name}</text>
        </g>
    );

    return (
        <>
            <text x="100" y="20" textAnchor="middle" style={{ ...commonTextStyle, fontWeight: "bold" }}>Her Sayfayı Dışa Aktar</text>
             <StepIndicator current={step} total={4} />

            {/* Folder */}
            <path d="M 10 40 L 190 40 L 190 140 L 10 140 Z" fill="#f1f5f9" stroke="#94a3b8" strokeDasharray="3,3" />
            <text x="100" y="55" textAnchor="middle" style={{...commonTextStyle, fontSize: '7px'}}>Masaüstü Klasörü</text>
            
            {/* Main Workbook */}
            <g style={{transition: 'opacity 0.5s', opacity: step < 1 ? 1 : 0}}>
                <FileIcon x={75} y={60} name="AnaDosya.xlsx" />
                 <rect x="77" y="92" width="21" height="4" fill="#10b981"/>
                 <rect x="100" y="92" width="21" height="4" fill="#3b82f6"/>
                 <rect x="123" y="92" width="21" height="4" fill="#f97316"/>
                 <text x="87.5" y="95.5" style={{...commonTextStyle, fontSize: '3px', fill: 'white'}}>Rapor</text>
                 <text x="110.5" y="95.5" style={{...commonTextStyle, fontSize: '3px', fill: 'white'}}>Veri</text>
                 <text x="133.5" y="95.5" style={{...commonTextStyle, fontSize: '3px', fill: 'white'}}>Grafik</text>
            </g>

            {/* Exported files */}
             <FileIcon x={sheetPositions[0].x} y={sheetPositions[0].y} name="Veri.xlsx" style={{transition: 'all 0.5s', opacity: sheetPositions[0].opacity}}/>
             <FileIcon x={sheetPositions[1].x} y={sheetPositions[1].y} name="Grafik.xlsx" style={{transition: 'all 0.5s', opacity: sheetPositions[1].opacity}} />
             <FileIcon x={sheetPositions[2].x} y={sheetPositions[2].y} name="Rapor.xlsx" style={{transition: 'all 0.5s', opacity: sheetPositions[2].opacity}}/>

        </>
    );
};

export const AnimatedMacroTocSVG = () => {
    const step = useAnimation(3, 2000);
    const sheets = ["Rapor", "Veri", "Grafik"];
    return (
        <>
            <text x="100" y="20" textAnchor="middle" style={{ ...commonTextStyle, fontWeight: "bold" }}>İçindekiler Oluştur</text>
            <StepIndicator current={step} total={3} />

            {/* Initial sheets */}
            <g transform="translate(110, 80)">
                 {sheets.map((s, i) => (
                    <g key={s} transform={`translate(${i * 10}, ${i * -5})`}>
                         <rect x="0" y="0" width="80" height="50" fill="#fff" stroke="#94a3b8"/>
                         <text x="40" y="25" textAnchor="middle" style={commonTextStyle}>{s}</text>
                    </g>
                 ))}
            </g>
            
            {/* New TOC sheet */}
            <g transform={step >= 1 ? 'translate(10, 55)' : 'translate(-100, 55)'} style={{transition: 'transform 0.6s ease-out'}}>
                <rect x="0" y="0" width="80" height="80" fill="#dcfce7" stroke="#16a34a"/>
                <text x="40" y="15" textAnchor="middle" style={{...commonTextStyle, fontWeight: 'bold'}}>İçindekiler</text>
                <line x1="5" y1="20" x2="75" y2="20" stroke="#94a3b8"/>
                {sheets.map((s, i) => (
                    <text key={s} x="10" y={35 + i * 15} textDecoration="underline" fill="#065f46" style={{...commonTextStyle, opacity: step === 2 ? 1: 0, transition: 'opacity 0.5s', transitionDelay: `${i*0.2}s`}}>{s}</text>
                ))}
            </g>
             <text x="10" y="30" style={{...commonTextStyle, opacity: step === 0 ? 1 : 0}}>1. Mevcut sayfalar</text>
            <text x="10" y="30" style={{...commonTextStyle, fill: '#16a34a', opacity: step === 1 ? 1 : 0}}>2. Yeni sayfa eklenir</text>
            <text x="10" y="30" style={{...commonTextStyle, fill: '#065f46', opacity: step === 2 ? 1 : 0}}>3. Linkler oluşturulur</text>
        </>
    );
};

export const AnimatedMacroHighlightConditionalSVG = () => {
    const step = useAnimation(3, 2000);
    const data = [
        [50, 120, 80],
        [150, 90, 200],
        [75, 110, 180]
    ];
    return (
        <>
            <text x="100" y="20" textAnchor="middle" style={{ ...commonTextStyle, fontWeight: "bold" }}>Koşullu Vurgulama</text>
            <StepIndicator current={step} total={3} />
            {/* Table */}
            <g transform="translate(40, 40)">
                {data.map((row, i) =>
                    row.map((cell, j) => (
                        <g key={`${i}-${j}`} transform={`translate(${j * 40}, ${i * 30})`}>
                            <rect width="35" height="25" fill={step === 2 && cell > 100 ? '#fef08a' : '#fff'} stroke="#cbd5e1" style={{transition: 'fill 0.5s'}}/>
                            <text x="17.5" y="17" textAnchor="middle" style={commonTextStyle}>{cell}</text>
                        </g>
                    ))
                )}
            </g>
            <rect x="40" y="40" width="115" height="85" fill="none" stroke="#3b82f6" strokeWidth="2" style={{opacity: step === 0 ? 1 : 0, transition: 'opacity 0.3s'}}/>
            <text x="10" y="30" style={{...commonTextStyle, opacity: step === 0 ? 1:0}}>1. Alan seçilir</text>

            <rect x="50" y="130" width="100" height="15" fill="#f1f5f9" stroke="#94a3b8" style={{opacity: step === 1 ? 1 : 0, transition: 'opacity 0.3s'}}/>
            <text x="100" y="141" textAnchor="middle" style={{...commonTextStyle, opacity: step === 1 ? 1 : 0, transition: 'opacity 0.3s'}}>Koşul: Değer {'>'} 100</text>
             <text x="10" y="30" style={{...commonTextStyle, opacity: step === 1 ? 1:0}}>2. Koşul belirlenir</text>

             <text x="10" y="30" style={{...commonTextStyle, fill: '#ca8a04', opacity: step === 2 ? 1:0}}>3. Hücreler vurgulanır</text>
        </>
    );
};

export const AnimatedMacroTimestampSVG = () => {
    const step = useAnimation(3, 2000);
    return (
        <>
            <text x="100" y="20" textAnchor="middle" style={{ ...commonTextStyle, fontWeight: "bold" }}>Otomatik Zaman Damgası</text>
            <StepIndicator current={step} total={3} />
            {/* Table */}
            <g transform="translate(30, 50)">
                <text x="40" y="-10" textAnchor="middle" style={{...commonTextStyle, fontWeight: 'bold'}}>A (Veri)</text>
                <text x="110" y="-10" textAnchor="middle" style={{...commonTextStyle, fontWeight: 'bold'}}>B (Zaman Damgası)</text>

                <rect x="0" y="0" width="80" height="20" fill="#fff" stroke="#cbd5e1" />
                <rect x="0" y="25" width="80" height="20" fill="#fff" stroke="#cbd5e1" />
                <rect x="0" y="50" width="80" height="20" fill="#fff" stroke="#cbd5e1" />

                <rect x="85" y="0" width="80" height="20" fill="#f8fafc" stroke="#e2e8f0" />
                <rect x="85" y="25" width="80" height="20" fill="#f8fafc" stroke="#e2e8f0" />
                <rect x="85" y="50" width="80" height="20" fill="#f8fafc" stroke="#e2e8f0" />
                
                <text x="40" y="15" textAnchor="middle" style={{...commonTextStyle, opacity: step >= 1 ? 1 : 0}}>Yeni Görev</text>
                
                {/* Typing cursor */}
                <line x1="50" y1="5" x2="50" y2="15" stroke="#000" style={{opacity: step === 0 ? 1 : 0}}>
                    <animate attributeName="opacity" values="0;1;0" dur="1s" repeatCount="indefinite" />
                </line>
                
                {/* Timestamp */}
                <text x="125" y="15" textAnchor="middle" style={{...commonTextStyle, fill: '#16a34a', opacity: step >= 2 ? 1 : 0, transition: 'opacity 0.3s'}}>15.05.24 10:30</text>
            </g>

            <text x="10" y="40" style={{...commonTextStyle, opacity: step === 0 ? 1 : 0}}>1. A sütununa veri girilir</text>
            <text x="10" y="40" style={{...commonTextStyle, opacity: step === 1 ? 1 : 0}}>2. Değişiklik algılanır</text>
            <text x="10" y="40" style={{...commonTextStyle, fill: '#16a34a', opacity: step === 2 ? 1 : 0}}>3. Zaman damgası eklenir</text>
        </>
    );
};

export const AnimatedMacroCombineSheetsSVG = () => {
    const step = useAnimation(4, 1500);
    const Sheet = ({ x, y, name, color, style }: any) => (
        <g transform={`translate(${x}, ${y})`} style={style}>
            <rect width="40" height="50" fill="#fff" stroke={color} rx="2"/>
            <text x="20" y="25" textAnchor="middle" style={commonTextStyle}>{name}</text>
        </g>
    );

    const masterSheetStyle = {
        transform: `scale(${step === 3 ? 1.1 : 1})`,
        transition: 'transform 0.3s ease-in-out'
    };

    return (
        <>
            <text x="100" y="20" textAnchor="middle" style={{ ...commonTextStyle, fontWeight: "bold" }}>Sayfaları Birleştir</text>
            <StepIndicator current={step} total={4} />

            {/* Source Sheets */}
            <Sheet x={10} y={40} name="Veri 1" color="#3b82f6" style={{transition: 'all 0.5s', opacity: step > 0 ? 0 : 1, transform: step > 0 ? 'translate(130, 70)' : 'translate(10, 40)'}} />
            <Sheet x={60} y={40} name="Veri 2" color="#10b981" style={{transition: 'all 0.5s', opacity: step > 1 ? 0 : 1, transform: step > 1 ? 'translate(130, 70)' : 'translate(60, 40)', transitionDelay: '0.2s'}} />
            <Sheet x={110} y={40} name="Veri 3" color="#f97316" style={{transition: 'all 0.5s', opacity: step > 2 ? 0 : 1, transform: step > 2 ? 'translate(130, 70)' : 'translate(110, 40)', transitionDelay: '0.4s'}} />
            
            {/* Master Sheet */}
            <g transform="translate(130, 50)" style={masterSheetStyle}>
                <rect width="60" height="80" fill="#f0fdf4" stroke="#22c55e" rx="2" />
                <text x="30" y="15" textAnchor="middle" style={{ ...commonTextStyle, fontWeight: "bold" }}>Birleştirilmiş</text>
                <rect x="5" y="25" width="50" height="10" fill="#3b82f6" style={{opacity: step > 0 ? 1 : 0, transition: 'opacity 0.5s'}} />
                <rect x="5" y="40" width="50" height="10" fill="#10b981" style={{opacity: step > 1 ? 1 : 0, transition: 'opacity 0.5s'}} />
                <rect x="5" y="55" width="50" height="10" fill="#f97316" style={{opacity: step > 2 ? 1 : 0, transition: 'opacity 0.5s'}} />
            </g>
        </>
    );
};

export const AnimatedMacroProtectSheetsSVG = () => {
    const step = useAnimation(4, 800);
    const LockIcon = ({ x, y, style }: any) => (
        <g transform={`translate(${x}, ${y}) scale(0.8)`}>
            <rect x="3" y="11" width="18" height="11" rx="2" fill="#4b5563" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" fill="none" stroke="#4b5563" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </g>
    );
    const Sheet = ({ x, y, name }: any) => (
        <g transform={`translate(${x}, ${y})`}>
             <rect width="50" height="60" fill="#fff" stroke="#94a3b8" rx="2"/>
             <text x="25" y="30" textAnchor="middle" style={commonTextStyle}>{name}</text>
        </g>
    );

    return (
        <>
            <text x="100" y="20" textAnchor="middle" style={{ ...commonTextStyle, fontWeight: "bold" }}>Tüm Sayfaları Koru</text>
            <StepIndicator current={step} total={4} />
            <Sheet x={20} y={60} name="Rapor" />
            <Sheet x={75} y={60} name="Veri" />
            <Sheet x={130} y={60} name="Özet" />
            
            <LockIcon x={33} y={85} style={{opacity: step >= 1 ? 1 : 0, transition: 'opacity 0.3s'}} />
            <LockIcon x={88} y={85} style={{opacity: step >= 2 ? 1 : 0, transition: 'opacity 0.3s'}} />
            <LockIcon x={143} y={85} style={{opacity: step >= 3 ? 1 : 0, transition: 'opacity 0.3s'}} />
        </>
    );
};

export const AnimatedMacroUnprotectSheetsSVG = () => {
    const step = useAnimation(4, 800);
    const LockIcon = ({ x, y, unlocked }: any) => (
         <g transform={`translate(${x}, ${y}) scale(0.8)`}>
            <rect x="3" y="11" width="18" height="11" rx="2" fill={unlocked ? "#d1d5db" : "#4b5563"} style={{transition:'fill 0.3s'}}/>
            <path d={`M7 11V7a5 5 0 0 1 ${unlocked ? '5-5h5' : '10 0v4'}`} fill="none" stroke={unlocked ? "#d1d5db" : "#4b5563"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{transition:'all 0.3s'}}/>
        </g>
    );
    const Sheet = ({ x, y, name, step }: any) => (
        <g transform={`translate(${x}, ${y})`}>
             <rect width="50" height="60" fill="#fff" stroke="#94a3b8" rx="2"/>
             <text x="25" y="30" textAnchor="middle" style={commonTextStyle}>{name}</text>
             <LockIcon x={13} y={25} unlocked={step} />
        </g>
    );

    return (
        <>
            <text x="100" y="20" textAnchor="middle" style={{ ...commonTextStyle, fontWeight: "bold" }}>Sayfa Korumasını Kaldır</text>
            <StepIndicator current={step} total={4} />
            <Sheet x={20} y={60} name="Rapor" step={step >= 1} />
            <Sheet x={75} y={60} name="Veri" step={step >= 2}/>
            <Sheet x={130} y={60} name="Özet" step={step >= 3}/>
        </>
    );
};

export const AnimatedMacroFindReplaceAllSVG = () => {
    const step = useAnimation(3, 2000);
    const textStyle = {...commonTextStyle, fontSize: '6px'};
    const data = [
        ["A", "B", "A"],
        ["C", "A", "D"],
        ["E", "A", "B"]
    ];

    const Sheet = ({x, y, opacity}: any) => (
        <g transform={`translate(${x}, ${y})`} style={{opacity}}>
            <rect width="45" height="55" fill="#fff" stroke="#94a3b8" rx="2"/>
             {data.map((row, i) => row.map((cell, j) => (
                <text key={`${i}-${j}`} x={10 + j * 12.5} y={15 + i*15} style={textStyle}>
                    {step === 2 && cell === "A" ? <tspan fill="#10b981">X</tspan> : cell}
                    {step === 1 && cell === "A" ? <animate attributeName="fill" from="#ef4444" to="#475569" dur="0.5s" repeatCount="3" /> : null}
                </text>
             )))}
        </g>
    );

    return (
        <>
            <text x="100" y="15" textAnchor="middle" style={{ ...commonTextStyle, fontWeight: "bold" }}>Tüm Sayfalarda Bul ve Değiştir</text>
            <StepIndicator current={step} total={3} />

            <g transform="translate(5, 30)">
                <text x="0" y="10" style={textStyle}>Bul:</text>
                <rect x="20" y="0" width="30" height="15" fill="#fef2f2" stroke="#ef4444" />
                <text x="35" y="10" textAnchor="middle" style={textStyle}>"A"</text>

                <text x="70" y="10" style={textStyle}>Değiştir:</text>
                <rect x="110" y="0" width="30" height="15" fill="#dcfce7" stroke="#16a34a" />
                <text x="125" y="10" textAnchor="middle" style={textStyle}>"X"</text>
            </g>

            <Sheet x={20} y={60} opacity={1} />
            <Sheet x={75} y={60} opacity={1} />
            <Sheet x={130} y={60} opacity={1} />
            
            <text x="100" y={140} textAnchor="middle" style={{...textStyle, opacity: step === 0 ? 1 : 0}}>1. Aranacak ve yeni değerler belirlenir</text>
            <text x="100" y={140} textAnchor="middle" style={{...textStyle, fill: '#ef4444', opacity: step === 1 ? 1 : 0}}>2. Tüm sayfalarda "A" değerleri bulunur</text>
            <text x="100" y={140} textAnchor="middle" style={{...textStyle, fill: '#16a34a', opacity: step === 2 ? 1 : 0}}>3. Değerler "X" ile değiştirilir</text>

        </>
    );
};


// --- NEW MACRO SVGS ---
export const AnimatedMacroTrimAllCellsSVG = () => {
    const step = useAnimation(2, 1500);
    return (
        <>
            <text x="100" y="15" textAnchor="middle" style={{ ...commonTextStyle, fontWeight: "bold" }}>Hücrelerdeki Boşlukları Temizle</text>
            <rect x="30" y="60" width="140" height="30" fill="#fff" stroke="#cbd5e1" />
            <text x="100" y="78" textAnchor="middle" style={{...commonTextStyle, fontSize: '9px', whiteSpace: 'pre'}}>
                {step === 0 ? '  Boşluklu Metin  ' : 'Boşluklu Metin'}
            </text>
            <text x="40" y="78" fill="#ef4444" style={{...formulaTextStyle, opacity: step === 0 ? 1 : 0}}>__</text>
            <text x="148" y="78" fill="#ef4444" style={{...formulaTextStyle, opacity: step === 0 ? 1 : 0}}>__</text>
        </>
    );
};

export const AnimatedMacroHighlightNegativesSVG = () => {
    const step = useAnimation(2, 1500);
    return (
        <>
            <text x="100" y="15" textAnchor="middle" style={{ ...commonTextStyle, fontWeight: "bold" }}>Negatif Sayıları Vurgula</text>
            <text x="80" y="60" style={{...commonTextStyle, fontSize: '12px'}}>100</text>
            <text x="80" y="85" style={{...commonTextStyle, fontSize: '12px', fill: step === 1 ? '#ef4444' : '#475569', fontWeight: step === 1 ? 'bold' : 'normal', transition: 'all 0.3s'}}>-50</text>
            <text x="80" y="110" style={{...commonTextStyle, fontSize: '12px'}}>200</text>
        </>
    );
};

export const AnimatedMacroAddBordersSVG = () => {
    const step = useAnimation(2, 1500);
    return (
        <>
            <text x="100" y="15" textAnchor="middle" style={{ ...commonTextStyle, fontWeight: "bold" }}>Kenarlık Ekle</text>
            <g transform="translate(60, 40)">
                {[...Array(3)].map((_, i) => [...Array(2)].map((_, j) => (
                    <rect key={`${i}-${j}`} x={j*40} y={i*30} width="40" height="30" fill="#fff" stroke={step === 1 ? '#475569' : '#e2e8f0'} style={{transition: 'stroke 0.5s'}} />
                )))}
            </g>
        </>
    );
};

export const AnimatedMacroRemoveHyperlinksSVG = () => {
    const step = useAnimation(2, 1500);
    return (
        <>
            <text x="100" y="15" textAnchor="middle" style={{ ...commonTextStyle, fontWeight: "bold" }}>Köprüleri Kaldır</text>
            <text x="100" y="80" textAnchor="middle" style={{...commonTextStyle, fontSize: '12px', fill: step === 0 ? '#2563eb' : '#475569', textDecoration: step === 0 ? 'underline' : 'none', transition: 'all 0.5s'}}>
                www.google.com
            </text>
        </>
    );
};

export const AnimatedMacroTextToColumnsSVG = () => {
    const step = useAnimation(3, 1500);
    return (
        <>
            <text x="100" y="15" textAnchor="middle" style={{ ...commonTextStyle, fontWeight: "bold" }}>Metni Sütunlara Böl</text>
            <rect x="20" y="60" width="80" height="30" fill="#fff" stroke="#94a3b8" />
            <text x="60" y="78" textAnchor="middle" style={commonTextStyle}>Elma;Armut</text>

            <g style={{opacity: step >= 1 ? 1: 0, transition: 'opacity 0.3s'}}>
                <path d="M 100 75 H 120" stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#arrowhead-vlookup-anim)"/>
                <rect x="120" y="60" width="35" height="30" fill="#dcfce7" stroke="#16a34a" />
                <rect x="160" y="60" width="35" height="30" fill="#dcfce7" stroke="#16a34a" />
                <text x="137.5" y="78" textAnchor="middle" style={{...commonTextStyle, opacity: step === 2 ? 1:0}}>Elma</text>
                <text x="177.5" y="78" textAnchor="middle" style={{...commonTextStyle, opacity: step === 2 ? 1:0}}>Armut</text>
            </g>
        </>
    );
};

export const AnimatedMacroGoToSheetSVG = () => {
    const step = useAnimation(3, 1000);
    const sheets = ["Sayfa1", "Rapor", "Veri"];
    return (
        <>
            <text x="100" y="15" textAnchor="middle" style={{ ...commonTextStyle, fontWeight: "bold" }}>Sayfaya Git</text>
             <g transform="translate(40, 100)">
                 {sheets.map((s, i) => (
                    <g key={s} transform={`translate(${i * 45}, 0)`}>
                        <path d={`M 0 20 L 5 5 H 35 L 40 20 Z`} fill={step === i ? '#16a34a' : '#d1d5db'} style={{transition:'fill 0.3s'}}/>
                        <text x="20" y="15" textAnchor="middle" style={{...commonTextStyle, fontSize: '7px', fill: step === i ? 'white' : 'black'}}>{s}</text>
                    </g>
                 ))}
             </g>
        </>
    );
};

export const AnimatedMacroCreateChartSVG = () => {
    const step = useAnimation(2, 1500);
    return (
        <>
             <text x="100" y="15" textAnchor="middle" style={{ ...commonTextStyle, fontWeight: "bold" }}>Grafik Oluştur</text>
             {/* Table */}
             <g transform="translate(10, 50)">
                 <rect width="60" height="60" fill="#fff" stroke="#94a3b8" />
             </g>
             <path d="M 75 80 L 95 80" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrowhead-vlookup-anim)" style={{opacity: step === 1 ? 1 : 0, transition: 'opacity 0.3s'}}/>
             {/* Chart */}
             <g transform="translate(100, 50)" style={{opacity: step === 1 ? 1 : 0, transition: 'opacity 0.3s'}}>
                 <path d="M 0 60 L 0 0 L 80 0" fill="none" stroke="#94a3b8"/>
                 <rect x="10" y="30" width="15" height="30" fill="#3b82f6"/>
                 <rect x="32" y="10" width="15" height="50" fill="#10b981"/>
                 <rect x="55" y="40" width="15" height="20" fill="#f97316"/>
             </g>
        </>
    );
};

export const AnimatedMacroFreezeTopRowSVG = () => {
    const step = useAnimation(3, 1500);
    const yOffset = step === 2 ? -20 : 0;
    return (
        <>
            <text x="100" y="15" textAnchor="middle" style={{ ...commonTextStyle, fontWeight: "bold" }}>İlk Satırı Dondur</text>
            <rect x="20" y="30" width="160" height="100" fill="#fff" clipPath="url(#clip)" />
            <g transform={`translate(0, ${yOffset})`} style={{transition: 'transform 0.5s'}}>
                 <rect x="20" y="30" width="160" height="25" fill="#f1f5f9" stroke="#94a3b8"/>
                 <line x1="20" y1="55" x2="180" y2="55" stroke="#475569" strokeWidth="1.5" style={{opacity: step >= 1 ? 1: 0}}/>
                 {[...Array(4)].map((_, i) => (
                    <rect key={i} x="20" y={55 + i*25} width="160" height="25" fill="#fff" stroke="#e2e8f0"/>
                 ))}
             </g>
        </>
    );
};

export const AnimatedMacroInsertCheckboxesSVG = () => {
    const step = useAnimation(4, 800);
    return (
        <>
            <text x="100" y="15" textAnchor="middle" style={{ ...commonTextStyle, fontWeight: "bold" }}>Onay Kutuları Ekle</text>
            {[...Array(3)].map((_, i) => (
                <g key={i} transform={`translate(80, ${50 + i*30})`}>
                    <rect width="40" height="20" fill="#fff" stroke="#94a3b8"/>
                    <g style={{opacity: step > i ? 1:0}}>
                        <rect x="10" y="5" width="10" height="10" rx="2" fill="#fff" stroke="#3b82f6"/>
                        <path d="M 12 10 l 2 2 l 4 -4" stroke="#3b82f6" strokeWidth="1.5" fill="none"/>
                    </g>
                </g>
            ))}
        </>
    );
};

export const AnimatedMacroExportSelectionToCSVSVG = () => {
    const step = useAnimation(2, 1500);
    return (
        <>
            <text x="100" y="15" textAnchor="middle" style={{ ...commonTextStyle, fontWeight: "bold" }}>Seçimi CSV Olarak Aktar</text>
            <g transform="translate(20, 50)">
                 <rect width="80" height="50" fill="#fff" stroke="#94a3b8" />
                 <rect width="80" height="50" fill="none" stroke="#3b82f6" strokeDasharray="3 3" strokeWidth="2"/>
            </g>
            <path d="M 105 75 L 125 75" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrowhead-vlookup-anim)" style={{opacity: step === 1 ? 1 : 0}}/>
             <g transform="translate(130, 60)" style={{opacity: step === 1 ? 1 : 0}}>
                <path d="M 5,2 L 35,2 L 35,48 L 5,48 Z" fill="#f0f9ff" stroke="#7dd3fc" />
                <text x="20" y="28" textAnchor="middle" style={{...commonTextStyle, fontSize:'10px'}}>CSV</text>
             </g>
        </>
    );
};

export const AnimatedMacroCreateDropdownListSVG = () => {
    const step = useAnimation(3, 1500);
    return (
        <>
             <text x="100" y="15" textAnchor="middle" style={{ ...commonTextStyle, fontWeight: "bold" }}>Açılır Liste Oluştur</text>
             <rect x="40" y="60" width="60" height="20" fill="#fff" stroke="#94a3b8" />
             <path d="M 90 65 l 5 5 l -10 0 Z" fill="#6b7280" style={{opacity: step >= 1 ? 1:0}}/>
             <g style={{opacity: step === 2 ? 1:0}}>
                <rect x="40" y="80" width="60" height="50" fill="#fff" stroke="#94a3b8" />
                <text x="45" y="95" style={commonTextStyle}>Evet</text>
                <text x="45" y="110" style={commonTextStyle}>Hayır</text>
                <text x="45" y="125" style={commonTextStyle}>Belki</text>
             </g>
        </>
    );
};

export const AnimatedMacroCommentOnCellsWithValueSVG = () => {
    const step = useAnimation(2, 1500);
     return (
        <>
            <text x="100" y="15" textAnchor="middle" style={{ ...commonTextStyle, fontWeight: "bold" }}>Hücreye Not Ekle</text>
            <rect x="40" y="60" width="80" height="20" fill="#fff" stroke="#94a3b8" />
            <text x="80" y="74" textAnchor="middle" style={commonTextStyle}>Kontrol Et</text>
            <path d="M 120 60 l 10 -10" fill="none" stroke="#ef4444" style={{opacity: step === 1 ? 1:0}}/>
            <g transform="translate(130, 30)" style={{opacity: step === 1 ? 1:0}}>
                <rect width="60" height="30" fill="#fef9c3" stroke="#fcd34d" />
                <text x="5" y="12" style={{...commonTextStyle, fontSize: '6px'}}>Bu veri teyit</text>
                <text x="5" y="22" style={{...commonTextStyle, fontSize: '6px'}}>edilmelidir.</text>
            </g>
        </>
     );
};

export const AnimatedMacroCountColoredCellsSVG = () => {
    const step = useAnimation(2, 1500);
    return (
        <>
             <text x="100" y="15" textAnchor="middle" style={{ ...commonTextStyle, fontWeight: "bold" }}>Renkli Hücreleri Say</text>
             <rect x="20" y="50" width="30" height="20" fill="#fef9c3" stroke="#fcd34d" />
             <rect x="20" y="75" width="30" height="20" fill="#fff" stroke="#94a3b8" />
             <rect x="20" y="100" width="30" height="20" fill="#fef9c3" stroke="#fcd34d" />
             <g transform="translate(100, 70)">
                <rect width="60" height="30" fill="#dcfce7" stroke="#16a34a" />
                <text x="30" y="20" textAnchor="middle" style={{...commonTextStyle, fontSize: '12px', opacity: step === 1 ? 1:0}}>Sayı: 2</text>
             </g>
        </>
    );
};

export const AnimatedMacroBreakAllLinksSVG = () => {
    const step = useAnimation(2, 1500);
    return (
        <>
            <text x="100" y="15" textAnchor="middle" style={{ ...commonTextStyle, fontWeight: "bold" }}>Dış Bağlantıları Kopar</text>
            <g transform="translate(88, 65)" style={{stroke: step === 0 ? '#3b82f6' : '#ef4444', transition: 'stroke 0.5s'}}>
                 <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.72" strokeWidth="2.5" fill="none"/>
                 <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.72-1.72" strokeWidth="2.5" fill="none"/>
                 <line x1="8" y1="16" x2="16" y2="8" strokeWidth="2.5" style={{opacity: step === 1 ? 1:0, transition: 'opacity 0.5s'}}/>
            </g>
        </>
    );
};

export const AnimatedMacroZoomToSelectionSVG = () => {
    const step = useAnimation(2, 1500);
    const scale = step === 1 ? 2.5 : 1;
    const x = step === 1 ? -125 : 0;
    const y = step === 1 ? -120 : 0;
    return (
        <>
            <text x="100" y="15" textAnchor="middle" style={{ ...commonTextStyle, fontWeight: "bold" }}>Seçime Yakınlaş</text>
            <g transform={`translate(${x} ${y}) scale(${scale})`} style={{transition: 'all 0.5s'}}>
                <rect x="20" y="30" width="160" height="100" fill="#fff" stroke="#94a3b8" />
                <rect x="90" y="70" width="20" height="20" fill="none" stroke="#3b82f6" strokeWidth={1 / scale * 2} strokeDasharray={`${3/scale} ${3/scale}`} />
            </g>
        </>
    );
};

export const AnimatedMacroInsertSerialNumbersSVG = () => {
    const step = useAnimation(4, 1000);
    return (
        <>
            <text x="100" y="15" textAnchor="middle" style={{ ...commonTextStyle, fontWeight: "bold" }}>Sıra Numarası Ekle</text>
            <g transform="translate(80, 40)">
                 {[...Array(3)].map((_, i) =>(
                    <g key={i}>
                        <rect y={i*30} width="40" height="25" fill="#fff" stroke="#94a3b8" />
                        <text x="20" y={i*30+17} textAnchor="middle" style={{...commonTextStyle, fontSize: '10px', opacity: step > i ? 1:0}}>{i+1}</text>
                    </g>
                 ))}
            </g>
        </>
    );
};

export const AnimatedMacroSaveAndCloseSVG = () => {
    const step = useAnimation(3, 1000);
    return (
        <>
            <text x="100" y="15" textAnchor="middle" style={{ ...commonTextStyle, fontWeight: "bold" }}>Kaydet ve Kapat</text>
            <g style={{opacity: step === 2 ? 0:1, transition: 'opacity 0.3s'}}>
                <rect x="40" y="40" width="120" height="80" fill="#dcfce7" stroke="#16a34a" rx="5"/>
                <rect x="40" y="40" width="120" height="15" fill="#166534" rx="5"/>
                <g transform="translate(90, 20)" style={{opacity: step === 1 ? 1:0, transition: 'opacity 0.3s'}}>
                     <path d="M18.36 6.64a9 9 0 1 1-12.73 0" stroke="#fde047" strokeWidth="2" fill="none" />
                     <path d="M12 2v4" stroke="#fde047" strokeWidth="2" fill="none" />
                </g>
            </g>
        </>
    );
};

export const AnimatedMacroToggleGridlinesSVG = () => {
    const step = useAnimation(2, 1500);
    return (
        <>
            <text x="100" y="15" textAnchor="middle" style={{ ...commonTextStyle, fontWeight: "bold" }}>Kılavuz Çizgilerini Aç/Kapat</text>
            <rect x="20" y="30" width="160" height="100" fill="#fff" stroke="#94a3b8" />
            <g style={{opacity: step === 0 ? 1 : 0, transition: 'opacity 0.5s'}}>
                {[...Array(4)].map((_, i) => <line key={i} x1="20" y1={30+(i+1)*20} x2="180" y2={30+(i+1)*20} stroke="#e2e8f0"/>)}
                {[...Array(7)].map((_, i) => <line key={i} x1={20+(i+1)*20} y1="30" x2={20+(i+1)*20} y2="130" stroke="#e2e8f0"/>)}
            </g>
        </>
    );
};

export const AnimatedMacroCreateSummarySheetSVG = () => {
    const step = useAnimation(3, 1500);
    const Sheet = ({x, y, name}:any) => (
        <g transform={`translate(${x}, ${y})`}>
            <rect width="40" height="50" fill="#fff" stroke="#94a3b8" rx="2" />
            <text x="20" y="12" textAnchor="middle" style={{...commonTextStyle, fontSize: '6px'}}>{name}</text>
            <text x="20" y="30" textAnchor="middle" style={{...commonTextStyle, fontSize: '10px', fontWeight:'bold'}}>{Math.floor(Math.random() * 500)}</text>
        </g>
    );
    return (
        <>
            <text x="100" y="15" textAnchor="middle" style={{ ...commonTextStyle, fontWeight: "bold" }}>Özet Sayfası Oluştur</text>
             <Sheet x={140} y={40} name="Ocak" />
             <Sheet x={140} y={90} name="Şubat" />
             <g transform="translate(20, 40)" style={{opacity: step >= 1 ? 1:0, transition: 'opacity 0.5s'}}>
                <rect width="100" height="100" fill="#dbeafe" stroke="#3b82f6" rx="2"/>
                <text x="50" y="15" textAnchor="middle" style={{...commonTextStyle, fontWeight:'bold'}}>Özet</text>
                <text x="10" y="35" style={{...commonTextStyle, opacity: step === 2 ? 1 : 0}}>Ocak: ...</text>
                <text x="10" y="50" style={{...commonTextStyle, opacity: step === 2 ? 1 : 0}}>Şubat: ...</text>
             </g>
        </>
    );
};
