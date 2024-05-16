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


module.exports = router;