// MiddleWare To Add User Object to every Request

const config = require('../config');
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    if(req.get('Authorization')){
        token = req.get('Authorization').split(' ')[1];
        try{
            const paylaod = jwt.verify(token, config.JWT.KEY);
            if(paylaod){
                const id = paylaod.id;
                const role = paylaod.role;
                req.user = {
                    id: id,
                    role: role
                };
            }
        }
        catch(error){
            next();
        }
    }    
    next();
}