import React, { useState } from 'react'
import { Button } from './ui/button';
import { Search } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { setSearchQuery } from '@/redux/jobslice';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {

    const [query,setQuery] = useState("");
    const dispatch=useDispatch();
    const navigate=useNavigate();

    const searchJobHandler=()=>{
        dispatch(setSearchQuery(query));
        navigate("/browse")

    }
    // return (
    //     <div className='text-center' >
    //         <div className='flex flex-col gap-5 my-10'>
    //             <span className=' mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#F83002] font-medium' >No 1 job hunt website</span>
    //             <h1 className='text-5xl font-bold' > Search,Apply &  <br /> Get Your <span className='text-[#6A38C2]' > Dream Jobs</span> </h1>
    //             <p>"Whether you're a fresh graduate or an experienced professional, we help you connect with top companies to land your dream role." <br /> <b> <i> "Start your journey today!" </i> </b></p>
    //             <div className='flex w-[40%] shadow-lg border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto' >
    //                 <input 
    //                 type="text"  
    //                 placeholder='find your dream job'
    //                 onChange={(e)=>setQuery(e.target.value)}
    //                 className='outline-none border-none  w-full'
    //                 />
    //                 <Button  onClick={searchJobHandler} className="rounded-r-full bg-[#6A38C2]  " >
    //                     <Search className='h-5 w-5 ' />
    //                 </Button>
    //             </div>

    //         </div>
    //     </div>
    // )


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
            src="/assets/job-search-illustration.png"
            alt="Job search illustration"
            className="w-[80%] max-w-md"
          />
        </div>
      </div>
    </section>
  );


}

export default HeroSection;