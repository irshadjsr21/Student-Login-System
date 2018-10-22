const Student = require('../models/student');

const helperFunctions = require('../helperFunctions');

// Function To check Student Login Credentials
async function checkStudentLoginCredentials(email, password, cb) {
    Student.findOne({email: email}, (error, student) => {
        if(error){
            return cb(error);
        }
        else {
            if(student){
                student.verifyPassword(password, (error, isMatch) => {
                    if(error){
                        return cb(error);
                    }
                    else {
                        return cb(null, isMatch);
                    }
                })
            }
            else {
                return cb(null, false);
            }
        }
    })
}


module.exports = {
    
    // Handles Student Registration
    register: (req, res) => {
        let student = new Student({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            class: req.body.class,
            email: req.body.email,
            password: req.body.password
        });
        Student.find({email: student.email}, (error, students) => {
            if(error){
                console.log(error);
                return res.status(500).json({
                    msg: [
                        "Some Internal Error Occured"
                    ]
                });
            }
            if(students.length<=0) {
                Student.create(student)
                .then(
                    student => {
                        return res.status(201).json({
                            msg: ["Student Registered Successfully"]
                        })
                    }
                    )
                    .catch(
                        error => {
                            const errorMsg = helperFunctions.extractMongooseErrorMsg(error);
                            return res.status(400).json({
                                msg: errorMsg
                            });
                        }
                        )
                    }
                    else {
                        return res.status(422).json({
                            msg: ["Email Already Exist"]
                        });
                    }
                })
            },
            
            // Handles Student Login
            login: (req, res) => {
                checkStudentLoginCredentials(req.body.email, req.body.password, (error, isMatch) => {
                    if(error || !isMatch){
                        return res.status(401).json({
                            msg: [
                                "Invalid Email Or Password"
                            ]
                        });
                    }
                    else {
                        Student.findOne({email: req.body.email}, (error, student) => {
                            helperFunctions.signJwt(student._id, 'student', (error, token) => {
                                if(error){
                                    console.log(error);
                                    return res.status(500).json({
                                        msg: [
                                            "Some Internal Error Occured"
                                        ]
                                    });
                                }
                                else {
                                    return res.status(200).json({
                                        msg: [
                                            "Logged In Successfully"
                                        ],
                                        token: token
                                    });
                                }
                            });
                        })
                    }
                });
            },


            // To Get Details Of Logged In Student
            getStudent: (req,res) => {
                Student.findById(req.user.id, (error, student) => {
                    if(error){
                        console.log(error);
                        return res.status(500).json({
                            msg: [
                                "Some Internal Error Occured"
                            ]
                        });
                    }
                    else{
                        const stud = {
                            firstname: student.firstname,
                            lastname: student.lastname,
                            email: student.email,
                            class: student.class,
                        }
                        return res.status(200).json({
                            student: stud
                        });
                    }
                });
            }
            
        }