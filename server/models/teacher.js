const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Enum for section in class
const enu = {
    values: ['A', 'B', 'C', 'D', 'E']
  , message: 'Invalid Section in Class'
}

// Function to check if classes is Empty
function classesEmptyValidator(classes) {
    if(classes[0] == "" || classes.length <= 0){
        return false;
    }
    return true;
}

// Class Schema for classes
const classSchema = mongoose.Schema({
    year: {
        type: Number,
        required: [true, "Year Is Required in Class"],
        min: [1, 'Invalid Year in Class'],
        max: [4 , 'Invalid Year in Class']
    },
    section: {
        type: String,
        enum: enu,
        required: [true, "Section is Required in Class"]
    }
}, {
    _id: false
});


const TeacherSchema = mongoose.Schema({
    firstname: {
        type: String,
        required: [true, "Firstname Is Required"]
    },
    lastname: {
        type: String,
    },
    classes: {
        type: [classSchema],
        required: [true, "Class is Required"],
        validate: [
            {
                validator: classesEmptyValidator,
                msg: "Class is Required"
            }
        ]
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

// Hash The Password Before Saving To Database
TeacherSchema.pre('save', function (next) {
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

// Compare hashed password with given pass
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