408 Software Testing Project
=========

Installation
------------

Install node js from https://nodejs.org/en/download/

```bash
$ npm install -g gulp-cli
$ npm install -g webpack
$ npm install -g eslint # If you're having issues with eslint you might want to make sure you're on an updated version of node js, or just message me.
$ npm install -g jasmine
$ npm install
```

Deployment
----------

#### Development

```bash
$ npm run start:dev
$ browser http://localhost:8080
```

#### Deploy on Docker
```bash
$ git push docker master
$ browser http://bbserver.jayhankins.me/
```

Team
------------

* Ben Alderfer
* Bryan Duffy
* Jay Hankins
* Rhys Howell
* Roy Fu
