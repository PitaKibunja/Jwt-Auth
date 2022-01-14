const JWT=require("jsonwebtoken")
module.exports = async (req, res, next) => {
    const token = req.header('x-auth-token')
    
    //check if the token is present
    if (!token) {
        return res.status(400).json({
            status: 'failure',
            msg:"No token found"
        })
    }

    //validate the token received
    try {
        let user= await JWT.verify(token,"kenyaisoursnobodykantunyaus")
        req.user = user.email 
        next()

    } catch (error) {
        return res.status(400).json({
            status: 'failure',
            msg:"Token invalid"
        })
    }
}
