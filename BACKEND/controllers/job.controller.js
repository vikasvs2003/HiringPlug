import { Job } from "../models/job.model.js";
//ADMIN POST JOB
// export const postJob=async (req,res)=>{
//     try{
//         const {title,description,requirements,salary,location,Jobtype,experience,position,companyId}=req.body;
//         const userId = req.id;

//         if((!title || !description || !requirements || !salary || !location || !Jobtype ||!experience || !position || companyId)){
//             return res.status(400).json({
//                 message : "something is missing bhaiu ",
//                 success:false,
//             })
//         }
//         const job = await Job.create({
//             title,
//             description,
//             requirements : requirements.split(" "),
//             salary:Number(salary),
//             location,
//             JobType:Jobtype,
//             experienceLevel:experience,
//             position,
//             company:companyId

//         });

//         return res.status(201).json({
//             message:"new job created",
//             job,
//             success:true
//         })
//     }catch(error){
//     console.log(error);
//     return res.status(500).json({
//         message: "Internal server error",
//         success: false
//     });
//     }
// }


export const postJob = async (req, res) => {
    try {
        const { title, description, requirements, salary, location, jobtype, experience, position, companyId } = req.body;
        const userId = req.id;
        console.log("kaisa hai bhai ",req.body)

        // Check if any required field is missing
        if (!title || !description || !requirements || !salary || !location || !jobtype || !experience || !position || !companyId) {
            return res.status(400).json({
                message: "something is missing bhaiu",
                success: false,
            });
        }

        // Create new job with the received data
        const job = await Job.create({
            title,
            description,
            requirements: requirements.split(" "), // Convert string to array
            salary: Number(salary),  // Ensure salary is a number
            location,
            jobType: jobtype, // Correct field name
            experienceLevel: experience,
            position,
            company: companyId,
            created_by: userId  // Ensure the job is created by the current user
        });

        // Respond with the newly created job
        return res.status(201).json({
            message: "new job created",
            job,
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

//STUDENTS

export const getAllJobs =async (req,res)=>{
    try{
        const keyword = req.query.keyword || "";
        const query = {
            $or:[
                {title:{$regex:keyword,$options:"i"}},
                {description:{$regex:keyword,$options:"i"}}

            ]
        };

        const jobs=await Job.find(query).populate({
            path:"company"
        }).sort({createdAt:-1});
        if(!jobs){
            return res.status(404).json({
                message:"job not found",
                success:false
            })
        }
        return res.status(200).json({
            jobs,
            success:true
        })
    }catch(error){
        console.log(error);
    }
}
//STUDENTS 
export const getJobById=async(req,res)=>{
    try{
        const jobId =req.params.id;
        const job= await Job.findById(jobId).populate({
            path:"applications"
        });

        if(!job){
            return res.status(404).json({
                message:"job not found",
                success:false
            })
        }
        return res.status(200).json({
            job,
            success:true
        })
    }catch(error){
        console.log(error);
    }
}
//ADMIN KITNE JOB CREATE KARA HAI ABHI TAK 
export const getAdminJobs = async(req,res)=>{
    try{
        const adminId= req.id;
        const jobs = await Job.find({created_by:adminId}).populate({
            path:'company',
            createdAt:-1
        });
        if(!jobs){
            return res.status(404).json({
                message:"jobs not found",
                success:false
            }) 
            
        };
        return res.status(200).json({
            jobs,
            success:true
        })

    }catch(error){
            console.log(error);
    }
}

