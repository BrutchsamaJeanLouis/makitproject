const express = require('express')
const router = express.Router()
const isLoggedIn = require('../pluginFunctions')

// Model to fetch
const Project = require('../db/models/project')
const Like = require('../db/models/like')
const Location = require('../db/models/location')
const Media = require('../db/models/media')
const Fund = require('../db/models/fund')

/* GET */
router.get('/get', isLoggedIn, function (req, res, next) {
  Project.findAll({
    where: { userID: req.user.id },
    include: [
      { model: Like }, { model: Location }, { model: Media }, { model: Fund }
    ]
  })
    .then((userResponce) => {
      res.json({ projects: userResponce })
    })
})

module.exports = router
