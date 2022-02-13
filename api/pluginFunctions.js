const isLoggedIn = async (req, res, next) => {
  // if user is authenticated and the session still exist, carry on
  if (req.isAuthenticated() || req.session?.passport?.user) {
    return next()
  }
  console.log('>>>>>>>>>request not logged in')
  // if they aren't redirect them to the home page
  res.redirect('/')
}

module.exports = [
  isLoggedIn
]
