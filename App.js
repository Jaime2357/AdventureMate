import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './pages/HomePage';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
      initialRouteName = "Home"
      screenOptions={styles.header} 
      >
        <Stack.Screen name = "Home" component ={HomeScreen} options = {{title: 'Dashboard'}}  />
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
