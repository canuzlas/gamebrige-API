const checkCustomer = (req,res,next)=>{
    var id
    req.body.appId?id=req.body.appId:id=req.params.appId
    if(id === process.env.ID){
        return next()
    }else{
        res.send({appId:false})
    }
}

module.exports = {checkCustomer}
    
