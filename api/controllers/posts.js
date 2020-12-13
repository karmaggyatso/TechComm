const express = require('express');
const router = express.Router();
const db = require('../models');
const passport = require('../middlewares/authentication');
const { Post } = db;

// This is a simple example for providing basic CRUD routes for
// a resource/model. It provides the following:
//    GET    /posts
//    POST   /posts
//    GET    /posts/:id
//    PUT    /posts/:id
//    DELETE /posts/:id 

// There are other styles for creating these route handlers, we typically
// explore other patterns to reduce code duplication.
// TODO: Can you spot where we have some duplication below?


router.get('/', (req,res) => {
  Post.findAll({})
    .then(posts => res.json(posts));
});

router.get('/jobs', (req,res) => {
  Post.findAll({ where: { postType: 'job' }, 
  order:[
    ['id', 'DESC'],
  ]
  })
    .then(posts => res.json(posts));
});

router.get('/rents', (req,res) => {
  Post.findAll({ where: { postType: 'rent' } })
    .then(posts => res.json(posts));
});

router.post('/',
  passport.isAuthenticated(),
  (req, res) => {
    let { title, content, postType } = req.body;
    let userId = req.session.passport.user;
    console.log("req.session: " + JSON.stringify(req.session));
    console.log("req.body: " + JSON.stringify(req.body));
    console.log("title:" + title);
    console.log("content: " + content);
    console.log("postType: " + postType);
    console.log("userId: " + userId);
    
    Post.create({ title, content, postType, userId })
      .then(post => {
        console.log(post.content + " " + post.title);
        res.status(201).json(post);
      })
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  }
);

router.get('/user/:id', (req, res) => {
  const { id } = req.params;
  Post.findAll({ where: { userdId: id } })
    .then(posts =>{
      console.log(res)
      res.json(posts)})
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    })
})


router.get('/:id', (req, res) => {
  const { id } = req.params;
  Post.findByPk(id)
    .then(post => {
      if(!post) {
        return res.sendStatus(404);
      }
      res.json(post);
    });
});


router.put('/:id',
  passport.isAuthenticated(),
  (req, res) => {
    const { id } = req.params;
    Post.findByPk(id)
      .then(post => {
        if(!post) {
          return res.sendStatus(404);
        }

        post.content = req.body.content;
        post.save()
          .then(post => {
            res.json(post);
          })
          .catch(err => {
            res.status(400).json(err);
          });
      });
  }
);


router.delete('/:id',
  passport.isAuthenticated(),
  (req, res) => {
    const { id } = req.params;
    Post.findByPk(id)
      .then(post => {
        if(!post) {
          return res.sendStatus(404);
        }

        post.destroy();
        res.sendStatus(204);
      });
  }
);


module.exports = router;