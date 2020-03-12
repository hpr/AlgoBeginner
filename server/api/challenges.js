const router = require('express').Router();
const {Challenge, Assertion} = require('../db/models');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const challenges = await Challenge.findAll({
      include: {model: Assertion}
    });
    res.json(challenges);
  } catch (err) {
    next(err);
  }
});
