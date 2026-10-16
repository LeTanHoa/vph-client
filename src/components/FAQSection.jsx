import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';
import { faqList } from '../data/companyData';

export default function FAQSection({ onOpenConsultation }) {
  const [openIdx, setOpenIdx] = useState(0);

  const toggle = (idx) => {
    setOpenIdx(openIdx === idx ? -1 : idx);
  };

  return (
    <section className="py-20 bg-white relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#174C3C]/8 text-[#174C3C] text-xs font-semibold tracking-wider uppercase mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Giải Đáp Thắc Mắc</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#19241F] tracking-tight">
            Câu hỏi thường gặp <br className="hidden sm:inline" />
            <span className="text-[#174C3C]">về dịch vụ &amp; quy trình triển khai</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#5A6961]">
            Những thông tin quan trọng giúp bạn an tâm trước khi khởi động dự án cùng Vạn Phúc Hoa.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-4">
          {faqList.map((item, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-stone-200/80 bg-[#F8F7F3] overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                >
                  <span className="font-bold text-[#19241F] text-sm sm:text-base leading-snug">
                    {item.q}
                  </span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                    isOpen ? 'bg-[#174C3C] text-white' : 'bg-stone-200 text-stone-600'
                  }`}>
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-xs sm:text-sm text-[#5A6961] leading-relaxed border-t border-stone-200/50 pt-3">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still have questions banner */}
        <div className="mt-10 p-6 rounded-2xl bg-[#174C3C]/5 border border-[#174C3C]/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <p className="font-bold text-[#19241F] text-sm">Bạn vẫn còn băn khoăn về quy trình hoặc chi phí?</p>
            <p className="text-xs text-stone-500 mt-0.5">Hãy gọi ngay hoặc gửi yêu cầu để chuyên gia của chúng tôi tư vấn trực tiếp.</p>
          </div>
          <button
            onClick={() => onOpenConsultation()}
            className="px-5 py-2.5 rounded-xl bg-[#174C3C] hover:bg-[#205F4D] text-white text-xs font-semibold shadow-sm transition-all shrink-0 cursor-pointer flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#DFCA9B]" />
            <span>Tư Vấn Miễn Phí</span>
          </button>
        </div>

      </div>
    </section>
  );
}
