const express = require('express')
const cors = require('cors')
const app = express()
const port = 3000

app.use(cors())
app.use(express.json())

const loginRoutes = require('./Routes/login')
const usersRoutes = require('./Routes/users')
const branchRoutes = require('./Routes/branches')
const signupRoutes = require('./Routes/signup')

app.use('/api/users', usersRoutes)
app.use('/api/branches', branchRoutes)
app.use('/api/login', loginRoutes)
app.use('/api/signup', signupRoutes)

app.listen(port, () => {
    console.log(`App listening on ${port}`)
})
