const express = require('express')
const router = new express.Router()
const User = require('../models/users')






router.post('/signup', async (req, res) => {
    const {name, email, password } = req.body

    if(!name || !email || !password) {
        return res.status(422).json({error: "Please add all the fields"})
    }

    let user = await User.findOne({email: email})

    try {
        if (user) {
            return res.status(400).json({error: "User already exists"})
        }

        user = new User({
            email, password, name
        })
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({user, token})


    } catch (e) {
        res.status(500).send('Server Error')
    }


})



module.exports = router