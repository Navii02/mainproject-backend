const mongoose = require('mongoose')

const teacherSchema = new mongoose.Schema({
  name: String,
  subjects: [String],
  branches: [String],
  semesters: [String],
});

const teacherDetails = mongoose.model('TeacherDetails', teacherSchema)

module.exports = teacherDetails;
