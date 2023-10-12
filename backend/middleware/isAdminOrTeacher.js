const isAdminOrTeacher = (req, res, next)=>{
    if(req.user.role=="teacher" || req.user.role=="admin"){
        next()
    }else{
        res.status(401).send({ error: "Access Denied" })
    }
}

module.exports = isAdminOrTeacher;