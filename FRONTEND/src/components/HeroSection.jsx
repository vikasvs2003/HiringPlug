import React, { useState } from 'react'
import { Button } from './ui/button';
import { Search } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { setSearchQuery } from '@/redux/jobslice';
import { useNavigate } from 'react-router-dom';
import jobSearchImage from '@/assets/jobsearch.png';

const HeroSection = () => {

    const [query,setQuery] = useState("");
    const dispatch=useDispatch();
    const navigate=useNavigate();

    const searchJobHandler=()=>{
        dispatch(setSearchQuery(query));
        navigate("/browse")

    }
    

 return (
    <section className="bg-[#f0f9ff] py-16 px-6 md:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* LEFT TEXT SIDE */}
        <div className="space-y-6">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
            Supercharge Your <br /> Career Journey
          </h1>
          <p className="text-gray-600 text-lg sm:text-xl">
            Connect with top companies & recruiters — all in one place.
          </p>

          <div className="flex bg-white border border-gray-300 rounded-full px-4 py-2 shadow-md items-center gap-2 max-w-xl">
            <input
              type="text"
              placeholder="Search for job titles, companies..."
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-transparent outline-none text-base"
            />
            <Button
              onClick={searchJobHandler}
              className="rounded-full bg-[#0077B6] hover:bg-[#023e8a] text-white px-4 py-2"
            >
              <Search className="h-5 w-5" />
            </Button>
          </div>

          <div className="mt-4 flex flex-wrap gap-2 text-sm text-gray-700">
            <span className="bg-gray-200 px-3 py-1 rounded-full">Frontend</span>
            <span className="bg-gray-200 px-3 py-1 rounded-full">Backend</span>
            <span className="bg-gray-200 px-3 py-1 rounded-full">→
            </span>
          </div>
        </div>

        {/* RIGHT IMAGE SIDE */}
        <div className="w-full flex justify-center">
          <img
             src={jobSearchImage}
            alt="Job search illustration"
            className="w-[80%] max-w-md"
          />
        </div>
      </div>
    </section>
  );


}

export default HeroSection;