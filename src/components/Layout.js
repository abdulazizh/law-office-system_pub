import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Layout = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { title: "لوحة التحكم", icon: "📊", path: "/dashboard" },
    { title: "القضايا", icon: "⚖️", path: "/cases" },
    { title: "العملاء", icon: "👥", path: "/clients" },
    { title: "المدفوعات", icon: "💰", path: "/payments" },
    { title: "التقويم", icon: "📅", path: "/calendar" }
  ];

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Mobile Menu Button */}
      <div className="md:hidden fixed top-4 right-4 z-50">
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="bg-white p-3 rounded-lg shadow-lg hover:bg-gray-50"
        >
          <svg 
            className="w-6 h-6" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>
      </div>

      {/* Sidebar */}
      <aside 
        className={`
          fixed top-0 right-0 h-full w-72 bg-white shadow-xl z-40
          transform transition-transform duration-300 ease-in-out
          ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full md:translate-x-0'}
        `}
      >
        <div className="flex flex-col h-full p-6">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-800 text-center">نظام المحاماة</h1>
          </div>

          <nav className="flex-1 space-y-3">
            {menuItems.map((item, index) => (
              <button
                key={index}
                onClick={() => {
                  navigate(item.path);
                  setIsMobileMenuOpen(false);
                }}
                className={`
                  w-full flex items-center gap-4 p-4 rounded-xl text-right
                  transition duration-200 text-gray-600 hover:text-gray-900
                  ${location.pathname === item.path 
                    ? 'bg-gray-100 text-gray-900 font-medium shadow-sm' 
                    : 'hover:bg-gray-50'}
                `}
              >
                <span className="text-xl">{item.icon}</span>
                <span className="text-lg">{item.title}</span>
              </button>
            ))}
          </nav>

          <button 
            onClick={() => navigate('/login')}
            className="mt-auto w-full bg-red-500 text-white p-4 rounded-xl hover:bg-red-600 transition duration-200"
          >
            تسجيل الخروج
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`transition-all duration-300 md:mr-72 p-4 md:p-8`}>
        {children}
      </main>

      {/* Mobile Backdrop */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </div>
  );
};

export default Layout;