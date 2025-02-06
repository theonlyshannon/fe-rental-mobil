"use client";

import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQSection = () => {
  const faqs = [
    {
      question: "Mengapa harus memilih layanan rental mobil kami?",
      answer: "Kami menawarkan layanan rental mobil terpercaya dengan berbagai keunggulan: armada kendaraan berkualitas dan terawat, harga yang kompetitif, proses pemesanan yang mudah, dan layanan pelanggan 24/7. Semua mobil kami telah melalui pemeriksaan rutin untuk menjamin keamanan dan kenyamanan Anda."
    },
    {
      question: "Apa keuntungan menggunakan aplikasi rental mobil kami?",
      answer: "Aplikasi kami memberikan kemudahan dalam: pemesanan mobil secara online tanpa perlu datang ke kantor, melihat ketersediaan mobil secara real-time, pembayaran yang aman dan fleksibel, serta tracking lokasi mobil. Anda juga bisa melihat review dari pengguna lain untuk membantu membuat keputusan."
    },
    {
      question: "Bagaimana dengan harga dan transparansi biaya?",
      answer: "Kami menerapkan sistem harga yang transparan tanpa biaya tersembunyi. Semua biaya termasuk asuransi dan pajak ditampilkan dengan jelas saat pemesanan. Kami juga sering memberikan promo dan diskon khusus untuk pelanggan setia."
    },
    {
      question: "Apakah ada jaminan keamanan saat menggunakan layanan kami?",
      answer: "Ya, keamanan adalah prioritas utama kami. Setiap mobil dilengkapi dengan GPS tracker, asuransi comprehensive, dan layanan darurat 24 jam. Kami juga memverifikasi setiap pengguna untuk menjamin keamanan transaksi."
    },
    {
      question: "Bagaimana dengan pelayanan customer service kami?",
      answer: "Tim customer service kami siap membantu 24/7 melalui aplikasi, telepon, atau chat. Kami memberikan respon cepat untuk setiap pertanyaan atau masalah yang Anda hadapi. Kepuasan pelanggan adalah komitmen kami."
    }
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4 mt-12">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
        Frequently Asked Questions
      </h2>
      
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border rounded-lg overflow-hidden bg-white shadow-sm"
          >
            <button
              className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
              onClick={() => toggleFAQ(index)}
            >
              <span className="font-medium text-gray-800">{faq.question}</span>
              {openIndex === index ? (
                <ChevronUp className="w-5 h-5 text-gray-600" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-600" />
              )}
            </button>
            
            {openIndex === index && (
              <div className="px-6 py-4 bg-gray-50">
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQSection;