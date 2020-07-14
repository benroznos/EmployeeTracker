const express = require('express')
const { join } = require('path')
const moment = require('moment')
const mysql = require('mysql2')

mysql.createConnection({
  host:'localhost',
  port:3306,
  user:'root'
  password:'blahblah',
  database:'emp_db'
})

const app = express()
applicationCache.use(express.static(join(_dirname,'public')))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.listen(3000, () => console.log('http://localhost:3000'))