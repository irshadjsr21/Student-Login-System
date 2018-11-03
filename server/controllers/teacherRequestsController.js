const Student = require('../models/student');
const Teacher =require('../models/teacher');
const MarksSheet = require('../models/marksSheet');

const helperFunctions = require('../helperFunctions');

function checkMarks(array) {    
    for(let arrayElement of array) {
        const maxMarks = arrayElement.maxMarks ? arrayElement.maxMarks : 100;
        if(arrayElement.marks > maxMarks) {
            return ["Invalid Input (Obtained marks cannot be greater than maximum marks)"];
            break;
        }
    }
    return null;
};

function checkIfTeacherIsAuthorized(teacherClasses, studentClass) {
    compareClasses = (teacherClas) => {
        return JSON.stringify(teacherClas) === JSON.stringify(studentClass);
    };
    
    return teacherClasses.find(compareClasses);
}

module.exports = {
    
    // To Get Student Of Specific Class
    getMyStudents: (req, res) => {
        if(!req.user){
            return ;
        }
        
        const clas = {
            year: parseInt(req.query.year),
            section: req.query.section
        };
        Teacher.findById(req.user.id, (error, teacher) => {
            if(error){
                console.log(error);
                return res.status(500).json({
                    msg: [
                        "Some Error Occured"
                    ]
                });
            }
            else {
                
                // Check if the Teacher is Alotted the given class
                
                if(checkIfTeacherIsAuthorized(teacher.classes, clas)){
                    Student.find({class: clas}, (error, students) => {
                        if(error){
                            console.log(error);
                            return res.status(500).json({
                                msg: [
                                    "Some Error Occured"
                                ]
                            });
                        }
                        else {
                            // Returning Specific Details Of student
                            let studentsArray = [];
                            students.forEach((student) => {
                                studentsArray.push({
                                    id: student._id,
                                    firstname: student.firstname,
                                    lastname: student.lastname,
                                    email: student.email,
                                    class: student.class,
                                    createdAt: student.createdAt,
                                    updatedAt: student.updatedAt
                                });
                            });
                            
                            return res.status(200).json({
                                students: studentsArray
                            });                            
                        }
                    });
                }
                else {
                    return res.status(401).json({
                        msg: "This Class is Not Alotted To You"
                    });
                }
            }
        });
    },
    
    getStudent: (req, res) => {
        if(!req.user){
            return ;
        }
        
        const studentId = req.query.id;
        
        Student.findById(studentId, (error, student) => {
            if(error){
                console.log(error);
                return res.status(500).json({
                    msg: [
                        "Some Error Occured"
                    ]
                });
            }
            
            if(!student) {
                return res.status(400).json({
                    msg: [
                        "Student with the given ID does not exist"
                    ]
                });
            }
            
            Teacher.findById(req.user.id, (error, teacher) => {
                if(error){
                    console.log(error);
                    return res.status(500).json({
                        msg: [
                            "Some Error Occured"
                        ]
                    });
                }
                
                // Check if Teacher is Authorized for the given student
                
                if(!checkIfTeacherIsAuthorized(teacher.classes, student.class)){
                    return res.status(401).json({
                        msg: [
                            "You are not authorized for this student"
                        ]
                    });
                }
                
                else {
                    studentDetails = {
                        id: student._id,
                        firstname: student.firstname,
                        lastname: student.lastname,
                        email: student.email,
                        class: student.class,
                        createdAt: student.createdAt,
                        updatedAt: student.updatedAt
                    };
                    
                    return res.status(200).json({
                        student: studentDetails
                    });
                }
            });
        });
    },
    
    // To Add Marks Sheet For A Student
    addMarksSheet: (req, res) => {
        if(!req.user){
            return ;
        }
        
        const marksSheet = {
            studentId: req.body.studentId,
            title: req.body.title,
            marksArray: req.body.marksArray
        }
        
        if(checkMarks(marksSheet.marksArray)) {
            return res.status(400).json({
                msg: checkMarks(marksSheet.marksArray)
            });
        }
        
        Student.findById(marksSheet.studentId, (error, student) => {
            if(error){
                console.log(error);
                return res.status(500).json({
                    msg: [
                        "Some Error Occured"
                    ]
                });
            }
            
            if(!student) {
                return res.status(400).json({
                    msg: [
                        "Student with the given ID does not exist"
                    ]
                }); 
            }
            
            Teacher.findById(req.user.id, (error, teacher) => {
                if(error){
                    console.log(error);
                    return res.status(500).json({
                        msg: [
                            "Some Error Occured"
                        ]
                    });
                }
                
                // Check if Teacher is Authorized for the given student
                
                if(!checkIfTeacherIsAuthorized(teacher.classes, student.class)){
                    return res.status(401).json({
                        msg: [
                            "You are not authorized for this student"
                        ]
                    });
                }
                
                else {
                    MarksSheet.create(marksSheet, (error, result) => {
                        if(error) {
                            const errorMsg = helperFunctions.extractMongooseErrorMsg(error);
                            return res.status(400).json({
                                msg: errorMsg
                            });
                        }
                        else {
                            return res.status(201).json({
                                msg: [
                                    "Marks Sheet Created Successfully"
                                ]   
                            });
                        }
                    });
                }
            });
        });
    },
    
    getStudentMarksSheet: (req, res) => {
        if(!req.user) {
            return ;
        }
        
        const id = req.query.id;
        
        Teacher.findById(req.user.id, (error, teacher) => {
            if(error){
                console.log(error);
                return res.status(500).json({
                    msg: [
                        "Some Error Occured"
                    ]
                });
            }
            
            Student.findById(id, (error, student) => {
                if(error){
                    console.log(error);
                    return res.status(500).json({
                        msg: [
                            "Some Error Occured"
                        ]
                    });
                }
                
                if(!student){
                    return res.status(404).json({
                        msg: [
                            "Student with the given ID does not exist"
                        ]
                    });
                }
                
                // Check If Teacher Is Authorized For the Student
                
                if(!checkIfTeacherIsAuthorized(teacher.classes, student.class)){
                    return res.status(401).json({
                        msg: [
                            "You are not authorized for this student"
                        ]
                    });
                }
                
                MarksSheet.find({ studentId:id }, (error, marksSheets) => {
                    if(error){
                        console.log(error);
                        return res.status(500).json({
                            msg: [
                                "Some Error Occured"
                            ]
                        });
                    }
                    
                    const response = [];
                    
                    marksSheets.forEach(marksSheet => {
                        response.push({
                            id: marksSheet._id,
                            studentId: marksSheet.studentId,
                            title: marksSheet.title,
                            marksArray: marksSheet.marksArray,
                            createdAt: marksSheet.createdAt,
                            updatedAt: marksSheet.updatedAt
                        });
                    })
                    
                    return res.status(200).json({
                        marksSheets: response
                    });
                });
            });
        });
    },
    
    // Handle Changes In Marks Sheet
    updateMarksSheet: (req, res) => {
        if(!req.user) {
            return ;
        }
        
        if(!req.body.title && !req.body.marksArray) {
            return res.status(400).json({
                msg: [
                    "Invalid Input"
                ]
            });
        }
        
        const id = req.params.id;
        
        MarksSheet.findById(id, (error, marksSheet) => {
            if(error){
                console.log(error);
                return res.status(500).json({
                    msg: [
                        "Some Error Occured"
                    ]
                });
            }
            
            if(!marksSheet) {
                return res.status(404).json({
                    msg: [
                        "Marks Sheet Does Not Exist"
                    ]
                });
            }
            
            Student.findById(marksSheet.studentId, (error, student) => {
                if(error) {
                    console.log(error);
                    return res.status(500).json({
                        msg: [
                            "Some Error Occured"
                        ]
                    });
                }
                
                Teacher.findById(req.user.id, (error, teacher) => {
                    if(error) {
                        console.log(error);
                        return res.status(500).json({
                            msg: [
                                "Some Error Occured"
                            ]
                        });
                    }
                    
                    if(!checkIfTeacherIsAuthorized(teacher.classes, student.class)){
                        return res.status(401).json({
                            msg: [
                                "You are not authorized for this student"
                            ]
                        });
                    }
                    
                    if(req.body.title) {
                        marksSheet.title = req.body.title;
                    }
                    if(req.body.marksArray) {
                        marksSheet.marksArray = req.body.marksArray;
                    }
                    
                    marksSheet.save((error, updatedMarksSheet) => {
                        if(error) {
                            const errorMsg = helperFunctions.extractMongooseErrorMsg(error);
                            return res.status(400).json({
                                msg: errorMsg
                            });
                        }
                        
                        return res.status(200).json({
                            msg: [
                                "Marks Sheet Updated Successfully"
                            ]
                        });
                    });
                    
                });
            });
        });
    },
    
    // To Delete A Marks Sheet
    deleteMarksSheet: (req, res) => {
        if(!req.user) {
            return ;
        }
        
        const id = req.params.id;
        
        MarksSheet.findById(id, (error, marksSheet) => {
            if(error) {
                console.log(error);
                return res.status(500).json({
                    msg: [
                        "Some Error Occured"
                    ]
                });
            }
            
            if(!marksSheet) {
                return res.status(404).json({
                    msg: [
                        "Marks Sheet Does Not Exist"
                    ]
                });
            }
            
            Student.findById(marksSheet.studentId, (error, student) => {
                if(error) {
                    console.log(error);
                    return res.status(500).json({
                        msg: [
                            "Some Error Occured"
                        ]
                    });
                }
                
                Teacher.findById(req.user.id, (error, teacher) => {
                    if(error) {
                        console.log(error);
                        return res.status(500).json({
                            msg: [
                                "Some Error Occured"
                            ]
                        });
                    }
                    
                    if(!checkIfTeacherIsAuthorized(teacher.classes, student.class)){
                        return res.status(401).json({
                            msg: [
                                "You are not authorized for this student"
                            ]
                        });
                    }
                    
                    MarksSheet.findByIdAndDelete(id, (error, result) => {
                        if(error) {
                            console.log(error);
                            return res.status(500).json({
                                msg: [
                                    "Some Error Occured"
                                ]
                            });
                        }
                        
                        return res.status(200).json({
                            msg: [
                                "Marks Sheet Deleted Successfully"
                            ]
                        });
                    });
                });
            });
        });
    },
    
    // To Get Marks Sheet
    getMarksSheet: (req, res) => {
        if(!req.user) {
            return ;
        }
        
        const id = req.query.id;
        
        MarksSheet.findById(id, (error, marksSheet) => {
            if(error) {
                console.log(error);
                return res.status(500).json({
                    msg: [
                        "Some Error Occured"
                    ]
                });
            }
            
            if(!marksSheet) {
                return res.status(404).json({
                    msg: [
                        "Marks Sheet Does Not Exist"
                    ]
                });
            }
            
            Student.findById(marksSheet.studentId, (error, student) => {
                if(error) {
                    console.log(error);
                    return res.status(500).json({
                        msg: [
                            "Some Error Occured"
                        ]
                    });
                }
                
                Teacher.findById(req.user.id, (error, teacher) => {
                    if(error) {
                        console.log(error);
                        return res.status(500).json({
                            msg: [
                                "Some Error Occured"
                            ]
                        });
                    }
                    
                    if(!checkIfTeacherIsAuthorized(teacher.classes, student.class)){
                        return res.status(401).json({
                            msg: [
                                "You are not authorized for this student"
                            ]
                        });
                    }
                    
                    const response = {
                        id: marksSheet._id,
                        studentId: marksSheet.studentId,
                        title: marksSheet.title,
                        marksArray: marksSheet.marksArray,
                        createdAt: marksSheet.createdAt,
                        updatedAt: marksSheet.updatedAt
                    }
                    
                    return res.status(200).json({
                        marksSheet: response
                    });
                });
            });
        });
    }
}