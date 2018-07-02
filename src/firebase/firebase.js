import { myFirebase } from './config';
import RNFetchBlob from 'rn-fetch-blob'
import { Platform } from 'react-native'

export const getList = async (type) => {
    let arr = [];
    const snaps = await myFirebase.database().ref(type).once('value');
    snaps.forEach(element => {
        arr.push(element.toJSON());
    })
    return arr;
}

export const stringSearch = async (string) => {
    let arr = await getList("products");
    arr = arr.filter(obj => obj.productName.search(new RegExp(string, "i")) > -1);
    return arr;
}
export const categorySearch = async (categoryID) => {
    let arr = [];
    const snaps = await myFirebase.database().ref("products").orderByChild("categoryID").equalTo(categoryID).once("value");
    snaps.forEach(element => {
        arr.push(element.toJSON());
    })

    return arr;
}

export const getUserInfo = async (uid) => {
    let snaps = await myFirebase.database().ref("users/" + uid + "/information/").once("value");
    snaps = snaps.val();
    return snaps;
}

export const updateUserInfo = (obj) => {
    try {
        myFirebase.database().ref('users/' + obj.uid + "/information/").update({ name: obj.name, phone: obj.phone, email: obj.email, address: obj.address, avatarUrl: obj.avatarUrl });
        return 1;
    }
    catch (error) {
        return '-1';
    };

}

export const uploadLocalFile = async (uri, uid) => {
    const mime = 'image';
    const Blob = RNFetchBlob.polyfill.Blob;
    const fs = RNFetchBlob.fs;
    window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
    window.Blob = Blob;

    return new Promise((resolve, reject) => {
        const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri
        const sessionId = new Date().getTime()
        let uploadBlob = null
        const imageRef = myFirebase.storage().ref(uid + '/photo/avatar').child(`${sessionId}`)

        fs.readFile(uploadUri, 'base64')
            .then((data) => {
                return Blob.build(data, { type: `${mime};BASE64` })
            })
            .then((blob) => {
                uploadBlob = blob
                return imageRef.put(blob, { contentType: mime })
            })
            .then(() => {
                uploadBlob.close()
                return imageRef.getDownloadURL()
            })
            .then((url) => {
                resolve(url)
            })
            .catch((error) => {
                return -1;
            })
    })
}

export const updateAvatar = (uid, url) => {
    try {
        myFirebase.database().ref('users/' + parseInt(uid) + '/information/').update({ avatarUrl: url });
        return 1;
    }
    catch (error) {
        return -1;
    }
}

export const sendOrder = (uid, obj) => {
    const timestamp = new Date().getTime();
    myFirebase.database().ref('users/' + uid + '/orderHistory/').child(timestamp).set(obj);
}

export const getOrderHistory = async (uid) => {

    let snaps = await myFirebase.database().ref('users/' + uid + '/orderHistory/').once("value");
    snaps = snaps.val();
    if (snaps === null)
        return null;
    let arr = [];
    let arr1 = Object.keys(snaps);
    let arr2 = Object.values(snaps);
    for (let i = 0; i < arr1.length; i++) {
        arr.push({ timestamp: arr1[i], cart: arr2[i] });
    }
    return arr;
}