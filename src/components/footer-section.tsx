import React from 'react';
import Link from 'next/link';
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info Section */}
          <div className="space-y-4">
            <h3 className="text-white text-xl font-bold mb-4">RentalMobil.id</h3>
            <p className="text-sm">
              Solusi terpercaya untuk kebutuhan transportasi Anda. Kami menyediakan berbagai pilihan mobil dengan kondisi prima dan pelayanan profesional.
            </p>
            <div className="flex space-x-4">
              <Facebook className="w-5 h-5 hover:text-blue-500 cursor-pointer" />
              <Twitter className="w-5 h-5 hover:text-blue-400 cursor-pointer" />
              <Instagram className="w-5 h-5 hover:text-pink-500 cursor-pointer" />
              <Youtube className="w-5 h-5 hover:text-red-500 cursor-pointer" />
            </div>
          </div>

          {/* Quick Links Section */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Link Cepat</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/tentang-kami" className="hover:text-white transition-colors">
                  Tentang Kami
                </Link>
              </li>
              <li>
                <Link href="/layanan" className="hover:text-white transition-colors">
                  Layanan
                </Link>
              </li>
              <li>
                <Link href="/armada" className="hover:text-white transition-colors">
                  Armada Kami
                </Link>
              </li>
              <li>
                <Link href="/syarat-ketentuan" className="hover:text-white transition-colors">
                  Syarat & Ketentuan
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Services Section */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Layanan Kami</h3>
            <ul className="space-y-2">
              <li>Sewa Mobil Harian</li>
              <li>Sewa Mobil Mingguan</li>
              <li>Sewa Mobil Bulanan</li>
              <li>Sewa Mobil + Supir</li>
              <li>Antar Jemput Bandara</li>
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Hubungi Kami</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5" />
                <p className="text-sm">Jl. Rental Mobil No. 123, Jakarta Pusat</p>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5" />
                <p className="text-sm">+62 812-3456-7890</p>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5" />
                <p className="text-sm">info@rentalmobil.id</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Section */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <p className="text-center text-sm">
            © {new Date().getFullYear()} RentalMobil.id. Hak Cipta Dilindungi.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;