
export const ImagePicker = require('react-native-image-picker');
export const options = {
    title: 'Select Avatar',
    customButtons: [
        // { name: 'fb', title: 'Choose Photo from Facebook' },
    ],
    storageOptions: {
        skipBackup: true,
        path: 'images'
    }
};



