import React from 'react';
import { ShieldCheck, Compass, Sparkles, Target, Users, MapPin, Building2, Check } from 'lucide-react';
import { companyInfo } from '../data/companyData';

export default function About({ onOpenConsultation }) {
  const highlights = [
    {
      title: "Pháp Lý & Kinh Nghiệm Thực Tế",
      desc: `Doanh nghiệp chính quy hoạt động từ ngày ${companyInfo.foundedDate} (MST: ${companyInfo.taxId}), người đại diện pháp luật là ông ${companyInfo.legalRep}. Gắn bó sâu sát cùng phong trào OCOP miền Trung.`
    },
    {
      title: "Cầu Nối Nông Sản & Thẩm Mỹ Hiện Đại",
      desc: "Chúng tôi kết hợp sự am hiểu sâu sắc về thổ nhưỡng, văn hóa làng nghề truyền thống với tư duy thiết kế bao bì chuẩn quốc tế, giúp sản phẩm thoát khỏi mác 'nông sản thô'."
    },
    {
      title: "Hệ Sinh Thái Toàn Diện",
      desc: "Không chỉ tạo ra chiếc logo hay bao bì đẹp, chúng tôi hỗ trợ hoàn thiện hồ sơ OCOP, tích hợp cổng truy xuất nguồn gốc QR VCheck và bảo hộ nhãn hiệu tại Cục Sở hữu trí tuệ."
    },
    {
      title: "Đồng Hành Cùng Hợp Tác Xã & Doanh Nghiệp Địa Phương",
      desc: "Quy trình làm việc thực địa, khảo sát tận vườn, tận xưởng và tối ưu mức đầu tư phù hợp nhất cho ngân sách của các cơ sở sản xuất nông thôn."
    }
  ];

  return (
    <section id="about" className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#174C3C]/8 text-[#174C3C] text-xs font-semibold tracking-wider uppercase mb-3">
            <Building2 className="w-3.5 h-3.5" />
            <span>Về Công Ty Vạn Phúc Hoa</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#19241F] tracking-tight">
            Tôn vinh giá trị bản địa bằng <br className="hidden sm:inline" />
            <span className="text-[#174C3C]">ngôn ngữ thiết kế &amp; giải pháp số</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#5A6961] leading-relaxed">
            Công ty TNHH MTV Vạn Phúc Hoa được thành lập với mục tiêu trở thành đối tác tin cậy, đồng hành cùng các chủ thể OCOP, cơ sở sản xuất và doanh nghiệp Việt Nam trên hành trình nâng tầm giá trị nông sản và phát triển thương hiệu bền vững.
          </p>
        </div>

        {/* 2-Column Content: Left Story + Right Visual Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Visual Showcase */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-xl border border-stone-100">
              <img
                src="/assets/branding_flatlay.jpg"
                alt="Không gian sáng tạo và quy chuẩn màu sắc nhận diện thương hiệu Vạn Phúc Hoa"
                className="w-full h-auto object-cover aspect-[4/3]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-6 text-white">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#DFCA9B]">
                  Triết Lý Thiết Kế
                </span>
                <p className="text-lg font-bold mt-1 text-white">
                  "Vạn tinh hoa cho thương hiệu"
                </p>
                <p className="text-xs text-stone-200 mt-1">
                  Mỗi sản phẩm nông sản xứ Quảng và Việt Nam đều mang trong mình một câu chuyện văn hóa xứng đáng được nâng niu và lan tỏa.
                </p>
              </div>
            </div>

            {/* Floating Info Box */}
            <div className="mt-6 bg-[#F8F7F3] p-5 rounded-2xl border border-stone-200/80 flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#174C3C] text-white flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5 text-[#DFCA9B]" />
              </div>
              <div className="text-sm">
                <p className="font-bold text-[#19241F]">Trụ Sở &amp; Địa Bàn Hoạt Động</p>
                <p className="text-stone-600 text-xs mt-0.5">
                  An Hà Nam, P. An Phú, TP. Tam Kỳ, Tỉnh Quảng Nam &bull; 66 Hồ Nghinh, Đà Nẵng.
                </p>
                <p className="text-stone-500 text-[11px] mt-1">
                  Đồng hành cùng hàng trăm chủ thể OCOP trên khắp các tỉnh thành miền Trung và toàn quốc.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Key Core Capabilities */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-4">
              {highlights.map((item, idx) => (
                <div 
                  key={idx}
                  className="p-5 rounded-2xl bg-stone-50/70 hover:bg-[#F8F7F3] border border-stone-200/60 transition-all duration-200 group"
                >
                  <div className="flex items-start gap-3.5">
                    <div className="w-7 h-7 rounded-lg bg-[#174C3C]/10 text-[#174C3C] flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-[#174C3C] group-hover:text-white transition-colors">
                      <Check className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-[#19241F] group-hover:text-[#174C3C] transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-sm text-[#5A6961] mt-1 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA action */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-4">
              <button
                onClick={onOpenConsultation}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#174C3C] hover:bg-[#205F4D] text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-[#DFCA9B]" />
                <span>Liên hệ tư vấn giải pháp OCOP</span>
              </button>

              <div className="text-xs text-stone-500 text-center sm:text-left">
                Hỗ trợ khảo sát &amp; đánh giá sơ bộ miễn phí
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
