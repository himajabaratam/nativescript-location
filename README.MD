# NativeScript location plugin

A nativescript ios plugin to obtain location permission for ios 8 and above.

## Installation

Run the following command from the root of your project

```
$ tns plugin add nativescript-location
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

var nativeScriptLocationPermissionModule = require("nativescript-location");
var locationModule = require("location");
function pageLoaded(args) {
    var page = args.object;
    page.bindingContext = vmModule.mainViewModel;
    var locationManager = new nativeScriptLocationPermissionModule.LocationManager();
    locationManager.requestLocation().then(function(successResponse){
        locationModule.getLocation().then(function(location) {
			//do something with the location obtained.
		});
    },function(reason){
        console.log("Failed "+reason);
    });
}
exports.pageLoaded = pageLoaded;
``` 
<img src="https://raw.githubusercontent.com/himajabaratam/nativescript-location/master/LocationPopup.png" width="320" />

Modify key NSLocationWhenInUseUsageDescription key in Info.plist to show your own message instead of "Need location when in use".