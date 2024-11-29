import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Popover, PopoverTrigger, PopoverContent } from '../ui/popover'
import { Edit2, Eye, MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { toast } from 'sonner'
import axios from 'axios'
import { APPLICATION_API_END_POINT } from '@/utils/constant'




const shortListingStatus = ["Accepted", "Rejected"];

const ApplicationsTable = () => {
    const { applicants } = useSelector(store => store.application);
    const statusHandler =async(status,id)=>{
        try{
            const res = await axios.post(`${APPLICATION_API_END_POINT}/status/${id}/update`,{status},{
                withCredentials:true

                });
                if(res.data.success){
                    toast.success(res.data.message);
                }
        }catch(error){
            toast.error(error.response.data.message);

        }
    }

    return (
        <div>
            <Table>

                <TableCaption>
                    A List Of Your Recent Job Applicants
                </TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Full Name  </TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Contact </TableHead>
                        <TableHead>Resume</TableHead>
                        <TableHead>Date </TableHead>
                        <TableHead className="text-right" >ACTION</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>

                    {
                        applicants && applicants?.applications?.map((item) => (
                            <tr key={item._id} >
                                <TableCell>{item?.applicant?.fullname}</TableCell>
                                <TableCell>{item?.applicant?.email}</TableCell>
                                <TableCell>{item?.applicant?.phoneNumber}</TableCell>
                                <TableCell>
                                    {item?.applicant?.profile?.resume ? (
                                        <a
                                            href={item?.applicant?.profile?.resume}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {item?.applicant?.profile?.resumeOriginalName}
                                        </a>
                                    ) : (
                                        "No resume available"
                                    )}
                                </TableCell>
                                <TableCell className="text-blue-600 cursor-pointer" >{new Date(item?.applicant?.createdAt).toLocaleDateString()}</TableCell>
                                <TableCell className="text-right" >

                                    <Popover  >
                                        <PopoverTrigger> <MoreHorizontal /> </PopoverTrigger>
                                        <PopoverContent className="w-32 bg-white" >

                                            {
                                                shortListingStatus.map((status, index) => {
                                                    return (
                                                        <div onClick={()=>statusHandler(status,item?._id)}  key={index} className='flex w-fit my-2 items-center cursor-pointer'>
                                                            <span>{status}</span>

                                                        </div>
                                                    )
                                                })
                                            }
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </tr>
                        ))
                    }

                </TableBody>
            </Table>


        </div>
    )
}

export default ApplicationsTable


