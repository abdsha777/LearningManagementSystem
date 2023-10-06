const isAdmin= (req, res, next)=>{
    if(req.user.role!="admin"){
        res.status(401).send({ error: "Access Denied" })
    }else{
        next()
    }
}

module.exports = isAdmin;