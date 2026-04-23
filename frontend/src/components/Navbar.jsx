import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const ShieldIcon = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const MenuIcon = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

const CloseIcon = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Check Phone", to: "/check-phone" },
  { label: "Report a Device", to: "/report" },
  { label: "Community", to: "/community" },
  { label: "About Us", to: "/about" },
  { label: "Blog", to: "/blog" },
  { label: "FAQ", to: "/faq" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

//  // Shared container: full-width mobile, centred with padding on desktop
//   const container = "w-full px-4 sm:px-6 lg:px-8 xl:px-12 max-w-screen-xl mx-auto";

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="w-full max-w-8xl mx-auto px-4 py-3 flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-9 h-9 bg-green-600 rounded-lg flex items-center justify-center">
            <ShieldIcon className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-1">
              <span className="font-bold text-gray-900 text-base leading-tight">Techmobile</span>
              <span className="bg-green-600 text-white text-[9px] font-bold px-1 py-0.5 rounded leading-none">
                NG
              </span>
            </div>
            <p className="text-[9px] text-gray-400 leading-none">Verify. Trust. Buy Smart.</p>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map(({ label, to }) => {
            const isActive = location.pathname === to;
            return (
              <Link
                key={to}
                to={to}
                className={`text-sm transition-colors ${
                  isActive
                    ? "text-green-600 font-semibold"
                    : "text-gray-600 hover:text-green-600"
                }`}
              >
                {label}
              </Link>
            );
          })}
        </div>

        {/* Right side: CTA + Mobile toggle */}
        <div className="flex items-center gap-3">
          
          {/* Login / Sign Up - Hidden on mobile */}
          <Link
            to="/login"
            className="hidden md:block bg-green-600 hover:bg-green-700 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors"
          >
            Login / Sign Up
          </Link>

          {/* Hamburger Menu - Only visible on mobile */}
          <button
            className="md:hidden p-2 text-gray-600 hover:text-green-600 transition-colors"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <CloseIcon className="w-6 h-6" />
            ) : (
              <MenuIcon className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 pb-6">
          <div className="flex flex-col gap-1 pt-4">
            {navLinks.map(({ label, to }) => {
              const isActive = location.pathname === to;
              return (
                <Link
                  key={to}
                  to={to}
                  onClick={() => setMobileOpen(false)}
                  className={`px-4 py-3 rounded-xl text-base transition-colors ${
                    isActive
                      ? "bg-green-50 text-green-600 font-semibold"
                      : "text-gray-600 hover:bg-gray-50 hover:text-green-600"
                  }`}
                >
                  {label}
                </Link>
              );
            })}

            {/* Login/Sign Up inside mobile menu */}
            <Link
              to="/login"
              onClick={() => setMobileOpen(false)}
              className="mt-4 bg-green-600 hover:bg-green-700 text-white text-base font-semibold py-3 rounded-xl text-center transition-colors"
            >
              Login / Sign Up
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}