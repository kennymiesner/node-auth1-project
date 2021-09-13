const router = require('express').Router()
const {
  checkPasswordLength,
  checkUsernameExists,
  checkUsernameFree,
} = require('./auth-middleware')

router.post('/register', checkPasswordLength, checkUsernameFree, (req, res, next) => { 
  res.json('register')
})

router.post('/login', checkUsernameExists, (req, res, next) => { 
  res.json('login')
})

router.get('/logout', (req, res, next) => { 
  res.json('logout')
})

module.exports = router