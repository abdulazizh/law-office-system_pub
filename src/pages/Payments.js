import React, { useState } from 'react';
import Layout from '../components/Layout';

import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { saveAs } from 'file-saver';

const Payments = () => {
  const [showAddPayment, setShowAddPayment] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');
  
  const [payments, setPayments] = useState([
    { 
      id: 1, 
      caseNumber: '123',
      clientName: 'أحمد علي',
      amount: 5000,
      date: '2025-01-05',
      status: 'completed',
      type: 'case',
      description: 'دفعة أولى - قضية تجارية'
    },
    { 
      id: 2, 
      caseNumber: '124',
      clientName: 'محمد خالد',
      amount: 3000,
      date: '2025-01-10',
      status: 'pending',
      type: 'consultation',
      description: 'استشارة قانونية'
    }
  ]);

  // Add Payment Form Component
  const AddPaymentForm = () => {
    const [newPayment, setNewPayment] = useState({
      caseNumber: '',
      clientName: '',
      amount: '',
      date: '',
      status: 'pending',
      type: 'case',
      description: ''
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      setPayments([...payments, {
        id: payments.length + 1,
        ...newPayment,
        amount: parseFloat(newPayment.amount)
      }]);
      setShowAddPayment(false);
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg w-96">
          <h3 className="text-xl font-bold mb-4">إضافة دفعة جديدة</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-1">رقم القضية</label>
              <input
                type="text"
                className="w-full border rounded p-2"
                value={newPayment.caseNumber}
                onChange={(e) => setNewPayment({...newPayment, caseNumber: e.target.value})}
              />
            </div>
            <div>
              <label className="block mb-1">اسم العميل</label>
              <input
                type="text"
                className="w-full border rounded p-2"
                value={newPayment.clientName}
                onChange={(e) => setNewPayment({...newPayment, clientName: e.target.value})}
                required
              />
            </div>
            <div>
              <label className="block mb-1">المبلغ</label>
              <input
                type="number"
                className="w-full border rounded p-2"
                value={newPayment.amount}
                onChange={(e) => setNewPayment({...newPayment, amount: e.target.value})}
                required
              />
            </div>
            <div>
              <label className="block mb-1">التاريخ</label>
              <input
                type="date"
                className="w-full border rounded p-2"
                value={newPayment.date}
                onChange={(e) => setNewPayment({...newPayment, date: e.target.value})}
                required
              />
            </div>
            <div>
              <label className="block mb-1">النوع</label>
              <select
                className="w-full border rounded p-2"
                value={newPayment.type}
                onChange={(e) => setNewPayment({...newPayment, type: e.target.value})}
              >
                <option value="case">قضية</option>
                <option value="consultation">استشارة</option>
                <option value="other">أخرى</option>
              </select>
            </div>
            <div>
              <label className="block mb-1">الوصف</label>
              <textarea
                className="w-full border rounded p-2"
                value={newPayment.description}
                onChange={(e) => setNewPayment({...newPayment, description: e.target.value})}
                rows="3"
              ></textarea>
            </div>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowAddPayment(false)}
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
    );
  };

// Update the PDF export function
const exportToPDF = async (payments) => {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([595.28, 841.89]); // A4 size
  const { height, width } = page.getSize();
  
  // Add title
  page.drawText('سجل المدفوعات', {
    x: 450,
    y: height - 50,
    size: 20
  });

  // Add table headers
  const headers = ['التاريخ', 'العميل', 'رقم القضية', 'المبلغ', 'الحالة'];
  headers.forEach((header, index) => {
    page.drawText(header, {
      x: 500 - (index * 100),
      y: height - 100,
      size: 12
    });
  });

  // Add payment data
  let yOffset = height - 130;
  payments.forEach((payment) => {
    const paymentData = [
      payment.date,
      payment.clientName,
      payment.caseNumber,
      `${payment.amount} ريال`,
      payment.status === 'completed' ? 'مكتمل' : 'معلق'
    ];

    paymentData.forEach((data, index) => {
      page.drawText(data.toString(), {
        x: 500 - (index * 100),
        y: yOffset,
        size: 10
      });
    });

    yOffset -= 30;
  });

  const pdfBytes = await pdfDoc.save();
  const blob = new Blob([pdfBytes], { type: 'application/pdf' });
  saveAs(blob, 'payments-report.pdf');
};

// Payment Receipt Component
  const PaymentReceipt = ({ payment }) => {
    const printReceipt = () => {
      const receiptWindow = window.open('', '_blank');
      receiptWindow.document.write(`
        <html dir="rtl">
          <head>
            <title>إيصال دفع</title>
            <style>
              body { font-family: Arial, sans-serif; padding: 20px; }
              .receipt { border: 1px solid #000; padding: 20px; }
              .header { text-align: center; margin-bottom: 20px; }
              .details { margin-bottom: 20px; }
              .footer { margin-top: 40px; text-align: center; }
            </style>
          </head>
          <body>
            <div class="receipt">
              <div class="header">
                <h2>إيصال دفع</h2>
                <p>رقم الإيصال: ${payment.id}</p>
              </div>
              <div class="details">
                <p>التاريخ: ${payment.date}</p>
                <p>اسم العميل: ${payment.clientName}</p>
                <p>رقم القضية: ${payment.caseNumber}</p>
                <p>المبلغ: ${payment.amount} ريال</p>
                <p>الوصف: ${payment.description}</p>
              </div>
              <div class="footer">
                <p>توقيع المستلم: ________________</p>
              </div>
            </div>
          </body>
        </html>
      `);
      receiptWindow.document.close();
      receiptWindow.print();
    };

    return (
      <button
        onClick={printReceipt}
        className="text-blue-600 hover:underline"
      >
        طباعة الإيصال
      </button>
    );
  };

  // Payments Summary Component
  const PaymentsSummary = () => {
    const totalAmount = payments.reduce((sum, payment) => sum + payment.amount, 0);
    const completedAmount = payments
      .filter(p => p.status === 'completed')
      .reduce((sum, payment) => sum + payment.amount, 0);
    const pendingAmount = payments
      .filter(p => p.status === 'pending')
      .reduce((sum, payment) => sum + payment.amount, 0);

    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="text-lg font-bold mb-2">إجمالي المدفوعات</h4>
          <p className="text-2xl font-bold text-blue-600">{totalAmount} ريال</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <h4 className="text-lg font-bold mb-2">المدفوعات المكتملة</h4>
          <p className="text-2xl font-bold text-green-600">{completedAmount} ريال</p>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg">
          <h4 className="text-lg font-bold mb-2">المدفوعات المعلقة</h4>
          <p className="text-2xl font-bold text-yellow-600">{pendingAmount} ريال</p>
        </div>
      </div>
    );
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-100 p-8" dir="rtl">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-l from-blue-600 to-blue-800 text-white p-6 rounded-lg shadow-lg mb-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold mb-2">إدارة المدفوعات</h2>
                <p className="text-blue-100">إدارة وتتبع المدفوعات والإيصالات</p>
              </div>
              <button
                onClick={() => setShowAddPayment(true)}
                className="bg-white text-blue-600 px-6 py-2 rounded-lg hover:bg-blue-50 transition duration-200"
              >
                دفعة جديدة
              </button>
            </div>
          </div>

          <PaymentsSummary />

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
                  <option value="completed">مكتمل</option>
                  <option value="pending">معلق</option>
                </select>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border p-2 text-right">رقم القضية</th>
                    <th className="border p-2 text-right">العميل</th>
                    <th className="border p-2 text-right">المبلغ</th>
                    <th className="border p-2 text-right">التاريخ</th>
                    <th className="border p-2 text-right">النوع</th>
                    <th className="border p-2 text-right">الحالة</th>
                    <th className="border p-2 text-right">الإجراءات</th>
                  </tr>
                </thead>
                <tbody>
                  {payments
                    .filter(payment => filterStatus === 'all' || payment.status === filterStatus)
                    .map(payment => (
                      <tr key={payment.id} className="hover:bg-gray-50">
                        <td className="border p-2">{payment.caseNumber}</td>
                        <td className="border p-2">{payment.clientName}</td>
                        <td className="border p-2">{payment.amount} ريال</td>
                        <td className="border p-2">{payment.date}</td>
                        <td className="border p-2">
                          {payment.type === 'case' ? 'قضية' : 
                           payment.type === 'consultation' ? 'استشارة' : 'أخرى'}
                        </td>
                        <td className="border p-2">
                          <span className={`px-2 py-1 rounded-full text-sm ${
                            payment.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {payment.status === 'completed' ? 'مكتمل' : 'معلق'}
                          </span>
                        </td>
                        <td className="border p-2">
                          <PaymentReceipt payment={payment} />
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {showAddPayment && <AddPaymentForm />}
    </Layout>
  );
};

export default Payments;
