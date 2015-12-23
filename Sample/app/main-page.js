var vmModule = require("./main-view-model");
var locationManagerModule = require("nativescript-location");

function pageLoaded(args) {
    var page = args.object;
    page.bindingContext = vmModule.mainViewModel;
    var locationManager = new locationManagerModule.LocationManager();
    locationManager.requestLocation().then(function(successResponse){
        console.log('Success');
    },function(reason){
        console.log("Failed "+reason);
    });
}
exports.pageLoaded = pageLoaded;
