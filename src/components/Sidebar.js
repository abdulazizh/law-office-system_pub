import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Sidebar = () => {
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
    <div className="bg-white h-screen w-64 fixed right-0 top-0 shadow-lg p-4">
      <div className="mb-8 text-center">
        <h1 className="text-xl font-bold text-gray-800">نظام المحاماة</h1>
      </div>
      <nav className="space-y-2">
        {menuItems.map((item, index) => (
          <button
            key={index}
            onClick={() => navigate(item.path)}
            className={`w-full flex items-center space-x-3 space-x-reverse p-3 rounded-lg transition duration-200 
              ${location.pathname === item.path ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
          >
            <span>{item.icon}</span>
            <span>{item.title}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;