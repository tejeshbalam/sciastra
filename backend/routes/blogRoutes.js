

const express = require('express');
const { Blog } = require('../models/blog'); // Import Blog model

const router = express.Router();

// Create a new blog post
router.post('/', async (req, res) => {
    const { title, content, authorId, tags } = req.body;

    try {
        const newBlog = await Blog.create({
            title,
            content,
            authorId,
            tags: tags.join(','), // Store tags as a comma-separated string
        });

        res.status(201).json({
            message: 'Blog created successfully',
            blog: newBlog,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error creating blog' });
    }
});

// Get all blog posts
router.get('/', async (req, res) => {
    try {
        const blogs = await Blog.findAll();
        res.status(200).json({ blogs });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching blogs' });
    }
});

// Get a single blog post by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const blog = await Blog.findByPk(id);
        if (!blog) {
            return res.status(404).json({ error: 'Blog not found' });
        }
        res.status(200).json({ blog });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching blog' });
    }
});

// Update an existing blog post
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { title, content, tags } = req.body;

    try {
        const blog = await Blog.findByPk(id);
        if (!blog) {
            return res.status(404).json({ error: 'Blog not found' });
        }

        blog.title = title || blog.title;
        blog.content = content || blog.content;
        blog.tags = tags ? tags.join(',') : blog.tags; // Update tags

        await blog.save();

        res.status(200).json({
            message: 'Blog updated successfully',
            blog,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error updating blog' });
    }
});

// Delete a blog post
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const blog = await Blog.findByPk(id);
        if (!blog) {
            return res.status(404).json({ error: 'Blog not found' });
        }

        await blog.destroy();

        res.status(200).json({ message: 'Blog deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error deleting blog' });
    }
});

module.exports = router;
