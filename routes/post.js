const express = require('express')
const router = new express.Router()
const Post = require('../models/post')
const auth = require('../auth/auth')



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


