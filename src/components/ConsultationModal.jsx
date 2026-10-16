import React, { useState, useEffect } from 'react';
import { X, Send, Sparkles, CheckCircle2, Phone, ShieldCheck } from 'lucide-react';
import { companyInfo } from '../data/companyData';

export default function ConsultationModal({ isOpen, onClose, initialService = '' }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: initialService || 'Thiết kế bao bì sản phẩm OCOP',
    note: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialService) {
      setFormData((prev) => ({ ...prev, service: initialService }));
    }
  }, [initialService]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      alert('Vui lòng điền họ tên và số điện thoại liên hệ.');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 700);
  };

  const handleClose = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-stone-900/70 backdrop-blur-sm transition-opacity"
        onClick={handleClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-stone-200 z-10 animate-fade-in">
        
        {/* Modal Top Bar */}
        <div className="bg-[#174C3C] text-white p-6 relative">
          <button
            onClick={handleClose}
            className="absolute top-5 right-5 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            aria-label="Đóng modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-[#DFCA9B] text-[#174C3C] text-[10px] font-bold uppercase tracking-wider">
              Tư Vấn Trực Tiếp
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white">
            Đăng Ký Tư Vấn Thương Hiệu &amp; OCOP
          </h3>
          <p className="text-xs text-[#A8C7B4] mt-1">
            Chuyên gia Vạn Phúc Hoa sẽ liên hệ tư vấn giải pháp tối ưu cho sản phẩm của bạn.
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8">
          {submitted ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-14 h-14 rounded-full bg-[#174C3C] text-[#DFCA9B] flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-bold text-[#19241F]">
                Đã Tiếp Nhận Thông Tin!
              </h4>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed max-w-sm mx-auto">
                Cảm ơn bạn <strong>{formData.name}</strong>. Chúng tôi sẽ liên hệ lại qua số điện thoại <strong>{formData.phone}</strong> trong thời gian sớm nhất.
              </p>
              <div className="pt-2">
                <button
                  onClick={handleClose}
                  className="px-6 py-2.5 rounded-xl bg-[#174C3C] text-white text-xs font-semibold hover:bg-[#205F4D] transition-colors cursor-pointer"
                >
                  Hoàn tất
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Họ và tên của bạn <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Nguyễn Văn A"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#174C3C]/20 focus:border-[#174C3C]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Số điện thoại <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="0912 345 678"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#174C3C]/20 focus:border-[#174C3C]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Địa chỉ email (nếu có)
                  </label>
                  <input
                    type="email"
                    placeholder="email@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#174C3C]/20 focus:border-[#174C3C]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Dịch vụ quan tâm
                </label>
                <select
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#174C3C]/20 focus:border-[#174C3C]"
                >
                  <option value="Thiết kế bao bì sản phẩm OCOP">Thiết kế bao bì sản phẩm OCOP</option>
                  <option value="Thiết kế nhận diện thương hiệu & Logo">Thiết kế nhận diện thương hiệu &amp; Logo</option>
                  <option value="Tư vấn hồ sơ & nâng hạng OCOP">Tư vấn hồ sơ &amp; nâng hạng OCOP</option>
                  <option value="Thiết kế website doanh nghiệp / HTX">Thiết kế website doanh nghiệp / HTX</option>
                  <option value="Truy xuất nguồn gốc tem QR VCheck">Truy xuất nguồn gốc tem QR VCheck</option>
                  <option value="Đăng ký bảo hộ nhãn hiệu Cục SHTT">Đăng ký bảo hộ nhãn hiệu Cục SHTT</option>
                  <option value="Trọn gói giải pháp">Trọn gói giải pháp nâng tầm sản phẩm</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Ghi chú hoặc mô tả ngắn về sản phẩm
                </label>
                <textarea
                  rows={2}
                  placeholder="Sản phẩm của bạn là gì, dự kiến làm vào thời gian nào..."
                  value={formData.note}
                  onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#174C3C]/20 focus:border-[#174C3C]"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl bg-[#174C3C] hover:bg-[#205F4D] text-white text-sm font-bold shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
              >
                {loading ? (
                  <span>Đang xử lý...</span>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-[#DFCA9B]" />
                    <span>Xác Nhận Đăng Ký Tư Vấn</span>
                  </>
                )}
              </button>

              <div className="pt-2 flex items-center justify-center gap-1.5 text-[11px] text-stone-500">
                <ShieldCheck className="w-3.5 h-3.5 text-[#7BAE82]" />
                <span>Hoàn toàn miễn phí khảo sát sơ bộ ban đầu</span>
              </div>

            </form>
          )}
        </div>

        {/* Modal Bottom Call Hotline Bar */}
        <div className="bg-stone-50 px-6 py-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-600">
          <span>Cần trao đổi gấp với chuyên viên?</span>
          <a
            href={`tel:${companyInfo.hotline}`}
            className="font-bold text-[#174C3C] hover:text-[#205F4D] flex items-center gap-1"
          >
            <Phone className="w-3 h-3 text-[#7BAE82]" />
            <span>Gọi {companyInfo.hotlineDisplay}</span>
          </a>
        </div>

      </div>
    </div>
  );
}
