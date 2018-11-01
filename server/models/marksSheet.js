const mongoose = require('mongoose');

// Marks Schema
const marksSchema = mongoose.Schema({
    subject: {
        type: String,
        required: [true, "Subject is Required in Marks Array"]
    },
    marks: {
        type: Number,
        required: [true, "Marks is Required in Marks Array"]
    },
    maxMarks: {
        type: Number,
        default: 100
    },
    passMarks: {
        type: Number,
        default: 40
    }
},
{
    _id: false
});


const MarksSheetSchema = mongoose.Schema({
    studentId: {
        type: String,
        required: [true, "Student ID is required"]
    },
    title: {
        type: String,
        required: [true, "Title is required"]
    },
    marksArray: {
        type: [marksSchema]
    }
}, {
    timestamps: true
});

MarksSheetSchema.pre('save', function(next) {
    for(let arrayElement of this.marksArray) {
        if(!arrayElement.maxMarks) {
            arrayElement.maxMarks = 100;
        }
        if(!arrayElement.passMarks) {
            arrayElement.passMarks = 40;
        }
    }
    next();
});


let MarksSheet = module.exports = mongoose.model('MarksSheet', MarksSheetSchema);