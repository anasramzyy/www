import express from 'express'
const app = express()
import path from 'path'
import bcrypt from 'bcryptjs'
import collection from './connection.js'
const port = 5000


app.use(express.json())

app.use(express.urlencoded({extended: false}))

app.set("view engine", 'ejs')

app.use(express.static("puplic"))

app.get('/', (req, res) => {
  res.render('login')
})

app.get('/signup', (req, res) => {
  res.render('signup')
})

app.post('/signup', async (req, res) => {
  const data = {
    email: req.body.email,
    password: req.body.password
  }

  const existingUser = await collection.findOne({email: data.email})

  if(existingUser) {
    res.send("User already exists. please choose a different username.")
  } else {
    const saltRounds = 8
    const hashedPassword = await bcrypt.hash(data.password, saltRounds)

    data.password = hashedPassword
    const userData = await collection.insertMany(data)
    console.log(userData)
  }
})

app.post('/login', async (req, res) => {
  try {
    const check = await collection.findOne({email: req.body.email})
    if (!check) {
      res.send("email not found")
    }

    const isPasswordMatch = await bcrypt.compare(req.body.password, check.password)
    if (!isPasswordMatch) {
      res.render('home')
    } else {
      res.send('wrong password')
    }
  } catch {
    res.send('wrong details')
  }
})


app.listen(port, () => console.log(`Example app listening on port ${port}!`))