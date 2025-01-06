// src/pages/Cases.js
import React from 'react';
import Layout from '../components/Layout';

const Cases = () => {
  const [cases, setCases] = React.useState([
    {
      id: 1,
      caseNumber: "2024/123",
      title: "قضية تجارية",
      clientName: "أحمد محمد",
      courtName: "المحكمة التجارية",
      status: "ongoing",
      startDate: "2024-01-15",
      nextSession: "2024-02-20",
      type: "تجاري",
      description: "نزاع تجاري بين شركتين",
      opponent: "شركة النور للتجارة"
    },
    {
      id: 2,
      caseNumber: "2024/124",
      title: "قضية مدنية",
      clientName: "محمد علي",
      courtName: "المحكمة المدنية",
      status: "pending",
      startDate: "2024-01-10",
      nextSession: "2024-02-25",
      type: "مدني",
      description: "نزاع على ملكية عقار",
      opponent: "خالد أحمد"
    }
  ]);

  const [showAddCase, setShowAddCase] = React.useState(false);
  const [showCaseDetails, setShowCaseDetails] = React.useState(false);
  const [selectedCase, setSelectedCase] = React.useState(null);
  const [filterStatus, setFilterStatus] = React.useState('all');

  // Add Case Form Component
  const AddCaseForm = () => {
    const [newCase, setNewCase] = React.useState({
      caseNumber: "",
      title: "",
      clientName: "",
      courtName: "",
      status: "pending",
      startDate: "",
      nextSession: "",
      type: "",
      description: "",
      opponent: ""
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      setCases([...cases, {
        id: cases.length + 1,
        ...newCase
      }]);
      setShowAddCase(false);
    };
    
    return (
      <Layout>
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-2xl">
            <h3 className="text-xl font-bold mb-4">إضافة قضية جديدة</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1">رقم القضية</label>
                  <input
                    type="text"
                    className="w-full border rounded p-2"
                    value={newCase.caseNumber}
                    onChange={(e) => setNewCase({...newCase, caseNumber: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <label className="block mb-1">عنوان القضية</label>
                  <input
                    type="text"
                    className="w-full border rounded p-2"
                    value={newCase.title}
                    onChange={(e) => setNewCase({...newCase, title: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <label className="block mb-1">اسم العميل</label>
                  <input
                    type="text"
                    className="w-full border rounded p-2"
                    value={newCase.clientName}
                    onChange={(e) => setNewCase({...newCase, clientName: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <label className="block mb-1">المحكمة</label>
                  <input
                    type="text"
                    className="w-full border rounded p-2"
                    value={newCase.courtName}
                    onChange={(e) => setNewCase({...newCase, courtName: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <label className="block mb-1">تاريخ البدء</label>
                  <input
                    type="date"
                    className="w-full border rounded p-2"
                    value={newCase.startDate}
                    onChange={(e) => setNewCase({...newCase, startDate: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <label className="block mb-1">الجلسة القادمة</label>
                  <input
                    type="date"
                    className="w-full border rounded p-2"
                    value={newCase.nextSession}
                    onChange={(e) => setNewCase({...newCase, nextSession: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block mb-1">نوع القضية</label>
                  <input
                    type="text"
                    className="w-full border rounded p-2"
                    value={newCase.type}
                    onChange={(e) => setNewCase({...newCase, type: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <label className="block mb-1">الخصم</label>
                  <input
                    type="text"
                    className="w-full border rounded p-2"
                    value={newCase.opponent}
                    onChange={(e) => setNewCase({...newCase, opponent: e.target.value})}
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block mb-1">وصف القضية</label>
                <textarea
                  className="w-full border rounded p-2"
                  rows="3"
                  value={newCase.description}
                  onChange={(e) => setNewCase({...newCase, description: e.target.value})}
                  required
                ></textarea>
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddCase(false)}
                  className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  إضافة
                </button>
              </div>
            </form>
          </div>
        </div>
      </Layout>
    );
  };

  // Case Details Modal
  const CaseDetailsModal = ({ caseData }) => {
    return (
      <Layout>
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-2xl">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold">تفاصيل القضية</h3>
              <button
                onClick={() => setShowCaseDetails(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="font-bold mb-1">رقم القضية</p>
                <p>{caseData.caseNumber}</p>
              </div>
              <div>
                <p className="font-bold mb-1">عنوان القضية</p>
                <p>{caseData.title}</p>
              </div>
              <div>
                <p className="font-bold mb-1">اسم العميل</p>
                <p>{caseData.clientName}</p>
              </div>
              <div>
                <p className="font-bold mb-1">المحكمة</p>
                <p>{caseData.courtName}</p>
              </div>
              <div>
                <p className="font-bold mb-1">تاريخ البدء</p>
                <p>{caseData.startDate}</p>
              </div>
              <div>
                <p className="font-bold mb-1">الجلسة القادمة</p>
                <p>{caseData.nextSession}</p>
              </div>
              <div>
                <p className="font-bold mb-1">نوع القضية</p>
                <p>{caseData.type}</p>
              </div>
              <div>
                <p className="font-bold mb-1">الخصم</p>
                <p>{caseData.opponent}</p>
              </div>
            </div>
            <div>
              <p className="font-bold mb-1">وصف القضية</p>
              <p className="bg-gray-50 p-3 rounded">{caseData.description}</p>
            </div>
          </div>
        </div>
      </Layout>
    );
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-100" dir="rtl">
        <div className="p-8">
          <div className="bg-gradient-to-l from-blue-600 to-blue-800 text-white p-6 rounded-lg shadow-lg mb-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold mb-2">إدارة القضايا</h2>
                <p className="text-blue-100">متابعة وإدارة القضايا والجلسات</p>
              </div>
              <button
                onClick={() => setShowAddCase(true)}
                className="bg-white text-blue-600 px-6 py-2 rounded-lg hover:bg-blue-50 transition duration-200"
              >
                إضافة قضية جديدة
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <div className="flex gap-2 items-center">
                <span>تصفية حسب الحالة:</span>
                <select
                  className="border rounded p-2"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value="all">الكل</option>
                  <option value="ongoing">جارية</option>
                  <option value="pending">معلقة</option>
                  <option value="completed">مكتملة</option>
                </select>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border p-2 text-right">رقم القضية</th>
                    <th className="border p-2 text-right">العنوان</th>
                    <th className="border p-2 text-right">العميل</th>
                    <th className="border p-2 text-right">المحكمة</th>
                    <th className="border p-2 text-right">الحالة</th>
                    <th className="border p-2 text-right">الجلسة القادمة</th>
                    <th className="border p-2 text-right">الإجراءات</th>
                  </tr>
                </thead>
                <tbody>
                  {cases
                    .filter(caseItem => filterStatus === 'all' || caseItem.status === filterStatus)
                    .map(caseItem => (
                      <tr key={caseItem.id} className="hover:bg-gray-50">
                        <td className="border p-2">{caseItem.caseNumber}</td>
                        <td className="border p-2">{caseItem.title}</td>
                        <td className="border p-2">{caseItem.clientName}</td>
                        <td className="border p-2">{caseItem.courtName}</td>
                        <td className="border p-2">
                          <span className={`px-2 py-1 rounded-full text-sm ${
                            caseItem.status === 'ongoing' ? 'bg-blue-100 text-blue-800' :
                            caseItem.status === 'completed' ? 'bg-green-100 text-green-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {caseItem.status === 'ongoing' ? 'جارية' :
                            caseItem.status === 'completed' ? 'مكتملة' :
                            'معلقة'}
                          </span>
                        </td>
                        <td className="border p-2">{caseItem.nextSession}</td>
                        <td className="border p-2">
                          <button
                            onClick={() => {
                              setSelectedCase(caseItem);
                              setShowCaseDetails(true);
                            }}
                            className="text-blue-600 hover:underline"
                          >
                            عرض التفاصيل
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {showAddCase && <AddCaseForm />}
        {showCaseDetails && <CaseDetailsModal caseData={selectedCase} />}
      </div>
    </Layout>
  );
};

export default Cases;