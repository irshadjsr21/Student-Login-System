
// MiddleWare To Check If the User is Authorized

module.exports = (role) => {
    return (req,res,next) => {
        if(req.user && req.user.role === role){
            next();
        }
        else{
            res.status(401).json({
                msg: [
                    "Unauthorized User"
                ]
            });
        }
    }
}