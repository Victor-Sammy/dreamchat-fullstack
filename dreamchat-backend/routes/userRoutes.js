const express = require('express')
const passport = require('passport')

const clientURL = 'http://localhost:5173'

const router = express.Router()

router.get('/auth/login/success', async (req, res) => {
  if (req.user) {
    res.status(201).json({ user: req.user })
  }
  res.status(401)
})

router.get('/auth/login/failed', (req, res) => {
  res.status(401).json({ message: 'Log in failure!' })
})

router.get('/google', passport.authenticate('google', ['profile', 'email']))

router.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    successRedirect: clientURL,
    failureRedirect: '/login/failed',
  })
)

router.get('/auth/logout', (req, res) => {
  req.logout({}, (err) => {
    if (err) return res.status(500).json({ message: 'Something went wrong.' })
  })
})

module.exports = router
