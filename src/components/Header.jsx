import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, ArrowRight, ShieldCheck, Sparkles, QrCode } from 'lucide-react';
import { companyInfo } from '../data/companyData';

export default function Header({ activeSection, onNavigate, onOpenConsultation }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Trang chủ', id: 'home' },
    { label: 'Giới thiệu', id: 'about' },
    { label: 'Dịch vụ', id: 'services' },
    { label: 'Dự án OCOP', id: 'projects' },
    { label: 'Quy trình', id: 'process' },
    { label: 'Kiến thức', id: 'knowledge' },
    { label: 'Liên hệ', id: 'contact' },
    { label: 'Truy xuất sản phẩm', id: 'traceability', isSpecial: true },

  ];

  const handleNavClick = (id) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };


  return (
    <>
      {/* Top Info Bar */}
      <div className="bg-[#103429] text-xs text-[#A8C7B4] py-1.5 px-4 hidden sm:block border-b border-[#1E4D3E]">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-[#C7A66A]" />
              <span>MST: {companyInfo.taxId} — Hoạt động từ 2015</span>
            </span>
            <span className="text-[#678B75]">|</span>
            <span className="text-stone-300">
              Trụ sở: Tam Kỳ, Quảng Nam
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href={`tel:${companyInfo.hotline}`}
              className="flex items-center gap-1.5 text-stone-200 hover:text-white transition-colors"
            >
              <Phone className="w-3 h-3 text-[#7BAE82]" />
              <span className="font-semibold text-[#E2F0E5]">{companyInfo.hotlineDisplay}</span>
            </a>
            <span className="text-[#678B75]">|</span>
            <a
              href={companyInfo.qrSystemUrl}
              target="_blank"
              rel="noreferrer"
              className="text-[#DFCA9B] hover:text-white transition-colors flex items-center gap-1"
            >
              <span>Cổng QR VCheck</span>
              <ArrowRight className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-stone-200/80 py-3'
          : 'bg-[#F8F7F3]/90 backdrop-blur-sm py-4 border-b border-stone-200/50'
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo / Brand Name */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 text-left group focus:outline-none"
            aria-label="Vạn Phúc Hoa - Trang chủ"
          >
            {/* Logo Emblem */}
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-[#174C3C] to-[#256B55] flex items-center justify-center shadow-md shadow-[#174C3C]/15 group-hover:scale-105 transition-transform duration-200 border border-[#7BAE82]/30">
              <svg viewBox="0 0 40 40" className="w-6 h-6 fill-none stroke-current text-[#DFCA9B]" strokeWidth="2">
                <path d="M20 6C20 6 12 14 12 22C12 26.4 15.6 30 20 30C24.4 30 28 26.4 28 22C28 14 20 6 20 6Z" fill="#C7A66A" fillOpacity="0.25" stroke="#DFCA9B" strokeWidth="1.8" />
                <path d="M20 12C20 12 16 17 16 22C16 24.2 17.8 26 20 26C22.2 26 24 24.2 24 22C24 17 20 12 20 12Z" stroke="#FFFFFF" strokeWidth="1.5" />
                <circle cx="20" cy="22" r="1.5" fill="#FFFFFF" />
              </svg>
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg sm:text-xl tracking-tight text-[#174C3C]">
                  VẠN PHÚC HOA
                </span>
                <span className="px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider rounded bg-[#174C3C]/10 text-[#174C3C]">
                  Agency
                </span>
              </div>
              <p className="text-[10px] sm:text-[11px] text-[#5A6961] tracking-wider uppercase font-medium">
                Thương Hiệu &bull; Bao Bì OCOP &bull; Giải Pháp Số
              </p>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              if (item.isSpecial) {
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer flex items-center gap-1.5 border shadow-xs ${isActive
                      ? 'bg-[#174C3C] text-white border-[#174C3C] shadow-sm'
                      : 'bg-emerald-50/80 hover:bg-[#174C3C] text-[#174C3C] hover:text-white border-emerald-200/80 hover:border-[#174C3C]'
                      }`}
                  >
                    <QrCode className="w-3.5 h-3.5" />
                    <span>{item.label}</span>
                    <span className="bg-[#DFCA9B] text-[#174C3C] text-[9px] font-extrabold px-1 rounded">
                      VCheck
                    </span>
                  </button>
                );
              }
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer ${isActive
                    ? 'text-[#174C3C] bg-[#174C3C]/8 font-semibold'
                    : 'text-[#415148] hover:text-[#174C3C] hover:bg-stone-100/70'
                    }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            {/* <button
              onClick={onOpenConsultation}
              className="hidden md:inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl bg-[#174C3C] hover:bg-[#205F4D] text-white text-sm font-semibold shadow-md shadow-[#174C3C]/20 hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-[#DFCA9B]" />
              <span>Nhận Tư Vấn</span>
            </button> */}

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-lg text-stone-700 hover:text-[#174C3C] hover:bg-stone-100 transition-colors focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer content */}
          <div className="fixed inset-y-0 right-0 w-full max-w-xs bg-white shadow-2xl p-6 flex flex-col justify-between border-l border-stone-200">
            <div>
              <div className="flex items-center justify-between pb-5 border-b border-stone-100">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#174C3C] flex items-center justify-center text-[#DFCA9B] font-bold text-sm">
                    V
                  </div>
                  <span className="font-bold text-[#174C3C] text-base">Vạn Phúc Hoa</span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 rounded-lg text-stone-500 hover:bg-stone-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="mt-6 flex flex-col gap-1.5">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`text-left px-4 py-3 rounded-xl text-base font-medium transition-colors flex items-center justify-between ${item.isSpecial
                      ? 'bg-emerald-50 text-[#174C3C] font-bold border border-emerald-200'
                      : activeSection === item.id
                        ? 'bg-[#174C3C]/10 text-[#174C3C] font-semibold'
                        : 'text-stone-700 hover:bg-stone-50'
                      }`}
                  >
                    <span className="flex items-center gap-2">
                      {item.isSpecial && <QrCode className="w-4 h-4 text-[#174C3C]" />}
                      <span>{item.label}</span>
                    </span>
                    {item.isSpecial && (
                      <span className="text-[10px] font-bold bg-[#174C3C] text-white px-2 py-0.5 rounded-full">
                        VCheck
                      </span>
                    )}
                  </button>
                ))}
              </nav>
            </div>


            <div className="pt-6 border-t border-stone-100 space-y-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenConsultation();
                }}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#174C3C] text-white font-semibold text-sm shadow-md"
              >
                <Sparkles className="w-4 h-4 text-[#DFCA9B]" />
                <span>Nhận Tư Vấn Miễn Phí</span>
              </button>

              <a
                href={`tel:${companyInfo.hotline}`}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-[#174C3C]/20 text-[#174C3C] font-medium text-sm hover:bg-[#174C3C]/5"
              >
                <Phone className="w-4 h-4" />
                <span>Hotline: {companyInfo.hotlineDisplay}</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
