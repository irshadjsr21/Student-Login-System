const jwt = require('jsonwebtoken');
const config = require('./config');

module.exports = {
    // Returns An Array Of Error Messages
    extractMongooseErrorMsg: (error) => {
        const errors = error.errors;
        const errorMsg =[];
        for(let key in errors){
            // if(key === "class"){
            //     continue;
            // }
            if(errors.hasOwnProperty(key)){
                if(errors[key].hasOwnProperty('message')){
                    if(errors[key]['message'].includes("Validation")){
                        continue;
                    }
                    errorMsg.push(errors[key]['message'])
                }
            }
        }
        return errorMsg;
    },

    // Returns Signed JWT
    signJwt: async (id, role, cb) => {
        jwt.sign({
            id: id,
            role: role
        },
        config.JWT.KEY,
        {
            expiresIn: config.JWT.EXP
        },
        (error, token) => {
            if(error){
                console.log(error);
                return cb(error);
            }
            else{
                return cb(null, token);
            }
        });
    }
}