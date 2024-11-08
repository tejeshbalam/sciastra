const Course = require('../models/course'); // Import the Course model for database operations

// Function to get all courses
const getAllCourses = async (req, res) => {
    try {
        const courses = await Course.findAll(); // Fetch all courses from the database
        res.status(200).json(courses);
    } catch (error) {
        console.error('Error fetching courses:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Function to get course details by ID
const getCourseById = async (req, res) => {
    const { id } = req.params;
    try {
        const course = await Course.findOne({ where: { id } });
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }
        res.status(200).json(course);
    } catch (error) {
        console.error('Error fetching course details:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Function to enroll in a course
const enrollInCourse = async (req, res) => {
    const { courseId, userId } = req.body;
    try {
        const course = await Course.findOne({ where: { id: courseId } });
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }
        
        // Assuming you have an 'enrollments' table that links users and courses
        const enrollment = await Enrollment.create({ userId, courseId });
        
        res.status(200).json({ message: 'Enrolled successfully', enrollment });
    } catch (error) {
        console.error('Error enrolling in course:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Function to update course details
const updateCourse = async (req, res) => {
    const { id } = req.params;
    const { title, description, instructor, price } = req.body;
    try {
        const course = await Course.findOne({ where: { id } });
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        course.title = title || course.title;
        course.description = description || course.description;
        course.instructor = instructor || course.instructor;
        course.price = price || course.price;

        await course.save();

        res.status(200).json({ message: 'Course updated successfully', course });
    } catch (error) {
        console.error('Error updating course:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Function to delete a course
const deleteCourse = async (req, res) => {
    const { id } = req.params;
    try {
        const course = await Course.findOne({ where: { id } });
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        await course.destroy(); // Delete the course
        res.status(200).json({ message: 'Course deleted successfully' });
    } catch (error) {
        console.error('Error deleting course:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Exporting the functions to use in routes
module.exports = { getAllCourses, getCourseById, enrollInCourse, updateCourse, deleteCourse };

