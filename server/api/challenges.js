const router = require('express').Router();
const {Challenge, Assertion} = require('../db/models');
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

router.get('/:id', async (req, res, next) => {
  try {
    const challenge = await Challenge.findByPk(+req.params.id, {
      include: {model: Assertion}
    });
    res.json(challenge);
  } catch (err) {
    next(err);
  }
});

router.post('/:id', async (req, res, next) => {
  try {
    const challenge = await Challenge.findByPk(+req.params.id, {
      include: {model: Assertion}
    });
    const results = {};
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
        `ext = ${challenge.functionName}(${asn.input}) === ${asn.output};`
      );
      results[asn.name] = ext;
    }
    const end = performance.now();
    const time = end - start;
    res.json({results, time, code: req.body.code});
  } catch (err) {
    next(err);
  }
});
