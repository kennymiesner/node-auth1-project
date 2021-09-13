const router = require('express').Router()
const {
  checkPasswordLength,
  checkUsernameExists,
  checkUsernameFree,
} = require('./auth-middleware')

router.post('/register', checkPasswordLength, checkUsernameFree, (req, res, next) => { // eslint-disable-line
  res.json('register')
})

router.post('/login', checkUsernameExists, (req, res, next) => { // eslint-disable-line
  res.json('login')
})

router.get('/logout', (req, res, next) => { // eslint-disable-line
  res.json('logout')
})

module.exports = router