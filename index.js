const express = require('express')
require('./db/mongoose')
const userRouter = require('./routes/users')
const postRouter = require('./routes/post')
//require('./services/cache')



const app = express()
const port = process.env.PORT || 5000


app.use(express.json())


app.use(userRouter, postRouter)








app.listen(port, () => {
    console.log('Server is up on port ' + port)
})