import AuthMiddleware from './middleware/AuthMiddleware'
import User from './controllers/UserController'
import Auth from './controllers/AuthController'
import Post from './controllers/PostController'

module.exports = (router) => {
  // User
  router.post('/api/v1/users', User.create)
  router.get('/api/v1/users/:id', User.findOne)
  router.post('/api/v1/login', Auth.login)
  router.put('/api/v1/users/:id', AuthMiddleware, User.updateUser)
  router.put('/api/v1/users/:id/profile', AuthMiddleware, User.updateProfile)
  router.put('/api/v1/users/:id/password', AuthMiddleware, User.updatePassword)
  
  // Post
  router.post('/api/v1/posts', AuthMiddleware, Post.create)
}
