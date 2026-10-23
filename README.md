<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ pnpm install
```

## Running the app

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Running with Docker

The production API image contains only production dependencies. Prisma migrations
run in a separate container before the API starts. For a local deployment test
with PostgreSQL:

```bash
docker compose up --build
```

The API will be available at `http://localhost:3000`, and its documentation at
`http://localhost:3000/api/docs`.

For a deployment platform, run the migration job with the image's
`dependencies` target before starting the `production` image:

```bash
docker build --target dependencies -t guarda-din-api-migrations .
docker run --rm \
  -e DATABASE_URL="postgresql://user:password@host:5432/database?schema=public" \
  guarda-din-api-migrations \
  pnpm prisma migrate deploy
```

Then start the production image with the runtime variables:

```bash
docker build --target production -t guarda-din-api .
docker run --rm -p 3000:3000 \
  -e NODE_ENV=production \
  -e PORT=3000 \
  -e DATABASE_URL="postgresql://user:password@host:5432/database?schema=public" \
  -e SALT=12 \
  -e JWT_SECRET="replace-with-a-strong-secret" \
  guarda-din-api
```

Set `JWT_SECRET` to a strong value before using this setup outside local
development. The database data is stored in the `postgres-data` Docker volume.
To stop the containers without deleting the data:

```bash
docker compose down
```

To stop the containers and remove the local database volume:

```bash
docker compose down -v
```

To build and run the API image against an external PostgreSQL database, provide
the required environment variables when starting the container:

```bash
docker build -t guarda-din-api .
docker run --rm -p 3000:3000 `
  -e NODE_ENV=production `
  -e PORT=3000 `
  -e DATABASE_URL="postgresql://user:password@host:5432/database?schema=public" `
  -e SALT=12 `
  -e JWT_SECRET="replace-with-a-strong-secret" `
  guarda-din-api
```

## Test

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

## Git hooks

The project uses Husky to run local checks before each commit:

- pre-commit: runs Biome lint/format checks and only the unit tests affected by changed files.
- pre-push: runs the end-to-end test suite.
- commit-msg: validates the message against Conventional Commits.

Hooks are installed automatically by pnpm install. Examples of valid commit
messages include:

```text
feat: add expense filtering
fix(auth): handle expired tokens
chore: update dependencies
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
