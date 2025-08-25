import RNFetchBlob from 'react-native-blob-util';
import {Platform, PermissionsAndroid, Alert} from 'react-native';

export const downloadFile = async (url: any) => {
  const {config, fs} = RNFetchBlob;
  const cacheDir = fs.dirs.DownloadDir;
  const imagePath = `${cacheDir}/${url}`;

  try {
    const configOptions: any = Platform.select({
      ios: {
        fileCache: true,
        path: imagePath,
        appendExt: 'jpg',
      },
      android: {
        fileCache: true,
        path: imagePath,
        appendExt: 'jpg',
        addAndroidDownloads: {
          useDownloadManager: true,
          notification: true,
          path: imagePath,
          description: 'File',
        },
      },
    });

    const response = await RNFetchBlob.config(configOptions)
      .fetch('GET', url)
      .then(res => {
        Alert.alert('Image Downloaded Successfully.');
      });

    // Return the path to the downloaded file
    return response;
  } catch (error) {
    console.error(error);
    return null;
  }
};
