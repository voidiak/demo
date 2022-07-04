# SAPUI5 Demo App

## Introduction

Following the [tutorial](https://sapui5.hana.ondemand.com/#/topic/851bde42e4e1410c96abbe402fa9128c) in the official documentation
leads to the error message.

Also the [Getting Started](https://sap.github.io/ui5-tooling/pages/GettingStarted/) page does not resolve that.

```conf
⚠️  Process Failed With Error

Error Message:
Could not find required manifest.json for project webapp: ENOENT: no such file or directory, open '/home/user/projects/webapp/manifest.json'
```

Thankfully, there is a [Github issue](https://github.com/SAP/openui5/issues/3292), that deals with this issue.

I could follow it besides setting the webapp path, which seems to be superfluous.
Further more dependencies to SAPUI5 libraries should no longer be handled via the package.json file, but added using ui-cli like this:

`ui5 add sap.ui.core sap.m sap.ui.table themelib_sap_fiori_3`

This updates the ui5.yaml file with the configuration needed. The first start of the application server installs missing dependencies.

## Tipps

* Installing dependencies: `npm install`
* Start developement web server on port 8080: `ui5 serve`
* \[CTRL\] + \[C\] will be highjacked by SAPBAS (Sap Business Application Studio), press \[CTRL\] + \[ALT\] + \[C\] to mitigate that.