import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
    name:"job",
    initialState:{
        alljobs:[],
        allAdminJobs:[],
        singleJob:null,
        searchJobByText:"",
        allAppliedJobs:[],
        searchQuery:"",

    },
    reducers:{
        //actions
        setAllJobs:(state,action)=>{
            state.allJobs=action.payload;
        },
        setSingleJob:(state,action)=>{
            state.singleJob=action.payload
        },
        setAllAdminJobs:(state,action)=>{
            state.allAdminJobs=action.payload
        },
        setSearchJobByText:(state,action)=>{
            state.searchJobByText=action.payload
        },
        setAllAppliedJobs:(state,action)=>{
            // console.log("Setting applied jobs:", action.payload);//debug payload
            state.allAppliedJobs=action.payload;
        },
        setSearchQuery:(state,action)=>{
            state.searchQuery=action.payload;
        }
    }

})

export const {
    setAllJobs,
    setSingleJob,
    setAllAdminJobs ,
    setSearchJobByText,
    setAllAppliedJobs,
    setSearchQuery}=jobSlice.actions;

export default jobSlice.reducer;