const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const User = require('./models/user.model')
const jwt = require('jsonwebtoken')

app.use(cors())
app.use(express.json())

mongoose.connect('mongodb+srv://stsang333:Yoshi2023@cluster0.fltuokm.mongodb.net/test')

app.post('/api/register', async (req, res) => {
    console.log(req.body)
    try {
        const user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })
        res.json({status: 'ok'})
    } catch (err) {
        res.json({status: 'error', error: 'duplicate email'})
    }
})

app.post('/api/login', async (req, res) => {
    const user = await User.findOne({
        email: req.body.email,
        password: req.body.password
    })

    if (user) {

        const token = jwt.sign(
            {
                name: user.name,
                email: user.email,
            },
            'secret123'
        )
        
        return res.json({status: 'ok', user: token})
    } else {
        return res.json({status: 'error', user: false})
    }
})

app.get('/api/quote', async (req, res) => {

    const token = req.headers['x-access-token']

    try {
        const decoded = jwt.verify(token, 'secret123')
        const email = decoded.email
        const user = await User.findOne({ email: email })

        return res.json({ status: 'ok', quote: user.quote })
    } catch(error) {
        console.log(error)
        res.json({ status: 'error', error: 'invalid token' })
    }
    
})

app.post('/api/quote', async (req, res) => {

    const token = req.headers['x-access-token']

    try {
        const decoded = jwt.verify(token, 'secret123')
        const email = decoded.email
        await User.updateOne(
            { email: email },
            { $set: { quote: req.body.quote } }
        )

        return res.json({ status: 'ok' })
    } catch(error) {
        console.log(error)
        res.json({ status: 'error', error: 'invalid token' })
    }
    
})

app.post('/api/changeName', async (req, res) => {
    try {
        const user = User.updateOne(
            {email: req.body.email},
            {name: req.body.name}
        )
        return res.json({status: 'ok'})
    } catch(error) {
        res.json({status: 'error', error: 'could not update name'})
    }
})

app.listen(1337, () => {
    console.log('server started on 1337')
})