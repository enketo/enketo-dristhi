enketo-dristhi [![Build Status](https://travis-ci.org/MartijnR/enketo-dristhi.png)](https://travis-ci.org/MartijnR/enketo-dristhi)
==============

Extended [enketo-core](https://github.com/MartijnR/enketo-core) for use in [Dristhi](https://play.google.com/store/apps/details?id=org.ei.drishti), a hybrid Android app.
External Drishti/Android depencies are mocked so it can be run in the browser.


###To use as library:

1. install [node](http://nodejs.org/) (and [npm](https://npmjs.org/)), [grunt-cli](http://gruntjs.com/getting-started)
2. clone repo
3. Use `grunt` to build.
4. start webserver with `grunt server`.
5. Access like this e.g.: `http://localhost:8080/build/template.html?formName=EC_Registration_24_5_12&instanceId=a&debug=true`
6. probably use dristhi.css as-is, but create your own js build system that includes the enketo and androidcontext objects and their dependencies


### WATCH OUT WHEN UPGRADING TO V2.x!

- requires re-doing XSLT Transformation (not yet deployed on enketo.org and enketo.formhub.org)
- please thoroughly check the styling of some common forms and compare with the old forms (pay particular attention to repeats, font sizes, colors). I expect there may be some styling issuess I may have overlooked or that I considered to be improvements (due to upgrade to bootstrap3) but you may disagree.
- see outstanding issues


###Related Projects

* [enketo-core](https://github.com/MartijnR/enketo-core) - enketo form engine used inside this repo
* [XPathJS_javarosa](https://github.com/MartijnR/xpathjs_javarosa) - used inside this repo
* [enketo-xslt](https://github.com/MartijnR/enketo-xslt) - the XSLT sheets used to transform OpenRosa XForms into Enketo HTML forms
* [enketo-xslt-transformer-php](https://github.com/MartijnR/enketo-xslt-transformer-php) - a minimalistic example in PHP of an XSLT transformer
* [enketo-xslt-transformer-node] - To follow
* [file-manager](https://github.com/MartijnR/file-manager)
* [openrosa-forms](https://github.com/MartijnR/openrosa-forms) - bunch of test forms, for development
* [enketo-api-docs](https://github.com/MartijnR/enketo-api-docs) - enketo webform API documentation
