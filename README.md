enketo-dristhi [![Build Status](https://travis-ci.org/MartijnR/enketo-dristhi.png)](https://travis-ci.org/MartijnR/enketo-dristhi)
==============

Extended [enketo-core](https://github.com/MartijnR/enketo-core) for use in [Dristhi](https://play.google.com/store/apps/details?id=org.ei.drishti), a hybrid Android app.
External Drishti/Android depencies are mocked so it can be run in the browser.


###To use as library:

1. install [node](http://nodejs.org/) (and [npm](https://npmjs.org/)), [grunt-cli](http://gruntjs.com/getting-started), ruby, rubygems, and the sass gem (`gem install sass`).
2. clone repo
3. get (or update) submodules `git submodule update --init --recursive`
4. Use `grunt` to build.
5. start webserver with `grunt server`.
6. go to [http://localhost:8080/build/index.html](http://localhost:8080/build/index.html) to see list of links to all Dristhi forms
7. note that the index.html list includes instance=a which belongs to form EC_Registration_EngKan. It will throw load errors in the console for all other forms. Instance=c (is not up-to-date but) can be loaded into [PNC_Visit_EngKan](http://localhost:8080/build/template.html?formName=PNC_Visit_EngKan&instanceId=c&debug=true)
8. probably use dristhi.css as-is, but
9. create your own **js build system** that includes the enketo and androidcontext objects and their dependencies (enketo-dristhi-combined.min.js includes require.js itself so you don't want to use that)


###Related Projects

* [enketo-core](https://github.com/MartijnR/enketo-core) - enketo form engine used inside this repo
* [enketo-json](https://github.com/MartijnR/enketo-json) - enketo two-way XML instance to JSON convertor used this repo
* [XPathJS_javarosa](https://github.com/MartijnR/xpathjs_javarosa) - used inside this repo
* [enketo-xslt](https://github.com/MartijnR/enketo-xslt) - the XSLT sheets used to transform OpenRosa XForms into Enketo HTML forms
* [enketo-xslt-transformer-php](https://github.com/MartijnR/enketo-xslt-transformer-php) - a minimalistic example in PHP of an XSLT transformer
* [enketo-xslt-transformer-node] - To follow
* [file-manager](https://github.com/MartijnR/file-manager)
* [openrosa-forms](https://github.com/MartijnR/openrosa-forms) - bunch of test forms, for development
* [enketo-api-docs](https://github.com/MartijnR/enketo-api-docs) - enketo webform API documentation
