import React, { useState, useEffect } from 'react';
import { Phone, MessageCircle, ArrowUp } from 'lucide-react';
import { companyInfo } from '../data/companyData';

export default function QuickContactWidget({ onOpenConsultation }) {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3 pointer-events-auto">
      
      {/* Scroll to top button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="w-10 h-10 rounded-full bg-white text-[#174C3C] shadow-lg border border-stone-200 flex items-center justify-center hover:bg-[#174C3C] hover:text-white transition-all duration-200 cursor-pointer"
          aria-label="Cuộn lên đầu trang"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}

      {/* Zalo Button */}
      <a
        href={companyInfo.socials.zalo}
        target="_blank"
        rel="noreferrer"
        className="group flex items-center gap-2 p-2 pr-3.5 rounded-full bg-[#0068FF] text-white shadow-xl hover:shadow-2xl transition-all duration-200 hover:scale-105"
        aria-label="Chat qua Zalo"
      >
        <div className="w-8 h-8 rounded-full bg-white text-[#0068FF] flex items-center justify-center font-bold text-xs shadow-inner">
          Zalo
        </div>
        <span className="text-xs font-semibold hidden sm:inline">
          Chat Zalo
        </span>
      </a>

      {/* Hotline Pulse Button */}
      <a
        href={`tel:${companyInfo.hotline}`}
        className="group relative flex items-center gap-2 p-2.5 pr-4 rounded-full bg-[#174C3C] text-white shadow-2xl hover:bg-[#205F4D] transition-all duration-200 hover:scale-105"
        aria-label={`Gọi hotline ${companyInfo.hotlineDisplay}`}
      >
        {/* Radar ping ring */}
        <span className="absolute -inset-1 rounded-full bg-[#7BAE82] opacity-30 animate-ping -z-10" />
        
        <div className="w-8 h-8 rounded-full bg-[#DFCA9B] text-[#174C3C] flex items-center justify-center shrink-0">
          <Phone className="w-4 h-4 animate-bounce" />
        </div>

        <div className="text-left hidden sm:block">
          <p className="text-[10px] text-[#A8C7B4] uppercase font-semibold leading-none">Hotline tư vấn</p>
          <p className="text-xs font-bold text-white mt-0.5">{companyInfo.hotlineDisplay}</p>
        </div>
      </a>

    </div>
  );
}
