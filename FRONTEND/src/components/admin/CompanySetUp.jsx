import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'sonner'
import { useSelector } from 'react-redux'
import useGetCompanyById from '@/hooks/useGetCompanyById'


// const CompanySetUp = ({ singleCompany })
const CompanySetUp = () => {
    const params=useParams();
    useGetCompanyById(params.id);
    const [input, setInput] = useState({
        name: "",
        description: "",
        website: "",
        location: "",
        file: null
    });
    const {singleCompany} = useSelector(store=>store.company);
    // console.log('Redux state - singleCompany:', singleCompany);
    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }
    const changeFileHandler = (e) => {
        const file = e.target.files?.[0];
        console.log("Selected file:", file);
        setInput({ ...input, file })

    }

    const [loading,setLoading] = useState(false);
    const navigate=useNavigate()

    const submitHandler= async (e)=>{
        e.preventDefault();
        const formData = new FormData();
        formData.append("name",input.name);
        formData.append("description",input.description);
        formData.append("website",input.website);
        formData.append("location",input.location);
        if(input.file){
            formData.append("file",input.file)
        }

        try{
            setLoading(true);
            const res = await axios.put(`${COMPANY_API_END_POINT}/update/${params.id}`,formData,{
                headers:{
                    "Content-Type":"multipart/form-data"

                },withCredentials:true
            });
            if(res.data.success){
                toast.success(res.data.message);
                navigate("/admin/companies")
            }

        }catch(error){
            console.log(error);
            toast.error(error.rsponse.data.message)
        }
        finally{
            setLoading(false)
        }

    }

    useEffect(()=>{
        if(singleCompany){
        setInput({
        name:singleCompany.name || "",
        description:singleCompany.description ||  "",
        website:singleCompany.website ||  "",
        location:singleCompany.location ||  "",
        file: singleCompany.file || null
        })
    }
    },[singleCompany]);

    // if (!singleCompany) {
    //     return <div>Loading company data...</div>;
    // }


    return (
        <div>
            <Navbar />

            <div className='max-w-xl mx-auto my-10' >
                <form onSubmit={submitHandler} >
                    <div className='flex  items-center justify-between gap-5 p-8'>
                        <Button  onClick={()=> navigate("/admin/companies")} variant="outline" className="flex item-center gap-2 text-gray-500 font-semibold" >
                            <ArrowLeft />
                            <span>Back</span>
                        </Button>
                        <h1 className='font-bold text-xl ' >Company setup </h1>

                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label>
                                Company Name
                            </Label>
                            <Input
                                type="text"
                                name="name"
                                value={input.name}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div>
                            <Label>
                                Company description
                            </Label>
                            <Input
                                type="text"
                                name="description"
                                value={input.description}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div>
                            <Label>
                                Company website
                            </Label>
                            <Input
                                type="text"
                                name="website"
                                value={input.website}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div>
                            <Label>
                                Company location
                            </Label>
                            <Input
                                type="text"
                                name="location"
                                value={input.location}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div>
                            <Label>
                                LOGO
                            </Label>
                            <Input
                                type="file"
                                accept="image/*"
                                onChange={changeFileHandler}
                            />
                        </div>
                    </div>


                    {
                        loading ? <Button className="w-full my-4" > <Loader2 className="mr-2 h-4 w-4 animate-spin" />please wait  </Button> :
                            <Button
                                className="w-full my-4 bg-green-500"
                                type="submit"
                            >
                                Update
                            </Button>

                    }

                </form>

            </div>
        </div>
    )
}

export default CompanySetUp
