import React from 'react'
import LatestJobCard from './LatestJobCard';
import { useSelector } from 'react-redux';

// const randomjobs = [1,2,3,4,5,6,7,8];
const  LatestJobs=()=> {

  // const {allJobs}=useSelector(store=>store.job)
  const { allJobs = [] } = useSelector((store) => store.job); 

  // return (
  //   <div className='max-w-7xl mx-auto my-20' >
  //    <h1 className='text-4xl font-bold' > <span className='text-[#6A38C2]' >Latest & Top  </span>Job Opening</h1>
  //    <div className='grid grid-cols-3 gap-4 my-5'> 

  //    {
  //       allJobs.length <=0 ? (<span> No Job Available </span>) : allJobs?.slice(0,6).map((job)=> <LatestJobCard   key={job._id} job={job}   />)
  //    }
  //    </div>
  //   </div>
  // )

return (
    <section className="bg-[#f9f9f9] py-16 px-4 md:px-10">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-8">
          <span className="text-[#0077B6]">Latest & Top</span> Job Openings
        </h2>

        {allJobs.length <= 0 ? (
          <p className="text-gray-500 text-lg">No job available.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {allJobs.slice(0, 6).map((job) => (
              <LatestJobCard key={job._id} job={job} />
            ))}
          </div>
        )}
      </div>
    </section>
  );

}

export default LatestJobs
