import React, { useState } from 'react';
import {
  Lock,
  User,
  ShieldCheck,
  QrCode,
  ArrowRight,
  Eye,
  EyeOff,
  AlertCircle,
  Sparkles,
  ArrowLeft
} from 'lucide-react';
import { loginAdmin } from '../services/api';

export default function AdminLogin({ onLoginSuccess, onBackToTraceability }) {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setLoading(true);

    try {
      const res = await loginAdmin(username.trim(), password.trim());
      if (res.success) {
        onLoginSuccess();
      } else {
        setErrorMessage(res.message || 'Sai tên đăng nhập hoặc mật khẩu!');
      }
    } catch (err) {
      setErrorMessage(err.message || 'Đăng nhập thất bại. Vui lòng thử lại!');
    } finally {
      setLoading(false);
    }
  };

  const fillDefaultCredentials = () => {
    setUsername('admin');
    setPassword('admin');
    setErrorMessage('');
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center p-4 sm:p-6 bg-[#F8F7F3]">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-10 border border-stone-200 shadow-xl space-y-6 relative overflow-hidden">

        {/* Top Decorative accent */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#174C3C] via-[#24755D] to-[#DFCA9B]" />

        {/* Back Link */}
        {onBackToTraceability && (
          <button
            onClick={onBackToTraceability}
            className="inline-flex items-center gap-1.5 text-xs text-stone-500 hover:text-[#174C3C] font-semibold transition cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Quay lại Cổng Truy Xuất</span>
          </button>
        )}

        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="w-16 h-16 rounded-2xl bg-[#174C3C] text-[#DFCA9B] flex items-center justify-center mx-auto shadow-lg shadow-[#174C3C]/20">
            <ShieldCheck className="w-9 h-9" />
          </div>
          <h2 className="text-2xl font-extrabold text-[#19241F] tracking-tight">
            Đăng Nhập Quản Trị
          </h2>
          <p className="text-xs text-stone-500">
            Hệ thống quản lý &amp; thêm sửa xoá sản phẩm Cổng VCheck
          </p>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2.5 animate-shake">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Default credentials hint */}
        {/* <div className="p-3.5 rounded-2xl bg-[#DFCA9B]/20 border border-[#DFCA9B]/50 flex items-center justify-between text-xs text-stone-700">
          <div className="space-y-0.5">
            <p className="font-bold text-[#174C3C] text-[11px] uppercase tracking-wider">
              Thông tin đăng nhập mặc định:
            </p>
            <p className="font-mono text-xs">
              Tài khoản: <strong>admin</strong> | Mật khẩu: <strong>admin</strong>
            </p>
          </div>
          <button
            type="button"
            onClick={fillDefaultCredentials}
            className="px-2.5 py-1 rounded-lg bg-white text-[#174C3C] text-[11px] font-bold border border-stone-200 shadow-sm hover:bg-stone-50 transition cursor-pointer"
          >
            Điền nhanh
          </button>
        </div> */}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1.5">
              Tên đăng nhập
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Nhập tài khoản (admin)"
                className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-stone-300 focus:outline-none focus:border-[#174C3C] focus:ring-1 focus:ring-[#174C3C] bg-stone-50/50"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1.5">
              Mật khẩu
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Nhập mật khẩu (admin)"
                className="w-full pl-10 pr-10 py-2.5 text-xs rounded-xl border border-stone-300 focus:outline-none focus:border-[#174C3C] focus:ring-1 focus:ring-[#174C3C] bg-stone-50/50 font-mono"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-[#174C3C] hover:bg-[#205F4D] text-white text-xs font-bold shadow-lg shadow-[#174C3C]/20 transition-all flex items-center justify-center gap-2 cursor-pointer hover:-translate-y-0.5"
          >
            {loading ? (
              <span>Đang kiểm tra đăng nhập...</span>
            ) : (
              <>
                <span>Đăng Nhập Vào Trang Quản Trị</span>
                <ArrowRight className="w-4 h-4 text-[#DFCA9B]" />
              </>
            )}
          </button>
        </form>

        <div className="pt-2 text-center text-[11px] text-stone-400 border-t border-stone-100">
          Cổng Quản Trị VCheck &bull; Giải Pháp Công Nghệ Vạn Phúc Hoa
        </div>

      </div>
    </div>
  );
}
