import React, { useState, useEffect } from 'react';
import {
  QrCode,
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import ProductTraceabilityPage from './components/ProductTraceabilityPage';
import AdminProductManager from './components/AdminProductManager';
import AdminLogin from './components/AdminLogin';
import QrRegistrationModal from './components/QrRegistrationModal';
import DNTraceLogo from './components/DNTraceLogo';
import DNTraceFooter from './components/DNTraceFooter';
import { fetchApiStatus, isUserLoggedIn, clearLoginSession } from './services/api';

export default function App() {
  // Determine initial view from browser URL
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
  const [qrRegistrationOpen, setQrRegistrationOpen] = useState(false);
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

  // Check MongoDB connection status
  useEffect(() => {
    fetchApiStatus().then(status => setDbStatus(status));
  }, [currentView, isAuthenticated]);

  const handleViewProduct = (productId) => {
    setSelectedProductId(productId);
    navigateToView('traceability');
  };

  const handleLogout = () => {
    clearLoginSession();
    setIsAuthenticated(false);
  };

  return (
    <div className="min-h-screen bg-[#F8F7F3] text-[#19241F] flex flex-col selection:bg-[#84CC16]/30 selection:text-[#0f2d22]">

      {/* Top Application Header - ONLY shown on Traceability page (NO duplicate header in /admin) */}
      {currentView === 'traceability' && (
        <header className="sticky top-0 z-40 bg-[#0f2d22] text-white shadow-md border-b border-[#1C4638]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16 sm:h-18">

              {/* Brand Logo & Name */}
              <div
                onClick={() => navigateToView('traceability')}
                className="flex items-center gap-3 cursor-pointer select-none"
              >
                <DNTraceLogo className="h-10 sm:h-9" isWhite={true} />

              </div>

              {/* Navigation Actions (NO Quản trị /admin in public header) */}
              <div className="flex items-center gap-2 sm:gap-3">

                {/* Trang Truy Xuất indicator */}
                <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 text-stone-200 text-xs font-bold border border-white/10">
                  <QrCode className="w-3.5 h-3.5 text-[#84CC16]" />
                  <span>Trang Truy Xuất</span>
                </div>

                {/* Đăng ký cấp mã QR CTA */}
                <button
                  onClick={() => setQrRegistrationOpen(true)}
                  className="px-3.5 py-2 sm:px-5 sm:py-2.5 rounded-xl bg-[#84CC16] hover:bg-[#74B843] text-[#0f2d22] text-xs font-black shadow-md transition-all cursor-pointer flex items-center gap-2"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#0f2d22]" />
                  <span>Đăng Ký Cấp Mã QR</span>
                </button>

              </div>

            </div>
          </div>
        </header>
      )}

      {/* Main View Area */}
      <main className="flex-1 flex flex-col">
        {currentView === 'traceability' && (
          <>
            <ProductTraceabilityPage
              selectedProductId={selectedProductId}
              onOpenQrRegister={() => setQrRegistrationOpen(true)}
              onNavigateToAdmin={() => navigateToView('admin')}
            />
            {/* Footer with dntrace.com branding */}
            <DNTraceFooter
              onOpenQrRegister={() => setQrRegistrationOpen(true)}
              onNavigateToAdmin={() => navigateToView('admin')}
            />
          </>
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
      </main>

      {/* Modal: Đăng Ký Cấp Mã QR */}
      <QrRegistrationModal
        isOpen={qrRegistrationOpen}
        onClose={() => setQrRegistrationOpen(false)}
      />

    </div>
  );
}
