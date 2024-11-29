import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Description } from '@radix-ui/react-dialog'
import { Button } from '../ui/button'
import { useSelector } from 'react-redux'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '../ui/select'
import axios from 'axios'
import { JOB_API_END_POINT } from '@/utils/constant'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'


const companyArray = [];


const PostJob = () => {
    const [input, setInput] = useState({
        title: "",
        description: "",
        requirements: "",
        salary: "",
        location: "",
        jobtype: "",
        experience: "",
        position: 0,
        companyId: ""

    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    };
    const { companies } = useSelector(store => store.company)

    const selectChangeHandler = (value) => {
        const selectedCompany = companies.find((company) => company.name.toLowerCase() === value);
        setInput({ ...input, companyId: selectedCompany._id })

    }
    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await axios.post(`${JOB_API_END_POINT}/post`, input, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            });
            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/admin/jobs");
            }
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message);
        } finally {
            setLoading(false);
        }
    }
    return (
        <div>
            <Navbar />
            <div className='flex items-center justify-center w-screen my-5' >

                <form onSubmit={submitHandler} className='p-8 max-w-4xl border-gray-200 shadow-lg rounded-2xl' >
                    <div className='grid grid-cols-2 gap-10' >

                        <div>
                            <Label>Title</Label>
                            <Input
                                type="text"
                                name="title"
                                value={input.title}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0  focus-visible:ring-0 my-1"
                            />
                        </div>
                        <div>
                            <Label> Job Description</Label>
                            <Input
                                type="text"
                                name="description"
                                value={input.description}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0  focus-visible:ring-0 my-1"
                            />
                        </div>
                        <div>
                            <Label>Requirements</Label>
                            <Input
                                type="text"
                                name="requirements"
                                value={input.requirements}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0  focus-visible:ring-0 my-1"
                            />
                        </div>
                        <div>
                            <Label>Salary</Label>
                            <Input
                                type="Number"
                                name="salary"
                                value={input.salary}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0  focus-visible:ring-0 my-1"
                            />
                        </div>

                        <div>
                            <Label>Location</Label>
                            <Input
                                type="text"
                                name="location"
                                value={input.location}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0  focus-visible:ring-0 my-1"
                            />
                        </div>
                        <div>
                            <Label>jobtype</Label>
                            <Input
                                type="text"
                                name="jobtype"
                                value={input.jobtype}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0  focus-visible:ring-0 my-1"
                            />

                            {/* <Select
                                name="jobtype"
                                value={input.jobtype}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Job Type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Full Time" >Full Time</SelectItem>
                                    <SelectItem value="Part Time" >Part Time</SelectItem>
                                </SelectContent>

                            </Select> */}

                        </div>
                        <div>
                            <Label>Experience Level </Label>
                            <Input
                                type="Number"
                                name="experience"
                                value={input.experience}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0  focus-visible:ring-0 my-1"
                            />
                        </div>
                        <div>
                            <Label>Vacancy </Label>
                            <Input
                                type="Number"
                                name="position"
                                value={input.position}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0  focus-visible:ring-0 my-1"
                            />
                        </div>


                        {
                            companies.length > 0 && (
                                <Select onValueChange={selectChangeHandler} >
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Select a Company" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            {
                                                companies.map((company) => {
                                                    return (

                                                        <SelectItem key={company._id} value={company?.name.toLowerCase()} >{company.name}</SelectItem>
                                                    )
                                                })
                                            }

                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            )
                        }
                    </div>

                    {
                        loading ? <Button className="w-full my-4" > <Loader2 className="mr-2 h-4 w-4 animate-spin" />please wait  </Button> :
                            <Button
                                className="w-full my-4 bg-lime-300 hover:bg-lime-600"
                                type="submit"
                            >
                                Post New Job
                            </Button>

                    }
                    {
                        companies.length === 0 && <p className='text-xs  text-red-600 font-bold text-center my-3  '>*Please Register a Company First,before posting Job</p>
                    }
                </form>

            </div>
        </div>
    )
}

export default PostJob
