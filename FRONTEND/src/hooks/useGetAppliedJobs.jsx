import { setAllAppliedJobs } from "@/redux/jobslice";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetAppliedJobs=()=>{
    const dispatch = useDispatch();
    useEffect(()=>{
        const fetchAppliedJobs=async()=>{
                try{
                    const res=await axios.get(`${APPLICATION_API_END_POINT}/get`,{withCredentials:true});
                    // http://localhost:8000/api/v1/applyapplication/get
                    console.log("API Response:", res.data); // Debug the response
                    if(res.data.success){
                        dispatch(setAllAppliedJobs(res.data.application));

                    }
                }catch(error){
                    console.log(error);
                }

        }
        fetchAppliedJobs();
    },[])
}

export default useGetAppliedJobs;