const express = require('express');
const router = express.Router();
const db = require('../models');
const passport = require('../middlewares/authentication');
const { User } = db;

router.get('/:id', (req, res) => {
  const { id } = req.params;
  User.findByPk(id);

})


router.get('/:id/fullName', (req, res) => {
  const { id } = req.params;
  Post.findByPk(id)
    .then(user => {
      if(!user) {
        return res.sendStatus(404);
      }

      res.json({ fullName: user.getFullname() });
    });
});


module.exports = router;