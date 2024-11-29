import { setAllJobs } from '@/redux/jobslice'
import { JOB_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const useGetAllJobs = () => {
    const dispatch = useDispatch();
    // const {searchedQuery}=useSelector(store =>store.job);
    // console.log(searchedQuery);
    const { searchedQuery } = useSelector((store) => store.job);
    console.log("Redux searchedQuery:", searchedQuery);

    const navigate = useNavigate()
    useEffect(() => {
        const fetchAllJobs = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get`,{withCredentials:true} );
                // const res = await axios.get(`${JOB_API_END_POINT}/get?keyword=${searchedQuery}`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setAllJobs(res.data.jobs));

                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchAllJobs();

    }, [])

}

export default useGetAllJobs
