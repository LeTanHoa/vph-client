import React from 'react';
import { 
  Compass, 
  Cpu, 
  Coins, 
  ShieldCheck, 
  CheckCircle2, 
  Sparkles, 
  Star,
  Layers
} from 'lucide-react';
import { reasonsToChoose, companyInfo } from '../data/companyData';

const iconMap = {
  Compass: Compass,
  Cpu: Cpu,
  Coins: Coins,
  ShieldAlert: ShieldCheck,
};

export default function WhyChooseUs({ onOpenConsultation }) {
  return (
    <section className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#174C3C]/8 text-[#174C3C] text-xs font-semibold tracking-wider uppercase mb-3">
            <Star className="w-3.5 h-3.5 text-[#C7A66A]" />
            <span>Giá Trị Khác Biệt</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#19241F] tracking-tight">
            Vì sao các chủ thể OCOP &amp; HTX <br className="hidden sm:inline" />
            <span className="text-[#174C3C]">tin chọn Vạn Phúc Hoa?</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#5A6961] leading-relaxed">
            Chúng tôi không chỉ là người làm đồ họa, mà là người bạn đồng hành thấu hiểu trăn trở của người làm nông nghiệp và doanh nghiệp nông thôn.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {reasonsToChoose.map((item, idx) => {
            const Icon = iconMap[item.icon] || ShieldCheck;
            return (
              <div
                key={idx}
                className="p-8 rounded-3xl bg-[#F8F7F3] border border-stone-200/80 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
              >
                <div className="space-y-4">
                  <div className="w-14 h-14 rounded-2xl bg-[#174C3C] text-[#DFCA9B] flex items-center justify-center shadow-md group-hover:scale-105 group-hover:bg-[#205F4D] transition-all">
                    <Icon className="w-7 h-7" />
                  </div>

                  <h3 className="text-xl font-bold text-[#19241F] group-hover:text-[#174C3C] transition-colors leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-sm sm:text-base text-[#5A6961] leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-stone-200/60 flex items-center gap-2 text-xs font-semibold text-[#174C3C]">
                  <CheckCircle2 className="w-4 h-4 text-[#7BAE82]" />
                  <span>Giải pháp thực chứng &bull; Tư vấn tận tâm</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Trust Banner with Legal info */}
        <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-stone-50 border border-stone-200 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#174C3C]/10 text-[#174C3C] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <p className="font-bold text-[#19241F] text-sm sm:text-base">
                Doanh Nghiệp Đăng Ký Pháp Lý Chuẩn Xác
              </p>
              <p className="text-xs text-stone-500 mt-0.5">
                Mã số thuế: <strong>{companyInfo.taxId}</strong> &bull; Đại diện pháp luật: <strong>{companyInfo.legalRep}</strong> &bull; Hoạt động từ năm <strong>2015</strong>.
              </p>
            </div>
          </div>

          <button
            onClick={() => onOpenConsultation()}
            className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#174C3C] hover:bg-[#205F4D] text-white text-sm font-semibold shadow-md transition-all shrink-0 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-[#DFCA9B]" />
            <span>Nhận Báo Giá &amp; Tư Vấn Miễn Phí</span>
          </button>
        </div>

      </div>
    </section>
  );
}
