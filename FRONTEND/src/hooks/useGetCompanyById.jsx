import { setSingleCompany } from '@/redux/companySlice'

import { COMPANY_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import  { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const useGetCompanyById = (companyId) => {
    const dispatch=useDispatch();
    const navigate = useNavigate()
    useEffect(() => {
        const fetchSingleCompany = async () => {
            try {
                const res = await axios.get(`${COMPANY_API_END_POINT}/get/${companyId}`,{withCredentials:true} );
            //    console.log('GET COMPANY BY ID ',res.data.company)
                if(res.data.success){
                    dispatch(setSingleCompany(res.data.company));

                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchSingleCompany();

    },[companyId,dispatch])

}

export default useGetCompanyById
