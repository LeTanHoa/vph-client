import React from 'react';
import {
  ShieldCheck,
  QrCode,
  Phone,
  Mail,
  Globe,
  MapPin,
  ExternalLink,
  Lock,
  CheckCircle2,
  ArrowUp
} from 'lucide-react';
import DNTraceLogo from './DNTraceLogo';

export default function DNTraceFooter({ onOpenQrRegister, onNavigateToAdmin }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#122A21] text-stone-300 pt-14 pb-8 border-t border-[#1C4638] mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-10 border-b border-[#1E4D3E]">

          {/* Col 1: Brand & Logo */}
          <div className="lg:col-span-5 space-y-4">
            <div className="">
              <img
                src="/assets/dntrace_logo_header.png"
                alt="DNTrace Logo"
                className="h-28 w-auto object-cover"
                onError={(e) => {
                  e.target.src = "/assets/dntrace_logo.jpg";
                }}
              />
            </div>

            <p className="text-xs text-stone-300 leading-relaxed max-w-md">
              <strong>dntrace.com</strong> — Cổng thông tin truy xuất nguồn gốc sản phẩm và giải pháp tem điện tử thông minh. Minh bạch toàn bộ chuỗi cung ứng nông sản, thực phẩm và đặc sản địa phương từ nông trại tới tay người tiêu dùng.
            </p>

            <div className="p-3.5 rounded-xl bg-[#0B2018] border border-[#1C4638] space-y-1 text-xs text-[#A8C7B4]">
              <div className="flex items-center gap-1.5 text-white font-semibold">
                <ShieldCheck className="w-4 h-4 text-[#84CC16]" />
                <span>Tiêu chuẩn truy xuất nguồn gốc số</span>
              </div>
              <p>Mã hóa QR động chống giả mạo &bull; Nhật ký sản xuất minh bạch</p>
            </div>
          </div>

          {/* Col 2: Services & Actions */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Dịch Vụ &amp; Giải Pháp Tem QR
            </h4>
            <ul className="space-y-2 text-xs text-stone-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#84CC16]" />
                <span>Cấp mã QR định danh cho từng lô sản phẩm</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#84CC16]" />
                <span>Xác thực tiêu chuẩn ATVSTP, CBSP &amp; OCOP</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#84CC16]" />
                <span>Bản đồ số định vị vùng nguyên liệu sản xuất</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#84CC16]" />
                <span>Cổng quản trị doanh nghiệp / HTX bảo mật</span>
              </li>
            </ul>

            <div className="pt-2">
              <button
                onClick={onOpenQrRegister}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#84CC16] hover:bg-[#74B843] text-[#122A21] font-bold text-xs shadow-md transition cursor-pointer"
              >
                <QrCode className="w-4 h-4 text-[#122A21]" />
                <span>Đăng Ký Cấp Mã QR Cho Sản Phẩm</span>
              </button>
            </div>
          </div>

          {/* Col 3: Support & Contact */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Kênh Hỗ Trợ &amp; Vận Hành
            </h4>
            <div className="space-y-2.5 text-xs text-stone-300">
              <div className="flex items-start gap-2">
                <Globe className="w-4 h-4 text-[#84CC16] shrink-0 mt-0.5" />
                <span>Hệ thống: <strong className="text-white">dntrace.com</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#84CC16] shrink-0" />
                <span>Email: <strong className="text-white">hotro@dntrace.com</strong></span>
              </div>
            </div>

          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
          <p>
            &copy; {new Date().getFullYear()} <strong>dntrace.com</strong>. Bản quyền thuộc về Hệ thống Truy xuất nguồn gốc dntrace.com.
          </p>

          <button
            onClick={scrollToTop}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition cursor-pointer flex items-center gap-1 text-xs"
            aria-label="Về đầu trang"
          >
            <span>Lên đầu trang</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
}
