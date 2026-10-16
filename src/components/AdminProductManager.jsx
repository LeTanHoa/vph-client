import React, { useState, useEffect } from 'react';
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  ExternalLink,
  ShieldCheck,
  Database,
  RefreshCw,
  Sparkles,
  QrCode,
  Check,
  Copy,
  AlertTriangle,
  Info,
  X,
  Upload,
  Image as ImageIcon,
  CheckCircle2,
  Layers,
  MapPin,
  Phone,
  Eye,
  Server,
  LogOut,
  Cloud,
  CloudUpload
} from 'lucide-react';
import {
  fetchProducts,
  fetchApiStatus,
  createProduct,
  updateProduct,
  deleteProduct,
  seedProducts,
  uploadImageToCloudinary
} from '../services/api';

export default function AdminProductManager({
  onViewProduct,
  onBackToTraceability,
  onLogout
}) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusInfo, setStatusInfo] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedCode, setCopiedCode] = useState(null);

  // Modal States
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isMongoGuideOpen, setIsMongoGuideOpen] = useState(false);
  const [isCloudinaryGuideOpen, setIsCloudinaryGuideOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [deletingProduct, setDeletingProduct] = useState(null);
  const [activeTab, setActiveTab] = useState('general');
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Form State
  const initialFormState = {
    name: '',
    system: 'CỔNG TRUY XUẤT NGUỒN GỐC VCHECK (vcheck.com.vn)',
    provider: 'Công ty TNHH MTV Vạn Phúc Hoa',
    status: 'ĐÃ XÁC THỰC THÀNH CÔNG',
    verificationCode: '',
    image: '/assets/ngu_coc_huongfarm.jpg',
    vcheckBanner: '/assets/vcheck_banner.jpg',
    ingredients: '',
    standards: [
      { label: 'Số tự công bố sản phẩm (CBSP)', value: '' },
      { label: 'Số bản cam kết ATTP', value: '' }
    ],
    netWeight: '500g',
    expiry: '12 tháng kể từ ngày sản xuất',
    manufactureDate: 'Xem chi tiết trên bao bì sản phẩm',
    usageGuide: '',
    storageGuide: '',
    manufacturer: {
      name: '',
      country: 'Việt Nam',
      businessId: '',
      address: '',
      phone: '',
      website: ''
    },
    mapEmbed: '',
    benefits: ['100% nguyên chất, không chất bảo quản nhân tạo']
  };

  const [formData, setFormData] = useState(initialFormState);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const loadData = async () => {
    setLoading(true);
    try {
      const [prodRes, statRes] = await Promise.all([
        fetchProducts(),
        fetchApiStatus()
      ]);
      setProducts(prodRes.data || []);
      setStatusInfo(statRes);
    } catch (err) {
      console.error('Lỗi tải dữ liệu:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleOpenAddModal = () => {
    const randomCode = 'VCHECK-' + Math.floor(100000 + Math.random() * 900000);
    setFormData({
      ...initialFormState,
      verificationCode: randomCode
    });
    setEditingProduct(null);
    setActiveTab('general');
    setIsEditModalOpen(true);
  };

  const handleOpenEditModal = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name || '',
      system: product.system || 'CỔNG TRUY XUẤT NGUỒN GỐC VCHECK (vcheck.com.vn)',
      provider: product.provider || 'Công ty TNHH MTV Vạn Phúc Hoa',
      status: product.status || 'ĐÃ XÁC THỰC THÀNH CÔNG',
      verificationCode: product.verificationCode || '',
      image: product.image || '/assets/ngu_coc_huongfarm.jpg',
      vcheckBanner: product.vcheckBanner || '/assets/vcheck_banner.jpg',
      ingredients: product.ingredients || '',
      standards: product.standards && product.standards.length > 0
        ? JSON.parse(JSON.stringify(product.standards))
        : [{ label: 'Số tự công bố sản phẩm', value: '' }],
      netWeight: product.netWeight || '500g',
      expiry: product.expiry || '12 tháng kể từ ngày sản xuất',
      manufactureDate: product.manufactureDate || 'Xem chi tiết trên bao bì sản phẩm',
      usageGuide: product.usageGuide || '',
      storageGuide: product.storageGuide || '',
      manufacturer: {
        name: product.manufacturer?.name || '',
        country: product.manufacturer?.country || 'Việt Nam',
        businessId: product.manufacturer?.businessId || '',
        address: product.manufacturer?.address || '',
        phone: product.manufacturer?.phone || '',
        website: product.manufacturer?.website || ''
      },
      mapEmbed: product.mapEmbed || '',
      benefits: product.benefits || []
    });
    setActiveTab('general');
    setIsEditModalOpen(true);
  };

  const handleSaveProduct = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      showToast('⚠️ Vui lòng nhập tên sản phẩm!');
      return;
    }
    if (!formData.verificationCode.trim()) {
      showToast('⚠️ Vui lòng nhập mã xác thực VCheck!');
      return;
    }

    setSaving(true);
    try {
      const cleanedPayload = {
        ...formData,
        standards: (formData.standards || []).filter(s => s && (s.label?.trim() || s.value?.trim())),
        benefits: (formData.benefits || []).filter(b => typeof b === 'string' && b.trim())
      };

      if (editingProduct) {
        const id = editingProduct._id || editingProduct.verificationCode;
        const res = await updateProduct(id, cleanedPayload);
        showToast(res.message || '✅ Đã cập nhật sản phẩm thành công!');
      } else {
        const res = await createProduct(cleanedPayload);
        showToast(res.message || '✅ Đã thêm sản phẩm mới thành công!');
      }
      setIsEditModalOpen(false);
      await loadData();
    } catch (err) {
      showToast('❌ Lỗi: ' + (err.message || 'Không thể lưu sản phẩm'));
    } finally {
      setSaving(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (!deletingProduct) return;
    setSaving(true);
    try {
      const id = deletingProduct._id || deletingProduct.verificationCode;
      await deleteProduct(id);
      showToast('🗑️ Đã xoá sản phẩm thành công!');
      setIsDeleteModalOpen(false);
      setDeletingProduct(null);
      await loadData();
    } catch (err) {
      showToast('❌ Lỗi xoá sản phẩm: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleSeedData = async () => {
    if (!window.confirm('Bạn có muốn nạp lại dữ liệu mẫu vào cơ sở dữ liệu không?')) return;
    setLoading(true);
    try {
      const res = await seedProducts();
      showToast(res.message || '🌱 Đã nạp lại dữ liệu mẫu thành công!');
      await loadData();
    } catch (err) {
      showToast('❌ Lỗi khi nạp dữ liệu: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  // Image Upload to Cloudinary
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      showToast('⚠️ Vui lòng chọn ảnh dung lượng dưới 10MB!');
      return;
    }

    setUploadingImage(true);
    showToast('☁️ Đang xử lý và tải ảnh lên Cloudinary...');

    const reader = new FileReader();
    reader.onloadend = async () => {
      try {
        const res = await uploadImageToCloudinary(reader.result);
        if (res && res.url) {
          setFormData(prev => ({ ...prev, image: res.url }));
          if (res.storage === 'cloudinary') {
            showToast('☁️ Đã tải ảnh lên Cloudinary thành công!');
          } else {
            showToast('✅ Đã nhận ảnh. Gắn thông tin Cloudinary vào .env để lưu vĩnh viễn trên mây!');
          }
        }
      } catch (err) {
        showToast('❌ Lỗi upload ảnh: ' + err.message);
      } finally {
        setUploadingImage(false);
      }
    };
    reader.readAsDataURL(file);
  };

  // Standards handling
  const handleAddStandard = () => {
    setFormData({
      ...formData,
      standards: [...formData.standards, { label: '', value: '' }]
    });
  };

  const handleStandardChange = (index, field, val) => {
    const updated = [...formData.standards];
    updated[index][field] = val;
    setFormData({ ...formData, standards: updated });
  };

  const handleRemoveStandard = (index) => {
    const updated = formData.standards.filter((_, i) => i !== index);
    setFormData({ ...formData, standards: updated });
  };

  // Filter products
  const filteredProducts = products.filter(p => {
    const q = searchQuery.toLowerCase();
    return (
      (p.name && p.name.toLowerCase().includes(q)) ||
      (p.verificationCode && p.verificationCode.toLowerCase().includes(q)) ||
      (p.manufacturer?.name && p.manufacturer.name.toLowerCase().includes(q))
    );
  });

  return (
    <div className="bg-[#F8F7F3] min-h-screen py-8">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 bg-[#174C3C] text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-[#DFCA9B]/30 animate-bounce">
          <Sparkles className="w-5 h-5 text-[#DFCA9B]" />
          <span className="text-sm font-semibold">{toastMessage}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">

        {/* Top Header & Navigation */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-stone-200">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#174C3C]/10 text-[#174C3C] text-xs font-bold uppercase tracking-wider mb-2">
              <Server className="w-3.5 h-3.5" />
              <span>Hệ Thống Quản Trị /admin &bull; Tài khoản: admin</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#19241F] tracking-tight">
              Quản Lý &amp; Thêm Sản Phẩm Cổng VCheck
            </h1>
            <p className="text-stone-500 text-xs sm:text-sm mt-1">
              Thêm, sửa, xoá thông tin sản phẩm và lưu trữ hình ảnh trực tiếp lên Cloudinary &amp; MongoDB.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onBackToTraceability}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-stone-200 text-stone-700 hover:text-[#174C3C] text-xs font-bold shadow-sm transition hover:shadow cursor-pointer"
            >
              <Eye className="w-4 h-4 text-[#174C3C]" />
              <span>Xem Trang Truy Xuất</span>
            </button>

            <button
              onClick={handleOpenAddModal}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#174C3C] hover:bg-[#205F4D] text-white text-xs font-bold shadow-md transition hover:-translate-y-0.5 cursor-pointer"
            >
              <Plus className="w-4 h-4 text-[#DFCA9B]" />
              <span>+ Thêm Sản Phẩm Mới</span>
            </button>

            {onLogout && (
              <button
                onClick={onLogout}
                title="Đăng xuất tài khoản admin"
                className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-bold transition cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                <span>Đăng xuất</span>
              </button>
            )}
          </div>
        </div>



        {/* Action & Filter Bar */}
        <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Tìm theo tên, mã VCheck, cơ sở..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-stone-200 focus:outline-none focus:border-[#174C3C] focus:ring-1 focus:ring-[#174C3C] bg-stone-50"
            />
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
            <span className="text-xs text-stone-500 font-medium">
              Tổng cộng: <strong>{filteredProducts.length}</strong> sản phẩm
            </span>
            <button
              onClick={handleSeedData}
              className="px-3 py-1.5 rounded-lg text-xs font-bold text-[#174C3C] bg-[#174C3C]/10 hover:bg-[#174C3C]/20 transition cursor-pointer"
            >
              🌱 Nạp Mẫu
            </button>
            <button
              onClick={loadData}
              title="Làm mới dữ liệu"
              className="p-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-600 transition cursor-pointer"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>

        {/* Product List / Table */}
        {loading ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-stone-200 space-y-3">
            <RefreshCw className="w-8 h-8 text-[#174C3C] animate-spin mx-auto" />
            <p className="text-sm font-semibold text-stone-600">Đang đồng bộ dữ liệu với MongoDB...</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-stone-200 space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-stone-100 flex items-center justify-center mx-auto text-stone-400">
              <QrCode className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-base font-bold text-stone-800">Chưa có sản phẩm nào</h3>
              <p className="text-xs text-stone-500 mt-1 max-w-md mx-auto">
                Hiện danh sách đang trống. Bạn có thể bấm nút "Thêm sản phẩm mới" để bắt đầu.
              </p>
            </div>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={handleOpenAddModal}
                className="px-4 py-2 rounded-xl bg-[#174C3C] text-white text-xs font-bold hover:bg-[#205F4D] transition cursor-pointer"
              >
                + Thêm sản phẩm đầu tiên
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-stone-50 text-stone-500 uppercase tracking-wider font-semibold border-b border-stone-200">
                  <tr>
                    <th className="py-3.5 px-4 w-16">Ảnh</th>
                    <th className="py-3.5 px-4">Tên Sản Phẩm</th>
                    <th className="py-3.5 px-4">Mã VCheck / Barcode</th>
                    <th className="py-3.5 px-4">Đơn Vị Sản Xuất</th>
                    <th className="py-3.5 px-4">Trọng Lượng / HSD</th>
                    <th className="py-3.5 px-4 text-center">Trạng Thái</th>
                    <th className="py-3.5 px-4 text-right">Thao Tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {filteredProducts.map((p) => (
                    <tr key={p._id || p.verificationCode} className="hover:bg-stone-50/70 transition">
                      <td className="py-3 px-4">
                        <div className="w-12 h-12 rounded-xl bg-stone-100 overflow-hidden border border-stone-200 flex items-center justify-center shrink-0 relative group">
                          {p.image ? (
                            <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                          ) : (
                            <ImageIcon className="w-5 h-5 text-stone-400" />
                          )}
                          {p.image && p.image.includes('cloudinary') && (
                            <span
                              title="Lưu trên Cloudinary"
                              className="absolute bottom-0.5 right-0.5 w-3.5 h-3.5 bg-sky-500 text-white rounded-full flex items-center justify-center shadow"
                            >
                              <Cloud className="w-2.5 h-2.5" />
                            </span>
                          )}
                        </div>
                      </td>

                      <td className="py-3 px-4">
                        <div className="font-bold text-stone-900 text-sm max-w-xs">{p.name}</div>
                        <div className="text-[11px] text-stone-500 mt-0.5 line-clamp-1">{p.ingredients || 'Chưa cập nhật thành phần'}</div>
                      </td>

                      <td className="py-3 px-4">
                        <div className="inline-flex items-center gap-1.5 bg-stone-100 px-2 py-1 rounded-lg border border-stone-200 font-mono text-[11px] font-bold text-stone-800">
                          <span>{p.verificationCode}</span>
                          <button
                            onClick={() => handleCopy(p.verificationCode)}
                            title="Sao chép mã"
                            className="text-stone-400 hover:text-stone-700 cursor-pointer"
                          >
                            {copiedCode === p.verificationCode ? (
                              <Check className="w-3.5 h-3.5 text-emerald-600" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>
                      </td>

                      <td className="py-3 px-4">
                        <div className="font-semibold text-stone-800">{p.manufacturer?.name || 'Chưa có tên'}</div>
                        <div className="text-[11px] text-stone-500 flex items-center gap-1 mt-0.5">
                          <Phone className="w-3 h-3 text-[#174C3C]" />
                          <span>{p.manufacturer?.phone || 'Chưa có SĐT'}</span>
                        </div>
                      </td>

                      <td className="py-3 px-4">
                        <div className="font-medium text-stone-800">{p.netWeight || '-'}</div>
                        <div className="text-[11px] text-stone-500">{p.expiry || '-'}</div>
                      </td>

                      <td className="py-3 px-4 text-center">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                          <ShieldCheck className="w-3 h-3" />
                          <span>{p.status || 'ĐÃ XÁC THỰC'}</span>
                        </span>
                      </td>

                      <td className="py-3 px-4 text-right">
                        <div className="inline-flex items-center gap-1.5">
                          <button
                            onClick={() => onViewProduct(p._id || p.verificationCode)}
                            title="Xem trang truy xuất của sản phẩm này"
                            className="p-1.5 rounded-lg bg-stone-100 text-[#174C3C] hover:bg-[#174C3C] hover:text-white transition cursor-pointer"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleOpenEditModal(p)}
                            title="Chỉnh sửa sản phẩm"
                            className="p-1.5 rounded-lg bg-stone-100 text-blue-700 hover:bg-blue-600 hover:text-white transition cursor-pointer"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              setDeletingProduct(p);
                              setIsDeleteModalOpen(true);
                            }}
                            title="Xoá sản phẩm"
                            className="p-1.5 rounded-lg bg-stone-100 text-rose-600 hover:bg-rose-600 hover:text-white transition cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>

      {/* ==================================================================== */}
      {/* MODAL: Thêm / Sửa Sản Phẩm (Form Add/Edit) */}
      {/* ==================================================================== */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden border border-stone-200">

            {/* Modal Header */}
            <div className="p-6 bg-gradient-to-r from-[#174C3C] to-[#1F634E] text-white flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                  {editingProduct ? <Edit2 className="w-5 h-5 text-[#DFCA9B]" /> : <Plus className="w-5 h-5 text-[#DFCA9B]" />}
                </div>
                <div>
                  <h3 className="text-lg font-bold">
                    {editingProduct ? 'Chỉnh Sửa Thông Tin Sản Phẩm' : 'Thêm Sản Phẩm Mới Vào Cổng VCheck'}
                  </h3>
                  <p className="text-xs text-stone-200">
                    Dữ liệu sẽ lưu vào MongoDB &amp; hình ảnh tự động upload lên Cloudinary
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Tab Switcher */}
            <div className="flex items-center gap-1 p-2 bg-stone-100 border-b border-stone-200 shrink-0 overflow-x-auto">
              <button
                type="button"
                onClick={() => setActiveTab('general')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer shrink-0 ${activeTab === 'general' ? 'bg-white text-[#174C3C] shadow-sm' : 'text-stone-600 hover:text-stone-900'
                  }`}
              >
                1. Thông Tin &amp; Ảnh Cloudinary
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('details')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer shrink-0 ${activeTab === 'details' ? 'bg-white text-[#174C3C] shadow-sm' : 'text-stone-600 hover:text-stone-900'
                  }`}
              >
                2. Quy Cách &amp; Thành Phần
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('standards')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer shrink-0 ${activeTab === 'standards' ? 'bg-white text-[#174C3C] shadow-sm' : 'text-stone-600 hover:text-stone-900'
                  }`}
              >
                3. Tiêu Chuẩn &amp; Pháp Lý ({formData.standards.length})
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('manufacturer')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer shrink-0 ${activeTab === 'manufacturer' ? 'bg-white text-[#174C3C] shadow-sm' : 'text-stone-600 hover:text-stone-900'
                  }`}
              >
                4. Cơ Sở Sản Xuất &amp; Bản Đồ
              </button>
            </div>

            {/* Modal Body / Form */}
            <form onSubmit={handleSaveProduct} className="flex-1 overflow-y-auto p-6 space-y-6">

              {/* TAB 1: General Info & Cloudinary Image Upload */}
              {activeTab === 'general' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-xs font-bold text-stone-700 mb-1">
                        Tên sản phẩm <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Ví dụ: NGŨ CỐC DINH DƯỠNG CHO NGƯỜI CAO TUỔI"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs focus:ring-1 focus:ring-[#174C3C] focus:border-[#174C3C]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1">
                        Mã định danh / VCheck <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.verificationCode}
                        onChange={(e) => setFormData({ ...formData, verificationCode: e.target.value })}
                        placeholder="Ví dụ: VCHECK-HF-2022-049189"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs font-mono font-bold focus:ring-1 focus:ring-[#174C3C] focus:border-[#174C3C]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1">
                        Trạng thái xác thực
                      </label>
                      <select
                        value={formData.status}
                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs focus:ring-1 focus:ring-[#174C3C] focus:border-[#174C3C]"
                      >
                        <option value="ĐÃ XÁC THỰC THÀNH CÔNG">ĐÃ XÁC THỰC THÀNH CÔNG</option>
                        <option value="ĐANG KIỂM ĐỊNH LÔ HÀNG">ĐANG KIỂM ĐỊNH LÔ HÀNG</option>
                        <option value="ĐẠT CHUẨN OCOP 4 SAO">ĐẠT CHUẨN OCOP 4 SAO</option>
                        <option value="CHỨNG NHẬN HỢP CHUẨN">CHỨNG NHẬN HỢP CHUẨN</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1">
                        Hệ thống cổng truy xuất
                      </label>
                      <input
                        type="text"
                        value={formData.system}
                        onChange={(e) => setFormData({ ...formData, system: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1">
                        Đơn vị cung cấp giải pháp
                      </label>
                      <input
                        type="text"
                        value={formData.provider}
                        onChange={(e) => setFormData({ ...formData, provider: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs"
                      />
                    </div>
                  </div>

                  {/* Cloudinary Image Section */}
                  <div className="pt-4 border-t border-stone-200">
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-xs font-bold text-stone-700">
                        Hình ảnh sản phẩm (Lưu trữ Cloudinary)
                      </label>
                      {formData.image && formData.image.includes('cloudinary') && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-sky-700 bg-sky-100 px-2 py-0.5 rounded-full">
                          <Cloud className="w-3 h-3" />
                          <span>Đã lưu trên Cloudinary</span>
                        </span>
                      )}
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-4">
                      <div className="w-28 h-28 rounded-2xl bg-stone-100 border border-stone-300 overflow-hidden flex items-center justify-center shrink-0 relative">
                        {formData.image ? (
                          <img src={formData.image} alt="Preview" className="w-full h-full object-contain" />
                        ) : (
                          <ImageIcon className="w-8 h-8 text-stone-400" />
                        )}
                        {uploadingImage && (
                          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                            <RefreshCw className="w-6 h-6 text-white animate-spin" />
                          </div>
                        )}
                      </div>

                      <div className="flex-1 space-y-2 w-full">
                        <input
                          type="text"
                          value={formData.image}
                          onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                          placeholder="Dán link ảnh URL hoặc tải file từ máy tính để tự lưu lên Cloudinary..."
                          className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-xs"
                        />
                        <div className="flex flex-wrap items-center gap-2">
                          <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#174C3C] hover:bg-[#205F4D] text-white text-xs font-bold cursor-pointer transition shadow-sm">
                            <CloudUpload className="w-3.5 h-3.5 text-[#DFCA9B]" />
                            <span>{uploadingImage ? 'Đang tải lên Cloudinary...' : 'Tải ảnh lên Cloudinary'}</span>
                            <input
                              type="file"
                              accept="image/*"
                              disabled={uploadingImage}
                              onChange={handleImageUpload}
                              className="hidden"
                            />
                          </label>

                          <span className="text-[11px] text-stone-400">hoặc chọn mẫu:</span>
                          <button
                            type="button"
                            onClick={() => setFormData({ ...formData, image: '/assets/ngu_coc_huongfarm.jpg' })}
                            className="text-[11px] text-[#174C3C] hover:underline cursor-pointer"
                          >
                            Ngũ cốc
                          </button>
                          <button
                            type="button"
                            onClick={() => setFormData({ ...formData, image: '/assets/hero_agarwood.jpg' })}
                            className="text-[11px] text-[#174C3C] hover:underline cursor-pointer"
                          >
                            Trầm hương
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: Details & Ingredients */}
              {activeTab === 'details' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1">
                        Khối lượng tịnh
                      </label>
                      <input
                        type="text"
                        value={formData.netWeight}
                        onChange={(e) => setFormData({ ...formData, netWeight: e.target.value })}
                        placeholder="Ví dụ: 500g, 250g, 1 Hộp"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1">
                        Thời hạn sử dụng
                      </label>
                      <input
                        type="text"
                        value={formData.expiry}
                        onChange={(e) => setFormData({ ...formData, expiry: e.target.value })}
                        placeholder="Ví dụ: 12 tháng kể từ NSX"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1">
                        Ngày sản xuất
                      </label>
                      <input
                        type="text"
                        value={formData.manufactureDate}
                        onChange={(e) => setFormData({ ...formData, manufactureDate: e.target.value })}
                        placeholder="Ví dụ: Xem chi tiết trên bao bì"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      Thành phần chi tiết của sản phẩm
                    </label>
                    <textarea
                      rows={3}
                      value={formData.ingredients}
                      onChange={(e) => setFormData({ ...formData, ingredients: e.target.value })}
                      placeholder="Mô tả các loại thành phần, nông sản, tỷ lệ..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs leading-relaxed"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1">
                        Hướng dẫn sử dụng
                      </label>
                      <textarea
                        rows={3}
                        value={formData.usageGuide}
                        onChange={(e) => setFormData({ ...formData, usageGuide: e.target.value })}
                        placeholder="Cách pha chế, liều lượng dùng..."
                        className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1">
                        Hướng dẫn bảo quản
                      </label>
                      <textarea
                        rows={3}
                        value={formData.storageGuide}
                        onChange={(e) => setFormData({ ...formData, storageGuide: e.target.value })}
                        placeholder="Nơi khô ráo, tránh ánh nắng..."
                        className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: Standards & Food Safety */}
              {activeTab === 'standards' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-stone-200">
                    <div>
                      <h4 className="text-xs font-bold text-stone-900 uppercase">
                        Hồ Sơ Tiêu Chuẩn &amp; Công Bố Sản Phẩm
                      </h4>
                      <p className="text-[11px] text-stone-500">
                        Hiển thị tại Tab "Hồ Sơ Tiêu Chuẩn &amp; ATTP" trên trang truy xuất
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={handleAddStandard}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#174C3C] text-white text-xs font-bold hover:bg-[#205F4D] cursor-pointer transition"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Thêm Dòng Tiêu Chuẩn</span>
                    </button>
                  </div>

                  <div className="space-y-3">
                    {formData.standards.map((std, idx) => (
                      <div key={idx} className="flex items-center gap-3 p-3 rounded-xl bg-stone-50 border border-stone-200">
                        <div className="flex-1">
                          <label className="block text-[10px] font-bold text-stone-500 uppercase mb-1">
                            Tên hồ sơ / Chứng nhận
                          </label>
                          <input
                            type="text"
                            value={std.label}
                            onChange={(e) => handleStandardChange(idx, 'label', e.target.value)}
                            placeholder="Ví dụ: Số tự công bố sản phẩm (CBSP)"
                            className="w-full px-3 py-1.5 rounded-lg border border-stone-300 text-xs"
                          />
                        </div>
                        <div className="flex-1">
                          <label className="block text-[10px] font-bold text-stone-500 uppercase mb-1">
                            Mã số / Số hiệu
                          </label>
                          <input
                            type="text"
                            value={std.value}
                            onChange={(e) => handleStandardChange(idx, 'value', e.target.value)}
                            placeholder="Ví dụ: 01/CSTP XANH HUUONGFARM/2022"
                            className="w-full px-3 py-1.5 rounded-lg border border-stone-300 text-xs font-mono"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveStandard(idx)}
                          className="p-2 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition cursor-pointer mt-4"
                          title="Xoá dòng này"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 4: Manufacturer & Map */}
              {activeTab === 'manufacturer' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-xs font-bold text-stone-700 mb-1">
                        Tên cơ sở / Hợp tác xã / Công ty sản xuất
                      </label>
                      <input
                        type="text"
                        value={formData.manufacturer.name}
                        onChange={(e) => setFormData({
                          ...formData,
                          manufacturer: { ...formData.manufacturer, name: e.target.value }
                        })}
                        placeholder="Ví dụ: Hộ Kinh Doanh Cơ Sở Thực Phẩm Xanh HuongFarm"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1">
                        Số ĐKKD / Mã số doanh nghiệp
                      </label>
                      <input
                        type="text"
                        value={formData.manufacturer.businessId}
                        onChange={(e) => setFormData({
                          ...formData,
                          manufacturer: { ...formData.manufacturer, businessId: e.target.value }
                        })}
                        placeholder="Ví dụ: 049189001652"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1">
                        Số điện thoại hotline
                      </label>
                      <input
                        type="text"
                        value={formData.manufacturer.phone}
                        onChange={(e) => setFormData({
                          ...formData,
                          manufacturer: { ...formData.manufacturer, phone: e.target.value }
                        })}
                        placeholder="Ví dụ: 0338 627 931"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-xs font-bold text-stone-700 mb-1">
                        Địa chỉ nơi sản xuất
                      </label>
                      <input
                        type="text"
                        value={formData.manufacturer.address}
                        onChange={(e) => setFormData({
                          ...formData,
                          manufacturer: { ...formData.manufacturer, address: e.target.value }
                        })}
                        placeholder="Ví dụ: Thôn Trung Sơn, Xã Quế Sơn Trung, Đà Nẵng / Quảng Nam"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1">
                        Website chính thức
                      </label>
                      <input
                        type="text"
                        value={formData.manufacturer.website}
                        onChange={(e) => setFormData({
                          ...formData,
                          manufacturer: { ...formData.manufacturer, website: e.target.value }
                        })}
                        placeholder="Ví dụ: huongfarm.com"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1">
                        Quốc gia
                      </label>
                      <input
                        type="text"
                        value={formData.manufacturer.country}
                        onChange={(e) => setFormData({
                          ...formData,
                          manufacturer: { ...formData.manufacturer, country: e.target.value }
                        })}
                        placeholder="Việt Nam"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-xs font-bold text-stone-700 mb-1">
                        Link nhúng Bản đồ Google Maps (Embed URL)
                      </label>
                      <input
                        type="text"
                        value={formData.mapEmbed}
                        onChange={(e) => setFormData({ ...formData, mapEmbed: e.target.value })}
                        placeholder="https://www.google.com/maps/embed?pb=..."
                        className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs font-mono text-stone-600"
                      />
                      <p className="text-[11px] text-stone-400 mt-1">
                        (Mở Google Maps &rarr; Chia sẻ &rarr; Nhúng bản đồ &rarr; Sao chép link trong thuộc tính src)
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Modal Footer */}
              <div className="pt-4 border-t border-stone-200 flex items-center justify-end gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-stone-300 text-stone-700 text-xs font-bold hover:bg-stone-100 transition cursor-pointer"
                >
                  Huỷ Bỏ
                </button>
                <button
                  type="submit"
                  disabled={saving || uploadingImage}
                  className="px-6 py-2.5 rounded-xl bg-[#174C3C] hover:bg-[#205F4D] text-white text-xs font-bold shadow-md transition cursor-pointer flex items-center gap-2"
                >
                  {(saving || uploadingImage) && <RefreshCw className="w-3.5 h-3.5 animate-spin" />}
                  <span>{editingProduct ? 'Lưu Thay Đổi Vào MongoDB' : 'Tạo Sản Phẩm & Lưu'}</span>
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* MODAL: Xác nhận Xoá */}
      {/* ==================================================================== */}
      {isDeleteModalOpen && deletingProduct && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full border border-stone-200 shadow-2xl space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div className="text-center">
              <h3 className="text-base font-bold text-stone-900">Xác Nhận Xoá Sản Phẩm?</h3>
              <p className="text-xs text-stone-500 mt-1">
                Bạn có chắc chắn muốn xoá sản phẩm <strong>"{deletingProduct.name}"</strong>? Thao tác này sẽ xoá dữ liệu vĩnh viễn khỏi MongoDB.
              </p>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="flex-1 py-2.5 rounded-xl border border-stone-200 text-stone-700 text-xs font-bold hover:bg-stone-50 cursor-pointer"
              >
                Huỷ Bỏ
              </button>
              <button
                onClick={handleConfirmDelete}
                disabled={saving}
                className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-md cursor-pointer"
              >
                {saving ? 'Đang xoá...' : 'Đồng Ý Xoá'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* MODAL: Hướng Dẫn Gắn Link MongoDB */}
      {/* ==================================================================== */}
      {isMongoGuideOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-xl w-full border border-stone-200 shadow-2xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center">
                  <Database className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-stone-900 text-base">
                  Cấu Hình Kết Nối MongoDB
                </h3>
              </div>
              <button
                onClick={() => setIsMongoGuideOpen(false)}
                className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs text-stone-700 leading-relaxed">
              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
                <span className="font-bold text-stone-900 block text-xs">
                  Mở file <code className="bg-stone-200 px-1.5 py-0.5 rounded text-[#174C3C]">.env</code> trong thư mục dự án và dán link:
                </span>
                <pre className="p-3 rounded-xl bg-[#19241F] text-[#DFCA9B] font-mono text-[11px] overflow-x-auto">
                  MONGODB_URI=mongodb+srv://&lt;username&gt;:&lt;password&gt;@cluster0.xxxxx.mongodb.net/vhh_db?retryWrites=true&amp;w=majority
                </pre>
              </div>
            </div>

            <div className="pt-2 text-right">
              <button
                onClick={() => setIsMongoGuideOpen(false)}
                className="px-5 py-2.5 rounded-xl bg-[#174C3C] text-white text-xs font-bold hover:bg-[#205F4D] transition cursor-pointer"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* MODAL: Hướng Dẫn Cấu Hình Cloudinary */}
      {/* ==================================================================== */}
      {isCloudinaryGuideOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-xl w-full border border-stone-200 shadow-2xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-sky-600 text-white flex items-center justify-center">
                  <Cloud className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-stone-900 text-base">
                  Cấu Hình Lưu Trữ Hình Ảnh Cloudinary
                </h3>
              </div>
              <button
                onClick={() => setIsCloudinaryGuideOpen(false)}
                className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs text-stone-700 leading-relaxed">
              <p>
                Để ảnh sản phẩm được lưu tự động trên mây Cloudinary với CDN tốc độ cao, bạn chỉ cần điền 3 thông số vào file <code>.env</code>:
              </p>

              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
                <span className="font-bold text-stone-900 block text-xs">
                  Mở file <code>.env</code> và điền:
                </span>
                <pre className="p-3 rounded-xl bg-[#19241F] text-sky-400 font-mono text-[11px] overflow-x-auto">
                  {`CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret`}
                </pre>
                <p className="text-[11px] text-stone-500">
                  Lấy các thông số trên miễn phí tại trang Dashboard: <a href="https://cloudinary.com" target="_blank" rel="noreferrer" className="text-sky-600 underline">cloudinary.com</a>
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px]">
                💡 <strong>Tiện lợi:</strong> Ngay sau khi điền, mọi ảnh bạn bấm "Tải ảnh từ máy tính" sẽ được server tự động upload lên Cloudinary và sinh ra link trực tiếp!
              </div>
            </div>

            <div className="pt-2 text-right">
              <button
                onClick={() => setIsCloudinaryGuideOpen(false)}
                className="px-5 py-2.5 rounded-xl bg-[#174C3C] text-white text-xs font-bold hover:bg-[#205F4D] transition cursor-pointer"
              >
                Đã Hiểu &bull; Đóng
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
