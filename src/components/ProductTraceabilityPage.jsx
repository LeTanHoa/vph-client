import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  ShieldCheck,
  QrCode,
  CheckCircle2,
  MapPin,
  Phone,
  Globe,
  Calendar,
  Scale,
  FileCheck,
  Sparkles,
  Share2,
  Copy,
  Check,
  AlertCircle,
  ExternalLink,
  Layers,
  Heart,
  Settings,
  RefreshCw,
  ChevronDown
} from 'lucide-react';
import { fetchProducts, fetchProductById } from '../services/api';

export default function ProductTraceabilityPage({
  onBackToHome,
  onOpenConsultation,
  onNavigateToAdmin,
  selectedProductId
}) {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('info');
  const [loading, setLoading] = useState(true);
  const [productData, setProductData] = useState(null);
  const [allProducts, setAllProducts] = useState([]);
  const [showProductDropdown, setShowProductDropdown] = useState(false);

  // Load product data from API / MongoDB
  const loadProduct = async (idOrCode) => {
    setLoading(true);
    try {
      const [prodsRes, currentRes] = await Promise.all([
        fetchProducts(),
        idOrCode ? fetchProductById(idOrCode) : null
      ]);

      setAllProducts(prodsRes.data || []);

      if (currentRes && currentRes.data) {
        setProductData(currentRes.data);
      } else if (prodsRes.data && prodsRes.data.length > 0) {
        // If a specific ID was requested, find it
        if (idOrCode) {
          const matched = prodsRes.data.find(p => p._id === idOrCode || p.verificationCode === idOrCode);
          setProductData(matched || prodsRes.data[0]);
        } else {
          setProductData(prodsRes.data[0]);
        }
      }
    } catch (err) {
      console.error('Lỗi tải sản phẩm:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProduct(selectedProductId);
  }, [selectedProductId]);

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading && !productData) {
    return (
      <div className="bg-[#F8F7F3] min-h-screen py-24 flex items-center justify-center">
        <div className="text-center space-y-4">
          <RefreshCw className="w-10 h-10 text-[#174C3C] animate-spin mx-auto" />
          <p className="text-sm font-bold text-stone-700">Đang truy xuất thông tin tem điện tử VCheck từ MongoDB...</p>
        </div>
      </div>
    );
  }

  // Fallback if no product found
  if (!productData) {
    return (
      <div className="bg-[#F8F7F3] min-h-screen py-16">
        <div className="max-w-xl mx-auto px-4 text-center space-y-4 bg-white p-8 rounded-3xl border border-stone-200">
          <AlertCircle className="w-12 h-12 text-amber-500 mx-auto" />
          <h2 className="text-xl font-bold text-stone-900">Không tìm thấy thông tin sản phẩm</h2>
          <p className="text-xs text-stone-600">
            Cơ sở dữ liệu MongoDB hiện chưa có dữ liệu hoặc mã tra cứu không hợp lệ.
          </p>
          <div className="pt-2 flex justify-center gap-3">
            {/* {onNavigateToAdmin && (
              <button
                onClick={onNavigateToAdmin}
                className="px-4 py-2 rounded-xl bg-[#174C3C] text-white text-xs font-bold hover:bg-[#205F4D]"
              >
                Vào Trang Quản Lý Sản Phẩm
              </button>
            )} */}
            <button
              onClick={() => loadProduct()}
              className="px-4 py-2 rounded-xl bg-stone-100 text-stone-700 text-xs font-bold hover:bg-stone-200"
            >
              Thử lại
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F8F7F3] min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

        {/* Navigation Breadcrumb Bar & Quick Admin Link */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
          <div className="flex items-center gap-3">
            {onBackToHome && (
              <button
                onClick={onBackToHome}
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#174C3C] hover:text-[#205F4D] px-3.5 py-2 rounded-xl bg-white border border-stone-200 shadow-sm transition-all hover:-translate-x-0.5 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Trang chủ</span>
              </button>
            )}

            {/* Product Switcher Dropdown */}
            {allProducts.length > 1 && (
              <div className="relative">
                <button
                  onClick={() => setShowProductDropdown(!showProductDropdown)}
                  className="inline-flex items-center gap-2 text-xs font-bold text-stone-700 px-3 py-2 rounded-xl bg-white border border-stone-200 shadow-sm hover:border-[#174C3C] cursor-pointer"
                >
                  <span className="truncate max-w-[160px] sm:max-w-xs">{productData.name}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-stone-400" />
                </button>

                {showProductDropdown && (
                  <div className="absolute left-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-stone-200 p-2 z-30">
                    <div className="text-[10px] font-bold text-stone-400 px-3 py-1.5 uppercase">
                      Chọn sản phẩm để tra cứu ({allProducts.length})
                    </div>
                    {allProducts.map((p) => (
                      <button
                        key={p._id || p.verificationCode}
                        onClick={() => {
                          setProductData(p);
                          setShowProductDropdown(false);
                        }}
                        className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between transition cursor-pointer ${p.verificationCode === productData.verificationCode
                          ? 'bg-[#174C3C]/10 text-[#174C3C] font-bold'
                          : 'hover:bg-stone-100 text-stone-700'
                          }`}
                      >
                        <span className="truncate pr-2">{p.name}</span>
                        {p.verificationCode === productData.verificationCode && (
                          <Check className="w-3.5 h-3.5 text-[#174C3C] shrink-0" />
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* <div className="flex items-center gap-3">
            {onNavigateToAdmin && (
              <button
                onClick={onNavigateToAdmin}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-stone-200 text-stone-700 hover:text-[#174C3C] text-xs font-bold shadow-sm hover:shadow transition cursor-pointer"
              >
                <Settings className="w-3.5 h-3.5 text-[#174C3C]" />
                <span>Quản Lý Sản Phẩm (Admin)</span>
              </button>
            )}

            <div className="hidden md:flex items-center gap-2 text-xs text-stone-500">
              <span>Cổng VCheck</span>
              <span>/</span>
              <span className="text-stone-700 truncate max-w-xs font-medium">{productData.name}</span>
            </div>
          </div> */}
        </div>

        {/* Verification Success Hero Banner */}
        <div className="rounded-3xl bg-gradient-to-r from-[#174C3C] via-[#1E5D4A] to-[#174C3C] text-white p-6 sm:p-8 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#DFCA9B] text-[#174C3C] text-xs font-bold uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4" />
                <span>{productData.status || 'ĐÃ XÁC THỰC THÀNH CÔNG'}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white">
                {productData.name}
              </h1>
              <p className="text-xs sm:text-sm text-stone-200 max-w-2xl leading-relaxed">
                Dữ liệu tem điện tử chính hãng được đồng bộ trực tiếp từ Cổng thông tin truy xuất nguồn gốc (
                <a
                  href="https://vcheck.com.vn"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#DFCA9B] underline hover:text-white"
                >
                  vcheck.com.vn
                </a>
                ). Giải pháp công nghệ do <strong>{productData.provider || 'Công ty TNHH MTV Vạn Phúc Hoa'}</strong> cung cấp.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 text-center shrink-0 w-full sm:w-auto">
              <div className="w-12 h-12 rounded-xl bg-white text-[#174C3C] flex items-center justify-center mx-auto mb-2 shadow-md">
                <QrCode className="w-7 h-7" />
              </div>
              <p className="text-[10px] text-stone-200 uppercase font-semibold">Mã định danh VCheck</p>
              <p className="font-mono text-xs font-bold text-[#DFCA9B] mt-0.5">{productData.verificationCode}</p>
            </div>
          </div>
        </div>

        {/* Main Content Grid: Left Product Visual + Right Key Info */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Left Column: Product Showcase Photo & Producer Details */}
          <div className="lg:col-span-5 space-y-6">

            {/* Real Product Packaging Image */}
            <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm relative group overflow-hidden">
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-stone-50 flex items-center justify-center">
                <img
                  src={productData.image || '/assets/ngu_coc_huongfarm.jpg'}
                  alt={productData.name}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* VCheck Brand Banner Badge */}
              <div className="mt-4 pt-4 border-t border-stone-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-bold text-stone-700">Tem chính hãng VCheck</span>
                </div>
                <button
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#174C3C] hover:text-[#205F4D] px-2.5 py-1 rounded-lg bg-stone-100 hover:bg-stone-200 transition-colors cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Đã sao chép' : 'Chia sẻ mã'}</span>
                </button>
              </div>
            </div>

            {/* Manufacturer Card */}
            {productData.manufacturer && (
              <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm space-y-4">
                <div className="flex items-center gap-2 pb-3 border-b border-stone-100">
                  <div className="w-8 h-8 rounded-lg bg-[#174C3C]/10 text-[#174C3C] flex items-center justify-center">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#19241F] text-sm leading-tight">
                      Thông Tin Cơ Sở Sản Xuất
                    </h3>
                    <p className="text-[10px] text-stone-500">Đơn vị chủ quản sản phẩm</p>
                  </div>
                </div>

                <div className="space-y-3 text-xs text-stone-700">
                  <div>
                    <span className="text-stone-500 block text-[11px]">Tên đơn vị sản xuất:</span>
                    <span className="font-bold text-stone-900 text-sm">{productData.manufacturer.name || 'Đang cập nhật'}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <span className="text-stone-500 block text-[11px]">Số ĐKKD:</span>
                      <span className="font-mono font-semibold text-stone-900">{productData.manufacturer.businessId || 'Chưa có'}</span>
                    </div>
                    <div>
                      <span className="text-stone-500 block text-[11px]">Quốc gia:</span>
                      <span className="font-semibold text-stone-900">{productData.manufacturer.country || 'Việt Nam'}</span>
                    </div>
                  </div>

                  {productData.manufacturer.address && (
                    <div className="flex items-start gap-2 pt-1">
                      <MapPin className="w-4 h-4 text-[#174C3C] shrink-0 mt-0.5" />
                      <span>{productData.manufacturer.address}</span>
                    </div>
                  )}

                  {productData.manufacturer.phone && (
                    <div className="flex items-center gap-2 pt-1">
                      <Phone className="w-4 h-4 text-[#174C3C] shrink-0" />
                      <a
                        href={`tel:${productData.manufacturer.phone.replace(/\s+/g, '')}`}
                        className="font-bold text-[#174C3C] hover:underline"
                      >
                        {productData.manufacturer.phone} (Bấm để gọi đặt hàng)
                      </a>
                    </div>
                  )}

                  {productData.manufacturer.website && (
                    <div className="flex items-center gap-2 pt-1">
                      <Globe className="w-4 h-4 text-[#174C3C] shrink-0" />
                      <a
                        href={productData.manufacturer.website.startsWith('http') ? productData.manufacturer.website : `http://${productData.manufacturer.website}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[#174C3C] font-semibold hover:underline flex items-center gap-1"
                      >
                        <span>{productData.manufacturer.website}</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  )}
                </div>

                {productData.manufacturer.phone && (
                  <div className="pt-2">
                    <a
                      href={`tel:${productData.manufacturer.phone.replace(/\s+/g, '')}`}
                      className="w-full py-3 rounded-xl bg-[#174C3C] hover:bg-[#205F4D] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-md transition-all"
                    >
                      <Phone className="w-4 h-4 text-[#DFCA9B]" />
                      <span>Liên Hệ Đặt Hàng: {productData.manufacturer.phone}</span>
                    </a>
                  </div>
                )}
              </div>
            )}

          </div>

          {/* Right Column: Detailed Traceability Tables & Quality Certifications */}
          <div className="lg:col-span-7 space-y-6">

            {/* Tabs for Navigation */}
            <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-stone-200/60 border border-stone-200">
              <button
                onClick={() => setActiveTab('info')}
                className={`flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${activeTab === 'info'
                  ? 'bg-white text-[#174C3C] shadow-sm'
                  : 'text-stone-600 hover:text-stone-900'
                  }`}
              >
                Thông Tin &amp; Thành Phần
              </button>
              <button
                onClick={() => setActiveTab('standards')}
                className={`flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${activeTab === 'standards'
                  ? 'bg-white text-[#174C3C] shadow-sm'
                  : 'text-stone-600 hover:text-stone-900'
                  }`}
              >
                Hồ Sơ Tiêu Chuẩn &amp; ATTP
                {/* Hồ Sơ Tiêu Chuẩn &amp; ATTP ({productData.standards?.length || 0}) */}
              </button>
              <button
                onClick={() => setActiveTab('map')}
                className={`flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${activeTab === 'map'
                  ? 'bg-white text-[#174C3C] shadow-sm'
                  : 'text-stone-600 hover:text-stone-900'
                  }`}
              >
                Bản Đồ Nơi Sản Xuất
              </button>
            </div>

            {/* Tab 1: Product Specifications & Ingredients */}
            {activeTab === 'info' && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-6">

                <div className="border-b border-stone-100 pb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#174C3C]">
                    Hạng Mục 01 &bull; Thông Tin Chi Tiết
                  </span>
                  <h2 className="text-xl font-bold text-[#19241F] mt-1">
                    Quy Cách &amp; Thành Phần Sản Phẩm
                  </h2>
                </div>

                {/* Ingredients box */}
                {productData.ingredients && (
                  <div className="p-5 rounded-2xl bg-[#F8F7F3] border border-stone-200/80 space-y-2">
                    <div className="flex items-center gap-2 text-xs font-bold text-[#174C3C]">
                      <Sparkles className="w-4 h-4 text-[#C7A66A]" />
                      <span>Thành phần công thức tự nhiên:</span>
                    </div>
                    <p className="text-xs sm:text-sm text-stone-800 leading-relaxed font-medium whitespace-pre-line">
                      {productData.ingredients}
                    </p>
                  </div>
                )}

                {/* Specs Table */}
                <div className="overflow-hidden rounded-2xl border border-stone-200">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <tbody className="divide-y divide-stone-100">
                      <tr className="bg-stone-50/50">
                        <td className="py-3 px-4 font-bold text-stone-600 w-1/3">Khối lượng tịnh</td>
                        <td className="py-3 px-4 font-semibold text-stone-900">{productData.netWeight || 'Đang cập nhật'}</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 font-bold text-stone-600">Thời hạn sử dụng</td>
                        <td className="py-3 px-4 font-semibold text-stone-900">{productData.expiry || 'Đang cập nhật'}</td>
                      </tr>
                      <tr className="bg-stone-50/50">
                        <td className="py-3 px-4 font-bold text-stone-600">Ngày sản xuất</td>
                        <td className="py-3 px-4 font-semibold text-stone-900">{productData.manufactureDate || 'Xem chi tiết trên bao bì'}</td>
                      </tr>
                      {productData.usageGuide && (
                        <tr>
                          <td className="py-3 px-4 font-bold text-stone-600 align-top">Hướng dẫn sử dụng</td>
                          <td className="py-3 px-4 text-stone-700 leading-relaxed whitespace-pre-line">{productData.usageGuide}</td>
                        </tr>
                      )}
                      {productData.storageGuide && (
                        <tr className="bg-stone-50/50">
                          <td className="py-3 px-4 font-bold text-stone-600 align-top">Bảo quản</td>
                          <td className="py-3 px-4 text-stone-700 leading-relaxed whitespace-pre-line">{productData.storageGuide}</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Key Benefits */}
                {productData.benefits && productData.benefits.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {productData.benefits.map((benefit, i) => (
                      <div key={i} className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-100 flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-[#174C3C] shrink-0 mt-0.5" />
                        <span className="text-xs text-stone-700 font-medium">{benefit}</span>
                      </div>
                    ))}
                  </div>
                )}

              </div>
            )}

            {/* Tab 2: Standards & Food Safety Registrations */}
            {activeTab === 'standards' && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-6">

                <div className="border-b border-stone-100 pb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#174C3C]">
                    Hạng Mục 02 &bull; Minh Bạch Pháp Lý
                  </span>
                  <h2 className="text-xl font-bold text-[#19241F] mt-1">
                    Số Công Bố Sản Phẩm &amp; Giấy Chứng Nhận ATTP
                  </h2>
                </div>

                <div className="space-y-4">
                  {productData.standards && productData.standards.length > 0 ? (
                    productData.standards.map((std, idx) => (
                      <div
                        key={idx}
                        className="p-5 rounded-2xl bg-stone-50 border border-stone-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-[#174C3C]/10 text-[#174C3C] flex items-center justify-center shrink-0">
                            <FileCheck className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="text-xs text-stone-500 font-medium">{std.label}</p>
                            <p className="text-sm font-bold text-stone-900 font-mono mt-0.5">{std.value}</p>
                          </div>
                        </div>
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-full shrink-0">
                          <Check className="w-3 h-3" />
                          <span>Hợp chuẩn hợp quy</span>
                        </span>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-stone-500 italic">Chưa có hồ sơ tiêu chuẩn nào được cập nhật.</p>
                  )}
                </div>

                <div className="p-4 rounded-2xl bg-[#DFCA9B]/20 border border-[#DFCA9B]/50 text-xs text-stone-800 leading-relaxed">
                  <strong>Lưu ý cho người tiêu dùng:</strong> Mọi thông tin tự công bố và cam kết an toàn thực phẩm trên đã được đối chiếu và lưu trữ đầy đủ trong cơ sở dữ liệu xác thực điện tử của hệ thống VCheck.
                </div>

              </div>
            )}

            {/* Tab 3: Google Map Location */}
            {activeTab === 'map' && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-4">

                <div className="border-b border-stone-100 pb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#174C3C]">
                    Hạng Mục 03 &bull; Tọa Độ Vùng Sản Xuất
                  </span>
                  <h2 className="text-xl font-bold text-[#19241F] mt-1">
                    Bản Đồ Nơi Sản Xuất — {productData.manufacturer?.name || 'Cơ sở sản xuất'}
                  </h2>
                  <p className="text-xs text-stone-500 mt-1">
                    Địa chỉ: {productData.manufacturer?.address || 'Đang cập nhật'}
                  </p>
                </div>

                <div className="rounded-2xl overflow-hidden border border-stone-200 shadow-inner h-[380px] w-full bg-stone-100 flex items-center justify-center">
                  {productData.mapEmbed ? (() => {
                    // Hỗ trợ cả link src thuần và thẻ <iframe ...> đầy đủ
                    const rawEmbed = productData.mapEmbed.trim();
                    const srcMatch = rawEmbed.match(/src=["']([^"']+)["']/);
                    const iframeSrc = srcMatch ? srcMatch[1] : rawEmbed;
                    return (
                      <iframe
                        title={`Bản đồ ${productData.name}`}
                        src={iframeSrc}
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                      />
                    );
                  })() : (
                    <div className="text-center p-6 text-stone-500 space-y-2">
                      <MapPin className="w-8 h-8 text-stone-400 mx-auto" />
                      <p className="text-xs">Chưa có link nhúng Google Maps cho sản phẩm này.</p>
                    </div>
                  )}
                </div>

              </div>
            )}

            {/* Vạn Phúc Hoa Solution Provider Callout Banner */}
            <div className="p-6 rounded-3xl bg-[#174C3C]/5 border border-[#174C3C]/20 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#174C3C] text-[#DFCA9B] flex items-center justify-center shrink-0 shadow-md">
                  <QrCode className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#174C3C] uppercase tracking-wider">
                    Đơn Vị Phát Triển &amp; Cung Cấp Giải Pháp QR
                  </p>
                  <h4 className="text-base font-bold text-[#19241F] mt-0.5">
                    {productData.provider || 'Công Ty TNHH MTV Vạn Phúc Hoa'}
                  </h4>
                  <p className="text-xs text-stone-600 mt-0.5">
                    Hỗ trợ doanh nghiệp &amp; HTX khởi tạo cổng truy xuất nguồn gốc tem QR VCheck chỉ từ 24h.
                  </p>
                </div>
              </div>

              {onOpenConsultation && (
                <button
                  onClick={() => onOpenConsultation(`Tư vấn giải pháp tem QR VCheck cho ${productData.name}`)}
                  className="w-full sm:w-auto px-5 py-3 rounded-xl bg-[#174C3C] hover:bg-[#205F4D] text-white text-xs font-bold shadow-md transition-all shrink-0 cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#DFCA9B]" />
                  <span>Đăng Ký Cấp Mã QR Cho Sản Phẩm</span>
                </button>
              )}
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
