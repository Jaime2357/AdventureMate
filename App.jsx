import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LandingScreen from './pages/LandingPage';
import TripPage from './pages/TripPage';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
      initialRouteName = "Landing"
      screenOptions={styles.header} 
      >
        <Stack.Screen name = "Landing" component ={LandingScreen} options = {{title: 'Welcome!'}}  />
        <Stack.Screen name = "TripPage" component ={TripPage} options = {{title: 'Trip Page'}}/>
      </Stack.Navigator>
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
