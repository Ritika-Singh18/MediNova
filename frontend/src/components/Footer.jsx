import {
  FaInstagram,
  FaLinkedin,
  FaTwitter
} from "react-icons/fa"

function Footer() {

  return (

    <footer className="bg-[#0F172A] text-white mt-24">

      <div className="max-w-7xl mx-auto px-6 py-20">

        {/* Grid */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Branding */}

          <div>

            <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">

              MediNova

            </h1>

            <p className="mt-6 text-slate-400 leading-relaxed">

              Modern healthcare appointment platform
              connecting patients with experienced
              medical specialists seamlessly.

            </p>

          </div>

          {/* Quick Links */}

          <div>

            <h2 className="text-xl font-semibold">

              Quick Links

            </h2>

            <ul className="mt-6 space-y-4 text-slate-400">

              <li className="hover:text-white transition cursor-pointer">
                Home
              </li>

              <li className="hover:text-white transition cursor-pointer">
                Doctors
              </li>

              <li className="hover:text-white transition cursor-pointer">
                About
              </li>

              <li className="hover:text-white transition cursor-pointer">
                Contact
              </li>

            </ul>

          </div>

          {/* Support */}

          <div>

            <h2 className="text-xl font-semibold">

              Support

            </h2>

            <ul className="mt-6 space-y-4 text-slate-400">

              <li className="hover:text-white transition cursor-pointer">
                Help Center
              </li>

              <li className="hover:text-white transition cursor-pointer">
                Privacy Policy
              </li>

              <li className="hover:text-white transition cursor-pointer">
                Terms & Conditions
              </li>

              <li className="hover:text-white transition cursor-pointer">
                FAQs
              </li>

            </ul>

          </div>

          {/* Contact */}

          <div>

            <h2 className="text-xl font-semibold">

              Contact Us

            </h2>

            <div className="mt-6 space-y-4 text-slate-400">

              <p>
                support@medinova.com
              </p>

              <p>
                +91 9876543210
              </p>

              <p>
                New Delhi, India
              </p>

            </div>

          </div>

        </div>

        {/* Bottom Bar */}

        <div className="border-t border-slate-800 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">

          <p className="text-slate-500 text-sm">

            © 2026 MediNova. All rights reserved.

          </p>

          {/* Social Icons */}

          <div className="flex gap-4">

            <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-indigo-600 transition cursor-pointer">

              <FaInstagram />

            </div>

            <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-indigo-600 transition cursor-pointer">

              <FaLinkedin />

            </div>

            <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-indigo-600 transition cursor-pointer">

              <FaTwitter />

            </div>

          </div>

        </div>

      </div>

    </footer>

  )

}

export default Footer