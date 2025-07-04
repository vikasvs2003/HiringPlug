import React from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel'
import { Button } from './ui/button'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setSearchQuery } from '@/redux/jobslice'


const category = [
    "fronted developer ",
    "backend developer ",
    "mern stack developer ",
    "fullstack developer ",
    "fronted developer ",
    "backend developer ",
    "mern stack developer ",
    "fullstack developer ",
]

function CategoryCarousel() {
    const dispatch=useDispatch()
    const navigate=useNavigate();
        const searchJobHandler=(query)=>{
            dispatch(setSearchQuery(query));
            navigate("/browse")
        
        }
    
    
    // return (
    //     <div>
    //         <Carousel className=" w-full max-w-xl mx-auto my-20 " >
    //             <CarouselContent>
    //                 {
    //                     category.map((cat, index) => (
    //                         <CarouselItem className=" md:basis-1/2 lg-basis-1/3" >
    //                             <Button onClick={()=>searchJobHandler(cat)}  variant="outline" className=" rounded-full  " >
    //                                 {cat}
    //                             </Button>
    //                         </CarouselItem>

    //                     ))
    //                 }

    //             </CarouselContent>
    //             <CarouselPrevious />
    //             <CarouselNext />
    //         </Carousel>
    //     </div>
    // )

return (
    <div className="max-w-5xl mx-auto px-4 my-12">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Trending roles:</h2>
      <Carousel className="w-full">
        <CarouselContent className="flex gap-4">
          {category.map((cat, index) => (
            <CarouselItem
              key={index}
              className="md:basis-1/3 lg:basis-1/4 flex-shrink-0"
            >
              <Button
                onClick={() => searchJobHandler(cat)}
                variant="outline"
                className="rounded-full bg-gray-100 hover:bg-gray-200 text-gray-800 px-5 py-2 w-full"
              >
                {cat}
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="-left-6" />
        <CarouselNext className="-right-6" />
      </Carousel>
    </div>
  );

}

export default CategoryCarousel
