const express = require('express')
require('./db/mongoose')
// const userRouter = require('./routes/users')
// const blogRouter = require('./routes/blog')
//require('./services/cache')



const app = express()
const port = process.env.PORT || 5000


app.use(express.json())



//app.use(userRouter, blogRouter)








app.listen(port, () => {
    console.log('Server is up on port ' + port)
})