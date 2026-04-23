import { useState } from "react";
import heroImg from "../assets/hero-section-img-main-.png";


// ── Icons ────────────────────────────────────────────────────────────────────
const SearchIcon = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
);


const ShieldIcon = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="M9 12l2 2 4-4" />
  </svg>
);


export default function Hero() {

      const [searchQuery, setSearchQuery] = useState("");

      const popularSearches = [
            "iPhone 15 Pro Max",
            "Samsung S24 Ultra",
            "Infinix Hot 40",
      ];

      // Shared container: full-width mobile, centred with padding on desktop
      const container = "w-full px-4 sm:px-6 lg:px-8 xl:px-12 max-w-screen-xl mx-auto";

      return (
                <section className="w-full bg-white">
                <div className={`${container} py-10 md:py-16 grid grid-cols-1 md:grid-cols-2 gap-8 items-center`}>

                {/* Left */}
                <div className="order-2 md:order-1">
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl text-gray-900 leading-tight mb-4">
                    Check if a Phone {" "}<br/>
                    is <span className="text-green-600">NCC&nbsp;Approved</span>{" "}<br/>
                    in Nigeria
                    </h1>
                    <p className="text-gray-500 text-base mb-8">
                    Search any phone model to verify if it is approved by the Nigerian
                    Communications Commission (NCC)
                    </p>

                    {/* Search Bar */}
                    <div className="flex items-center border-2 border-gray-200 rounded-xl overflow-hidden
                    focus-within:border-green-500 transition-colors bg-white shadow-sm w-full">
                    <input
                        type="text"
                        placeholder="Enter phone model (e.g. Samsung Galaxy A54)"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="flex-1 px-4 py-3 text-sm text-gray-700 outline-none bg-transparent
                        placeholder-gray-400 min-w-0"
                    />
                    <button className="bg-green-600 hover:bg-green-700 p-3 transition-colors flex-shrink-0">
                        <SearchIcon className="w-5 h-5 text-white" />
                    </button>
                    </div>

                    {/* Popular Searches */}
                    <div className="flex flex-wrap items-center gap-2 mt-4">
                    <span className="text-xs text-gray-400 font-medium">Popular searches:</span>
                    {popularSearches.map((s) => (
                        <button key={s}
                        className="text-xs border border-gray-200 rounded-full px-3 py-1 text-gray-600
                            hover:border-green-400 hover:text-green-600 transition-colors">
                        {s}
                        </button>
                    ))}
                    </div>
                </div>

                {/* Right — hero image */}
                <div className="order-1 md:order-2 flex justify-center">
                    <div className="relative w-full max-w-xs sm:max-w-sm">
                    <img
                        src={heroImg}
                        alt="NCC Approved Phones"
                        className="w-full object-contain drop-shadow-2xl"
                    />
                    {/* NCC Approved Badge */}
                    <div className="absolute bottom-4 right-0 sm:-right-4 bg-white rounded-2xl shadow-xl
                        p-3 flex items-center gap-3 w-52 sm:w-64 border border-gray-100">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center
                        justify-center flex-shrink-0">
                        <ShieldIcon className="w-6 h-6 text-green-600" />
                        </div>
                        <div>
                        <p className="text-green-600 font-bold text-sm sm:text-base">NCC Approved</p>
                        <p className="text-gray-500 text-[11px] leading-snug mt-0.5">
                            This device is approved for use in all networks in Nigeria.
                        </p>
                        </div>
                    </div>
                    </div>
                </div>

                </div>
            </section>
      )
}

      