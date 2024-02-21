const BlogPost = require('../models/BlogPost');
const Comment = require('../models/Comment');

exports.getHomepage = async (req, res) => {
    try {
        const blogPosts = await BlogPost.findAll();
        res.render('homepage', { blogPosts});
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

exports.getBlogPost = async (req, res) => {
    try {
        const postId = req.params.id;
        const blogPost = await BlogPost.findByPk(postId);
        if (!blogPost) {
            res.status(404).send('Post not found');
            return;
        }
        res.render('blogPost', { blogPost });
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
};

exports.postComment = async (req, res) => {
    const { content } = req.body;
    const postId = req.params.id;
    try {
        await Comment.create({ content, blogPostId: postId });
        res.redirect(`/blog/post/${postId}`);
    } catch (error) {
        console.error(500).send('Internal Server Error');
    }
};

exports.addBlogPost = async (req, res) => {
    const { title, content } = req.body;
    try {
        const newPost = await BlogPost.create({ title, content, userId: req.session.userId });
        res.redirect('/blog/dashboard');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

exports.getPostDetails = async (req, res) => {
    const postId = req.params.id;
    try {
        const post = await BlogPost.findByPk(postId);
        if (!post) {
            res.status(404).send('Post not found');
            return;
        }
        res.render('postDetails', { post });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

exports.deleteBlogPost = async (req, res) => {
    const postId = req.params.id;
    try {
        await BlogPost.destroy({ where: { id: postId }});
        res.redirect('/blog/dashboard');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

exports.updateBlogPost = async (req, res) => {
    const postId = req.params.id;
    const { title, content } = req.body;
    try {
        await BlogPost.update({ title, content }, { where: {id: postId } });
        res.redirect(`/blog/dashboard/post/${postId}`);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};
 