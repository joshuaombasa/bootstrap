const express = require('express')
const app = express()
const port = 3000


const loginRoutes = require('./Routes/login')
const usersRoutes = require('./Routes/users')

app.use('/api/users', usersRoutes)

app.use('/api/login', loginRoutes)

app.listen(port, () => {
    console.log(`App listening on ${port}`)
})
