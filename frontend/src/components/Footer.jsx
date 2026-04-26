import { useState } from "react";

// Icons as inline SVGs
const ShieldIcon = ({ className = "" }) => (
  <svg 
    className={className} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2.5"
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="M9 12l2 2 4-4" />   {/* Checkmark inside the shield */}
  </svg>
);


const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const TwitterIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
  </svg>
);

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
  </svg>
);

const YoutubeIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-1.96C18.88 4 12 4 12 4s-6.88 0-8.6.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.94 1.97C5.12 20 12 20 12 20s6.88 0 8.6-.45a2.78 2.78 0 0 0 1.94-1.97A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white" />
  </svg>
);

const PhoneQuestionIcon = () => (
  <svg viewBox="0 0 60 80" fill="none" className="w-16 h-16">
    <rect x="8" y="4" width="44" height="72" rx="6" fill="#f0fdf4" stroke="#16a34a" strokeWidth="2" />
    <rect x="14" y="12" width="32" height="48" rx="2" fill="#dcfce7" />
    <circle cx="30" cy="68" r="3" fill="#16a34a" />
    <text x="21" y="44" fontSize="22" fontWeight="bold" fill="#16a34a">?</text>
    <circle cx="46" cy="16" r="10" fill="#f59e0b" />
    <text x="42" y="21" fontSize="14" fontWeight="bold" fill="white">?</text>
  </svg>
);

// Shared container: full-width mobile, centred with padding on desktop
const container = "w-full px-4 sm:px-6 lg:px-8 xl:px-12 max-w-screen-xl mx-auto";

export default function Footer() {
    return (
      <footer className="w-full bg-gray-900 text-gray-300 pt-10 pb-6">
        <div className={container}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pb-8 border-b border-gray-700">

            {/* Brand — full width on smallest screens */}
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <ShieldIcon className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <span className="font-bold text-white text-sm">Techmobile</span>
                    <span className="bg-blue-600 text-white text-[8px] font-bold px-1 py-0.5 rounded">NG</span>
                  </div>
                  <p className="text-[9px] text-gray-500 leading-none">Verify. Trust. Buy Smart.</p>
                </div>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed">
                TechMobile NG helps you check if a phone is safe, genuine, and reliable before you buy.
                Our mission is to help Nigerians avoid fake, cloned, or unverified devices and make smarter purchasing decisions.
              </p>
              <div className="flex gap-3 mt-4">
                {[
                  { key: "fb", icon: <FacebookIcon /> },
                  { key: "tw", icon: <TwitterIcon /> },
                  { key: "ig", icon: <InstagramIcon /> },
                  { key: "yt", icon: <YoutubeIcon /> },
                ].map(({ key, icon }) => (
                  <a key={key} href="#" className="text-gray-400 hover:text-white transition-colors">
                    {icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-white font-semibold text-sm mb-3">Quick Links</h3>
              <ul className="space-y-2">
                {["Home", "Check Phone", "Report a Device", "Community", "Blog", "FAQ"].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-xs text-gray-400 hover:text-white transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="text-white font-semibold text-sm mb-3">Support</h3>
              <ul className="space-y-2">
                {["About Us", "How It Works", "Privacy Policy", "Terms of Use", "Contact Us"].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-xs text-gray-400 hover:text-white transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Disclaimer */}
            <div>
              <h3 className="text-white font-semibold text-sm mb-3">Disclaimer</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
              TechMobile NG is an independent platform built to help users make safer phone 
              purchases using aggregated data and community insights. 
              While we strive for accuracy, users are advised to make final purchase decisions carefully.
              </p>
            </div>

          </div>

        <div className="pt-5 text-center">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} Techmobile NG. All rights reserved.
          </p>
        </div>
        </div>
      </footer>
    )
}