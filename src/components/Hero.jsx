import React from 'react';
import { ArrowRight, Sparkles, CheckCircle2, Shield, QrCode, Award, Layers } from 'lucide-react';
import { companyInfo } from '../data/companyData';

export default function Hero({ onExploreServices, onOpenConsultation }) {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-16 lg:pb-24 bg-gradient-to-b from-[#F8F7F3] via-[#F4F1E8] to-[#F8F7F3]">
      {/* Subtle organic background decoration */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#7BAE82]/10 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-[#C7A66A]/10 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headlines & Call to Actions */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Top Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-[#174C3C]/15 shadow-sm">
              <span className="flex h-2 w-2 rounded-full bg-[#174C3C] animate-pulse" />
              <span className="text-xs font-semibold uppercase tracking-wider text-[#174C3C]">
                Agency Thương Hiệu &bull; Bao Bì OCOP &bull; Giải Pháp Số
              </span>
              <span className="bg-[#DFCA9B]/30 text-[#8C6D2B] text-[10px] font-bold px-2 py-0.5 rounded-full">
                Từ 2015
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-[3.4rem] font-extrabold text-[#19241F] tracking-tight leading-[1.18]">
              Kiến tạo thương hiệu. <br className="hidden sm:inline" />
              <span className="text-gradient-emerald">Nâng tầm nông sản</span> <br />
              <span className="font-serif-accent italic font-normal text-[#174C3C]">&amp; kết nối giá trị</span> bền vững.
            </h1>

            {/* Sub-headline / Description */}
            <p className="text-base sm:text-lg text-[#4A5A51] max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Đồng hành cùng các hợp tác xã, doanh nghiệp vừa và nhỏ xây dựng bản sắc thương hiệu, thiết kế bao bì chuẩn phân hạng OCOP và ứng dụng giải pháp số tem QR VCheck minh bạch chuỗi cung ứng.
            </p>

            {/* Key Value Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 pb-2 text-left max-w-xl mx-auto lg:mx-0">
              <div className="flex items-center gap-2 text-xs font-medium text-[#2C3E35] bg-white/60 p-2 rounded-lg border border-stone-200/50">
                <CheckCircle2 className="w-4 h-4 text-[#174C3C] shrink-0" />
                <span>Chuẩn hóa OCOP 3–5★</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-[#2C3E35] bg-white/60 p-2 rounded-lg border border-stone-200/50">
                <CheckCircle2 className="w-4 h-4 text-[#174C3C] shrink-0" />
                <span>Tem QR VCheck chống giả</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-[#2C3E35] bg-white/60 p-2 rounded-lg border border-stone-200/50">
                <CheckCircle2 className="w-4 h-4 text-[#174C3C] shrink-0" />
                <span>Bảo hộ nhãn hiệu Cục SHTT</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={onOpenConsultation}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-[#174C3C] hover:bg-[#205F4D] text-white text-base font-semibold shadow-lg shadow-[#174C3C]/25 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-[#DFCA9B]" />
                <span>Trao đổi với chúng tôi</span>
                <ArrowRight className="w-4 h-4 text-[#A8C7B4]" />
              </button>

              <button
                onClick={onExploreServices}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-stone-50 text-[#174C3C] border border-[#174C3C]/20 text-base font-semibold shadow-sm hover:shadow transition-all duration-200 cursor-pointer"
              >
                <span>Khám phá dịch vụ</span>
                <ArrowRight className="w-4 h-4 text-[#174C3C]" />
              </button>
            </div>

            {/* Verified Trust Statement */}
            <div className="pt-4 flex items-center justify-center lg:justify-start gap-3 text-xs text-[#5D6F65]">
              <Shield className="w-4 h-4 text-[#7BAE82]" />
              <span>Dữ liệu dịch vụ &amp; thông tin pháp lý từ <strong>Công ty TNHH MTV Vạn Phúc Hoa</strong></span>
            </div>
          </div>

          {/* Right Column: High-End Layered Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Visual Frame */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-white group">
                <img
                  src="/assets/hero_agarwood.jpg"
                  alt="Thiết kế bao bì đặc sản Trầm Hương Tiên Phước OCOP - Vạn Phúc Hoa"
                  className="w-full h-auto object-cover transform group-hover:scale-102 transition-transform duration-700 aspect-[4/3] sm:aspect-[16/11]"
                  loading="eager"
                />

                {/* Subtle gradient overlay at bottom of photo */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
                
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#DFCA9B] uppercase tracking-wider mb-1">
                    <Award className="w-3.5 h-3.5" />
                    <span>Dự Án Tiêu Biểu &bull; Trầm Hương Tiên Phước</span>
                  </div>
                  <p className="text-sm font-medium text-stone-100">
                    Bao bì hộp quà cao cấp chuẩn OCOP 4 sao &bull; Quảng Nam
                  </p>
                </div>
              </div>

              {/* Floating Card 1: OCOP Badge Top Right */}
              <div className="absolute -top-5 -right-3 sm:-right-6 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-xl border border-stone-200/80 animate-float-slow max-w-[190px]">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-[#174C3C] flex items-center justify-center text-[#DFCA9B] shrink-0">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center text-[#C7A66A] text-xs">
                      {'★'.repeat(5)}
                    </div>
                    <p className="text-xs font-bold text-[#19241F] leading-tight">Chuẩn Hóa OCOP</p>
                    <p className="text-[10px] text-stone-500">3-4-5 sao toàn diện</p>
                  </div>
                </div>
              </div>

              {/* Floating Card 2: QR Code VCheck Ecosystem Bottom Left */}
              <div className="absolute -bottom-6 -left-3 sm:-left-6 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-xl border border-stone-200/80 max-w-[210px]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#7BAE82] to-[#174C3C] flex items-center justify-center text-white shrink-0">
                    <QrCode className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#19241F] leading-tight">Tem QR VCheck</p>
                    <p className="text-[10px] text-stone-500">Truy xuất chuỗi cung ứng</p>
                    <span className="inline-block mt-0.5 text-[9px] font-semibold text-[#174C3C] bg-[#174C3C]/10 px-1.5 py-0.2 rounded">
                      vcheck.com.vn
                    </span>
                  </div>
                </div>
              </div>

              {/* Small Decorative Accent */}
              <div className="hidden sm:block absolute -z-10 -bottom-4 -right-4 w-full h-full border-2 border-dashed border-[#174C3C]/20 rounded-3xl" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
