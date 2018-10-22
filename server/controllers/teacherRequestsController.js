const Student = require('../models/student');
const Teacher =require('../models/teacher');

module.exports = {

    // To Get Student Of Specific Class
    getMyStudents: (req, res) => {
        const clas = req.body.class;
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
                compareClasses = (teacherClas) => {
                    return JSON.stringify(teacherClas) === JSON.stringify(clas);
                };
                
                if(teacher.classes.find(compareClasses)){
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
    }
}