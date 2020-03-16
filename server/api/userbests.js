const router = require('express').Router();
const {Challenge, Assertion, UserBest, User} = require('../db/models');
module.exports = router;

router.get('/:id', async (req, res, next) => {
  try {
    const userBest = await UserBest.findByPk(+req.params.id, {
      include: {model: User}
    });
    const challenge = await Challenge.findByPk(userBest.challengeId, {
      include: {model: UserBest, include: {model: User}}
    });
    let myTime = 0;
    const myBest = challenge.userBests.find(ub => ub.user.id === req.user.id);
    if (myBest) {
      myTime = myBest.time;
    }
    if (userBest.time < myTime) {
      res.sendStatus(403);
      return;
    }
    res.json(userBest);
  } catch (err) {
    next(err);
  }
});
