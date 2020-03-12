const router = require('express').Router();
const {Challenge, Assertion} = require('../db/models');
const {VM} = require('vm2');
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

router.post('/:id', async (req, res, next) => {
  try {
    const challenge = await Challenge.findByPk(+req.params.id, {
      include: {model: Assertion}
    });
    for (let i = 0; i < challenge.assertions.length; i++) {
      const vm = new VM({timeout: 1000});
      const output = vm.run(
        `${challenge.functionName}(${challenge.assertions[i].input})`
      );
      console.log(output);
      res.json(output);
    }
  } catch (err) {
    next(err);
  }
});
