import jwt from "jsonwebtoken"

const verifyToken = (req, res, next) => {
    console.log(req.cookies)
    const token = req.cookies.access_token
    if(!token) return res.status(401).send("You aren't author")
    const verify = jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
        if(err) next("You aren't author")
        req.user = user
        next()
    })

} 

export {verifyToken}