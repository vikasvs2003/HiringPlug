import React, { useState } from 'react'
import { Dialog, DialogHeader, DialogContent, DialogTitle, DialogFooter } from './ui/dialog'
// import { DialogContent, DialogTitle } from '@radix-ui/react-dialog'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Loader2 } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '@/redux/authslice'
import { toast } from 'sonner'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'

const UpdateProfileDialogue = ({ open, setOpen }) => {
    const [loading ,setLoading] = useState(false);
    const {user}=useSelector(store=>store.auth)
    const [input,setInput]=useState({
        fullname:user?.fullname,
        email:user?.email,
        phoneNumber:user?.phoneNumber,
        bio:user?.profile.bio,
        skills:user?.profile?.skills?.map(skill=>skill),
        file:user?.profile?.resume
    });

    const dispatch = useDispatch();


    const changeEventHandler = (e)=>{
        setInput({...input,[e.target.name]:e.target.value});
    }
    const fileChangeHandler = (e) =>{
        const file = e.target.files ?.[0];
        setInput({...input,file})
    }

    const submitHandler = async (e) =>{
        e.preventDefault();
        const formData = new FormData();
        formData.append("fullname",input.fullname);
        formData.append("email",input.email);
        formData.append("phoneNumber",input.phoneNumber);
        formData.append("bio",input.bio);
        formData.append("skills",input.skills);
        if(input.file){
            formData.append("file",input.file)
        }

        try {
            setLoading(true);
            const res= await axios.post(`${USER_API_END_POINT}/profile/updateProfile`,formData,{
                headers:{
                    'content-type':'multipart/form-data'

                },withCredentials:true
            })
            if(res.data.success){
                dispatch(setUser(res.data.user));
                console.log(res.data);

                toast.success("ho gaya ",res.data.message);
            }
        }catch(error){
                // console.log(error);
                console.log("console error ",error.response);

                toast.error("not success",error.response.data.message)
        }finally{
            setLoading(false);
        }
        setOpen(false);
        console.log(input)
    }
    return (
        <div>
            <Dialog open={open}  >
                <DialogContent className="bg-white   p-6 sm:max-w-[425px]" onInteractOutside = {() => setOpen(false)} >
                    <DialogHeader>
                        <DialogTitle> Update Profile  </DialogTitle>
                    </DialogHeader>
                    <form onSubmit={submitHandler} >
                        <div className='grid gap-4 py-4' >

                            <div className='grid grid-cols-4 items-center gap-4' >
                                <Label htmlfor="name" className="text-right"> Name</Label>
                                <Input
                                    id="fullname"
                                    name="fullname"
                                    type="text"
                                    value={input.fullname}
                                    onChange={changeEventHandler}
                                    className="col-span-3" />
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4' >
                                <Label htmlfor="email" className="text-right"> email</Label>
                                <Input
                                    id="email "
                                    name="email"
                                    value={input.email}
                                    type="email"
                                    onChange={changeEventHandler}
                                    className="col-span-3" />
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4' >
                                <Label htmlfor="phoneNumber" className="text-right"> phoneNumber</Label>
                                <Input
                                    id="phoneNumber "
                                    name="phoneNumber"
                                    value={input.phoneNumber}
                                    onChange={changeEventHandler}
                                    className="col-span-3" />
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4' >
                                <Label htmlfor="bio" className="text-right"> Bio</Label>
                                <Input
                                    id="bio "
                                    name="bio"
                                    value={input.bio}
                                    onChange={changeEventHandler}
                                    className="col-span-3" />
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4' >
                                <Label htmlfor="skills" className="text-right"> Skills</Label>
                                <Input
                                    id="skills "
                                    name="skills"
                                    value={input.skills}
                                    onChange={changeEventHandler}
                                    className="col-span-3" />
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4' >
                                <Label htmlfor="file" className="text-right"> Resume</Label>
                                <Input
                                    id="file"
                                    name="file"
                                    type="file"
                                    onChange={fileChangeHandler}
                                    accept="application/image"
                                    
                                    className="col-span-3" />
                            </div>
                            
                        </div>

                        <DialogFooter>
                        {
                        loading ? <Button className="w-full my-4" > <Loader2 className="mr-2 h-4 w-4 animate-spin" />please wait  </Button> :
                            <Button
                                className="w-full my-4 bg-green-400 hover:bg-[gray-500]"
                                type="submit"
                            >
                                Update
                            </Button>
                    }

                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default UpdateProfileDialogue
