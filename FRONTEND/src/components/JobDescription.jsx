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


        <div className='max-w-7xl mx-auto my-10' >
            <Navbar />

            <div className='flex items-center justify-between' >
                <h1 className='font-bold text-xl ' >{singleJob?.title}</h1>
                <div className='flex items-center gap-2 mt-4'>
                    <Badge className={' text-blue-700 font-bold '} variant="ghost" >{singleJob?.position} Positions </Badge>
                    <Badge className={' text-[#F83002] font-bold '} variant="ghost" > {singleJob?.jobType}  </Badge>
                    <Badge className={' text-[#7209b7] font-bold '} variant="ghost" >{singleJob?.salary} LPA </Badge>
                </div>
                <Button

                    onClick={isApplied ? null : applyJobHandler}
                    disabled={isApplied}
                    className={` rounded-full  ${isApplied ? 'bg-gray-500 hover:bg-[gray-500] cursor-not-allowed' : ' bg-lime-600 hover:bg-[#296f29] '} `} >
                    {isApplied ? 'Already Applied  ' : "Apply Now "}
                </Button>
            </div>
            <h1 className='border-b-2 border-b-gray-300 font-medium py-4' >Job Description</h1>
            <div className='my-4' >
                <h1 className='font-bold my-1' >Role : <span className='pl-4 font-normal text-gray-800' >{singleJob?.title}</span></h1>
                <h1 className='font-bold my-1' >Location : <span className='pl-4 font-normal text-gray-800' >{singleJob?.location}</span></h1>
                <h1 className='font-bold my-1' >Description : <span className='pl-4 font-normal text-gray-800' > {singleJob?.description}</span></h1>
                <h1 className='font-bold my-1' >Experience : <span className='pl-4 font-normal text-gray-800' > {singleJob?.experienceLevel} year</span></h1>
                <h1 className='font-bold my-1' >Salary : <span className='pl-4 font-normal text-gray-800' > {singleJob?.salary} LPA</span></h1>
                <h1 className='font-bold my-1' >Total Applicants : <span className='pl-4 font-normal text-gray-800' > {singleJob?.applications?.length} Applicants</span></h1>
                <h1 className='font-bold my-1' >Posted Date : <span className='pl-4 font-normal text-gray-800' >{singleJob?.createdAt.split("T")[0]}</span></h1>

            </div>

        </div>
    )
}

export default JobDescription







































