const express = require('express');

const postController = require('../controllers/posts');

const router = express.Router();

router.get('/', postController.getPosts);
router.get('/find/:id', postController.findById);
router.post('/', postController.createPost);
router.patch('/:id', postController.updatePost);
router.patch('/:id/likePost', postController.likePost);
router.delete('/:id', postController.deletePost);


module.exports = router;
