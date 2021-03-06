const express = require('express')
const router = new express.Router()
const Post = require('../models/post')
const auth = require('../auth/auth')


// create a user post
router.post('/createpost', auth, async (req, res) => {
    const { title, body } = req.body

    if (!title || !body) {
        return res.status(422).json({ error: "Please add all fields"})
    }


    const post = new Post({
        ...req.body,
        postedBy: req.user._id
    })

    try {
        const posts = await post.save()
        res.status(201).send(posts)
    } catch (e) {
        res.status(400).send(e)
    }
})

// get all user posts
router.get('/allpost', auth, async (req, res) => {
    try {

        const posts = await Post.find().populate("postedBy", "_id name")

        res.send(posts)

    } catch (e) {

        res.status(500).send(e)
    }
})





module.exports = router

