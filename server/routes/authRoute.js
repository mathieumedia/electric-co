import jwt from 'jsonwebtoken'

export function userAuth(req, res, next){
    // Check for the token
    const token = req.header('x-auth-token')

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

export function adminAuth(req, res, next){
        // Check for the token
    const token = req.header('x-auth-token')

    // check if there is no token
    if(!token) return res.status(401).json({message: 'No Token, authorization denied.', type: 'error'})

    // Verify Token
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if(decoded.isAdmin === 'false'){
            return res.status(401).json({message: "Unauthorized Access", type: 'error'})
        }
        req.user = decoded;
        next()
    }catch(err){
        res.status(401).json({message: 'Token is not valid', type: "error"})
    }
}