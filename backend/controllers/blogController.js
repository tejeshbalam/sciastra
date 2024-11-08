

const { Blog } = require('../models/blog'); // Import the Blog model

// Create a new blog post
const createBlogPost = async (req, res) => {
    const { title, content, authorId } = req.body;

    try {
        const newBlogPost = await Blog.create({
            title,
            content,
            authorId
        });

        res.status(201).json({
            message: 'Blog post created successfully',
            blogPost: {
                id: newBlogPost.id,
                title: newBlogPost.title,
                content: newBlogPost.content,
                authorId: newBlogPost.authorId,
                createdAt: newBlogPost.createdAt
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating blog post' });
    }
};

// Get all blog posts
const getAllBlogPosts = async (req, res) => {
    try {
        const blogPosts = await Blog.findAll();
        res.status(200).json({
            message: 'Blog posts fetched successfully',
            blogPosts
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching blog posts' });
    }
};

// Get a specific blog post by ID
const getBlogPostById = async (req, res) => {
    const { id } = req.params;

    try {
        const blogPost = await Blog.findByPk(id);
        if (!blogPost) {
            return res.status(404).json({ message: 'Blog post not found' });
        }

        res.status(200).json({
            message: 'Blog post fetched successfully',
            blogPost
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching blog post' });
    }
};

// Update a blog post
const updateBlogPost = async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;

    try {
        const blogPost = await Blog.findByPk(id);
        if (!blogPost) {
            return res.status(404).json({ message: 'Blog post not found' });
        }

        blogPost.title = title || blogPost.title;
        blogPost.content = content || blogPost.content;

        await blogPost.save();

        res.status(200).json({
            message: 'Blog post updated successfully',
            blogPost
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating blog post' });
    }
};

// Delete a blog post
const deleteBlogPost = async (req, res) => {
    const { id } = req.params;

    try {
        const blogPost = await Blog.findByPk(id);
        if (!blogPost) {
            return res.status(404).json({ message: 'Blog post not found' });
        }

        await blogPost.destroy();

        res.status(200).json({
            message: 'Blog post deleted successfully'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting blog post' });
    }
};

module.exports = { createBlogPost, getAllBlogPosts, getBlogPostById, updateBlogPost, deleteBlogPost };
