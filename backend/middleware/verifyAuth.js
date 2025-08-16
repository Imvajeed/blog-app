import jwt from 'jsonwebtoken'

const JWT_KEY = process.env.JWT_KEY;
const verifyAuth = async(req,res,next)=>{
    const accessToken = req.headers.bearer;
    if(accessToken){
        try{
            const verified = jwt.verify(accessToken,JWT_KEY);
        if(verified){
            req.userInfo = verified;
            next();
        }else{
            return res.status(401).json({error:"Invalid token or expired token"});
        }
        }catch(e){
            return res.status(401).json({error:"token expired"});
        }
    }else{
        return res.status(401).json({error:'token missing'});
    }
}

export default verifyAuth;