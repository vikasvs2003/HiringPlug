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

      <div className="max-w-4xl mx-auto my-10 p-8 bg-white rounded-2xl shadow border border-gray-200">
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center gap-5">
            <Avatar className="w-16 h-16 rounded-full">
              <AvatarImage
                className="w-16 h-16 rounded-full object-cover"
                alt="profile"
                src={user?.profile?.profilePhoto}
              />
            </Avatar>
            <div>
              <h1 className="text-2xl font-semibold text-gray-800">{user?.fullname}</h1>
              <p className="text-sm text-gray-500">{user?.profile?.bio}</p>
            </div>
          </div>

          <Button onClick={() => setOpen(true)} variant="outline">
            Edit Profile <Pen className="ml-2 h-4 w-4" />
          </Button>
        </div>

        <div className="space-y-3 text-gray-700 mb-6">
          <div className="flex items-center gap-2">
            <Mail className="text-gray-500 w-4 h-4" />
            <span>{user?.email}</span>
          </div>
          <div className="flex items-center gap-2">
            <Contact className="text-gray-500 w-4 h-4" />
            <span>{user?.phoneNumber}</span>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-800">Skills</h2>
          <div className="flex flex-wrap gap-2 mt-2">
            {user?.profile?.skills.length !== 0 ? (
              user?.profile?.skills.map((skill, index) => (
                <Badge key={index} className="bg-gray-100 text-gray-800">
                  {skill}
                </Badge>
              ))
            ) : (
              <span className="text-gray-500">N/A</span>
            )}
          </div>
        </div>

        <div className="mb-6">
          <Label className="text-md font-bold">Resume</Label>
          {isResume && user?.profile?.resume ? (
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={user?.profile?.resume}
              className="block text-blue-600 hover:underline mt-1 text-sm"
            >
              {user?.profile?.resumeOriginalName}
            </a>
          ) : (
            <span className="text-gray-500">N/A</span>
          )}
        </div>
      </div>

      <div className="max-w-4xl mx-auto my-10 bg-white border border-gray-200 rounded-2xl p-6 shadow">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">🗂️ Applied Jobs</h2>
        <AppliedJobTable />
      </div>

      <UpdateProfileDialogue open={open} setOpen={setOpen} />
      <Footer />
    </div>
  );
}

export default Profile
