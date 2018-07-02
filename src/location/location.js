import { PermissionsAndroid } from 'react-native'

export const getLocation = async () => {
    const isGranted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
    if (isGranted === 'granted') {
        return new Promise(resolve => 
            navigator.geolocation.getCurrentPosition((position) => {
                let address = getAddress(position.coords.latitude, position.coords.longitude);
                resolve(address);
            })
        );
    }
    else
        return null;
}
export const getAddress = async (myLatitude, myLongitude) => {
    const myAddress = await fetchData(myLatitude, myLongitude);
    if (myAddress.status === 'OK') {
        return myAddress.results[0].formatted_address;
    }
    else {
        getAddress(myLatitude, myLongitude);
    }
}

export const fetchData = async (myLatitude, myLongitude) => {
    return fetch(`http://maps.googleapis.com/maps/api/geocode/json?latlng=${myLatitude},${myLongitude}&sensor=false`)
        .then((response) => { return response.json() })
        .catch((error) => {
            console.error(error);
        });
}