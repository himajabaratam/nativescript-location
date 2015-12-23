# NativeScript location plugin

A nativescript ios plugin to obtain location for ios 8 and above

## Installation

Run the following command from the root of your project

```
$ tns plugin add nativescipt-location
```

This command automatically install the necessary ios files from the cocoapod github repository and adds as a dependency in your package.json file

## Examples

There is an sample application at the folder "Sample". To run it (assuming you have nativescript plugin installed globally) 

```
$ sudo npm install typescript -g
$ tsc
$ cd Example
$ tns plugin add ../
```

Run the application from your mac onto your iOS simulator by typing
```
$ tns emulate ios --device=iPhone\ 5s
```

Following code from Sample/app/main.js shows a way to listen to location permission changes

```js

var locationManagerModule = require("nativescript-location");
var locationModule = require("location");
function pageLoaded(args) {
    var page = args.object;
    page.bindingContext = vmModule.mainViewModel;
    var locationManager = new locationManagerModule.LocationManager();
    locationManager.requestLocation().then(function(successResponse){
        locationModule.getLocation().then(functio(location) {
			//do something with the location obtained.
		});
    },function(reason){
        console.log("Failed "+reason);
    });
}
exports.pageLoaded = pageLoaded;
``` 