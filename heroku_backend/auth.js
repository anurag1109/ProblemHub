var jwt = require('jsonwebtoken');
   
module.exports= function () {
    return{
          authenticate:(req, res, next)=>{
            if(req.headers.authorization){
                _verifyToken(req.headers.authorization.split(" ")[1],process.env.TOKEN_KEY)
                .then((data)=>{
                    if(data.status){
                      req.user=data.decoded;
                      next();
                    }else{
                        res.status(401).send({message:"Unauthorized access"})
                    }
                }).catch((err)=>{
                  res.status(401).send({message:"Unauthorized access"})
                })
            }else{
                res.status(401).send({message:"Unauthorized access"})
            } 
        },
        refresh:(req,res,next)=>{
          if(req.headers.authorization){
            _verifyToken(req.headers.authorization.slice(7),process.env.TOKEN_KEY+"REFRESH",{algorithm: 'HS256'})
            .then((data)=>{
                if(data.status){
                  req.user=data.decoded;
                  next();
                }else{
                    res.status(401).send({message:"Unauthorized access"})
                }
            }).catch((err)=>{
              res.status(401).send({message:"Unauthorized access"})
            })
        }else{
            res.status(401).send({message:"Unauthorized access"})
        } 
        },
        hasRoles:(RoleIds)=>{
            return (req,res,next)=>{
              let user=req.user;
              if(RoleIds.indexOf(user.role)!==-1){
                 next();
              }else{
                res.status(401).send({message:"You can not access this feature"});
              }
            }
        }
  }     
}
// process.env.TOKEN_KEY
_verifyToken = (token,secret) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        resolve({ status: false });
      } else {
        resolve({ status: true, decoded: decoded });
      }
    });
  });
};
