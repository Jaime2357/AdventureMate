import { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, BackHandler } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useSQLiteContext } from 'expo-sqlite/next';
import { getItinerary, deleteTrip } from '../database/dbAccess';
import { Box } from "native-base";


export default function TripPage() {

    const navigation = useNavigation();
    const route = useRoute(); // Retrieve the route object
    const [tripData, setTripData] = useState();
    const [tripLoaded, loadTrip] = useState(false);

    const db = useSQLiteContext();
    const { currentTrip } = route.params;

    // useEffect(()=>{
    //     BackHandler.addEventListener("hardwareBackPress",()=>{
    //     navigation.navigate("LandingPage", {currentTrip: currentTrip});
    //     //You can add any other statements also 
    //     return true;
    //     })
    //    },[])

    useEffect(() => {
        navigation.setOptions({ title: currentTrip });
        db.withTransactionAsync(async () => {
            console.log("Accessing: ", currentTrip);
            result = await getItinerary(db, currentTrip);
            console.log("Output: ", result);
            setTripData(result);
            loadTrip(true);
            //const for = tripResult.map(item => ({ value: item.destination }));
        })
    }, [navigation, route, db]);

    const editButton = (item) => {
        loadTrip(false);
        navigation.navigate('EditTripPage', { currentTrip: item });
    }

    const budgetsButton = (item) => {
        loadTrip(false);
        navigation.navigate('BudgetListPage', { currentTrip: item });
    }

    async function deleteButton(){// Add Prompt
        loadTrip(false);
        await deleteTrip(db, currentTrip);
        navigation.navigate('Landing');

    }

    if (!tripLoaded) {
        return < Text> Loading... </Text>
    }
    else{
        console.log("Itinerary Loaded:", currentTrip, " - ", tripData)
    }

    return (
        <View>
            <Text style={styles.label}>
                Destination:
                {!(tripData.destination) ? (
                    <Text style={styles.value}> N/A </Text>)
                    : (
                        <Text style={styles.value}> {tripData.destination} </Text>
                    )}
            </Text>
            <Text style={styles.label}>
                Duration:
                {!(tripData.startDate) || !(tripData.endDate) ? (
                    <Text style={styles.value}> N/A </Text>)
                    : (
                        <Text style={styles.value}> {new Date(tripData.startDate).toString()} - {new Date(tripData.endDate).toString()} </Text>
                    )}
            </Text>
            <Text style={styles.label}>
                {tripData.lodgingType}:
                {!(tripData.lodgingName) ? (
                    <Text style={styles.value}> N/A </Text>)
                    : (
                        <Text style={styles.value}> {tripData.lodgingName} </Text>
                    )}
            </Text>
            <Text style={styles.label}>
                Address:
                {!(tripData.address) ? (
                    <Text style={styles.value}> N/A </Text>)
                    : (
                        <Text style={styles.value}> {tripData.address} </Text>
                    )}
            </Text>

            <TouchableOpacity onPress={() => editButton(currentTrip)} >
                <Text>Edit Trip Details</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => budgetsButton(currentTrip)} >
                <Text>Budgets</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => deleteButton()} >
                <Text>Delete Trip</Text>
            </TouchableOpacity>

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