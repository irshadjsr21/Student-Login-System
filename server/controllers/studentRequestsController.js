const Student = require('../models/student');
const Teacher =require('../models/teacher');
const MarksSheet = require('../models/marksSheet');

const helperFunctions = require('../helperFunctions');

module.exports = {

    // Get Marks Sheets For Logged In Student
    getMarksSheets: (req, res) => {
        if(!req.user) {
            return ;
        }
        
        MarksSheet.find({ studentId: req.user.id }, (error, marksSheets) => {
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
    }
}