const jwt = require("jsonwebtoken");

const checkCustomer = (req,res,next)=>{
    var id
    req.body.appId?id=req.body.appId:id=req.params.appId
    if(id === process.env.ID){
        return next()
    }else{
        res.send({appId:false})
    }
}

const checkToken = async (req, res,next) => {
    const data = req.body;
    try {
      const result = await jwt.verify(data.token, data.JWT_SECRET);
      result ? next() : res.send({ tokenError: "true" }) 
    } catch (error) {
      res.send({ tokenError: "true" });
    }
  };

module.exports = {checkCustomer,checkToken}
    
