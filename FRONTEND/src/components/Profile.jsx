import React, { useState } from 'react'
import Navbar from './shared/Navbar'
import { Avatar, AvatarImage } from '@radix-ui/react-avatar'
import { Button } from './ui/button'
import { Contact, Mail, Pen } from 'lucide-react'
import { Badge } from './ui/badge'
import { Label } from './ui/label'
import AppliedJobTable from './AppliedJobTable'
import UpdateProfileDialogue from './UpdateProfileDialogue'
import { useSelector } from 'react-redux'
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs'
import Footer from './shared/Footer'


// const skills = ["html", "csss", "javascript", "shadcn/ui", "redux", "react"];
const isResume = true;


const Profile = () => {
    useGetAppliedJobs();//hook calling 
    const [open, setOpen] = useState(false);
    const { user } = useSelector(store => store.auth);


    return (
        <div>
            <Navbar />

            <div className='max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8' >

                <div className='flex justify-between' >

                    <div className='flex items-center gap-4' >
                        <Avatar className='w-19 h-9 rounded-full object-cover' >
                            <AvatarImage className='w-19 h-9 rounded-full object-cover' alt="profile" src={user?.profile?.profilePhoto} />
                        </Avatar>

                        <div>

                            <h1 className='font-medium text-xl ' >{user?.fullname}</h1>
                            <p>{user?.profile?.bio}</p>

                        </div>
                    </div>
                    <Button onClick={() => setOpen(true)} className=" text-right " variant="outl;ine" > Edit Profile  <Pen /> </Button>
                </div>

                <div className='my-5' >

                    <div className='flex gap-3 items-center my-2'>

                        <Mail />
                        <span> {user?.email} </span>
                    </div>

                    <div className='flex gap-3 items-center my-2 ' >

                        <Contact />
                        <span>{user?.phoneNumber}</span>
                    </div>
                </div>

                <div className='my-5' >
                    <h1>Skills</h1>
                    <div className='flex items-center gap-1 my-3 ' >
                        {
                            user?.profile?.skills.length != 0 ? user?.profile?.skills.map((item, index) => <Badge key={index} > {item} </Badge>) : <span> NA </span>
                        }
                    </div>

                </div>

                <div className='grid w-full max-w-sm items-center gap-1.5'>
                    <Label className="text-md font-bold ">Resume </Label>
                    {isResume ?
                        <a target="_blank" href={user?.profile?.resume} className=' cursor-pointer text-blue-500 w-full hover:underline'> {user?.profile?.resumeOriginalName} </a> : <span> NA </span>}

                </div>

            </div>
            <div className='max-w-4xl mx-auto bg-white rounded-2xlf' >
                <h1 className='font-bold text-lg my-5' >Applied jobs</h1>
                {/* application tables  */}
                <AppliedJobTable />
            </div>
            <UpdateProfileDialogue open={open} setOpen={setOpen} />
            <Footer />
        </div>
    )
}

export default Profile
