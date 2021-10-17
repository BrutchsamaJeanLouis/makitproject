const express = require('express')
const router = express.Router()
const isLoggedIn = require('../pluginFunctions')

// Model to fetch
const Project = require('../db/models/project')
const Rating = require('../db/models/rating')
const Location = require('../db/models/location')
const Media = require('../db/models/media')
const Fund = require('../db/models/fund')
const Comment = require('../db/models/comment')
const User = require('../db/models/user')

/* GET */
router.get('/get', isLoggedIn, function (req, res, next) {
  Project.findAll({
    where: { userID: req.user.id },
    include: [
      { model: User }, { model: Rating }, { model: Comment }, { model: Location }, { model: Media }, { model: Fund }
    ]
  })
    .then((userResponce) => {
      res.json({ projects: userResponce })
    })
})

module.exports = router
