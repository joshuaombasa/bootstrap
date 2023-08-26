const express = require('express')
const app = express()
const port = 3000


const loginRoutes = require('./Routes/login')
const usersRoutes = require('./Routes/users')

app.get('/api/users', usersRoutes)

app.get('/api/login', loginRoutes)

app.listen(port, () => {
    console.log(`App listening on ${port}`)
})
