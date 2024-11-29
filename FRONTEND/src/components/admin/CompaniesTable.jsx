
import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Avatar } from '@radix-ui/react-avatar'
import { AvatarImage } from '../ui/avatar'
import { Popover, PopoverTrigger, PopoverContent } from '../ui/popover'
// import { PopoverContent } from '@radix-ui/react-popover'
import { Edit2, MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const CompaniesTable = () => {

    const { companies, searchCompanyByText } = useSelector(store => store.company);
    const [filterCompany, setFilterCompany] = useState(companies);
    const navigate = useNavigate();

    useEffect(() => {
        const filteredCompany = companies.length >= 0 && companies.filter((company) => {
            if (!searchCompanyByText) {
                return true
            };
            return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());

        });

        setFilterCompany(filteredCompany)
    }, [companies, searchCompanyByText])

    return (
        <div>
            <Table>

                <TableCaption>
                    A List Of Your Recent Register Companies
                </TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>LOGO</TableHead>
                        <TableHead>NAME</TableHead>
                        <TableHead>DATE</TableHead>
                        <TableHead className="text-right" >ACTION</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>


                    {

                        filterCompany?.map((company) => (

                            <tr>


                                <TableCell>
                                    <Avatar>
                                        <AvatarImage className='w-19 h-9 rounded-full object-cover' src={company.logo} />
                                    </Avatar>
                                </TableCell>
                                <TableCell>{company.name}</TableCell>
                                <TableCell> {company.createdAt.split("T")[0]}</TableCell>
                                <TableCell className="text-right" >
                                    <Popover>
                                        <PopoverTrigger> <MoreHorizontal /> </PopoverTrigger>

                                        <PopoverContent className='w-32' >
                                            <div onClick={()=>navigate(`/admin/companies/${company?._id}`)}  className='flex items-center gap-2 w-fit cursor-pointer'>
                                                <Edit2 className='w-4' />
                                                <span>Edit</span>
                                            </div>

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

export default CompaniesTable


