const express = require('express');
const router = express.Router();

// importing middleware
const  {authPage} = require('../middlewares/auth');

// importing controller
const postController = require('../controllers/post');

// importing validator
const postValidator = require('../validators/post');

router.get('/all', postController.allPosts);

router.get('/:id/create',authPage,postController.createPostPage);
router.post('/:id/create',authPage,postValidator,postController.createPost);

router.get('/:id/details',postController.postDetails);

router.get('/:id/update',authPage,postController.postUpdatePage);
router.post('/:id/update',authPage,postValidator,postController.postUpdate);

router.get('/:id/delete',authPage,postController.confirmDeletePostPage);
router.post('/:id/delete',authPage,postController.deletePost);


module.exports = router;