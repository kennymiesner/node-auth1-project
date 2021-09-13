const router = require('express').Router()
const User = require('../users/users-model')
const bcrypt = require('bcryptjs')
const {
  checkPasswordLength,
  checkUsernameExists,
  checkUsernameFree,
} = require('./auth-middleware')

router.post('/register', checkPasswordLength, checkUsernameFree, (req, res, next) => { 
  const { username, password } = req.body
  const hash = bcrypt.hashSync(password, 8)

  User.add({ username, password: hash })
    .then(saved => {
      res.status(201).json(saved)
    })
    .catch(next)
})

router.post('/login', checkUsernameExists, (req, res, next) => { 
  const { password } = req.body
  if (bcrypt.compareSync(password, req.user.password)) {
    req.session.user = req.user
    res.json({
      message: `Welcome ${req.user.username}!`
    })
  } else {
    next({
      status: 401,
      message: 'Invalid credentials'
    })
  }
})

router.get('/logout', (req, res, next) => { 
  res.json('logout')
})

module.exports = router