# Setup

install redis (http://redis.io/topics/quickstart)
install mongodb (most likely)
`npm install`

run eslint
`npm run lint`

run basic bdd test on endpoints/URIs with coverage
`NODE_ENV=local|development|preprod|production npm run test`

start the service
`NODE_ENV=local|development|preprod|production npm run start`

src/app            = server side
src/app/api        = api routes (where all responses are returned)
src/app/controller = where all templates are served from
src/app/middleware = middleware
src/app/model      = immuteable objects to enforce api contract
src/app/networking = external connections go here (most of the DB methods and any external api stuff)
src/app/test       = testing library, new routes get added to the feature file
src/app/util       = general utility directory, extensions, helpers, etc.
src/app/views      = templates

src/public = client side
