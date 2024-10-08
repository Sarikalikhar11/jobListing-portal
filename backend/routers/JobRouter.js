import {
    createJob , updateJob, deleteJob, getJob, getAllJobs, getAdminJobs
} from "../controllers/JobController.js"

import express from "express";
import authenticateToken from "../middleware/authenticateToken.js";

const JobRouter = express.Router(); 

JobRouter.post("/create", authenticateToken, createJob);
JobRouter.get("/get/:id",authenticateToken, getJob);
JobRouter.get("/get",authenticateToken, getAllJobs);
JobRouter.get("/getAdminJobs/:id",authenticateToken, getAdminJobs);
JobRouter.put("/update", authenticateToken ,updateJob);
JobRouter.delete("/delete/:id", authenticateToken, deleteJob);


export default JobRouter;