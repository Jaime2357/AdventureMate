import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SectionList, TouchableOpacity } from 'react-native';
import { AlphabetList } from "react-native-section-alphabet-list";
import { NavigationContainer } from '@react-navigation/native';

const trips = [
  {value: "Alcapulco"},
  {value: "Japan"},
  {value: "Abu Dahbi"},
  { value: "United States" },
  { value: "Canada" },
  { value: "Mexico" },
  { value: "Brazil" },
  { value: "Argentina" },
  { value: "United Kingdom" },
  { value: "France" },
  { value: "Germany" },
  { value: "Italy" },
  { value: "Spain" },
  { value: "Russia" },
  { value: "China" },
  { value: "India" },
  { value: "Japan" },
  { value: "South Korea" },
  { value: "Australia" },
  { value: "New Zealand" },
  { value: "South Africa" },
  { value: "Nigeria" },
  { value: "Egypt" }
]

// function alphaPull(tripName){
//   return tripName.slice(0, 1).toUpperCase();
// }

// const newTrips = trips
//   .reduce(function (list, trip, index){
//     let listItem = list.fontsize((item) => item.letter && item.letter === alphaPull(trip));
//     if (!listItem){
//       list.push({"letter" : alphaPull(trip), "trips": [trip]})
//     }
//     else{
//       listItem.trips.push(trip)
//     }

//     return list;
//   }, []);

export default function LandingPage() {
  return (
    //<View style={styles.container}>
      <AlphabetList
      data = {trips}
      //style = {styles.alphaList}
      indexLetterStyle={{ 
        color: 'blue', 
        fontSize: 50,
        backgroundColor: '#f5f5f5', // Light gray background
        padding: 5, // Add padding for better spacing
      }}
      renderCustomItem={(item) => (
        <View style={styles.listItemContainer}>
          <Text style={styles.listItemLabel}>{item.value}</Text>
        </View>
      )}
      // renderCustomSectionHeader={(section) => (
      //   <View style={styles.sectionHeaderContainer}>
      //     <Text style={styles.sectionHeaderLabel}>{section.title}</Text>
      //   </View>
      // )}
      />
    //</View>
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
