import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SectionList, TouchableOpacity } from 'react-native';
import { AlphabetList } from "react-native-section-alphabet-list";
import { useNavigation } from '@react-navigation/native';
import { loadDB, getDestinations } from '../database/dbAccess';
import { useSQLiteContext } from 'expo-sqlite/next';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { isSearchBarAvailableForCurrentPlatform } from 'react-native-screens';

//const Stack = createNativeStackNavigator();

export default function LandingPage() {

  const [trips, setTrips] = useState([]);
  const [tripsLoaded, loadTrips] = useState(false);
  const navigation = useNavigation();

  const db = useSQLiteContext();

  useEffect(() => {
    console.log("DB: ", db);
    db.withTransactionAsync(async () => {
      var tripResult = await getDestinations(db);
      const formattedTrips = tripResult.map(item => ({ value: item.tripName }));
      setTrips(formattedTrips)
      loadTrips(true);
    })
  }, [db]);

  const handleClick = (item) => {
    console.log("Item: ", item);
    navigation.navigate('TripPage', { currentTrip: item });
  }

  if (!tripsLoaded) {
    return < Text> Loading... </Text>

  }
  else {
    console.log(trips);
    return (
      <AlphabetList
        data={trips}
        renderCustomItem={(item) => (
          <TouchableOpacity onPress={() => handleClick(item.value)} >
            <Text>
              {item.value}
            </Text>
          </TouchableOpacity>
        )}
      //style = {styles.alphaList}
      // indexLetterStyle={{
      //   color: 'blue',
      //   fontSize: 50,
      //   backgroundColor: '#f5f5f5', // Light gray background
      //   padding: 5, // Add padding for better spacing
      // }}
      // renderCustomItem={(item) => (
      //   <View style={styles.listItemContainer}>
      //     <Text style={styles.listItemLabel}>{item.value}</Text>
      //   </View>
      // )}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  alphaList: {
    flex: 1,
    backgroundColor: '#000',
  },
  listItemContainer: {
    backgroundColor: '#588CD1'
  },
  listItemLabel: {
    color: 'white',
  },
  button: {
    color: 'white',
    width: '45%', // Adjust button width as needed
    height: 60, // Increase button height
    backgroundColor: '#588CD1',
    borderRadius: 30, // Make buttons oval
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
  },
});
