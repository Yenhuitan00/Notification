import React, { useState, useEffect } from 'react';
import { 
  SafeAreaView,
  Text,
  Image,
  Button,
  AppState,
  View,
  FlatList,
  TextInput,
  Alert,
} from 'react-native';
import RNAndroidNotificationListener from 'react-native-android-notification-listener';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';

import styles from './styles';

const App = () => {
  const [hasPermission, setHasPermission] = useState(false);
  const [lastNotification, setLastNotification] = useState(null);
  
  const [hasInfo, setHasInfo] = useState(false);

  const [selectedBank, setSelectedBank] = useState();
  const [userID, setUserID] = useState();

  const [storedUserId, setStoredUserId] = useState();
  const [storedBankCode, setStoredBankCode] = useState();

  let bankList = [
    {
      id: 1,
      name: 'Maybank',
      bankCode: 'MBB',
    },
    {
      id: 2,
      name: 'CIMB',
      bankCode: 'CIMB',
    },
    {
      id: 3,
      name: 'Public Bank',
      bankCode: 'PBB',
    },
  ];

  let bankList2 = {
    '0': '-',
    '1': 'MBB',
    '2': 'CIMB',
    '3': 'RHB',
    '4': 'PBB',
    '5': 'HLB',
    '6': 'AMB',
    '7': 'TNG',
    
  };

  const handleOnPressPermissionButton = async () => {
    /**
     * Open the notification settings
     * so the user can enable it
     */
    RNAndroidNotificationListener.requestPermission()
  };

  const handleAppStateChange = async (nextAppState) => {
    if (nextAppState === 'active') {
      /**
       * Check the user current notitication permission status
       */
      RNAndroidNotificationListener.getPermissionStatus().then(
        (status) => {
          setHasPermission(status !== 'denied');
        }
      )
    }
  }

  // const handleCheckNotificationInterval = async () => {
  //   const lastStoredNotification = await AsyncStorage.getItem(
  //     '@lastNotification'
  //   )

  //   if (lastStoredNotification) {
  //     /**
  //      * As the notification is a JSON string,
  //      * here I just parse it
  //      */
  //     setLastNotification(JSON.parse(lastStoredNotification));
  //     // console.log('parsed notification', lastNotification);
  //   }
  // }

  const checkForInfo = async () => {
    const checkUserID = await AsyncStorage.getItem('@userID');
    // const checkBankCode = await AsyncStorage.getItem('@bankCode');
    if (checkUserID /*&& checkBankCode*/) {
      setHasInfo(true);
      setUserID(checkUserID);
      // setSelectedBank(checkBankCode);
      console.log('check user ID:', checkUserID);
      // console.log('check bank code:', checkBankCode);
    } else {
      setHasInfo(false);
      console.log('check user ID:', checkUserID);
      // console.log('check bank code:', checkBankCode);
    }
  }

  useEffect(() => {
    let appState = AppState.addEventListener('change', handleAppStateChange);

    checkForInfo();
  
    return () => {
      appState.remove();
    }
  }, [])

  const submitInfo = async () => {
    if (/*selectedBank != '-' &&*/ userID != '' && userID != null) {
      await AsyncStorage.setItem('@userID', userID);
      // await AsyncStorage.setItem('@bankCode', selectedBank);
      checkForInfo();
    } else {
      Alert.alert(
        'Insufficient Info',
        'Please enter User ID'
      )
    }
  }

  const clearInfo = async () => {
    await AsyncStorage.removeItem('@userID');
    // await AsyncStorage.removeItem('@bankCode');
    setUserID();
    setSelectedBank('-');
    checkForInfo();
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.buttonWrapper}>
        <Text
          style={[
            styles.permissionStatus,
            { color: hasPermission ? 'green' : 'red' },
          ]}
        >
          {
            hasPermission
            ? 'Allowed to handle notifications'
            : 'NOT allowed to handle notifications'
          }
        </Text>
        <Button
          title='Open Settings'
          onPress={handleOnPressPermissionButton}
          disabled={hasPermission}
        />
      </View>

      {/* <View style={styles.bankSelectionWrapper}>
        <Text style={styles.bankSelectionLabel}>Select Bank :</Text>
        <Picker
          style={styles.bankPicker}
          mode='dropdown'
          selectedValue={selectedBank}
          onValueChange={(itemValue, itemIndex) => {
            setSelectedBank(itemValue);
            console.log(itemValue);
          }}
          enabled={!hasInfo}
        >
          {
            Object.keys(bankList2).map((key) => 
              <Picker.Item label={bankList2[key]} value={bankList2[key]} key={key} />
            )
          }
        </Picker>
      </View> */}

      <View style={styles.bankSelectionWrapper}>
        <Text style={styles.bankSelectionLabel}>User ID :</Text>
        <TextInput
          value={userID}
          placeholder='User ID'
          style={styles.bankPicker}
          autoCapitalize='none'
          autoCorrect={false}
          onChangeText={userID => setUserID(userID)}
          editable={!hasInfo}
        />
      </View>

      {/* <View style={styles.bankSelectionWrapper}>
        <Text style={styles.bankSelectionLabel}>User ID :</Text>
        <Text>{`${userID}`}</Text>
      </View> */}

      {/* <View style={styles.bankSelectionWrapper}>
        <Text style={styles.bankSelectionLabel}>Have info :</Text>
        <Text>{`${hasInfo}`}</Text>
      </View> */}

      <View style={[styles.bankSelectionWrapper, { justifyContent: 'center' }]}>
        <Button
          title='Submit'
          onPress={submitInfo}
          disabled={hasInfo}
        />
      </View>

      <View style={[styles.bankSelectionWrapper, { justifyContent: 'center' }]}>
        <Button
          title='Clear Saved Data'
          onPress={clearInfo}
          disabled={!hasInfo}
        />
      </View>

    </SafeAreaView>
  )
  
}

export default App;