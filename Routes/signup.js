const express = require('express') 
const JWT = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const mysql = require('mysql2/promise')
const { check, validationResult} = require('express-validator')

const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'bundaz'
}

const saltRounds = 10

const router = express.Router()

router.get('/',[
    check("email", "Please provide a valid email").isEmail(),
    check("password", "Please provide a password whose length is greater than 7").isLength({min: 7})], 
    async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty) {
        return res.status(400).json(errors.array())
    }

    const {firstname, lastname, email, password} = req.body

    try {
        const connection = await mysql.createConnection(dbConfig)
        const hashedPassword = await bcrypt.hash(password, saltRounds)
        const addUserSql = `INSERT INTO users  (first_name, last_name, email, password) 
        VALUES (?, ?, ?, ?)`
        await connection.query(addUserSql, [firstname, lastname, email, hashedPassword])
        connection.end()
        return res.status(200).json({message: "user added sucessfully"})
        
    } catch(error) {
        return res.status(400).json(error)
    }

    res.status(200).json({message: "This is login page"})
})

module.exports = router