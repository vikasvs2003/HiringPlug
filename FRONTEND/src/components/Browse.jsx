import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import Job from './Job';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchQuery } from '@/redux/jobslice';
import useGetAllJobs from '@/hooks/useGetAllJobs';
import Footer from './shared/Footer';
// const randomjobs = [1,2,3,5];

const Browse = () => {
  useGetAllJobs();
  const { allJobs = [] } = useSelector((store) => store.job);
  const dispatch = useDispatch();
  useEffect(() => {
    return () => {
      dispatch(setSearchQuery(""))
    }
  }, [])
   return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-8">
          Search Results <span className="text-gray-500">({allJobs.length})</span>
        </h1>

        {allJobs.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">No jobs found. Try another keyword.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {allJobs.map((job) => (
              <Job key={job._id} job={job} />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );


}

export default Browse
