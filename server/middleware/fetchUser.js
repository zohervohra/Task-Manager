const jwt = require('jsonwebtoken');
// get my jwt secret from env
const JWT_SECRET = process.env.JWT_SECRET


fetchUser = (req , res  , next) => {
    try{
        const token = req.header('auth-token')
        console.log(token)
        if(!token){
           return res.status(401).send({error : "please authenticate using valid token 1"})
        }
        // get the user from the jwt token and add id to req object 
       const data = jwt.verify(token , JWT_SECRET)
       console.log(data)
        req.user = data
        
  
        next();
    }
   
   
    catch {
      return  res.status(401).send({error : "please authenticate using valid token 2"})
    }
   
}

module.exports = fetchUser
