import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { RadioGroup } from "@/components/ui/radio-group"
import { Button } from '../ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { CloudCog, Loader, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setUser } from '@/redux/authslice';


const Login = () => {
    const [input, SetInput] = useState({
        email: "",
        password: "",
        role: ""
    });
    const { loading,user } = useSelector(store => store.auth)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const changeEventHandler = (e) => {
        SetInput({ ...input, [e.target.name]: e.target.value });

    }

    const SubmitHandler = async (e) => {
        e.preventDefault();
        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
                headers: {
                    "content-type": "application/json"
                }, withCredentials: true,
            });

            // console.log("yes yes",res.data.success);
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            // console.log(error);
            toast.error(error.response.data.message);

        }
        finally {
            dispatch(setLoading(false));
        }

    }
    useEffect(()=>{
        if(user){
            navigate("/");
        }
    },[])
    return (
        <div>
            <Navbar />
            Login page it is
            <div className='flex items-center justify-center max-w-7xl mx-auto'>
                <form onSubmit={SubmitHandler} className='w-1/2 border border-gray-200 rounded-md p-4 my-10'>
                    <h1 className='font-bold text-xl mb-5'>Login</h1>


                    <div className='my-2'>
                        <Label> E-mail</Label>
                        <Input
                            type="email"
                            value={input.email}
                            name="email"
                            onChange={changeEventHandler}
                            placeholder="Enter your Email id "
                        />
                    </div>


                    <div className='my-2'>
                        <Label> Password</Label>
                        <Input
                            type="password"
                            value={input.password}
                            name="password"
                            onChange={changeEventHandler}
                            placeholder="Enter Password"
                        />
                    </div>

                    <div className='flex items-center justify-between'>

                        <RadioGroup className="flex items-center gap-4 my-5">
                            <div className="flex items-center space-x-2">
                                <Input
                                    type='radio'
                                    name="role"
                                    value="student"
                                    checked={input.role === 'student'}
                                    onChange={changeEventHandler}
                                    className="cursor-pointer"
                                />

                                <Label htmlFor="r1">Student</Label>
                            </div>


                            <div className="flex items-center space-x-2">

                                <Input
                                    type='radio'
                                    name="role"
                                    value="recruiter"
                                    checked={input.role === 'recruiter'}
                                    onChange={changeEventHandler}
                                    className="cursor-pointer"
                                />

                                <Label htmlFor="r2">Recruiter</Label>
                            </div>

                        </RadioGroup>




                    </div>
                    {
                        loading ? <Button className="w-full my-4" > <Loader2 className="mr-2 h-4 w-4 animate-spin" />please wait  </Button> :
                            <Button
                                className="w-full my-4 bg-green-500"
                                type="submit"
                            >
                                Login
                            </Button>

                    }



                    <span className='text-sm'>don't have an account ?
                        <Link
                            to="/Signup"
                            className='text-blue-600'
                        >
                            signup
                        </Link>
                    </span>

                </form>
            </div>
        </div>
    )
}
export default Login;