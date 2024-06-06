import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SectionList, TouchableOpacity } from 'react-native';
import { AlphabetList } from "react-native-section-alphabet-list";
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { loadDB, getDestinations } from '../database/dbAccess';
import { useSQLiteContext } from 'expo-sqlite/next';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { isSearchBarAvailableForCurrentPlatform } from 'react-native-screens';
import { Box } from "native-base";

//const Stack = createNativeStackNavigator();

export default function LandingPage() {

  const [trips, setTrips] = useState([]);
  const [tripsLoaded, loadTrips] = useState(false);
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const db = useSQLiteContext();

  useEffect(() => {
    console.log("DB: ", db);
    db.withTransactionAsync(async () => {
      var tripResult = await getDestinations(db);
      const formattedTrips = tripResult.map(item => ({ value: item.tripName }));
      setTrips(formattedTrips)
      loadTrips(true);
    })
  }, [isFocused]);

  const handleClick = (item) => {
    console.log("Item: ", item);
    navigation.navigate('TripPage', { currentTrip: item });
  }

  const newButton = () => {
    navigation.navigate('NewTripPage');
  }

  if (!tripsLoaded) {
    return < Text> Loading... </Text>

  }
  else {
    console.log(trips);
    return (
      <View>

        <AlphabetList
          data={trips}
          renderCustomItem={(item) => (
            <TouchableOpacity onPress={() => handleClick(item.value)} >
              <Text>
                {item.value}
              </Text>
            </TouchableOpacity>
          )}
        />

        <Box
          bg={{
            linearGradient: {
              colors: ['lightBlue.300', 'violet.800'],
              start: [0, 0],
              end: [1, 0],
            },
          }}
          p="12"
          rounded="lg"
          _text={{ fontSize: 'md', fontWeight: 'bold', color: 'black' }}
        >
          <TouchableOpacity onPress={() => newButton()} >
            <Text>New Trip</Text>
          </TouchableOpacity>
        </Box>

      </View>
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
