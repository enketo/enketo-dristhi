enketo-dristhi [![Build Status](https://travis-ci.org/MartijnR/enketo-dristhi.png)](https://travis-ci.org/MartijnR/enketo-dristhi)
==============

Extended [enketo-core](https://github.com/MartijnR/enketo-core) for use in [Dristhi](https://play.google.com/store/apps/details?id=org.ei.drishti), a hybrid Android app.
External Drishti/Android depencies are mocked so it can be run in the browser.

Use `grunt` to build.

start webserver with `grunt server`.

Access like this e.g.: `http://localhost:8080/build/template.html?formName=EC_Registration_24_5_12&instanceId=a&debug=true`


### WATCH OUT WHEN UPGRADING TO V2.x

- requires re-doing XSLT Transformation (not yet deployed on enketo.org and enketo.formhub.org)


###Related Projects

* [enketo-core](https://github.com/MartijnR/enketo-core) - enketo form engine used inside this repo
* [XPathJS_javarosa](https://github.com/MartijnR/xpathjs_javarosa) - used inside this repo
* [enketo-xslt](https://github.com/MartijnR/enketo-xslt) - the XSLT sheets used to transform OpenRosa XForms into Enketo HTML forms
* [enketo-xslt-transformer-php](https://github.com/MartijnR/enketo-xslt-transformer-php) - a minimalistic example in PHP of an XSLT transformer
* [enketo-xslt-transformer-node] - To follow
* [file-manager](https://github.com/MartijnR/file-manager)
* [openrosa-forms](https://github.com/MartijnR/openrosa-forms) - bunch of test forms, for development
* [enketo-api-docs](https://github.com/MartijnR/enketo-api-docs) - enketo webform API documentation
