const express = require('express')
const JWT = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const mysql = require('mysql2/promise')
const { check, validationResult } = require('express-validator')
const { message } = require('statuses')

const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'bundaz'
}

const saltRounds = 10
const SECRET_KEY = 'QWEFHQ9H934898RJV0'

const router = express.Router()

router.get('/', [
    check("email", "Please provide a valid email").isEmail(),
    check("password", "Please provide a password whose length is greater than 7").isLength({ min: 7 })],
    async (req, res) => {
        const errors = validationResult(req)

        if (!errors.isEmpty) {
            return res.status(400).json(errors.array())
        }

        const { email, password } = req.body

        try {
            const connection = await mysql.createConnection(dbConfig)
            const getUserSql = `SELECT id, password FROM users WHERE email=?`
            const [rows] = await connection.query(getUserSql, email)
            if (rows.length === 0) {
                connection.end()
                return res.status(400).json({ message: "User does not exist" })
            }
            const isMatch = bcrypt.compare(rows[0].password, password)
            if (!isMatch) {
                connection.end()
                return res.status(400).json({ message: "Invalid credentials" })
            }
            const userId = rows[0].id
            const token = JWT.sign({ userId: userId }, SECRET_KEY, { expiresIn: '1h' })
            connection.end()
            return res.status(200).json({ message: "login sucessfull", token: token })

        } catch (error) {
            return res.status(400).json(error)
        }

    })

module.exports = router