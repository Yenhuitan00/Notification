import { AppRegistry } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RNAndroidNotificationListenerHeadlessJsName } from 'react-native-android-notification-listener';

import App from './src';
import { name as appName } from './app.json';

const apiUrl = 'https://cenapi.heroes88.xyz/api/Register/RegisterPlayer';
const maybankQRApp = 'com.maybank.quickmerchant';
const tngEWallet = 'my.com.tngdigital.ewallet';

const mApp = [
  'com.maybank.quickmerchant',
  'my.com.tngdigital.ewallet',
]

const whatsapp = "com.whatsapp.w4b";

const headlessNotificationListener = async ({ notification }) => {
  /**
   * This notification is a JSON string in the following format:
   *  {
   *    "app": string,
   *    "title": string,
   *    "titleBig": string,
   *    "text": string,
   *    "subText": string,
   *    "summaryText": string,
   *    "bigText": string,
   *    "audioContentsURI": string,
   *    "imageBackgroundURI": string,
   *    "extraInfoText": string,
   *    "groupedMessages": Array<Object> [
   *      {
   *        "title": string,
   *        "text": string
   *      }
   *    ]
   *  }
   */

  const userID = await AsyncStorage.getItem('@userID');
  // const bankCode = await AsyncStorage.getItem('@bankCode');

  if (notification) {
    console.log('notification:', notification);

    let parsedNotification = JSON.parse(notification);

    const pushToServer = async () => {
      // console.log('notification:', notification);
      console.log('push userID:', userID);
      // console.log('push bankCode:', bankCode);
      
      if (userID /*&& bankCode*/) {
        const url = apiUrl;
        const data = {
          logo: userID,
          textMsg: parsedNotification.text,
          time: parsedNotification.time,
          phoneNo: parsedNotification.title
        };
        console.log('data:', data);

        const query = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        };

        const response = await fetch(url, query);
        console.log('current time:', new Date());
        console.log('response:', response);
      }
    }
    
    // mApp.forEach(item => {
    //   if (item == parsedNotification.app) {
    //     pushToServer();
    //   }
    // });

     if (parsedNotification.app == whatsapp) {
      pushToServer();
    } 
  }
}

/**
 * AppRegistry should be required early in the require sequence
 * to make sure the JS execution environment is setup before other
 * modules are required.
 */
AppRegistry.registerHeadlessTask(
  RNAndroidNotificationListenerHeadlessJsName,
  () => headlessNotificationListener
);

AppRegistry.registerComponent(appName, () => App);