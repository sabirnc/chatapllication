const jwt = require("jsonwebtoken")



const requireAuth = async (req, res, next) => {

    const { authorization } = req.headers

    if(!authorization){
        return res.status(401).json({error:"Autherization required"})
    }

    const token = authorization.split(" ")[1]

    try{
      const { _id } = jwt.verify(token , process.env.secret_key)
      req.user = _id
      next()

    }catch(err){
        console.log(err)
        res.status(401).json({error:"Request is not authorized"})
    }
}

module.exports = requireAuth