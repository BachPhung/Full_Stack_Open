import express from 'express';
import diagnosesServ from '../services/diagnosesServ';
const diagnoseRouter = express.Router()


diagnoseRouter.get('/', (_req,res)=>{
    const entries = diagnosesServ.getEntries()
    res.status(200).json(entries)
})

export default diagnoseRouter;
