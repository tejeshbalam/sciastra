

const express = require('express');
const { Course } = require('../models/course'); // Import Course model
const { Enrollment } = require('../models/enrollment'); // Import Enrollment model

const router = express.Router();

// Get all available courses
router.get('/', async (req, res) => {
    try {
        const courses = await Course.findAll();
        res.status(200).json({ courses });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching courses' });
    }
});

// Get a single course by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const course = await Course.findByPk(id);
        if (!course) {
            return res.status(404).json({ error: 'Course not found' });
        }
        res.status(200).json({ course });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching course' });
    }
});

// Enroll in a course
router.post('/:id/enroll', async (req, res) => {
    const { id } = req.params;
    const { userId } = req.body;

    try {
        const course = await Course.findByPk(id);
        if (!course) {
            return res.status(404).json({ error: 'Course not found' });
        }

        // Check if the user is already enrolled in the course
        const existingEnrollment = await Enrollment.findOne({
            where: { userId, courseId: id },
        });

        if (existingEnrollment) {
            return res.status(400).json({ error: 'User is already enrolled in this course' });
        }

        // Enroll the user in the course
        const enrollment = await Enrollment.create({
            userId,
            courseId: id,
        });

        res.status(201).json({
            message: 'Successfully enrolled in the course',
            enrollment,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error enrolling in course' });
    }
});

// Unenroll from a course
router.delete('/:id/unenroll', async (req, res) => {
    const { id } = req.params;
    const { userId } = req.body;

    try {
        const enrollment = await Enrollment.findOne({
            where: { userId, courseId: id },
        });

        if (!enrollment) {
            return res.status(404).json({ error: 'Enrollment not found' });
        }

        await enrollment.destroy();

        res.status(200).json({ message: 'Successfully unenrolled from the course' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error unenrolling from course' });
    }
});

module.exports = router;
