const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const enu = {
    values: ['A', 'B', 'C', 'D', 'E']
  , message: 'Invalid Section'
}

const StudentSchema = mongoose.Schema({
    firstname: {
        type: String,
        required: [true, "Firstname Is Required"]
    },
    lastname: {
        type: String,
    },
    year: {
        type: Number,
        required: [true, "Year Is Required"],
        min: [1, 'Invalid Year'],
        max: [4 , 'Invalid Year']
    },
    section: {
        type: String,
        enum: enu,
        required: [true, "Section is Required"]
    },
    email: {
        type: String,
        required: [true, "Email is Required"],
        unique: [true, "Email Already Exist"],
        match: [/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Invalid Email']
    },
    password: {
        type: String,
        required: [true, "Password Is Required"]
    }
},
{
    timestamps: true
});

StudentSchema.pre('save', function (next) {
    if (this.isModified('password') || this.isNew) {
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

StudentSchema.methods.verifyPassword = async function (pass, cb) {
    bcrypt.compare(pass, this.password, (error, result) => {
        if (error){
            return cb(error);
        }
        else{
            return cb(null, result);
        }
    });
}

let Student = module.exports = mongoose.model('Student', StudentSchema);
