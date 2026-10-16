import React from 'react';
import { workflowSteps } from '../data/companyData';
import { ArrowRight, CheckCircle2, Workflow, Clock } from 'lucide-react';

export default function Process({ onOpenConsultation }) {
  return (
    <section id="process" className="py-20 bg-[#F8F7F3] relative overflow-hidden">
      {/* Background decoration */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#174C3C]/8 text-[#174C3C] text-xs font-semibold tracking-wider uppercase mb-3">
            <Workflow className="w-3.5 h-3.5" />
            <span>Quy Trình Triển Khai 5 Bước</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#19241F] tracking-tight">
            Minh bạch, chuẩn xác &amp; <br className="hidden sm:inline" />
            <span className="text-[#174C3C]">đồng hành sát sao từ xưởng đến thị trường</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#5A6961] leading-relaxed">
            Quy trình phối hợp chặt chẽ được đúc kết qua nhiều năm làm việc cùng các hợp tác xã, làng nghề truyền thống và chủ cơ sở sản xuất.
          </p>
        </div>

        {/* 5 Steps Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative">
          
          {/* Connector Line for Desktop */}
          <div className="hidden md:block absolute top-1/4 left-10 right-10 h-0.5 bg-stone-300 -z-0" />

          {workflowSteps.map((step, idx) => (
            <div
              key={idx}
              className="relative z-10 bg-white p-6 rounded-3xl border border-stone-200/80 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
            >
              <div>
                {/* Step Number Circle */}
                <div className="w-12 h-12 rounded-2xl bg-[#174C3C] text-[#DFCA9B] font-mono font-bold text-base flex items-center justify-center shadow-md mb-5 group-hover:scale-110 group-hover:bg-[#205F4D] transition-all">
                  {step.step}
                </div>

                <h3 className="text-base font-bold text-[#19241F] group-hover:text-[#174C3C] transition-colors leading-snug mb-2">
                  {step.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#5A6961] leading-relaxed">
                  {step.desc}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-stone-100 flex items-center gap-1.5 text-[11px] font-semibold text-[#7BAE82]">
                <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                <span>Cam kết chuẩn tiến độ</span>
              </div>
            </div>
          ))}

        </div>

        {/* Commitment Box */}
        <div className="mt-12 bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-left">
            <div className="w-12 h-12 rounded-2xl bg-[#174C3C]/10 text-[#174C3C] flex items-center justify-center shrink-0">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-[#19241F] text-base">Thời gian triển khai nhanh chóng &amp; cam kết bản quyền</h4>
              <p className="text-xs sm:text-sm text-stone-600 mt-0.5">
                Gửi maket phác thảo ban đầu sau 3-5 ngày làm việc. Hỗ trợ chỉnh sửa đến khi khách hàng hoàn toàn hài lòng.
              </p>
            </div>
          </div>
          <button
            onClick={() => onOpenConsultation()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#174C3C] hover:bg-[#205F4D] text-white text-sm font-semibold shadow-md transition-all shrink-0 cursor-pointer"
          >
            <span>Khởi động dự án ngay</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
}
