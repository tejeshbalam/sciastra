const Blog = require('../models/blog'); // Import the Blog model for database operations

// Function to get all blog posts
const getAllPosts = async (req, res) => {
    try {
        const posts = await Blog.findAll(); // Fetch all blog posts from the database
        res.status(200).json(posts);
    } catch (error) {
        console.error('Error fetching blog posts:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Function to get a single blog post by ID
const getPostById = async (req, res) => {
    const { id } = req.params;
    try {
        const post = await Blog.findOne({ where: { id } });
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.status(200).json(post);
    } catch (error) {
        console.error('Error fetching blog post:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Function to create a new blog post
const createPost = async (req, res) => {
    const { title, content, author } = req.body;
    try {
        const newPost = await Blog.create({
            title,
            content,
            author
        });
        res.status(201).json({ message: 'Blog post created successfully', post: newPost });
    } catch (error) {
        console.error('Error creating blog post:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Function to update an existing blog post
const updatePost = async (req, res) => {
    const { id } = req.params;
    const { title, content, author } = req.body;
    try {
        const post = await Blog.findOne({ where: { id } });
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        post.title = title || post.title;
        post.content = content || post.content;
        post.author = author || post.author;

        await post.save();

        res.status(200).json({ message: 'Blog post updated successfully', post });
    } catch (error) {
        console.error('Error updating blog post:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Function to delete a blog post
const deletePost = async (req, res) => {
    const { id } = req.params;
    try {
        const post = await Blog.findOne({ where: { id } });
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        await post.destroy(); // Delete the blog post
        res.status(200).json({ message: 'Blog post deleted successfully' });
    } catch (error) {
        console.error('Error deleting blog post:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Exporting the functions to use in routes
module.exports = { getAllPosts, getPostById, createPost, updatePost, deletePost };
