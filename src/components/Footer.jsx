import React from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  ShieldCheck, 
  ArrowUp, 
  ExternalLink,
  Award,
  Globe
} from 'lucide-react';
import { companyInfo } from '../data/companyData';

export default function Footer({ onNavigate, onOpenConsultation }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#102920] text-stone-300 pt-16 pb-8 border-t border-[#1C4638]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 4-Column Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#1E4D3E]">
          
          {/* Column 1: Brand & Verified Identity */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#174C3C] flex items-center justify-center text-[#DFCA9B] border border-[#7BAE82]/30 font-bold shadow-md">
                <svg viewBox="0 0 40 40" className="w-6 h-6 fill-none stroke-current text-[#DFCA9B]" strokeWidth="2">
                  <path d="M20 6C20 6 12 14 12 22C12 26.4 15.6 30 20 30C24.4 30 28 26.4 28 22C28 14 20 6 20 6Z" fill="#C7A66A" fillOpacity="0.25" stroke="#DFCA9B" strokeWidth="1.8" />
                  <path d="M20 12C20 12 16 17 16 22C16 24.2 17.8 26 20 26C22.2 26 24 24.2 24 22C24 17 20 12 20 12Z" stroke="#FFFFFF" strokeWidth="1.5" />
                </svg>
              </div>
              <div>
                <span className="font-extrabold text-lg text-white tracking-tight">
                  VẠN PHÚC HOA
                </span>
                <p className="text-[10px] text-[#A8C7B4] uppercase tracking-wider font-medium">
                  {companyInfo.slogan}
                </p>
              </div>
            </div>

            <p className="text-xs text-stone-400 leading-relaxed">
              Công ty TNHH MTV Vạn Phúc Hoa chuyên tư vấn chiến lược thương hiệu, thiết kế bao bì chuẩn OCOP, giải pháp website và hệ sinh thái tem QR truy xuất nguồn gốc VCheck cho các hợp tác xã và doanh nghiệp vừa &amp; nhỏ.
            </p>

            {/* Verified legal badge */}
            <div className="p-3.5 rounded-xl bg-[#0B2018] border border-[#1C4638] space-y-1.5 text-[11px] text-[#A8C7B4]">
              <div className="flex items-center gap-1.5 text-white font-semibold">
                <ShieldCheck className="w-3.5 h-3.5 text-[#DFCA9B]" />
                <span>Thông tin pháp lý chính thức</span>
              </div>
              <p>Mã số thuế: <strong className="text-white font-mono">{companyInfo.taxId}</strong></p>
              <p>Người đại diện: <strong className="text-white">{companyInfo.legalRep}</strong></p>
              <p>Ngày hoạt động: <strong className="text-white">{companyInfo.foundedDate}</strong></p>
            </div>
          </div>

          {/* Column 2: Core Services */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Dịch Vụ Trọng Tâm
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button 
                  onClick={() => onNavigate('services')}
                  className="hover:text-white transition-colors text-left"
                >
                  Nhận diện thương hiệu &amp; Logo
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('services')}
                  className="hover:text-white transition-colors text-left"
                >
                  Thiết kế bao bì sản phẩm OCOP
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('services')}
                  className="hover:text-white transition-colors text-left"
                >
                  Tư vấn hồ sơ phân hạng OCOP
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('services')}
                  className="hover:text-white transition-colors text-left"
                >
                  Thiết kế website doanh nghiệp
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('traceability')}
                  className="hover:text-[#DFCA9B] transition-colors text-left flex items-center gap-1.5"
                >
                  <span>Truy xuất sản phẩm (VCheck)</span>
                  <span className="bg-[#DFCA9B] text-[#174C3C] text-[9px] font-bold px-1 rounded">Live</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('services')}
                  className="hover:text-white transition-colors text-left"
                >
                  Đăng ký bảo hộ nhãn hiệu Cục SHTT
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Quick Links & Ecosystem */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Liên Kết Nhanh
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-white transition-colors">
                  Trang chủ
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-white transition-colors">
                  Về Vạn Phúc Hoa
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('projects')} className="hover:text-white transition-colors">
                  Dự án OCOP tiêu biểu
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('process')} className="hover:text-white transition-colors">
                  Quy trình 5 bước
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('knowledge')} className="hover:text-white transition-colors">
                  Cẩm nang &amp; Kiến thức
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-white transition-colors">
                  Liên hệ báo giá
                </button>
              </li>
              <li className="pt-2 border-t border-[#1C4638]">
                <a
                  href={companyInfo.qrSystemUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#DFCA9B] hover:text-white inline-flex items-center gap-1 font-semibold"
                >
                  <span>Cổng VCheck QR</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Liên Hệ Trực Tiếp
            </h4>
            
            <div className="space-y-3 text-xs text-stone-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#DFCA9B] shrink-0 mt-0.5" />
                <span>{companyInfo.address}</span>
              </div>

              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#7BAE82] shrink-0 mt-0.5" />
                <span>{companyInfo.officeAddress}</span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#DFCA9B] shrink-0" />
                <a 
                  href={`tel:${companyInfo.hotline}`} 
                  className="text-white font-bold hover:text-[#DFCA9B] transition-colors"
                >
                  {companyInfo.hotlineDisplay}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#DFCA9B] shrink-0" />
                <a 
                  href={`mailto:${companyInfo.email}`} 
                  className="hover:text-white transition-colors"
                >
                  {companyInfo.email}
                </a>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenConsultation}
                className="w-full py-2.5 px-4 rounded-xl bg-[#174C3C] hover:bg-[#205F4D] text-white text-xs font-bold transition-all border border-[#7BAE82]/30 cursor-pointer"
              >
                Gửi Yêu Cầu Tư Vấn Ngay
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>
            &copy; {new Date().getFullYear()} Công ty TNHH MTV Vạn Phúc Hoa. Tất cả các quyền được bảo lưu.
          </p>
          
          <div className="flex items-center gap-4">
            <span className="text-[11px] text-stone-500">
              * Dữ liệu dịch vụ &amp; dự án tham chiếu từ nguồn chính thức của Vạn Phúc Hoa tại Quảng Nam.
            </span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-[#174C3C] hover:bg-[#205F4D] text-[#DFCA9B] hover:text-white transition-colors shrink-0"
              aria-label="Về đầu trang"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
