# AlgoBeginner

## Setup

First, install the latest versions of `node` and `npm` from [nodejs.org](https://www.nodejs.org).

Then, from a console, run:

```
git clone https://github.com/hpr/AlgoBeginner
cd AlgoBeginner
npm install
npm run seed
npm run start-dev
```

The webapp should now be accessible from http://localhost:8080/. To deploy to Heroku, sign up for a Heroku account and install [its client](https://devcenter.heroku.com/articles/heroku-cli), then run these commands at the top-level directory to set up an app:

```
heroku login
heroku create <app-name>
heroku addons:create heroku-postgresql:hobby-dev
npm run deploy
heroku run bash
(from the Heroku bash prompt) npm run seed
```

When you’re done, your project should be accessible from https://<app-name>.herokuapp.com!

To test admin functionality on a live site, use admin user `murphy` with password `123`.

To test regular user functionality on a live site, use user `cody` with password `123`.

## Features

Compete for the fastest times across various user-generated challenges in JavaScript! AlgoBeginner uses the `vm2` library to run and time code server-side in a sandbox. All routes are protected to prevent unauthorized access or cheating.

## Tips

Due to caching, `vm2` will typically run a piece of code faster the second time than the first -- so try to submit your code multiple times in a row to get a faster clocking!
