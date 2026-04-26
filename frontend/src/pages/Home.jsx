import { useState } from "react";

// ── Icons ────────────────────────────────────────────────────────────────────
const ShieldIcon = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="M9 12l2 2 4-4" />
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
  <svg viewBox="0 0 60 80" fill="none" className="w-14 h-14 flex-shrink-0">
    <rect x="8" y="4" width="44" height="72" rx="6" fill="#f0fdf4" stroke="#16a34a" strokeWidth="2" />
    <rect x="14" y="12" width="32" height="48" rx="2" fill="#dcfce7" />
    <circle cx="30" cy="68" r="3" fill="#16a34a" />
    <text x="21" y="44" fontSize="22" fontWeight="bold" fill="#16a34a">?</text>
    <circle cx="46" cy="16" r="10" fill="#f59e0b" />
    <text x="42" y="21" fontSize="14" fontWeight="bold" fill="white">?</text>
  </svg>
);

// ── Component ────────────────────────────────────────────────────────────────
export default function Home() {

  const features = [
    {
      icon: <SearchIcon className="w-6 h-6 text-green-600" />,
      title: "Instant Verification",
      desc: "Get real-time results from trusted data sources",
    },
    {
      icon: <ShieldIcon className="w-6 h-6 text-green-600" />,
      title: "Avoid Fake Phones",
      desc: "Verify before you buy and protect your money",
    },
    {
      icon: <UsersIcon className="w-6 h-6 text-green-600" />,
      title: "Community Reports",
      desc: "Help others by reporting new or unlisted devices",
    },
    {
      icon: <LockIcon className="w-6 h-6 text-green-600" />,
      title: "100% Free",
      desc: "Our service is free, no hidden charges",
    },
  ];

  const steps = [
    {
      num: 1,
      title: "Search",
      desc: "Enter the phone model you want to check.",
      icon: (
        <svg viewBox="0 0 40 40" fill="none" className="w-9 h-9">
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
      desc: "We check regulatory data",
      icon: (
        <svg viewBox="0 0 40 40" fill="none" className="w-9 h-9">
          <path d="M20 4l-14 5v9c0 8 6 15 14 18 8-3 14-10 14-18V9L20 4z"
            fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.5" />
          <polyline points="14 20 18 24 26 16" stroke="#16a34a" strokeWidth="2"
            strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      num: 3,
      title: "Get Result",
      desc: "See if the phone is safe, unverified, or risky.",
      icon: (
        <svg viewBox="0 0 40 40" fill="none" className="w-9 h-9">
          <rect x="8" y="2" width="18" height="28" rx="3" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.5" />
          <path d="M22 2v6h6" stroke="#16a34a" strokeWidth="1.5" fill="#dcfce7" />
          <polyline points="12 20 16 24 24 16" stroke="#16a34a" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      ),
    },
  ];

  const whyMatters = [
    "Only approved devices are guaranteed to work properly in Nigeria.",
    "Unverified phones may be blocked or have limited functionality.",
    "Always check before you buy!",
  ];

  const communityReports = [
    { name: "Xiaomi Redmi Note 13 Pro+", reporter: "John D.", time: "2 hours ago", status: "Pending Review", statusColor: "bg-yellow-100 text-yellow-700" },
    { name: "OnePlus 12R", reporter: "Adaobi M.", time: "5 hours ago", status: "Pending Review", statusColor: "bg-yellow-100 text-yellow-700" },
    { name: "Realme C67", reporter: "Chinedu O.", time: "1 day ago", status: "Approved", statusColor: "bg-green-100 text-green-700" },
  ];

  const blogPosts = [
    { title: "How to Check if a Phone is NCC Approved in Nigeria", date: "May 18, 2024" },
    { title: "Why Buying NCC Approved Phones Matters", date: "May 10, 2024" },
    { title: "Understanding NCC Approval and IMEI Registration", date: "May 2, 2024" },
    { title: "Top 5 Tips to Avoid Fake or Unapproved Phones", date: "Apr 26, 2024" },
  ];

  // Shared container: full-width mobile, centred with padding on desktop
  const container = "w-full px-4 sm:px-6 lg:px-8 xl:px-12 max-w-screen-xl mx-auto";

  return (
    <div className="min-h-screen bg-white font-sans text-gray-800 overflow-x-hidden">


      {/* ── FEATURES STRIP ────────────────────────────────────────────────── */}
      <section className="w-full bg-white border-t border-b border-gray-100 py-8">
        <div className={`${container} grid grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-8`}>
          {features.map((f) => (
            <div key={f.title} className="flex items-start gap-3">
              <div className="w-9 h-9 sm:w-10 sm:h-10 bg-green-50 rounded-xl flex items-center
                justify-center flex-shrink-0">
                {f.icon}
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-xs sm:text-sm">{f.title}</p>
                <p className="text-gray-500 text-[11px] sm:text-xs mt-0.5">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS + WHY IT MATTERS ─────────────────────────────────── */}
      <section className="w-full py-10 md:py-14">
        <div className={`${container} grid grid-cols-1 md:grid-cols-2 gap-8`}>

          {/* How It Works */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-5">How It Works</h2>
            <div className="flex items-start gap-1 sm:gap-2">
              {steps.map((step, i) => (
                <div key={step.num} className="flex items-center flex-1">
                  <div className="flex-1 bg-gray-50 rounded-2xl p-3 sm:p-4 flex flex-col
                    items-center text-center border border-gray-100">
                    <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-green-100 text-green-600
                      text-xs font-bold flex items-center justify-center mb-2">
                      {step.num}
                    </div>
                    <div className="mb-1 sm:mb-2">{step.icon}</div>
                    <p className="font-semibold text-gray-900 text-xs sm:text-sm">{step.title}</p>
                    <p className="text-gray-500 text-[10px] sm:text-xs mt-1 leading-snug">{step.desc}</p>
                  </div>
                  {i < steps.length - 1 && (
                    <div className="mx-0.5 sm:mx-1 text-gray-300 flex-shrink-0">
                      <ArrowRightIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Why It Matters */}
          <div className="bg-green-50 rounded-2xl p-5 sm:p-6 relative overflow-hidden">
            <div className="absolute bottom-0 right-0 opacity-10 pointer-events-none">
              <ShieldIcon className="w-32 h-32 sm:w-40 sm:h-40 text-green-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-5">Why It Matters</h2>
            <div className="space-y-4">
              {whyMatters.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-green-600 flex items-center
                    justify-center flex-shrink-0 mt-0.5">
                    <CheckIcon className="w-3 h-3 text-white" />
                  </div>
                  <p className="text-gray-700 text-sm">{item}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ── CAN'T FIND BANNER ─────────────────────────────────────────────── */}
      <section className="w-full pb-10 md:pb-14">
        <div className={container}>
          <div className="bg-gray-50 rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row
            items-start sm:items-center justify-between gap-4 border border-gray-100">
            <div className="flex items-start sm:items-center gap-4">
              <PhoneQuestionIcon />
              <div>
                <p className="font-bold text-gray-900 text-base">Can't find a phone? Help Us Improve</p>
                <p className="text-gray-500 text-sm mt-0.5">
                  If the phone you're looking for is not listed yet (especially new releases) , you can submit a
                  report and help others avoid bad purchases.
                </p>
              </div>
            </div>
            <button className="w-full sm:w-auto flex-shrink-0 bg-yellow-400 hover:bg-yellow-500
              text-gray-900 font-semibold text-sm px-5 py-2.5 rounded-xl flex items-center
              justify-center gap-2 transition-colors">
              Report a Device
              <ArrowRightIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* ── COMMUNITY + BLOG + IMPACT ─────────────────────────────────────── */}
      <section className="w-full pb-12 md:pb-16">
        <div className={`${container} grid grid-cols-1 md:grid-cols-3 gap-8`}>

          {/* Latest Community Reports */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold text-gray-900">Latest Community Reports</h2>
              <a href="#" className="text-green-600 text-xs font-medium flex items-center
                gap-1 hover:underline whitespace-nowrap">
                View all <ArrowRightIcon className="w-3 h-3" />
              </a>
            </div>
            <div className="space-y-3">
              {communityReports.map((r) => (
                <div key={r.name} className="flex items-center gap-3 bg-gray-50 rounded-xl
                  p-3 border border-gray-100">
                  <div className="w-10 h-12 bg-gradient-to-b from-gray-200 to-gray-300
                    rounded-lg flex items-center justify-center text-lg flex-shrink-0">
                    📱
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 text-xs truncate">{r.name}</p>
                    <p className="text-gray-400 text-[10px]">
                      Reported by {r.reporter} • {r.time}
                    </p>
                  </div>
                  <span className={`text-[10px] font-semibold px-2 py-1 rounded-full
                    whitespace-nowrap flex-shrink-0 ${r.statusColor}`}>
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
              <a href="#" className="text-green-600 text-xs font-medium flex items-center
                gap-1 hover:underline whitespace-nowrap">
                View all <ArrowRightIcon className="w-3 h-3" />
              </a>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {blogPosts.map((post) => (
                <div key={post.title} className="cursor-pointer group">
                  <div className="rounded-xl overflow-hidden bg-gray-200 mb-2 aspect-video
                    flex items-center justify-center text-2xl">
                    📰
                  </div>
                  <p className="text-xs font-medium text-gray-800 leading-snug
                    group-hover:text-green-600 transition-colors line-clamp-3">
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
              <p className="text-gray-500 text-xs mt-1">
                Reports submitted by our amazing community
              </p>
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

        </div>
      </section>

    </div>
  );
}
