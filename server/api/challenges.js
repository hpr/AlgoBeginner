const router = require('express').Router();
const {Challenge, Assertion, UserBest, User} = require('../db/models');
const {VM} = require('vm2');
const {performance} = require('perf_hooks');
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

router.post('/', async (req, res, next) => {
  try {
    if (!req.user || !req.user.isAdmin) {
      res.sendStatus(403);
      return;
    }
    const challenge = await Challenge.create(req.body);
    res.json(challenge);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    if (!req.user || !req.user.isAdmin) {
      res.sendStatus(403);
      return;
    }
    const challenge = await Challenge.findByPk(+req.params.id);
    await challenge.destroy();
    res.sendStatus(201);
  } catch (err) {
    next(err);
  }
});

router.post('/:id/addAssertion', async (req, res, next) => {
  try {
    if (!req.user || !req.user.isAdmin) {
      res.sendStatus(403);
      return;
    }
    const assertion = await Assertion.create(req.body);
    const challenge = await Challenge.findByPk(+req.params.id);
    await challenge.addAssertion(assertion);
    res.json(assertion);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const challenge = await Challenge.findByPk(+req.params.id, {
      include: [
        {model: Assertion},
        {model: UserBest, attributes: ['time', 'id'], include: {model: User}}
      ]
    });
    res.json(challenge);
  } catch (err) {
    next(err);
  }
});

router.post('/:id', async (req, res, next) => {
  try {
    const challenge = await Challenge.findByPk(+req.params.id, {
      include: [{model: Assertion}, {model: UserBest, include: {model: User}}]
    });
    const tests = {};
    const start = performance.now();
    for (let i = 0; i < challenge.assertions.length; i++) {
      const asn = challenge.assertions[i];
      let ext = {};
      const vm = new VM({
        timeout: 1000,
        sandbox: {ext}
      });
      vm.run(req.body.code);
      vm.run(
        `ext.test = ${challenge.functionName}(${asn.input}) === ${asn.output};`
      );
      tests[asn.name] = ext.test;
    }
    const end = performance.now();
    const time = end - start;
    const pass = Object.values(tests).every(v => v);
    const result = {tests, time, pass, code: req.body.code, id: challenge.id};
    let myBest = challenge.userBests.find(ub => ub.user.id === req.user.id);
    if (!myBest && pass) {
      myBest = await UserBest.create({
        time: result.time,
        code: req.body.code
      });
      const user = await User.findByPk(req.user.id);
      await myBest.setUser(user);
      await challenge.addUserBest(myBest);
    } else if (myBest && time < myBest.time && pass) {
      const oldBest = await UserBest.findByPk(myBest.id);
      oldBest.time = time;
      oldBest.code = req.body.code;
      await oldBest.save();
      const user = await User.findByPk(req.user.id);
      await oldBest.setUser(user);
    }
    res.json(result);
  } catch (err) {
    next(err);
  }
});
