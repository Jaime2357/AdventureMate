import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {SQLiteProvider} from 'expo-sqlite/next';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { loadDB } from './database/dbAccess';

import LandingScreen from './pages/LandingPage';
import TripPage from './pages/TripPage';
import EditTripPage from './pages/EditTripPage';

const Stack = createNativeStackNavigator();

export default function App() {

  const [dbLoaded, setDBbLoaded] = useState(false);

  useEffect(() => {
    loadDB()
    .then(() => setDBbLoaded(true))
    .catch((e) => console.error(e) );
  }, []);

  if(!dbLoaded){
    return < Text> Loading... </Text>
  }
  return (
    <NavigationContainer>
      <SQLiteProvider databaseName = "AdventureDataV301.db">
      <Stack.Navigator 
      initialRouteName = "Landing"
      screenOptions={styles.header} 
      >
        <Stack.Screen name = "Landing" component ={LandingScreen} options = {{title: 'Welcome!'}}  />
        <Stack.Screen name = "TripPage" component ={TripPage} options = {{title: 'Trip Page'}}/>
        <Stack.Screen name = "EditTripPage" component ={EditTripPage} options = {{title: 'Edit Trip'}}/>
      </Stack.Navigator>
      </SQLiteProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header:{ 
    headerStyle: {
      backgroundColor: '#588CD1'
    }
  },
  texttest: {
    color: 'white',
  },
});
