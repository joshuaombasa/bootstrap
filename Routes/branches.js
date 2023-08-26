const express = require('express')
const mysql = require('mysql2/promise')

const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'bundaz'
}

const router = express.Router()

router.get('/', async (req, res) => {
    try {
        const connection = await mysql.createConnection(dbConfig)
        const getBranchesSql = `SELECT * FROM branches`
        const [rows] = await connection.query(getBranchesSql)
        connection.end()
        return res.status(200).json(rows)

    } catch(error) {
        connection.end()
        return res.status(400).json(error)
    }
})

module.exports = router