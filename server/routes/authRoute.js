import jwt from 'jsonwebtoken'

export default function (req, res, next){
    // Check for the token
    const token = req.header('x-auth-token')

    //console.log("token", token)

    // check if there is no token
    if(!token) return res.status(401).json({message: 'No Token, authorization denied.', type: 'error'})

    // Verify Token
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next()
    }catch(err){
        res.status(401).json({message: 'Token is not valid', type: "error"})
    }
}