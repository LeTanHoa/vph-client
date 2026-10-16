import React, { useState, useEffect } from 'react';
import {
  QrCode,
  Settings,
  ShieldCheck,
  Database,
  ExternalLink,
  Layers,
  Sparkles,
  Home,
  CheckCircle2,
  Lock,
  LogOut,
  Cloud
} from 'lucide-react';
import ProductTraceabilityPage from './components/ProductTraceabilityPage';
import AdminProductManager from './components/AdminProductManager';
import AdminLogin from './components/AdminLogin';
import ConsultationModal from './components/ConsultationModal';
import QuickContactWidget from './components/QuickContactWidget';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Projects from './components/Projects';
import Process from './components/Process';
import WhyChooseUs from './components/WhyChooseUs';
import Knowledge from './components/Knowledge';
import FAQSection from './components/FAQSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import { fetchApiStatus, isUserLoggedIn, clearLoginSession } from './services/api';

export default function App() {
  // Determine initial view from window.location.pathname
  const getInitialView = () => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname.toLowerCase();
      if (path === '/admin' || path.startsWith('/admin')) {
        return 'admin';
      }
    }
    return 'traceability';
  };

  const [currentView, setCurrentView] = useState(getInitialView);
  const [isAuthenticated, setIsAuthenticated] = useState(isUserLoggedIn);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [consultationModalOpen, setConsultationModalOpen] = useState(false);
  const [initialConsultationService, setInitialConsultationService] = useState('');
  const [dbStatus, setDbStatus] = useState(null);

  // Sync state with browser URL (popstate for back/forward buttons)
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname.toLowerCase();
      if (path === '/admin' || path.startsWith('/admin')) {
        setCurrentView('admin');
      } else {
        setCurrentView('traceability');
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Update browser URL when switching view
  const navigateToView = (viewName) => {
    setCurrentView(viewName);
    if (viewName === 'admin') {
      window.history.pushState({}, '', '/admin');
    } else {
      window.history.pushState({}, '', '/');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Check MongoDB & Cloudinary connection status
  useEffect(() => {
    fetchApiStatus().then(status => setDbStatus(status));
  }, [currentView, isAuthenticated]);

  const handleOpenConsultation = (serviceName = '') => {
    setInitialConsultationService(serviceName);
    setConsultationModalOpen(true);
  };

  const handleViewProduct = (productId) => {
    setSelectedProductId(productId);
    navigateToView('traceability');
  };

  const handleLogout = () => {
    clearLoginSession();
    setIsAuthenticated(false);
  };

  return (
    <div className="min-h-screen bg-[#F8F7F3] text-[#19241F] flex flex-col selection:bg-[#7BAE82]/30 selection:text-[#174C3C]">

      {/* Top Application Bar */}
      <header className="sticky top-0 z-40 bg-[#174C3C] text-white shadow-md border-b border-[#1F634E]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Brand Logo & Name */}
            <div
              onClick={() => navigateToView('traceability')}
              className="flex items-center gap-3 cursor-pointer select-none"
            >
              <div className="w-10 h-10 rounded-xl bg-white text-[#174C3C] flex items-center justify-center font-black shadow-md">
                <QrCode className="w-6 h-6 text-[#174C3C]" />
              </div>
              <div>
                <span className="font-extrabold text-base sm:text-lg tracking-wide text-white block leading-tight">
                  VẠN PHÚC HOA
                </span>
                <span className="text-[10px] sm:text-[11px] text-[#DFCA9B] font-medium tracking-wider uppercase block">
                  Cổng Thông Tin Truy Xuất VCheck
                </span>
              </div>
            </div>

            {/* Navigation Tabs (Traceability & /admin) */}
            <div className="flex items-center gap-1 sm:gap-2 bg-black/20 p-1 rounded-2xl border border-white/10">
              <button
                onClick={() => navigateToView('traceability')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${currentView === 'traceability'
                  ? 'bg-white text-[#174C3C] shadow-sm'
                  : 'text-stone-200 hover:text-white hover:bg-white/10'
                  }`}
              >
                <QrCode className="w-3.5 h-3.5" />
                <span>Trang Truy Xuất</span>
              </button>

              {/* <button
                onClick={() => navigateToView('admin')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  currentView === 'admin'
                    ? 'bg-[#DFCA9B] text-[#174C3C] shadow-sm'
                    : 'text-stone-200 hover:text-white hover:bg-white/10'
                }`}
              >
                <Settings className="w-3.5 h-3.5" />
                <span>Trang Thêm / Quản Lý (/admin)</span>
                {!isAuthenticated && (
                  <Lock className="w-3 h-3 text-[#174C3C]/70 ml-0.5" />
                )}
              </button>

              <button
                onClick={() => navigateToView('landing')}
                className={`hidden md:flex px-3 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer items-center gap-1.5 ${
                  currentView === 'landing'
                    ? 'bg-white/20 text-white shadow-sm'
                    : 'text-stone-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <Home className="w-3.5 h-3.5" />
                <span>Giới Thiệu VPH</span>
              </button> */}
            </div>

            {/* MongoDB & Auth Pill */}
            {/* <div className="flex items-center gap-3">
              {currentView === 'admin' && isAuthenticated ? (
                <div className="flex items-center gap-2">
                  <span className="hidden sm:inline-block text-xs text-stone-200 bg-white/10 px-2.5 py-1 rounded-lg">
                    Admin: <strong>admin</strong>
                  </span>
                  <button
                    onClick={handleLogout}
                    title="Đăng xuất"
                    className="p-1.5 rounded-lg bg-rose-500/20 hover:bg-rose-500/40 text-rose-200 text-xs font-bold transition cursor-pointer flex items-center gap-1"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Đăng xuất</span>
                  </button>
                </div>
              ) : (
                <div
                  onClick={() => navigateToView('admin')}
                  title="Trạng thái kết nối cơ sở dữ liệu MongoDB"
                  className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-xs cursor-pointer hover:bg-white/20 transition"
                >
                  <span className={`w-2 h-2 rounded-full ${dbStatus?.dbConnected ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'
                    }`} />
                  <span className="text-[11px] font-medium text-stone-200">
                    {dbStatus?.dbConnected ? 'MongoDB Đã Kết Nối' : 'Chờ Link MongoDB'}
                  </span>
                </div>
              )}

              <button
                onClick={() => handleOpenConsultation('Tư vấn giải pháp truy xuất nguồn gốc tem QR')}
                className="hidden lg:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#DFCA9B] hover:bg-[#ebd9ad] text-[#174C3C] text-xs font-bold shadow transition cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Cấp Mã QR</span>
              </button>
            </div> */}

          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1">
        {currentView === 'traceability' && (
          <ProductTraceabilityPage
            selectedProductId={selectedProductId}
            onBackToHome={() => navigateToView('landing')}
            onNavigateToAdmin={() => navigateToView('admin')}
            onOpenConsultation={(srv) => handleOpenConsultation(srv)}
          />
        )}

        {currentView === 'admin' && (
          isAuthenticated ? (
            <AdminProductManager
              onViewProduct={handleViewProduct}
              onBackToTraceability={() => navigateToView('traceability')}
              onLogout={handleLogout}
            />
          ) : (
            <AdminLogin
              onLoginSuccess={() => setIsAuthenticated(true)}
              onBackToTraceability={() => navigateToView('traceability')}
            />
          )
        )}

        {currentView === 'landing' && (
          <div>
            <div className="bg-[#174C3C]/5 py-3 px-4 border-b border-stone-200 flex items-center justify-between max-w-7xl mx-auto">
              <span className="text-xs text-stone-600 font-medium">
                Đang xem trang giới thiệu công ty Vạn Phúc Hoa
              </span>
              <button
                onClick={() => navigateToView('traceability')}
                className="text-xs font-bold text-[#174C3C] hover:underline cursor-pointer"
              >
                &larr; Quay lại Cổng Truy Xuất Sản Phẩm
              </button>
            </div>
            <Hero
              onExploreServices={() => { }}
              onOpenConsultation={() => handleOpenConsultation()}
            />
            <About onOpenConsultation={() => handleOpenConsultation()} />
            <Services onOpenConsultation={(srv) => handleOpenConsultation(srv)} />
            <Projects onOpenConsultation={(srv) => handleOpenConsultation(srv)} />
            <Process onOpenConsultation={() => handleOpenConsultation()} />
            <WhyChooseUs onOpenConsultation={() => handleOpenConsultation()} />
            <Knowledge onOpenConsultation={(srv) => handleOpenConsultation(srv)} />
            <FAQSection onOpenConsultation={() => handleOpenConsultation()} />
            <ContactSection />
            <Footer
              onNavigate={(id) => {
                if (id === 'traceability') navigateToView('traceability');
              }}
              onOpenConsultation={() => handleOpenConsultation()}
            />
          </div>
        )}
      </main>

      {/* Global Interactive Consultation Modal */}
      <ConsultationModal
        isOpen={consultationModalOpen}
        onClose={() => setConsultationModalOpen(false)}
        initialService={initialConsultationService}
      />

      {/* Floating Quick Contact Widget */}
      <QuickContactWidget
        onOpenConsultation={() => handleOpenConsultation()}
      />

    </div>
  );
}
