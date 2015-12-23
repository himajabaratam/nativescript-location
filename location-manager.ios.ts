import { LocationManager as ILocationManager } from "nativescript-location";
export class LocationManager implements ILocationManager {
	
	private locationManager : CLLocationManager;

	constructor() {
		this.locationManager = CLLocationManager.alloc().init();
	}
	
	public requestLocation():Promise<any> {
		let authorizationStatus : number = CLLocationManager.authorizationStatus();
		
		return new Promise<any>((resolve, reject)=>{
			if (!CLLocationManager.locationServicesEnabled()) {
				reject("Location services are not enabled");
			} else if (authorizationStatus== CLAuthorizationStatus.kCLAuthorizationStatusDenied) {
				reject("Denied authorization for location");
			} else if (authorizationStatus== CLAuthorizationStatus.kCLAuthorizationStatusRestricted) {
				reject("Resricted location use");
			} else if (authorizationStatus== CLAuthorizationStatus.kCLAuthorizationStatusAuthorized || 
				authorizationStatus == CLAuthorizationStatus.kCLAuthorizationStatusAuthorizedWhenInUse) {
				resolve("Success");
			} else {
				//kCLAuthorizationStatusNotDetermined
				//We ask for permission.
				this.locationManager.requestWhenInUseAuthorization();
				let intervalId = setInterval(()=>{
					let authorizationStatus: number = CLLocationManager.authorizationStatus();
					if (authorizationStatus== CLAuthorizationStatus.kCLAuthorizationStatusAuthorized || 
						authorizationStatus == CLAuthorizationStatus.kCLAuthorizationStatusAuthorizedWhenInUse) {
						clearInterval(intervalId);
						resolve("success");
					} else if (authorizationStatus == CLAuthorizationStatus.kCLAuthorizationStatusNotDetermined) {
						//Wait for one more second.
					} else {
						clearInterval(intervalId);
						reject("Failed to obtain location");
					}
				}, 1000);
			}
		});
	}
} 