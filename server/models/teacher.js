const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const TeacherSchema = mongoose.Schema({
    firstname: {
        type: String,
        required: [true, "Firstname Is Required"]
    },
    lastname: {
        type: String,
    },
    classes: {
        type: [String],
        required: [true, "Class is Required"]
    },
    email: {
        type: String,
        required: [true, "Email is Required"],
        unique: [true, "Email Already Exist"],
        match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    },
    password: {
        type: String,
        required: [true, "Password Is Required"]
    }
}, 
{
    timestamps: true
});

TeacherSchema.pre('save', (next) => {
    if(this.isModified('password') || this.isNew){
        bcrypt.genSalt(10, (error, salt) => {
            if(error){
                console.log(error);
                return next(error);
            }
            else {
                bcrypt.hash(this.password, salt , (error, hash) => {
                    if(error){
                        console.log(error);
                        return next(error);
                    }
                    else {
                        this.password = hash;
                        return next();
                    }       
                });
            }
        });
    }
    else {
        return next();
    }
})

TeacherSchema.methods.verifyPassword = async function (pass, cb) {
    bcrypt.compare(pass, this.password, (error, result) => {
        if (error){
            return cb(error);
        }
        else{
            return cb(null, result);
        }
    });
}

let Teacher = module.exports = mongoose.model('Teacher', TeacherSchema);

