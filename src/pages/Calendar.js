import React, { useState } from 'react';
import Layout from '../components/Layout';

const Calendar = () => {
  // State management
  const [currentDate, setCurrentDate] = useState(new Date());
  const [language, setLanguage] = useState('ar');
  const [filterType, setFilterType] = useState('all');
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'جلسة قضية رقم 123', date: '2024-02-20', type: 'court' },
    { id: 2, title: 'موعد استئناف', date: '2024-02-21', type: 'appeal' }
  ]);
  const [newEvent, setNewEvent] = useState({
    title: '',
    date: '',
    type: 'court',
    description: ''
  });
  
  const [events, setEvents] = useState([
    { id: 1, title: "جلسة قضائية", date: "2024/02/20", type: "court", description: "قضية رقم 123" },
    { id: 2, title: "استئناف", date: "2024/02/21", type: "appeal", description: "ملف 456" },
    { id: 3, title: "استشارة", date: "2024/02/22", type: "consultation", description: "عميل: محمد" }
  ]);

  // Helper functions
  const monthNames = {
    ar: ['يناير', 'فبراير', 'مارس', 'إبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'],
    en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  };

  const weekDays = {
    ar: ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'],
    en: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  };

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const days = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();
    
    let daysArray = [];
    for (let i = 0; i < firstDay; i++) {
      daysArray.push(null);
    }
    for (let i = 1; i <= days; i++) {
      daysArray.push(new Date(year, month, i));
    }
    return daysArray;
  };

  // Event handlers
  const handleAddEvent = (e) => {
    e.preventDefault();
    setEvents([...events, { 
      id: events.length + 1, 
      title: e.target.title.value,
      date: e.target.date.value,
      type: e.target.type.value,
      description: e.target.description.value
    }]);
    setShowEventModal(false);
  };

  const exportEvents = () => {
    const eventsText = events
      .map(e => `${e.date} - ${e.title} - ${e.description}`)
      .join('\n');
    
    const blob = new Blob([eventsText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'events.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-100 p-4 md:p-8" dir={language === 'ar' ? 'rtl' : 'ltr'}>
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-gray-800">التقويم والجلسات</h1>
              <div className="flex gap-2">
                <button 
                  onClick={() => setShowEventModal(true)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                >
                  إضافة جلسة جديدة
                </button>
                <button
                  onClick={exportEvents}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                >
                  تصدير المواعيد
                </button>
              </div>
            </div>

            {/* Calendar Grid */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">
                  {currentDate.toLocaleString('ar-SA', { month: 'long', year: 'numeric' })}
                </h2>
                <div className="flex gap-2">
                  <button onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)))}
                    className="p-2 rounded-lg hover:bg-gray-100"
                  >
                    ←
                  </button>
                  <button onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)))}
                    className="p-2 rounded-lg hover:bg-gray-100"
                  >
                    →
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-7 gap-2 mb-2">
                {['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'].map(day => (
                  <div key={day} className="text-center font-semibold text-gray-600 p-2">
                    {day}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-2">
                {getDaysInMonth(currentDate).map((date, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      setSelectedDate(date);
                      if (date) {
                        setNewEvent(prev => ({ 
                          ...prev, 
                          date: date.toISOString().split('T')[0] 
                        }));
                      }
                    }}
                    className={`
                      p-2 text-center rounded-lg
                      ${date ? 'hover:bg-gray-50 cursor-pointer' : ''}
                      ${date && date.toDateString() === new Date().toDateString() ? 'bg-blue-50 font-bold' : ''}
                    `}
                  >
                    {date && (
                      <>
                        <span>{date.getDate()}</span>
                        {events.some(event => event.date === date.toISOString().split('T')[0]) && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full mx-auto mt-1"></div>
                        )}
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Notifications */}
            <div className="bg-white rounded-lg shadow">
              <div className="p-4 border-b">
                <h3 className="text-lg font-semibold">التنبيهات والمواعيد القادمة</h3>
              </div>
              <div className="p-4">
                {notifications.length > 0 ? (
                  <div className="space-y-4">
                    {notifications.map(notification => (
                      <div key={notification.id} 
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                      >
                        <div>
                          <h4 className="font-semibold">{notification.title}</h4>
                          <p className="text-sm text-gray-600">
                            {notification.date} - {notification.time}
                          </p>
                        </div>
                        <span className={`
                          px-3 py-1 rounded-full text-sm
                          ${notification.type === 'مهم' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'}
                        `}>
                          {notification.type}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">لا توجد تنبيهات حالياً</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Event Modal */}
      {showEventModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">إضافة جلسة جديدة</h2>
            <form onSubmit={handleAddEvent}>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="عنوان الجلسة"
                  className="w-full p-2 border rounded"
                  value={newEvent.title}
                  onChange={e => setNewEvent({...newEvent, title: e.target.value})}
                />
                <input
                  type="date"
                  className="w-full p-2 border rounded"
                  value={newEvent.date}
                  onChange={e => setNewEvent({...newEvent, date: e.target.value})}
                />
                <input
                  type="time"
                  className="w-full p-2 border rounded"
                  value={newEvent.time}
                  onChange={e => setNewEvent({...newEvent, time: e.target.value})}
                />
                <select
                  className="w-full p-2 border rounded"
                  value={newEvent.type}
                  onChange={e => setNewEvent({...newEvent, type: e.target.value})}
                >
                  <option value="جلسة">جلسة</option>
                  <option value="اجتماع">اجتماع</option>
                </select>
                <textarea
                  placeholder="تفاصيل إضافية"
                  className="w-full p-2 border rounded"
                  value={newEvent.details}
                  onChange={e => setNewEvent({...newEvent, details: e.target.value})}
                />
              </div>
              <div className="mt-6 flex justify-end space-x-reverse space-x-2">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  حفظ
                </button>
                <button
                  type="button"
                  onClick={() => setShowEventModal(false)}
                  className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300"
                >
                  إلغاء
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Calendar;