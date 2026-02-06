"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useState } from "react";
import { Search, MapPin} from "lucide-react";

export default function SearchBar() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [location, setLocation] = useState(searchParams.get("location") || "");
  const [school, setSchool] = useState(searchParams.get("school") || "");
  const [houseType, setHouseType] = useState(
    searchParams.get("houseType") || "",
  );
  const [priceRange, setPriceRange] = useState(
    searchParams.get("priceRange") || "",
  );

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (location) params.set("location", location);
    if (school) params.set("school", school);
    if (houseType) params.set("houseType", houseType);
    if (priceRange) params.set("priceRange", priceRange);
    router.push(`${pathname}?${params.toString()}`);
  };

  return (<div className="w-full mx-auto">
   

      {/* Search Container */}
      <div className="bg-secondary rounded-lg p-6 shadow-lg">
        {/* Location Input */}
        <div className="relative mb-4">
          <input
            type="text"
            placeholder="Enter location"
            className="w-full p-3 pr-10 rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#003366] focus:border-transparent"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <MapPin className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
        </div>

        {/* Filters Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* School Select */}
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">
              School
            </label>
            <select
              className="w-full p-3 rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#003366] focus:border-transparent bg-white"
              value={school}
              onChange={(e) => setSchool(e.target.value)}
            >
              <option value="" disabled>Select School</option>
              <option value="Delta State University">Delta State University</option>
              <option value="Ambrose Ali University">Ambrose Ali University</option>
              <option value="University of Benin">University of Benin</option>
              <option value="University of Lagos">University of Lagos</option>
              <option value="Lagos State University">Lagos State University</option>
              <option value="Yaba College of Technology">Yaba College of Technology</option>
              <option value="Pan-Atlantic University">Pan-Atlantic University</option>
            </select>
          </div>

          {/* Price Range Select */}
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">
              Price Range
            </label>
            <select
              className="w-full p-3 rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#003366] focus:border-transparent bg-white"
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
            >
              <option value="" disabled>Pick a price range</option>
              <option value="100000 - 150000">₦100,000 - ₦150,000</option>
              <option value="150000 - 200000">₦150,000 - ₦200,000</option>
              <option value="200000 - 250000">₦200,000 - ₦250,000</option>
              <option value="250000 - 300000">₦250,000 - ₦300,000</option>
              <option value="300000+">₦300,000+</option>
            </select>
          </div>

          {/* House Type Select */}
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">
              House type
            </label>
            <select
              className="w-full p-3 rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#003366] focus:border-transparent bg-white"
              value={houseType}
              onChange={(e) => setHouseType(e.target.value)}
            >
              <option value="" disabled>Select House Type</option>
              <option value="Single room">Single room</option>
              <option value="Self-contained">Self-contained</option>
              <option value="2 bedroom">2 bedroom</option>
              <option value="3 bedroom">3 bedroom</option>
            </select>
          </div>

          {/* Search Button */}
          <div className="flex items-end">
            <button
              className="w-full bg-[#003366] text-white p-3 rounded-md hover:bg-[#004080] transition-colors duration-200 font-medium flex items-center justify-center gap-2"
              onClick={handleSearch}
            >
              <Search size={18} />
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );

}
