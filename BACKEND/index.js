import express from "express";
import cookieParser from "cookie-parser"
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js"
import companyRoute from "./routes/company.route.js"
import jobRoute from "./routes/job.route.js"
import applicationRoute from "./routes/application.route.js"
import path from "path";                 //hosting


dotenv.config({});

const __dirname=path.resolve();              //hosting
console.log(__dirname);                      //hosting

const app = express();


//MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
const corsOptions ={
    origin:process.env.URL,
    credentials:true,
}
app.use(cors(corsOptions));


app.get("/home",(req,res)=>{
    return res.status(200).json({
        message:" i am coming from backend ",
        success:true
    })
})

//APIS 
app.use("/api/v1/user",userRoute);
app.use("/api/v1/company",companyRoute);
app.use("/api/v1/job",jobRoute);
app.use("/api/v1/applyapplication",applicationRoute);

app.use(express.static(path.join(__dirname,"/FRONTEND/dist")))      
app.get("*",(req,res)=>{                                               
    res.sendFile(path.resolve(__dirname,"FRONTEND","dist","index.html"))              
})             


const PORT= process.env.PORT || 3000;
app.listen(PORT,()=>{
    connectDB();
    console.log(`server running at port  ${PORT}`);
    
})
// console.log(__dirname);