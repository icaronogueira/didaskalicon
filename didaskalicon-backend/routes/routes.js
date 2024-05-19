const express = require('express');
const router = express.Router()
const postModel = require('../model/post')
const commentModel = require('../model/comment')
const mongo = require('mongodb');

//route to get all posts
router.get('/posts/:page', async (req, res) => {
    try {
        const page = parseInt(req.params.page) || 1;
        const limit = (page==1) ? 20 : 10; 
        const offset = 20 + ((page - 2) * limit);

        const posts = await postModel.find()
            .sort({date_posted: -1})
            .skip(offset)
            .limit(limit);

        res.json(posts) //put total pages?
    }
    catch(error) {
        res.status(500).json({message: error.message})
    }
})

//route to return a specific posts
router.get('/posts/:id', async (req, res) => {
    
    try {
        const posts = await postModel.findById(req.params.id);
        res.json(posts)
    }
    catch(error) {
        res.status(500).json({message: error.message})
    }

})

//get all comments from a specific post
router.get('/posts/:id/comments', async (req, res) => {
    try {
        const id = new mongo.ObjectId(req.params.id);
        console.log(id);
        const comments = await commentModel.find({'post_id': id});
        res.json(comments)
    }
    catch(error) {
        res.status(500).json({message: error.message})
    }
});


//get posts with a specific tag
router.get('/posts/tag/:tag', async (req,res) => {
    try {
        const posts = await postModel.find({tags: {$in: [req.params.tag]}});
        res.json(posts)
    }
    catch(error) {
        res.status(500).json({message: error.message})
    }
});


//create comment
router.post('/comments', async (req, res) => {
    
    const comment = new commentModel({
        author: req.body.author,
        text: req.body.text,
        post_id: new mongo.ObjectId(req.body.post_id)
    })

    try {
        const commentToSave = await comment.save();
        res.status(200).json(commentToSave) 
    }
    catch(error) {
        res.status(400).json({message: error.message})
    }
    
})

//Route to like a post
router.put('/posts/:id/like', async (req, res) => {
    const postId = req.params.id;
    
    try {
        let post = await postModel.findById(postId);

        if (!post) {
            return res.status(404).json({message: "Post not found"});
        }

        post.likes++;

        post = await post.save();

        res.json(post);

    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Error liking post"})
    }
});

//Route to dislike a post
router.put('/posts/:id/dislike', async (req,res) => {
    const postId = req.params.id;

    try {
        let post = await postModel.findById(postId);

        if (!post) {
            return res.status(404).json({message: 'Post not found!'});
        }

        post.dislikes++;

        post = await post.save();

        res.json(post);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({message: 'Error disliking post!'});
    }
});




module.exports = router;