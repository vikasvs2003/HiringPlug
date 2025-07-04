
import { Popover, PopoverTrigger, PopoverContent } from '@radix-ui/react-popover';
import React from 'react';
import { Button } from '../ui/button';
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { Avatar, AvatarImage } from '@radix-ui/react-avatar';
import { LogOut, User2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { USER_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import axios from 'axios';
import { setUser } from '@/redux/authslice';
// import store from './redux/store';


const Navbar = () => {

    const { user } = useSelector(store => store.auth)
    // console.log("Current user:", user);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const {user}=useSelector(store=>store.auth)
    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true })
            if (res.data.success) {
                dispatch(setUser(null));
                navigate("/");
                // toast.success(Response.data.message)
                toast.success("Logout successfully !  ")
            }

        } catch (error) {
            console.log(error);
            // toast.error("errro hai ",error.response.data.message);
            toast.error("Logout Not Successfull :) ");

        }

    }
    // return (
    //     <div className='bg-white'>
    //         <div className='flex items-center justify-between mx-auto max-w-7xl h-16'>
    //             <div>
    //                 <h1 className='text-2xl font-bold'>
    //                     Hiring <span className='text-[#F83002]'>Plug</span>
    //                 </h1>
    //             </div>

    //             <div  >
    //                 <ul className='flex font-medium items-center gap-5'>

    //                     {
    //                         user && user.role == 'recruiter' ? (
    //                             <>
    //                                 <li> <Link to="/admin/companies" > Companies</Link></li>
    //                                 <li> <Link to="/admin/jobs" > Jobs</Link></li>

    //                             </>
    //                         ) : (
    //                             <>

    //                                 <li> <Link to="/" > Home</Link></li>
    //                                 <li> <Link to="/Jobs" > Jobs</Link></li>
    //                                 <li> <Link to="/browse" > Browse</Link></li>


    //                             </>
    //                         )
    //                     }

    //                     {
    //                         !user ? (
    //                             <div className='flex items-center gap-2'>

    //                                 {/* <Link to="/jobs"> <Button className=" hover:bg-[#5b30a6] " > jobs</Button></Link> */}
    //                                 <Link to="/Login"> <Button variant="outline " className=" rounded-sm hover:bg-[#5b30a6] "> login</Button></Link>
    //                                 <Link to="/Signup"> <Button className="bg-[#6A38C2] hover:bg-[#5b30a6] " > signup</Button></Link>


    //                             </div>
    //                         ) : (

    //                             <Popover >
    //                                 <PopoverTrigger asChild>
    //                                     <Avatar className="cursor-pointer" >
    //                                         <AvatarImage className='w-9 h-9 rounded-full object-cover '
    //                                             src={user?.profile?.profilePhoto}
    //                                             alt="@shadcn"
    //                                         />

    //                                     </Avatar>
    //                                 </PopoverTrigger>
    //                                 <PopoverContent className='w-80 bg-white  '>
    //                                     <div>

    //                                         <div className='flex gap-2 space-y-2'>
    //                                             <Avatar className="cursor-pointer" >
    //                                                 <AvatarImage className='w-9 h-9 rounded-full object-cover '
    //                                                     src={user?.profile?.profilePhoto}
    //                                                     alt="@shadcn"
    //                                                 />
    //                                             </Avatar>
    //                                             <div>
    //                                                 <h4 className='font-medium text-lg text-gray-800 '  >{user?.fullname}</h4>
    //                                                 <p className='text-sm text-gray-500'> {user?.profile?.bio}</p>
    //                                             </div>
    //                                         </div>

    //                                         <div className='flex flex-col my-2 text-gray-600'>


    //                                             {
    //                                                 user && user.role == 'student' && (
    //                                                     <div className='flex w-fit items-center gap-2 cursor-pointer'>
    //                                                         <User2 />
    //                                                         <Button variant="link"> <Link to="/profile" > view profile </Link> </Button>
    //                                                     </div>

    //                                                 )

    //                                             }

    //                                             <div className='flex w-fit items-center gap-2 cursor-pointer'>
    //                                                 <LogOut />
    //                                                 <Button onClick={logoutHandler} variant="link">logout</Button>
    //                                             </div>

    //                                         </div>
    //                                     </div>

    //                                 </PopoverContent>
    //                             </Popover>

    //                         )
    //                     }

    //                 </ul>
    //             </div>
    //         </div>
    //     </div>
    // );



    return (
    <nav className="bg-white shadow-sm py-4 px-6">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold text-gray-900">
          Hiring<span className="text-[#0077B6]">Plug</span>
        </Link>

        {/* Links */}
        <div className="flex items-center gap-6">
          <ul className="hidden sm:flex gap-6 text-gray-700 font-medium">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/Jobs">Jobs</Link>
            </li>
            <li>
              <Link to="/browse">Browse</Link>
            </li>
          </ul>

          {!user ? (
            <div className="flex gap-2">
              <Link to="/Login">
                <Button variant="outline" className="rounded-md">
                  Login
                </Button>
              </Link>
              <Link to="/Signup">
                <Button className="bg-[#0077B6] hover:bg-[#023e8a] text-white rounded-md">
                  Sign Up
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage
                    className="w-9 h-9 rounded-full object-cover"
                    src={user?.profile?.profilePhoto || 'https://github.com/shadcn.png'}
                    alt={user?.fullname || '@user'}
                  />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-72 bg-white shadow-lg rounded-md p-4">
                <div className="flex gap-3 items-center mb-4">
                  <Avatar>
                    <AvatarImage
                      className="w-10 h-10 rounded-full object-cover"
                      src={user?.profile?.profilePhoto || 'https://github.com/shadcn.png'}
                      alt={user?.fullname || '@user'}
                    />
                  </Avatar>
                  <div>
                    <h4 className="font-semibold text-gray-800">{user?.fullname}</h4>
                    <p className="text-sm text-gray-500">{user?.profile?.bio || 'Job seeker'}</p>
                  </div>
                </div>

                <div className="flex flex-col gap-2 text-gray-600">
                  {user?.role === 'student' && (
                    <Link to="/profile" className="flex items-center gap-2 hover:text-gray-900">
                      <User2 size={18} /> View Profile
                    </Link>
                  )}

                  <button
                    onClick={logoutHandler}
                    className="flex items-center gap-2 text-red-600 hover:text-red-800"
                  >
                    <LogOut size={18} /> Logout
                  </button>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </nav>
  );




};

export default Navbar;


































// import { Popover, PopoverTrigger, PopoverContent } from '@radix-ui/react-popover';
// import React from 'react';
// import { Button } from '../ui/button';
// import { Link } from 'react-router-dom';
// import { Avatar, AvatarImage } from '@radix-ui/react-avatar';
// import { LogOut, User2 } from 'lucide-react';
// import { useSelector } from 'react-redux';
// // import { setLoading, setUser } from '@/redux/authslice';

// const Navbar = () => {
//     // Access the 'user' from the Redux store using useSelector
//     const { user } = useSelector((store) => store.auth);

//     return (
//         <div className='bg-white'>
//             <div className='flex items-center justify-between mx-auto max-w-7xl h-16'>
//                 <div>
//                     <h1 className='text-2xl font-bold'>
//                         job <span className='text-[#F83002]'>Portal</span>
//                     </h1>
//                 </div>

//                 <div>
//                     <ul className='flex font-medium items-center gap-5'>
//                         <li> <Link to="/" > Home</Link></li>
//                         <li> <Link to="/Jobs" > Jobs</Link></li>
//                         <li> <Link to="/browse" > Browse</Link></li>

//                         {
//                             !user ? (
//                                 <div className='flex items-center gap-2'>
//                                     <Link to="/Login">
//                                         <Button variant="outline" className="rounded-sm hover:bg-[#5b30a6]">
//                                             Login
//                                         </Button>
//                                     </Link>
//                                     <Link to="/Signup">
//                                         <Button className="bg-[#6A38C2] hover:bg-[#5b30a6]">
//                                             Sign up
//                                         </Button>
//                                     </Link>
//                                 </div>
//                             ) : (
//                                 <Popover>
//                                     <PopoverTrigger asChild>
//                                         <Avatar className="cursor-pointer">
//                                             <AvatarImage
//                                                 className='w-9 h-9 rounded-full object-cover'
//                                                 src={user.avatar || "https://github.com/shadcn.png"}  // Use user avatar if available
//                                                 alt={user.username || "@user"}  // Use username if available
//                                             />
//                                         </Avatar>
//                                     </PopoverTrigger>
//                                     <PopoverContent className='w-80'>
//                                         <div>
//                                             <div className='flex gap-2 space-y-2'>
//                                                 <Avatar className="cursor-pointer">
//                                                     <AvatarImage
//                                                         className='w-9 h-9 rounded-full object-cover'
//                                                         src={user.avatar || "https://github.com/shadcn.png"}
//                                                         alt={user.username || "@user"}
//                                                     />
//                                                 </Avatar>
//                                                 <div>
//                                                     <h4 className='font-medium text-lg text-gray-800'>{user.username}</h4>
//                                                     <p className='text-sm text-gray-500'>yaha par detail aayegi</p>
//                                                 </div>
//                                             </div>

//                                             <div className='flex flex-col my-2 text-gray-600'>
//                                                 <div className='flex w-fit items-center gap-2 cursor-pointer'>
//                                                     <User2 />
//                                                     <Button variant="link">Profile</Button>
//                                                 </div>

//                                                 <div className='flex w-fit items-center gap-2 cursor-pointer'>
//                                                     <LogOut />
//                                                     <Button variant="link">Logout</Button>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </PopoverContent>
//                                 </Popover>
//                             )
//                         }

//                     </ul>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Navbar;
