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

### Publish to S3

The Jenkinsfile is set up to to build and publish GitHub PR branches to https://pandora.zooniverse.org.

Merges to the GitHub main branch are automatically built and published to https://translations.zooniverse.org

### With npm

Any version of node > 10 should work.

Install the dependencies:

`npm install`

Test:

```npm run test```

Run a development server on `localhost:3000`, with hot reloading:

```npm run start```

Build and publish to staging (https://pandora.zooniverse.org)

```npm run stage```

Build and publish to production (https://translations.zooniverse.org)

```npm run deploy```

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
