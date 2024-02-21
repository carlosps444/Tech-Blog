const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');

router.get('/', blogController.getHomepage);
router.get('/post/:id', blogController.getBlogPost);
router.post('/post/:id/comment', blogController.postComment);
router.get('/dashboard', blogController.getDashboard);
router.post('/dashboard/add', blogController.addBlogPost);
router.get('/dashboard/post/:id', blogController.getBlogPostDetails);
router.post('/dashboard/post/:id/delete', blogController.deleteBlogPost);
router.post('/dashboard/post/id/update', blogController.updateBlogPost);

module.exports = router;