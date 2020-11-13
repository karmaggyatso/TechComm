const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    title: 'TechComm',
    description: 'Technology for Community',
  });
});


module.exports = router;