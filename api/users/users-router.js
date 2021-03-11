const express = require('express');
const router = express.Router();
const User = require('../users/users-model')
const Middleware = require('../middleware/middleware')
const Posts = require('../posts/posts-model')

// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required

  router.get('/', (req, res) => {
    // RETURN AN ARRAY WITH ALL THE USERS
    User.get()
      .then( users => {
        res.status( 200 ).json( users )
      })
      .catch( () => {
        res.status( 500 ).json({
          error: "Couldn't fetch users."
        })
      })
  
  });

router.get('/:id', (req, res) => {
  // RETURN THE USER OBJECT
  // this needs a middleware to verify user id
  res.json(200).json(req.user)

});

router.post('/', (req, res) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
  const newUser = req.body
    User.insert(newUser)
    .then( user => {
      res.status(201).json(user)
    })
    .catch( err => {
      res.status(500).json({message:"message"})
    })
  }
);

router.put('/:id', (req, res) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  const newUser = req.body
  const userId = req.user.id 

  User.update(userId, newUser)
  .then(user => {
    res.status(200).json(user);
  })
  .catch(err => {
    res.status(500).json(err);
  })
});

router.delete('/:id', Middleware.validateUserId, (req, res) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
  const userId = req.user.id
  User.remove(userId)
  .then(() => { 
    res.status(200).json(req.user);
  })
  .catch(() => {
    res.status(500).json({
      error: "error"
    })
  })
});

router.get('/:id/posts', Middleware.validateUserId, (req, res) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
  const userId = req.user.id

  User.getUserPosts(userId)
  .then( posts => {
    res.status(200).json(posts)
  })
  .catch(err => {
    res.status(500).json(err);
  })

});

router.post('/:id/posts', Middleware.validateUserId, Middleware.validatePost, (req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  Posts.insert({
    ...req.body,
    user_id: req.params.id
  })
  .then(post => {
    res.status(201).json(post)
  })
  .catch(err => {
    res.status(500).json(err);
  })
});

// do not forget to export the router
module.exports = router;


