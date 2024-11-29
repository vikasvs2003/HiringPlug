import { setAllAdminJobs, setAllJobs } from '@/redux/jobslice'
import { JOB_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import  { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const useGetAllAdminJobs = () => {
    const dispatch=useDispatch();
    
    useEffect(() => {
        const fetchAllAdminJobs = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/getadminjobs`,{withCredentials:true} );
                // api url - http://localhost:8000/api/v1/job/getadminjobs
                if(res.data.success){
                    dispatch(setAllAdminJobs(res.data.jobs));

                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchAllAdminJobs();

    },[])

}

export default useGetAllAdminJobs
