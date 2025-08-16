import { timeStamp } from 'console';
import fs from 'fs'

export const logRequest = async (req,res,next)=>{
    const log = `${Date.now()} : ${req.ip} : ${req.host} : ${req.url} \n`;
    fs.appendFile('request.logs',log,(err)=>{
        if(err){
            console.log("error while writing logs file",err);
        }
    });
    next();
}

export default logRequest;