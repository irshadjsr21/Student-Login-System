const Teacher = require('../models/teacher');

const helperFunctions = require('../helperFunctions');

// Function To check Teacher Login Credentials
async function checkTeacherLoginCredentials(email, password, cb) {
    Teacher.findOne({email: email}, (error, teacher) => {
        if(error){
            return cb(error);
        }
        else {
            if(teacher){
                teacher.verifyPassword(password, (error, isMatch) => {
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

// Function to check for duplicate Classes
function duplicateClasses(classes) {
    let a = [];
    classes.forEach((clas) => {
        a.push(JSON.stringify(clas));
    });
    
    var counts = [];
    for(var i = 0; i <= a.length; i++) {
        if(counts[a[i]] === undefined) {
            counts[a[i]] = 1;
        } else {
            return true;
        }
    }
    return false;
}


module.exports = {
    
    // Handles Teacher Registration
    register: (req, res) => {
        let teacher = new Teacher({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            classes: req.body.classes,
            email: req.body.email,
            password: req.body.password
        });
        Teacher.find({email: teacher.email}, (error, teachers) => {
            if(error){
                console.log(error);
                return res.status(500).json({
                    msg: [
                        "Some Error Occured"
                    ]
                });
            }
            if(teachers.length<=0) {
                
                if(duplicateClasses(teacher.classes)){
                    return res.status(400).json({
                        msg: [
                            "Duplicate Classes"
                        ]
                    });
                }
                
                Teacher.create(teacher)
                .then(
                    teacher => {
                        return res.status(201).json({
                            msg: ["Teacher Registered Successfully"]
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
            
            // Handles Teacher Login
            login: (req, res) => {
                checkTeacherLoginCredentials(req.body.email, req.body.password, (error, isMatch) => {
                    if(error || !isMatch){
                        return res.status(401).json({
                            msg: [
                                "Invalid Email Or Password"
                            ]
                        });
                    }
                    else {
                        Teacher.findOne({email: req.body.email}, (error, teacher) => {
                            if(error){
                                console.log(error);
                                return res.status(500).json({
                                    msg: "Some Internal Error Occured"
                                });
                            }
                            
                            helperFunctions.signJwt(teacher._id, 'teacher', (error, token) => {
                                if(error){
                                    console.log(error);
                                    return res.status(500).json({
                                        msg: "Some Internal Error Occured"
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
            
            
            // To Get Details Of Logged In Teacher
            getTeacher: (req,res) => {
                if(!req.user) {
                    return ;
                }
                
                Teacher.findById(req.user.id, (error, teacher) => {
                    if(error){
                        console.log(error);
                        return res.status(500).json({
                            msg: [
                                "Some Internal Error Occured"
                            ]
                        });
                    }
                    else{
                        const teac = {
                            firstname: teacher.firstname,
                            lastname: teacher.lastname,
                            email: teacher.email,
                            classes: teacher.classes
                        }
                        return res.status(200).json({
                            teacher: teac
                        });
                    }
                });
            },
            
            
            // Handle Password Change
            changePassword: (req, res) => {
                if(!req.user) {
                    return ;
                }
                
                Teacher.findById(req.user.id, (error, teacher) => {
                    if(error){
                        console.log(error);
                        return res.status(500).json({
                            msg: [
                                "Some Internal Error Occured"
                            ]
                        });
                    }
                    
                    teacher.verifyPassword(req.body.password.toString(), (error, isMatch) => {
                        if(error || !isMatch) {
                            console.log(error, isMatch);
                            return res.status(400).json({
                                msg: [
                                    "Wrong Password"
                                ]
                            });
                        }
                        
                        teacher.password = req.body.newPassword;
                        teacher.save((error, newTeacher) => {
                            if(error){
                                const errorMsg = helperFunctions.extractMongooseErrorMsg(error);
                                return res.status(400).json({
                                    msg: errorMsg
                                });
                            }
                            
                            return res.status(200).json({
                                msg: [
                                    "Password Changed Successfully"
                                ]
                            });
                        });
                    });
                });
            }
            
        }