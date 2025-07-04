import React, { useEffect, useState } from 'react'
import { Badge } from './ui/badge'
import Navbar from './shared/Navbar'
import { Button } from './ui/button'
import { useParams } from 'react-router-dom';
// import useGetSingleJob from '@/hooks/useGetSingleJob';
import axios from 'axios';
import { setSingleJob } from '@/redux/jobslice';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
// import { User } from 'lucide-react';

function JobDescription() {

    const { user } = useSelector(store => store.auth)
    const { singleJob } = useSelector(store => store.job)


    // console.log('User:', user);
    // console.log('Single Job:', singleJob);
    // console.log('Applications applicant:', singleJob?.applications?.applicant);


    const isinitiallyapplied = singleJob?.applications?.some(application => String(application.applicant) === String(user?._id)) || false;
    const [isApplied, setIsApplied] = useState(isinitiallyapplied);

    // const isApplied = false;

    // console.log('isApplied:', isApplied);

    const params = useParams();
    const jobId = params.id;

    const dispatch = useDispatch();

    const applyJobHandler = async () => {
        try {
            // console.log(jobId)
            const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, { withCredentials: true });
            // console.log('API Response hai bhai :', res.data);
            if (res.data.success) {
                setIsApplied(true); //update the local state 
                const updateSingleJob = {...singleJob,applications:[...singleJob.applications,{applicant:user?._id}]}
                dispatch(setSingleJob(updateSingleJob));//helps us to real time UI update
                toast.success("Job Applied Successfull !  ", res.data.message);
            }

        } catch (error) {
            console.log(error.response?.data?.message);
            toast.error(error.response?.data?.message)
            // toast.error("job applied unsuccessful")

        }
    }

    useEffect(() => {
        const fetchSingleJobs = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setSingleJob(res.data.job));
                    setIsApplied(res.data.job.applications.some(application=>application.applicant === user?._id)) //ensure the state is in sync with fetch
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchSingleJobs();

    }, [jobId, dispatch, user?._id]);
   return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <Navbar />

      <div className="bg-white shadow-md rounded-xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">{singleJob?.title}</h1>
          <div className="flex flex-wrap gap-3 mt-2">
            <Badge className="text-blue-700 bg-blue-50 font-medium" variant="ghost">
              {singleJob?.position} Positions
            </Badge>
            <Badge className="text-[#F83002] bg-red-50 font-medium" variant="ghost">
              {singleJob?.jobType}
            </Badge>
            <Badge className="text-[#7209b7] bg-purple-50 font-medium" variant="ghost">
              {singleJob?.salary} LPA
            </Badge>
          </div>
        </div>

        <Button
          onClick={!isApplied ? applyJobHandler : null}
          disabled={isApplied}
          className={`rounded-full px-6 py-2 text-white font-semibold transition ${
            isApplied
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-green-600 hover:bg-green-700'
          }`}
        >
          {isApplied ? 'Already Applied' : 'Apply Now'}
        </Button>
      </div>

      <div className="bg-white shadow-sm rounded-xl p-6 space-y-4">
        <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">
          Job Description
        </h2>

        <p>
          <span className="font-semibold text-gray-700">Role:</span>{' '}
          <span className="text-gray-800">{singleJob?.title}</span>
        </p>

        <p>
          <span className="font-semibold text-gray-700">Location:</span>{' '}
          <span className="text-gray-800">{singleJob?.location}</span>
        </p>

        <p>
          <span className="font-semibold text-gray-700">Description:</span>{' '}
          <span className="text-gray-800">{singleJob?.description}</span>
        </p>

        <p>
          <span className="font-semibold text-gray-700">Experience:</span>{' '}
          <span className="text-gray-800">
            {singleJob?.experienceLevel} year
          </span>
        </p>

        <p>
          <span className="font-semibold text-gray-700">Salary:</span>{' '}
          <span className="text-gray-800">{singleJob?.salary} LPA</span>
        </p>

        <p>
          <span className="font-semibold text-gray-700">Total Applicants:</span>{' '}
          <span className="text-gray-800">
            {singleJob?.applications?.length} Applicants
          </span>
        </p>

        <p>
          <span className="font-semibold text-gray-700">Posted Date:</span>{' '}
          <span className="text-gray-800">
            {singleJob?.createdAt?.split('T')[0]}
          </span>
        </p>
      </div>
    </div>
  );

}

export default JobDescription







































