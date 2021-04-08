# Pandora

An editor for translations of [Panoptes](https://github.com/zooniverse/Panoptes) resources.

## Usage

### With docker-compose

Build an image with node 10 and dependencies installed:

```docker-compose build```

Run a development server on `localhost:3000`, with hot-reloading

```docker-compose up```

Stop the development service

```docker-compose down```

### With npm

Any version of node > 14 should work.

Install the dependencies:

`npm install`

Test:

```npm run test```

Run a development server on `localhost:3000`, with hot reloading:

```npm run start```

## Deployment

Deployment is handled by Github Action. Both staging and production deployment can be run ad hoc in the actions tab as needed if you have the appropriate permissions on the repository.

### Staging

On merge to master, a Github Action is triggered to deploy to staging to `https://pandora.zooniverse.org`.

### Production

Production deployments are triggered by an update to which commit the `production-release` tag is pointed to. This tag should be updated via chat ops and then a Github Action will run that builds and uploads the files to our cloud provider found at `https://translations.zooniverse.org`.

## Credits

Based on the [Zooniverse Starter Project](https://github.com/zooniverse/zoo-reduxify).

## License

Copyright 2015 Zooniverse

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
