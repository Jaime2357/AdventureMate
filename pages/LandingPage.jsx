import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SectionList, TouchableOpacity } from 'react-native';
import { AlphabetList } from "react-native-section-alphabet-list";
import { useNavigation } from '@react-navigation/native';
import db from '../database/dbAccess';

export default function LandingPage() {

  const [trips, setTrips] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchTripsFromDatabase = () => {
      db.transaction((tx) => {
        tx.executeSql(
          'SELECT destinations FROM trips;',
          //`SELECT name FROM sqlite_master WHERE type='table';`, 
          [],
          (_, resultSet) => {
            const { rows } = resultSet;
            const fetchedTrips = [];
            console.log("Results: ", resultSet);
            for (let i = 0; i < rows.length; i++) {
              fetchedTrips.push(rows.item(i).destination);
            }
            setTrips(fetchedTrips);
          },
          (_, error) => {
            console.error('Error querying data:', error);
          }
        );
      });
    };

    fetchTripsFromDatabase();
  }, []);

  console.log(trips);

  // const trips = [
  //   { value: "Alcapulco" },
  //   { value: "Japan" },
  //   { value: "Abu Dahbi" },
  //   { value: "United States" },
  //   { value: "Canada" },
  //   { value: "Mexico" },
  //   { value: "Brazil" },
  //   { value: "Argentina" },
  //   { value: "United Kingdom" },
  //   { value: "France" },
  //   { value: "Germany" },
  //   { value: "Italy" },
  //   { value: "Spain" },
  //   { value: "Russia" },
  //   { value: "China" },
  //   { value: "India" },
  //   { value: "Japan" },
  //   { value: "South Korea" },
  //   { value: "Australia" },
  //   { value: "New Zealand" },
  //   { value: "South Africa" },
  //   { value: "Nigeria" },
  //   { value: "Egypt" }
  // ]

  const handleClick = (item) => {
    console.log("Item: ", item);
    navigation.navigate('TripPage', { currentTrip: item });
  }

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
