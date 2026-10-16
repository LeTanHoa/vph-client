import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2, 
  MessageSquare,
  Building2,
  ExternalLink
} from 'lucide-react';
import { companyInfo } from '../data/companyData';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    organization: '',
    productCategory: 'Nông đặc sản chế biến',
    selectedServices: ['Thiết kế bao bì sản phẩm OCOP'],
    note: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const availableServices = [
    'Thiết kế nhận diện thương hiệu & Logo',
    'Thiết kế bao bì sản phẩm OCOP',
    'Tư vấn hồ sơ & nâng hạng OCOP',
    'Thiết kế Website & Giải pháp số',
    'Truy xuất nguồn gốc tem QR VCheck',
    'Đăng ký bảo hộ nhãn hiệu Cục SHTT'
  ];

  const handleServiceToggle = (service) => {
    if (formData.selectedServices.includes(service)) {
      setFormData({
        ...formData,
        selectedServices: formData.selectedServices.filter((s) => s !== service)
      });
    } else {
      setFormData({
        ...formData,
        selectedServices: [...formData.selectedServices, service]
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone) {
      alert('Vui lòng điền họ tên và số điện thoại để chúng tôi liên hệ.');
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 800);
  };

  return (
    <section id="contact" className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#174C3C]/8 text-[#174C3C] text-xs font-semibold tracking-wider uppercase mb-3">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Liên Hệ &amp; Tư Vấn Trực Tiếp</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#19241F] tracking-tight">
            Bạn đang tìm giải pháp <br className="hidden sm:inline" />
            <span className="text-[#174C3C]">để phát triển thương hiệu &amp; sản phẩm?</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#5A6961] leading-relaxed">
            Hãy chia sẻ nhu cầu và hiện trạng sản phẩm của bạn. Chuyên gia Vạn Phúc Hoa sẽ liên hệ tư vấn giải pháp tối ưu và tiết kiệm chi phí nhất.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Official Contact & Company Info */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-[#174C3C] text-white p-8 rounded-3xl shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-2xl pointer-events-none" />
              
              <div className="relative z-10 space-y-6">
                <div>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#DFCA9B] text-[#174C3C] uppercase tracking-wider">
                    Thông tin liên hệ chính thức
                  </span>
                  <h3 className="text-2xl font-bold mt-3 leading-tight">
                    Công Ty TNHH MTV Vạn Phúc Hoa
                  </h3>
                  <p className="text-xs text-[#DFCA9B] mt-1 font-mono">
                    MST: {companyInfo.taxId} &bull; Thành lập: {companyInfo.foundedDate}
                  </p>
                </div>

                <div className="space-y-4 pt-2 text-sm text-stone-200">
                  <div className="flex items-start gap-3.5">
                    <MapPin className="w-5 h-5 text-[#DFCA9B] shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-white text-xs">Trụ sở chính:</p>
                      <p className="text-xs text-stone-300 mt-0.5">{companyInfo.address}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <Building2 className="w-5 h-5 text-[#DFCA9B] shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-white text-xs">Văn phòng đại diện:</p>
                      <p className="text-xs text-stone-300 mt-0.5">{companyInfo.officeAddress}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <Phone className="w-5 h-5 text-[#DFCA9B] shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-white text-xs">Hotline / Zalo tư vấn:</p>
                      <a 
                        href={`tel:${companyInfo.hotline}`} 
                        className="text-base font-bold text-white hover:text-[#DFCA9B] transition-colors mt-0.5 inline-block"
                      >
                        {companyInfo.hotlineDisplay}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <Mail className="w-5 h-5 text-[#DFCA9B] shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-white text-xs">Hộp thư điện tử:</p>
                      <a 
                        href={`mailto:${companyInfo.email}`} 
                        className="text-xs text-stone-300 hover:text-white transition-colors"
                      >
                        {companyInfo.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <Clock className="w-5 h-5 text-[#DFCA9B] shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-white text-xs">Thời gian làm việc:</p>
                      <p className="text-xs text-stone-300 mt-0.5">{companyInfo.workingHours}</p>
                    </div>
                  </div>
                </div>

                {/* QR Ecosystem Callout */}
                <div className="pt-4 border-t border-white/15 flex items-center justify-between text-xs">
                  <div>
                    <p className="font-semibold text-white">Cổng Truy Xuất Nguồn Gốc</p>
                    <p className="text-[11px] text-[#A8C7B4]">Hệ thống tạo mã QR VCheck</p>
                  </div>
                  <a
                    href={companyInfo.qrSystemUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-[#DFCA9B] font-bold text-xs inline-flex items-center gap-1 transition-colors"
                  >
                    <span>vcheck.com.vn</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

              </div>
            </div>

            {/* Quality Commitment note */}
            <div className="p-5 rounded-2xl bg-[#F8F7F3] border border-stone-200/80 text-xs text-[#5A6961] space-y-2">
              <div className="flex items-center gap-2 font-bold text-[#174C3C]">
                <ShieldCheck className="w-4 h-4" />
                <span>Cam kết bảo mật &amp; tôn trọng quyền sở hữu</span>
              </div>
              <p>
                Mọi thông tin về công thức, quy trình sản xuất và kế hoạch thương hiệu của quý khách hàng được cam kết giữ kín tuyệt đối trong suốt quá trình trao đổi và triển khai.
              </p>
            </div>

          </div>

          {/* Right Column: Interactive Consultation Form */}
          <div className="lg:col-span-7">
            <div className="bg-[#F8F7F3] p-8 sm:p-10 rounded-3xl border border-stone-200/80 shadow-sm">
              
              {submitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-[#174C3C] text-[#DFCA9B] flex items-center justify-center mx-auto shadow-lg">
                    <CheckCircle2 className="w-9 h-9" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#19241F]">
                    Gửi Yêu Cầu Tư Vấn Thành Công!
                  </h3>
                  <p className="text-sm text-stone-600 max-w-md mx-auto leading-relaxed">
                    Cảm ơn quý khách <strong>{formData.fullName}</strong>. Chuyên viên của Vạn Phúc Hoa sẽ liên hệ lại qua số điện thoại <strong>{formData.phone}</strong> trong vòng 2–4 giờ làm việc.
                  </p>
                  <div className="pt-4">
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({
                          fullName: '',
                          phone: '',
                          organization: '',
                          productCategory: 'Nông đặc sản chế biến',
                          selectedServices: ['Thiết kế bao bì sản phẩm OCOP'],
                          note: ''
                        });
                      }}
                      className="px-6 py-2.5 rounded-xl bg-[#174C3C] text-white text-xs font-semibold hover:bg-[#205F4D] transition-colors"
                    >
                      Gửi thêm yêu cầu khác
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  <div>
                    <h3 className="text-xl font-bold text-[#19241F]">
                      Phiếu Đăng Ký Tư Vấn Giải Pháp
                    </h3>
                    <p className="text-xs text-stone-500 mt-1">
                      Điền thông tin bên dưới để nhận tư vấn và báo giá thiết kế chi tiết.
                    </p>
                  </div>

                  {/* Form fields: Name & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1.5">
                        Họ và tên của bạn <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Ví dụ: Nguyễn Văn A"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#174C3C]/20 focus:border-[#174C3C]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1.5">
                        Số điện thoại liên hệ <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="Ví dụ: 0912 345 678"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#174C3C]/20 focus:border-[#174C3C]"
                      />
                    </div>
                  </div>

                  {/* Organization & Product field */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1.5">
                        Tên Hợp tác xã / Cơ sở / Doanh nghiệp
                      </label>
                      <input
                        type="text"
                        placeholder="Ví dụ: HTX Nông nghiệp Xanh"
                        value={formData.organization}
                        onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#174C3C]/20 focus:border-[#174C3C]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1.5">
                        Lĩnh vực sản phẩm
                      </label>
                      <select
                        value={formData.productCategory}
                        onChange={(e) => setFormData({ ...formData, productCategory: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#174C3C]/20 focus:border-[#174C3C]"
                      >
                        <option value="Nông sản chế biến sâu">Nông sản chế biến sâu</option>
                        <option value="Thảo dược & Dược liệu vùng cao">Thảo dược &amp; Dược liệu vùng cao</option>
                        <option value="Trầm hương & Mỹ nghệ truyền thống">Trầm hương &amp; Mỹ nghệ truyền thống</option>
                        <option value="Thủy hải sản & Nước mắm truyền thống">Thủy hải sản &amp; Nước mắm truyền thống</option>
                        <option value="Đồ uống & Trà thảo mộc">Đồ uống &amp; Trà thảo mộc</option>
                        <option value="Khác">Lĩnh vực khác</option>
                      </select>
                    </div>
                  </div>

                  {/* Multi-select Services */}
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-2">
                      Dịch vụ bạn đang quan tâm (chọn các mục phù hợp):
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {availableServices.map((srv, idx) => {
                        const isChecked = formData.selectedServices.includes(srv);
                        return (
                          <button
                            type="button"
                            key={idx}
                            onClick={() => handleServiceToggle(srv)}
                            className={`p-3 rounded-xl text-left text-xs font-medium transition-all flex items-center justify-between border cursor-pointer ${
                              isChecked
                                ? 'bg-[#174C3C] text-white border-[#174C3C]'
                                : 'bg-white text-stone-700 border-stone-200 hover:border-stone-300'
                            }`}
                          >
                            <span>{srv}</span>
                            {isChecked && <CheckCircle2 className="w-4 h-4 text-[#DFCA9B] shrink-0" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Note message */}
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1.5">
                      Mô tả ngắn gọn nhu cầu hoặc câu hỏi của bạn
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Ví dụ: Chúng tôi đang chuẩn bị tham gia đợt chấm phân hạng OCOP 3 sao tỉnh Quảng Nam, cần làm lại nhãn chai và hồ sơ câu chuyện sản phẩm..."
                      value={formData.note}
                      onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#174C3C]/20 focus:border-[#174C3C]"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-4 rounded-xl bg-[#174C3C] hover:bg-[#205F4D] text-white text-base font-bold shadow-lg shadow-[#174C3C]/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
                  >
                    {submitting ? (
                      <span>Đang gửi thông tin...</span>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 text-[#DFCA9B]" />
                        <span>Gửi Yêu Cầu Tư Vấn Ngay</span>
                        <Send className="w-4 h-4 text-[#A8C7B4]" />
                      </>
                    )}
                  </button>

                  <p className="text-[11px] text-stone-500 text-center">
                    Cam kết phản hồi trong 2-4 giờ làm việc &bull; Hoàn toàn miễn phí khảo sát sơ bộ
                  </p>

                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
