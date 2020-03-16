'use strict';

const db = require('../server/db');
const {User, Challenge, Assertion} = require('../server/db/models');

async function seed() {
  await db.sync({force: true});
  console.log('db synced!');

  const users = await Promise.all([
    User.create({email: 'cody', password: '123'}),
    User.create({email: 'murphy', password: '123', isAdmin: true})
  ]);

  const shoutChallenge = await Challenge.create({
    name: 'Shout',
    functionName: 'shout',
    description: 'Return the first argument in uppercase.'
  });
  const shoutAssertions = await Promise.all([
    Assertion.create({
      name: 'uppercases hello',
      input: "'hello'",
      output: "'HELLO'"
    }),
    Assertion.create({
      name: 'leaves uppercased string',
      input: "'WORLD'",
      output: "'WORLD'"
    }),
    Assertion.create({
      name: 'capitalizes sentence',
      input: "'A Boy And His Dog'",
      output: "'A BOY AND HIS DOG'"
    })
  ]);
  await Promise.all(shoutAssertions.map(a => shoutChallenge.addAssertion(a)));

  console.log(`seeded successfully`);
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...');
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log('closing db connection');
    await db.close();
    console.log('db connection closed');
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
