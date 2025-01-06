import React, { useState } from 'react';
import Layout from '../components/Layout';

const Clients = () => {
  // State initialization
  const [clients, setClients] = useState([
    { id: 1, name: "أحمد محمد", phone: "0501234567", email: "ahmed@example.com", type: "مدعي", cases: 3, status: "نشط" },
    { id: 2, name: "شركة الأمل", phone: "0502345678", email: "info@alamal.com", type: "مدعى عليه", cases: 1, status: "نشط" },
    { id: 3, name: "سارة خالد", phone: "0503456789", email: "sara@example.com", type: "مدعي", cases: 2, status: "غير نشط" }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("الكل");
  const [selectedClient, setSelectedClient] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newClient, setNewClient] = useState({
    name: "",
    phone: "",
    email: "",
    type: "مدعي",
    status: "نشط"
  });
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingClient, setEditingClient] = useState(null);

  // Handlers
  const handleAddClient = () => {
    if (!newClient.name || !newClient.phone || !newClient.email) {
      alert("الرجاء إكمال البيانات المطلوبة");
      return;
    }
    setClients([...clients, { id: clients.length + 1, ...newClient, cases: 0 }]);
    setShowAddModal(false);
    setNewClient({ name: "", phone: "", email: "", type: "مدعي", status: "نشط" });
  };

  const handleDeleteClient = (id) => {
    if (window.confirm("هل أنت متأكد من حذف العميل؟")) {
      setClients(clients.filter(client => client.id !== id));
    }
  };

  const handleViewClient = (client) => {
    setSelectedClient(client);
  };

  const handleEditClient = (client) => {
    setEditingClient(client);
    setShowEditModal(true);
  };

  const handleUpdateClient = () => {
    if (!editingClient.name || !editingClient.phone || !editingClient.email) {
      alert("الرجاء إكمال البيانات المطلوبة");
      return;
    }
    setClients(clients.map(client => 
      client.id === editingClient.id ? editingClient : client
    ));
    setShowEditModal(false);
    setEditingClient(null);
  };

  // Filter functionality
  const filteredClients = clients.filter(client => {
    const matchesSearch = client.name.includes(searchTerm) || 
                         client.phone.includes(searchTerm) || 
                         client.email.includes(searchTerm);
    const matchesType = filterType === "الكل" || client.type === filterType;
    return matchesSearch && matchesType;
  });

  // Edit Modal Component
  const EditClientModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">تعديل بيانات العميل</h2>
          <button onClick={() => setShowEditModal(false)} className="text-gray-500">✕</button>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block mb-1">الاسم</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={editingClient.name}
              onChange={e => setEditingClient({...editingClient, name: e.target.value})}
            />
          </div>
          <div>
            <label className="block mb-1">رقم الهاتف</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={editingClient.phone}
              onChange={e => setEditingClient({...editingClient, phone: e.target.value})}
            />
          </div>
          <div>
            <label className="block mb-1">البريد الإلكتروني</label>
            <input
              type="email"
              className="w-full p-2 border rounded"
              value={editingClient.email}
              onChange={e => setEditingClient({...editingClient, email: e.target.value})}
            />
          </div>
          <div>
            <label className="block mb-1">النوع</label>
            <select
              className="w-full p-2 border rounded"
              value={editingClient.type}
              onChange={e => setEditingClient({...editingClient, type: e.target.value})}
            >
              <option value="مدعي">مدعي</option>
              <option value="مدعى عليه">مدعى عليه</option>
            </select>
          </div>
          <div className="flex justify-end gap-2 mt-6">
            <button
              onClick={() => setShowEditModal(false)}
              className="px-4 py-2 bg-gray-200 rounded"
            >
              إلغاء
            </button>
            <button
              onClick={handleUpdateClient}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              حفظ التغييرات
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Layout>
      <div className="min-h-screen bg-gray-100 p-4 md:p-8" dir="rtl">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">إدارة العملاء</h1>
            <button 
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              onClick={() => setShowAddModal(true)}
            >
              إضافة عميل جديد
            </button>
          </div>

          {/* Search & Filters */}
          <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="text"
                placeholder="بحث بالاسم، رقم الهاتف، أو البريد الإلكتروني"
                className="flex-1 p-2 border rounded-lg"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <select
                className="p-2 border rounded-lg"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
              >
                <option value="الكل">جميع العملاء</option>
                <option value="مدعي">مدعي</option>
                <option value="مدعى عليه">مدعى عليه</option>
              </select>
            </div>
          </div>

          {/* Clients Table */}
          <div className="bg-white rounded-lg shadow-sm overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-right">الاسم</th>
                  <th className="px-6 py-3 text-right">رقم الهاتف</th>
                  <th className="px-6 py-3 text-right">البريد الإلكتروني</th>
                  <th className="px-6 py-3 text-right">النوع</th>
                  <th className="px-6 py-3 text-right">القضايا</th>
                  <th className="px-6 py-3 text-right">الحالة</th>
                  <th className="px-6 py-3 text-right">إجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredClients.map(client => (
                  <tr key={client.id}>
                    <td className="px-6 py-4">{client.name}</td>
                    <td className="px-6 py-4">{client.phone}</td>
                    <td className="px-6 py-4">{client.email}</td>
                    <td className="px-6 py-4">{client.type}</td>
                    <td className="px-6 py-4">{client.cases}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs
                        ${client.status === 'نشط' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}
                      `}>
                        {client.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button 
                          onClick={() => handleViewClient(client)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          عرض
                        </button>
                        <button 
                          onClick={() => handleEditClient(client)}
                          className="text-green-600 hover:text-green-900"
                        >
                          تعديل
                        </button>
                        <button 
                          onClick={() => handleDeleteClient(client.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          حذف
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Client Details Modal */}
          {selectedClient && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-6 max-w-2xl w-full m-4">
                {/* Modal content */}
              </div>
            </div>
          )}

          {/* Add Client Modal */}
          {showAddModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-6 max-w-2xl w-full m-4">
                <h2 className="text-xl font-bold mb-4">إضافة عميل جديد</h2>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">الاسم</label>
                  <input
                    type="text"
                    className="mt-1 p-2 border rounded-lg w-full"
                    value={newClient.name}
                    onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">رقم الهاتف</label>
                  <input
                    type="text"
                    className="mt-1 p-2 border rounded-lg w-full"
                    value={newClient.phone}
                    onChange={(e) => setNewClient({ ...newClient, phone: e.target.value })}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">البريد الإلكتروني</label>
                  <input
                    type="email"
                    className="mt-1 p-2 border rounded-lg w-full"
                    value={newClient.email}
                    onChange={(e) => setNewClient({ ...newClient, email: e.target.value })}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">النوع</label>
                  <select
                    className="mt-1 p-2 border rounded-lg w-full"
                    value={newClient.type}
                    onChange={(e) => setNewClient({ ...newClient, type: e.target.value })}
                  >
                    <option value="مدعي">مدعي</option>
                    <option value="مدعى عليه">مدعى عليه</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">الحالة</label>
                  <select
                    className="mt-1 p-2 border rounded-lg w-full"
                    value={newClient.status}
                    onChange={(e) => setNewClient({ ...newClient, status: e.target.value })}
                  >
                    <option value="نشط">نشط</option>
                    <option value="غير نشط">غير نشط</option>
                  </select>
                </div>
                <div className="flex justify-end gap-4">
                  <button
                    className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
                    onClick={() => setShowAddModal(false)}
                  >
                    إلغاء
                  </button>
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                    onClick={handleAddClient}
                  >
                    إضافة
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Edit Client Modal */}
          {showEditModal && <EditClientModal />}
        </div>
      </div>
    </Layout>
  );
};

export default Clients;