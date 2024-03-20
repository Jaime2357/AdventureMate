import { useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

const tripDetails = {
    location: "Japan",
    startDate: new Date("2024-03-27 11:00:00"),
    endDate: new Date("2024-08-18 19:00:00"),
    lodgingType: "Dorm",
    lodgingName: "SETTLE International Dormitory",
    address: "〒819-1111 福岡県糸島市泊900-3 セトルインターナショナル  424"
}

export default function TripPage() {

    const navigation = useNavigation();
    const route = useRoute(); // Retrieve the route object
    const { currentTrip } = route.params;

    useEffect(() => {
        navigation.setOptions({ title: currentTrip });
    }, [navigation, route]);

    // const editButton = (item) => {
    //     navigation.navigate('EditTrip', {currentTrip: item});
    // }

    return (
        <View>
            <Text style={styles.label}> 
                Destination: 
                <Text style={styles.value}> {tripDetails.location} </Text>
            </Text>
            <Text style={styles.label}> 
                Duration:
                <Text style={styles.value}> {tripDetails.startDate.toString()} - {tripDetails.endDate.toString()} </Text>
            </Text>
            <Text style={styles.label}> 
                {tripDetails.lodgingType}: 
                <Text style={styles.value}> {tripDetails.lodgingName} </Text>
            </Text>
            <Text style={styles.label}>
                Address: 
                <Text style={styles.value}> {tripDetails.address} </Text>
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    label: {
      fontWeight: 'bold',
      marginBottom: 5,
    },
    value: {
      fontWeight: 'normal',
    },
  });