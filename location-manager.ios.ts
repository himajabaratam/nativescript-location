import { LocationManager as ILocationManager } from "nativescript-location";

class HZLocationListenerImpl extends NSObject implements CLLocationManagerDelegate {
    public static ObjCProtocols = [CLLocationManagerDelegate];

    static new(): HZLocationListenerImpl {
        return <HZLocationListenerImpl>super.new();
    }

    private authCallback : (status:number) => void;
    
    public initWithAuthorizationCallback(authCallback:(status:number)=> void): HZLocationListenerImpl {
        this.authCallback = authCallback;
        return this;
    }

    public locationManagerDidChangeAuthorizationStatus(locationManager: CLLocationManager, authorizationStatus : number) {
        this.authCallback(authorizationStatus);
    }
}

export class LocationManager implements ILocationManager {
	
	private locationManager : CLLocationManager;

	constructor() {
		this.locationManager = CLLocationManager.alloc().init();
	}
	
	public requestLocation():Promise<any> {
		let authorizationStatus : number = CLLocationManager.authorizationStatus();
		
		return new Promise<string>((resolve, reject)=>{
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
                this.locationManager.delegate = HZLocationListenerImpl.new().initWithAuthorizationCallback( (authorizationStatus: number) => {
					if (authorizationStatus== CLAuthorizationStatus.kCLAuthorizationStatusAuthorized || 
						authorizationStatus == CLAuthorizationStatus.kCLAuthorizationStatusAuthorizedWhenInUse) {
						resolve("success");
					} else if (authorizationStatus == CLAuthorizationStatus.kCLAuthorizationStatusNotDetermined) {
                        //Wait till we get a sucess or reject.
					} else {
						reject("Failed to obtain location");
					}
                });
				this.locationManager.requestWhenInUseAuthorization();
			}
		});
	}
} 