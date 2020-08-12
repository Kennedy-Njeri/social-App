const express = require('express')
const router = new express.Router()
const User = require('../models/users')
const auth = require('../auth/auth')
const bcrypt = require('bcryptjs')





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


router.post('/users/login', async (req, res) => {


    try {
        const {email, password} = req.body;

        const user = await User.findOne({ email })

        if (!user) {
            return res.status(400).json({ msg: "Invalid Credentials"})

        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {

            return res.status(400).json({msg: 'Invalid Credentials'});
        }

        const token = await user.generateAuthToken()

        res.send({user, token})


    } catch (e) {

        res.status(500).send('Server Error');

    }

})


router.post('/users/logout', auth, async (req, res) => {
    try {
        // if they are not equal we return true keeping it in the tokens array
        // and if they are equal we return false filtering it out removing it in the tokens array
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()

        res.send()
    } catch (e) {
        res.status(500).send()
    }
})



router.get('/users/me', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});








module.exports = router