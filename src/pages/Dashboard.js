import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';

const Dashboard = () => {
  const navigate = useNavigate();
  const [currentMonth] = React.useState(new Date().toLocaleString('ar-SA', { month: 'long' }));
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const stats = [
    { title: "القضايا النشطة", value: "25", icon: "⚖️", color: "blue" },
    { title: "العملاء", value: "150", icon: "👥", color: "green" },
    { title: "المدفوعات المعلقة", value: "12", icon: "💰", color: "yellow" },
    { title: "جلسات اليوم", value: "8", icon: "📅", color: "purple" },
    { title: "إيرادات الشهر", value: "50,000 ريال", icon: "📈", color: "red" }
  ];

  const recentCases = [
    { id: 1, title: "قضية تجارية", client: "شركة الأمل", date: "2024/01/05", status: "جارية" },
    { id: 2, title: "نزاع عقاري", client: "أحمد محمد", date: "2024/01/04", status: "معلقة" },
    { id: 3, title: "قضية مدنية", client: "سارة خالد", date: "2024/01/03", status: "مكتملة" }
  ];

  const upcomingEvents = [
    { id: 1, title: "جلسة محكمة", time: "09:00", type: "جلسة" },
    { id: 2, title: "استشارة قانونية", time: "11:30", type: "استشارة" },
    { id: 3, title: "اجتماع عميل", time: "14:00", type: "اجتماع" }
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 p-4 md:p-8" dir="rtl">
        <div className="max-w-7xl mx-auto">
          {/* Mobile Menu Button */}
          <div className="md:hidden mb-4">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-500 hover:text-gray-600"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>

          {/* Header - Mobile Responsive */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 md:mb-8">
            <div className="mb-4 md:mb-0">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">لوحة التحكم</h1>
              <p className="text-sm md:text-base text-gray-600">مرحباً بك في نظام إدارة مكتب المحاماة</p>
            </div>
            <button onClick={() => navigate('/')} className="w-full md:w-auto bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">
              تسجيل الخروج
            </button>
          </div>

          {/* Stats Grid - Mobile Responsive */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 mb-4 md:mb-8">
            {stats.map((stat, index) => (
              <div key={index} className={`bg-${stat.color}-50 p-4 md:p-6 rounded-xl shadow-sm hover:shadow-md`}>
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-xs md:text-sm text-gray-600 mb-1">{stat.title}</p>
                    <p className="text-xl md:text-2xl font-bold text-gray-800">{stat.value}</p>
                  </div>
                  <span className="text-xl md:text-2xl">{stat.icon}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Main Content - Mobile Responsive */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-sm p-4 md:p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">القضايا الحديثة</h2>
                <div className="space-y-4">
                  {recentCases.map(caseItem => (
                    <div key={caseItem.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h3 className="font-semibold text-gray-800">{caseItem.title}</h3>
                        <p className="text-sm text-gray-600">{caseItem.client}</p>
                      </div>
                      <div className="text-left">
                        <p className="text-sm text-gray-600">{caseItem.date}</p>
                        <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                          caseItem.status === 'جارية' ? 'bg-blue-100 text-blue-800' :
                          caseItem.status === 'معلقة' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {caseItem.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-4 md:p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">جدول اليوم</h2>
              <div className="space-y-4">
                {upcomingEvents.map(event => (
                  <div key={event.id} className="flex items-center space-x-4 space-x-reverse p-4 bg-gray-50 rounded-lg">
                    <div className={`w-2 h-2 rounded-full ${
                      event.type === 'جلسة' ? 'bg-blue-500' :
                      event.type === 'استشارة' ? 'bg-green-500' :
                      'bg-purple-500'
                    }`} />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800">{event.title}</h3>
                      <p className="text-sm text-gray-600">{event.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;