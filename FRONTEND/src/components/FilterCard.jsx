import { Label } from '@radix-ui/react-label'

import { RadioGroup, RadioGroupItem } from './ui/radio-group'

import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setSearchQuery } from '@/redux/jobslice'

const filterData =[
    {
        filterType:"location",
        array :["Delhi ncr" ,"Banglore","Hydrabad","Pune","Mumbai" ]
    },
    {
        filterType:"Industry",
        array :["Frontend Developer" ,"Backend Developer","FullStack Developer" ]
    },
    
    {
        filterType:"salary",
        array :["0-40k" ,"40k-200k","5lpa","10LPA","15LPA" ]
    },

]



const FilterCard = ()=> {
    const [selectedValue,setSelectedValue] = useState('');
    const dispatch=useDispatch()

    const changeHandler =(value)=>{
        setSelectedValue(value);
    }

    useEffect(()=>{
        dispatch(setSearchQuery(selectedValue));

    },[selectedValue])

  return (
    <div className='w-full bg-white p-3 rounded-md' >
      <h1 className='font-bold text-lg ' >Filter jobs </h1>
      <hr    className='mt-3' />
      <RadioGroup  value={selectedValue} onValueChange={changeHandler} >

     
        {
            filterData.map((item,index) =>(
                <div> 
                     <h1 className='font-bold text-lg' > {item.filterType} </h1>
                    {
                        item.array.map((item,idx) =>{
                            const itemId=`r${index}-${idx}`;
                            return(
                                <div className='flex  items-center space-x-2 my-2' >
                                    <RadioGroupItem id={itemId}  value={item}  />
                                    <Label htmlFor={itemId} >{item}</Label>
                                </div>
                            )
                        })
                    }
                </div>
            ))
        }

      </RadioGroup>
     
    </div>
  )
}

export default FilterCard
