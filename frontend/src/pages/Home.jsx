import { useState } from "react";
import heroImg from "../assets/hero-section-img-main-.png";

// Icons as inline SVGs
// Better Shield Icon with Checkmark
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

const SearchIcon = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
);

const CheckIcon = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const UsersIcon = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const LockIcon = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const ArrowRightIcon = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
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

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");

  const popularSearches = [
    "iPhone 15 Pro Max",
    "Samsung S24 Ultra",
    "Infinix Hot 40",
    "Tecno Camon 20",
  ];

  const features = [
    {
      icon: <SearchIcon className="w-7 h-7 text-green-600" />,
      title: "Instant Verification",
      desc: "Get real-time results from the official NCC database",
    },
    {
      icon: <ShieldIcon className="w-7 h-7 text-green-600" />,
      title: "Avoid Fake Phones",
      desc: "Verify before you buy and protect your money",
    },
    {
      icon: <UsersIcon className="w-7 h-7 text-green-600" />,
      title: "Community Reports",
      desc: "Help others by reporting new or unlisted devices",
    },
    {
      icon: <LockIcon className="w-7 h-7 text-green-600" />,
      title: "100% Free",
      desc: "Our service is free and will always remain free",
    },
  ];

  const steps = [
    {
      num: 1,
      title: "Search",
      desc: "Enter the phone model you want to check.",
      icon: (
        <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10">
          <rect x="8" y="2" width="18" height="28" rx="3" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.5" />
          <circle cx="28" cy="28" r="7" fill="none" stroke="#16a34a" strokeWidth="1.5" />
          <line x1="33" y1="33" x2="37" y2="37" stroke="#16a34a" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="25" y1="28" x2="31" y2="28" stroke="#16a34a" strokeWidth="1" />
          <line x1="28" y1="25" x2="28" y2="31" stroke="#16a34a" strokeWidth="1" />
        </svg>
      ),
    },
    {
      num: 2,
      title: "Verify",
      desc: "We check the NCC approval database.",
      icon: (
        <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10">
          <path d="M20 4l-14 5v9c0 8 6 15 14 18 8-3 14-10 14-18V9L20 4z" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.5" />
          <polyline points="14 20 18 24 26 16" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      num: 3,
      title: "Get Result",
      desc: "View the approval status instantly.",
      icon: (
        <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10">
          <rect x="8" y="2" width="18" height="28" rx="3" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.5" />
          <path d="M22 2v6h6" stroke="#16a34a" strokeWidth="1.5" fill="#dcfce7" />
          <polyline points="12 20 16 24 24 16" stroke="#16a34a" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      ),
    },
  ];

  const whyMatters = [
    "Only NCC approved devices are allowed on Nigerian networks.",
    "Unapproved phones may be blocked or have limited functionality.",
    "Always check before you buy!",
  ];

  const communityReports = [
    {
      name: "Xiaomi Redmi Note 13 Pro+",
      reporter: "John D.",
      time: "2 hours ago",
      status: "Pending Review",
      statusColor: "bg-yellow-100 text-yellow-700",
      img: "https://placehold.co/40x50/e2e8f0/64748b?text=📱",
    },
    {
      name: "OnePlus 12R",
      reporter: "Adaobi M.",
      time: "5 hours ago",
      status: "Pending Review",
      statusColor: "bg-yellow-100 text-yellow-700",
      img: "https://placehold.co/40x50/e2e8f0/64748b?text=📱",
    },
    {
      name: "Realme C67",
      reporter: "Chinedu O.",
      time: "1 day ago",
      status: "Approved",
      statusColor: "bg-green-100 text-green-700",
      img: "https://placehold.co/40x50/e2e8f0/64748b?text=📱",
    },
  ];

  const blogPosts = [
    {
      title: "How to Check if a Phone is NCC Approved in Nigeria",
      date: "May 18, 2024",
      img: "https://placehold.co/90x70/e2e8f0/64748b?text=Blog",
    },
    {
      title: "Why Buying NCC Approved Phones Matters",
      date: "May 10, 2024",
      img: "https://placehold.co/90x70/e2e8f0/64748b?text=Blog",
    },
    {
      title: "Understanding NCC Approval and IMEI Registration",
      date: "May 2, 2024",
      img: "https://placehold.co/90x70/e2e8f0/64748b?text=Blog",
    },
    {
      title: "Top 5 Tips to Avoid Fake or Unapproved Phones",
      date: "Apr 26, 2024",
      img: "https://placehold.co/90x70/e2e8f0/64748b?text=Blog",
    },
  ];

  const navLinks = ["Check Phone", "Report a Device", "Community", "About Us", "Blog", "FAQ"];

  return (
    <div className="min-h-screen bg-white font-sans text-gray-800">
   

      {/* HERO SECTION */}
      <section className="max-w-6xl mx-auto px-4 pt-14 pb-16 grid md:grid-cols-2 gap-8 items-center">
        {/* Left */}
        <div>
          <h1 className="text-4xl font-extrabold text-gray-900 leading-tight mb-4">
            Check if a Phone is{" "}
            <span className="text-green-600">NCC Approved</span>{" "}
            in Nigeria
          </h1>
          <p className="text-gray-500 text-base mb-8 max-w-md">
            Search any phone model to verify if it is approved by the Nigerian Communications
            Commission (NCC)
          </p>

          {/* Search Bar */}
          <div className="flex items-center border-2 border-gray-200 rounded-xl overflow-hidden focus-within:border-green-500 transition-colors bg-white shadow-sm max-w-md">
            <input
              type="text"
              placeholder="Enter phone model (e.g. Samsung Galaxy A54)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 px-4 py-3 text-sm text-gray-700 outline-none bg-transparent placeholder-gray-400"
            />
            <button className="bg-green-600 hover:bg-green-700 p-3 transition-colors">
              <SearchIcon className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Popular Searches */}
          <div className="flex flex-wrap items-center gap-2 mt-4">
            <span className="text-xs text-gray-400 font-medium">Popular searches:</span>
            {popularSearches.map((s) => (
              <button
                key={s}
                className="text-xs border border-gray-200 rounded-full px-3 py-1 text-gray-600 hover:border-green-400 hover:text-green-600 transition-colors"
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Right - Phone Image + Badge */}
        
      <div className="relative flex justify-center">
        <div className="relative">
          {/* Actual hero image */}
          <img
            src={heroImg}
            alt="NCC Approved Phones"
            className="hero-image w-full max-w-sm object-contain drop-shadow-2xl"
          />

          {/* NCC Approved Badge - Moved slightly below center */}
          <div className="absolute bottom-28 right-28 bg-white rounded-2xl shadow-xl p-4 flex items-center gap-3 w-80 border border-gray-100">
            <div className="w-22 h-22 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
              <ShieldIcon className="w-12 h-12 text-green-600" />
            </div>
            <div>
              <p className="text-green-600 font-bold text-2xl">NCC Approved</p>
              <p className="text-gray-500 text-xs leading-snug mt-1">
                This device is approved for use in all networks in Nigeria.
              </p>
            </div>
          </div>
        </div>
      </div>
      </section>

      {/* FEATURES STRIP */}
      <section className="bg-white border-t border-b border-gray-100 py-10">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
          {features.map((f) => (
            <div key={f.title} className="flex items-start gap-3">
              <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center flex-shrink-0">
                {f.icon}
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-sm">{f.title}</p>
                <p className="text-gray-500 text-xs mt-0.5">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS + WHY IT MATTERS */}
      <section className="max-w-6xl mx-auto px-4 py-14 grid md:grid-cols-2 gap-8">
        {/* How It Works */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-6">How It Works</h2>
          <div className="flex items-start gap-2">
            {steps.map((step, i) => (
              <div key={step.num} className="flex items-center flex-1">
                <div className="flex-1 bg-gray-50 rounded-2xl p-4 flex flex-col items-center text-center border border-gray-100">
                  <div className="w-7 h-7 rounded-full bg-green-100 text-green-600 text-xs font-bold flex items-center justify-center mb-2">
                    {step.num}
                  </div>
                  <div className="mb-2">{step.icon}</div>
                  <p className="font-semibold text-gray-900 text-sm">{step.title}</p>
                  <p className="text-gray-500 text-xs mt-1">{step.desc}</p>
                </div>
                {i < steps.length - 1 && (
                  <div className="mx-1 text-gray-300">
                    <ArrowRightIcon className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Why It Matters */}
        <div className="bg-green-50 rounded-2xl p-6 relative overflow-hidden">
          {/* Background watermark shield */}
          <div className="absolute bottom-0 right-0 opacity-10">
            <ShieldIcon className="w-40 h-40 text-green-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-5">Why It Matters</h2>
          <div className="space-y-4">
            {whyMatters.map((item) => (
              <div key={item} className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-green-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckIcon className="w-3 h-3 text-white" />
                </div>
                <p className="text-gray-700 text-sm">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CAN'T FIND A PHONE MODEL BANNER */}
      <section className="max-w-6xl mx-auto px-4 pb-14">
        <div className="bg-gray-50 rounded-2xl p-6 flex items-center justify-between gap-4 border border-gray-100">
          <div className="flex items-center gap-5">
            <PhoneQuestionIcon />
            <div>
              <p className="font-bold text-gray-900 text-base">Can't find a phone model?</p>
              <p className="text-gray-500 text-sm mt-0.5">
                If the phone you're looking for is not in our database, you can submit a report to help us update it.
              </p>
            </div>
          </div>
          <button className="flex-shrink-0 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold text-sm px-5 py-2.5 rounded-xl flex items-center gap-2 transition-colors">
            Report a Device
            <ArrowRightIcon className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* LATEST COMMUNITY REPORTS + BLOG + COMMUNITY IMPACT */}
      <section className="max-w-6xl mx-auto px-4 pb-16 grid md:grid-cols-3 gap-8">
        {/* Community Reports */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-gray-900">Latest Community Reports</h2>
            <a href="#" className="text-green-600 text-xs font-medium flex items-center gap-1 hover:underline">
              View all reports <ArrowRightIcon className="w-3 h-3" />
            </a>
          </div>
          <div className="space-y-3">
            {communityReports.map((r) => (
              <div key={r.name} className="flex items-center gap-3 bg-gray-50 rounded-xl p-3 border border-gray-100">
                <div className="w-10 h-12 bg-gradient-to-b from-gray-200 to-gray-300 rounded-lg flex items-center justify-center text-lg flex-shrink-0">
                  📱
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 text-xs truncate">{r.name}</p>
                  <p className="text-gray-400 text-[10px]">
                    Reported by {r.reporter} • {r.time}
                  </p>
                </div>
                <span className={`text-[10px] font-semibold px-2 py-1 rounded-full whitespace-nowrap ${r.statusColor}`}>
                  {r.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* From the Blog */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-gray-900">From the Blog</h2>
            <a href="#" className="text-green-600 text-xs font-medium flex items-center gap-1 hover:underline">
              View all posts <ArrowRightIcon className="w-3 h-3" />
            </a>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {blogPosts.map((post) => (
              <div key={post.title} className="cursor-pointer group">
                <div className="rounded-xl overflow-hidden bg-gray-200 mb-2 aspect-video">
                  <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center text-2xl">
                    📰
                  </div>
                </div>
                <p className="text-xs font-medium text-gray-800 leading-snug group-hover:text-green-600 transition-colors line-clamp-3">
                  {post.title}
                </p>
                <p className="text-[10px] text-gray-400 mt-0.5">{post.date}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Community Impact */}
        <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100 flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-4">
            <UsersIcon className="w-5 h-5 text-green-600" />
            <h2 className="text-base font-bold text-gray-900">Community Impact</h2>
          </div>
          <div className="mb-4">
            <p className="text-4xl font-extrabold text-gray-900">1,245+</p>
            <p className="text-gray-500 text-xs mt-1">Reports submitted by our amazing community</p>
          </div>
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
            <div>
              <p className="text-2xl font-extrabold text-gray-900">890+</p>
              <p className="text-gray-500 text-xs mt-0.5">Devices Verified</p>
            </div>
            <div>
              <p className="text-2xl font-extrabold text-gray-900">750+</p>
              <p className="text-gray-500 text-xs mt-0.5">Active Members</p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-gray-300 pt-12 pb-6">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 pb-10 border-b border-gray-700">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                  <ShieldIcon className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <span className="font-bold text-white text-sm">PhoneCheck</span>
                    <span className="bg-green-600 text-white text-[8px] font-bold px-1 py-0.5 rounded">NG</span>
                  </div>
                  <p className="text-[9px] text-gray-500 leading-none">Verify. Trust. Buy Smart.</p>
                </div>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed">
                PhoneCheck NG helps you verify if a phone is NCC approved in Nigeria. Our mission is to promote safe
                and informed mobile phone purchases.
              </p>
              <div className="flex gap-3 mt-4">
                {[<FacebookIcon />, <TwitterIcon />, <InstagramIcon />, <YoutubeIcon />].map((icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
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
                PhoneCheck NG is not affiliated with the NCC. Data is sourced from the public NCC database and
                community reports. Use at your own discretion.
              </p>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="pt-5 text-center">
            <p className="text-xs text-gray-500">© 2024 PhoneCheck NG. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
