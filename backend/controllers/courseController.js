

const { Course } = require('../models/course'); // Import the Course model

// Create a new course
const createCourse = async (req, res) => {
    const { title, description, instructor, price, schedule } = req.body;

    try {
        const newCourse = await Course.create({
            title,
            description,
            instructor,
            price,
            schedule
        });

        res.status(201).json({
            message: 'Course created successfully',
            course: {
                id: newCourse.id,
                title: newCourse.title,
                description: newCourse.description,
                instructor: newCourse.instructor,
                price: newCourse.price,
                schedule: newCourse.schedule,
                createdAt: newCourse.createdAt
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating course' });
    }
};

// Get all courses
const getAllCourses = async (req, res) => {
    try {
        const courses = await Course.findAll();
        res.status(200).json({
            message: 'Courses fetched successfully',
            courses
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching courses' });
    }
};

// Get a specific course by ID
const getCourseById = async (req, res) => {
    const { id } = req.params;

    try {
        const course = await Course.findByPk(id);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        res.status(200).json({
            message: 'Course fetched successfully',
            course
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching course' });
    }
};

// Update a course
const updateCourse = async (req, res) => {
    const { id } = req.params;
    const { title, description, instructor, price, schedule } = req.body;

    try {
        const course = await Course.findByPk(id);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        course.title = title || course.title;
        course.description = description || course.description;
        course.instructor = instructor || course.instructor;
        course.price = price || course.price;
        course.schedule = schedule || course.schedule;

        await course.save();

        res.status(200).json({
            message: 'Course updated successfully',
            course
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating course' });
    }
};

// Delete a course
const deleteCourse = async (req, res) => {
    const { id } = req.params;

    try {
        const course = await Course.findByPk(id);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        await course.destroy();

        res.status(200).json({
            message: 'Course deleted successfully'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting course' });
    }
};

module.exports = { createCourse, getAllCourses, getCourseById, updateCourse, deleteCourse };
