// routes/studentRoutes.js

const express = require('express');
const router = express.Router();
const CertificateRequest = require('../../models/CertificateRequest');
const Student = require('../../models/Student/StudentData');

router.post('/student/submitRequest', async (req, res) => {
  try {
    const { registerNumber, reason, userEmail } = req.body;

    if (!registerNumber || !reason || !userEmail) {
      return res.status(400).json({ message: 'Register number, reason, and userEmail are required.' });
    }

    const newRequest = new CertificateRequest({
      registerNumber,
      reason,
      userEmail,
    });

    await newRequest.save();

    const student = await Student.findOne({ registerNumber });

    if (student) {
      newRequest.studentName = student.name;
      await newRequest.save();
    }

    res.json({ message: 'Request submitted successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.get('/student/certificateRequests/:email', async (req, res) => {
  try {
    const userEmail = req.params.email;
    const requests = await CertificateRequest.find({ userEmail }).sort({ createdAt: -1 });

    res.json({ requests });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
