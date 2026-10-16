import React, { useState } from 'react';
import { 
  Palette, 
  PackageCheck, 
  Globe, 
  Award, 
  QrCode, 
  ShieldCheck, 
  Cpu, 
  ArrowRight, 
  CheckCircle2, 
  X, 
  Sparkles,
  Layers,
  ChevronRight
} from 'lucide-react';
import { serviceClusters, companyInfo } from '../data/companyData';

const iconMap = {
  Palette: Palette,
  PackageCheck: PackageCheck,
  Globe: Globe,
  Award: Award,
  QrCode: QrCode,
  ShieldCheck: ShieldCheck,
  Cpu: Cpu,
};

export default function Services({ onOpenConsultation }) {
  const [selectedService, setSelectedService] = useState(null);

  return (
    <section id="services" className="py-20 bg-[#F8F7F3] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#174C3C]/8 text-[#174C3C] text-xs font-semibold tracking-wider uppercase mb-3">
            <Layers className="w-3.5 h-3.5" />
            <span>Dịch Vụ Cốt Lõi</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#19241F] tracking-tight">
            Giải pháp toàn diện nâng tầm <br className="hidden sm:inline" />
            <span className="text-[#174C3C]">thương hiệu &amp; sản phẩm địa phương</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#5A6961] leading-relaxed">
            Từ thiết kế nhận diện, bao bì đạt chuẩn OCOP đến hệ sinh thái truy xuất nguồn gốc tem QR VCheck và bảo hộ pháp lý.
          </p>
        </div>

        {/* Services Grid (6 Core Verified Clusters) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {serviceClusters.map((service) => {
            const IconComponent = iconMap[service.icon] || Palette;
            return (
              <div
                key={service.id}
                className="group bg-white rounded-3xl overflow-hidden border border-stone-200/80 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between"
              >
                <div>
                  {/* Service Card Image */}
                  <div className="relative h-48 overflow-hidden bg-stone-100">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    
                    {/* Badge and Code */}
                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#174C3C]/90 text-white backdrop-blur-sm shadow-sm">
                        {service.badge}
                      </span>
                      <span className="text-white/80 font-mono text-xs font-bold bg-black/30 px-2 py-0.5 rounded backdrop-blur-sm">
                        {service.code}
                      </span>
                    </div>

                    {/* Floating Icon */}
                    <div className="absolute -bottom-5 right-6 w-12 h-12 rounded-2xl bg-white text-[#174C3C] shadow-lg flex items-center justify-center border border-stone-100 group-hover:bg-[#174C3C] group-hover:text-white transition-colors duration-300">
                      <IconComponent className="w-6 h-6" />
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 pt-7 space-y-3">
                    <h3 className="text-xl font-bold text-[#19241F] group-hover:text-[#174C3C] transition-colors leading-snug">
                      {service.title}
                    </h3>

                    <p className="text-sm text-[#5A6961] leading-relaxed line-clamp-3">
                      {service.shortDesc}
                    </p>

                    {/* Quick highlights preview */}
                    <div className="pt-2 border-t border-stone-100 space-y-1.5">
                      {service.deliverables.slice(0, 2).map((item, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-stone-600">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#7BAE82] shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Action */}
                <div className="px-6 pb-6 pt-2">
                  <button
                    onClick={() => setSelectedService(service)}
                    className="w-full inline-flex items-center justify-between px-4 py-2.5 rounded-xl bg-stone-50 hover:bg-[#174C3C] text-[#174C3C] hover:text-white text-sm font-semibold transition-all duration-200 border border-stone-200/80 hover:border-transparent cursor-pointer group/btn"
                  >
                    <span>Tìm hiểu chi tiết</span>
                    <ChevronRight className="w-4 h-4 text-[#7BAE82] group-hover/btn:text-white group-hover/btn:translate-x-1 transition-all" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* QR Code VCheck Enterprise Banner */}
        <div className="mt-12 bg-gradient-to-r from-[#174C3C] via-[#1E5D4A] to-[#174C3C] rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center shrink-0 border border-white/20">
              <QrCode className="w-8 h-8 text-[#DFCA9B]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#DFCA9B]">Hệ Sinh Thái Số</span>
                <span className="px-2 py-0.5 text-[10px] rounded bg-white/20 font-mono">vcheck.com.vn</span>
              </div>
              <h3 className="text-xl font-bold mt-1">Cổng Tạo QRcode &amp; Quản Trị Chuỗi Cung Ứng Nông Sản</h3>
              <p className="text-xs sm:text-sm text-stone-200 mt-1 max-w-xl">
                Dành riêng cho doanh nghiệp &amp; HTX: Đăng nhập quản lý lô sản phẩm, xuất tem QR truy xuất chống giả, kết nối trực tiếp khách hàng.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0 w-full md:w-auto">
            <a
              href={companyInfo.qrSystemUrl}
              target="_blank"
              rel="noreferrer"
              className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#DFCA9B] hover:bg-[#E8D9B4] text-[#174C3C] text-sm font-bold shadow-md transition-all cursor-pointer"
            >
              <span>Truy cập Cổng VCheck</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

      </div>

      {/* Service Detail Modal */}
      {selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-stone-900/70 backdrop-blur-sm transition-opacity"
            onClick={() => setSelectedService(null)}
          />

          {/* Modal Container */}
          <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-stone-200 z-10 max-h-[90vh] flex flex-col">
            
            {/* Modal Header with Image */}
            <div className="relative h-48 sm:h-56 overflow-hidden bg-stone-100 shrink-0">
              <img
                src={selectedService.image}
                alt={selectedService.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              
              <button
                onClick={() => setSelectedService(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/40 hover:bg-black/60 text-white transition-colors cursor-pointer"
                aria-label="Đóng modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-4 left-6 right-6 text-white">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#DFCA9B] text-[#174C3C]">
                  {selectedService.badge}
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold mt-2 leading-tight">
                  {selectedService.title}
                </h3>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
              
              <div>
                <h4 className="text-xs font-bold text-[#174C3C] uppercase tracking-wider mb-2">
                  Tổng quan dịch vụ
                </h4>
                <p className="text-sm sm:text-base text-stone-700 leading-relaxed">
                  {selectedService.detailDesc}
                </p>
              </div>

              {/* Target client */}
              <div className="bg-[#F8F7F3] p-4 rounded-2xl border border-stone-200/80">
                <p className="text-xs font-bold text-[#19241F]">Đối tượng khách hàng phù hợp:</p>
                <p className="text-xs text-stone-600 mt-1">
                  {selectedService.targetClient}
                </p>
              </div>

              {/* Deliverables */}
              <div>
                <h4 className="text-xs font-bold text-[#174C3C] uppercase tracking-wider mb-3">
                  Hạng mục bàn giao cho khách hàng (Deliverables)
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {selectedService.deliverables.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-stone-50 border border-stone-200/60">
                      <CheckCircle2 className="w-4 h-4 text-[#174C3C] shrink-0 mt-0.5" />
                      <span className="text-xs font-medium text-stone-800 leading-snug">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="p-6 bg-stone-50 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0">
              <div className="text-xs text-stone-500 text-center sm:text-left">
                Tư vấn trực tiếp &amp; khảo sát sản phẩm miễn phí
              </div>
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={() => setSelectedService(null)}
                  className="w-1/2 sm:w-auto px-5 py-2.5 rounded-xl border border-stone-200 text-stone-700 hover:bg-stone-100 text-sm font-semibold transition-colors cursor-pointer"
                >
                  Đóng
                </button>
                <button
                  onClick={() => {
                    setSelectedService(null);
                    onOpenConsultation(selectedService.title);
                  }}
                  className="w-1/2 sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-[#174C3C] hover:bg-[#205F4D] text-white text-sm font-semibold shadow-md transition-all cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-[#DFCA9B]" />
                  <span>Đăng Ký Tư Vấn</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
