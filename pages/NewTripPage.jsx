import { React, useState, useContext, useEffect } from "react";
import { useSQLiteContext } from "expo-sqlite/next";
import { useNavigation, useRoute } from "@react-navigation/native";
import { addTrip } from "../database/dbAccess";
import { StyleSheet, Button, View, Text, TextInput, SafeAreaView, TouchableOpacity } from "react-native";
import DateTimePickerModal from 'react-native-modal-datetime-picker';


export default function NewTripPage() {

    const navigation = useNavigation();

    const db = useSQLiteContext();

    const [tripName, setTripName] = useState("Unnamed Trip");
    const [destination, setDestination] = useState("N/A");
    const [startDate, setStartDate] = useState(new Date());
    const [showStartPicker, setShowStartPicker] = useState(false);
    const [startChange, setStartChange] = useState(false);
    const [endDate, setEndDate] = useState(new Date());
    const [showEndPicker, setShowEndPicker] = useState(false);
    const [endChange, setEndChange] = useState(false);
    const [lodgingType, setLodgingType] = useState("Accomodation");
    const [lodgingName, setLodgingName] = useState("None");
    const [address, setAddress] = useState("None");

    const handleStartConfirm = (date) => {
        setStartDate(date);
        setShowStartPicker(false);
        setStartChange(true);
    };

    const handleStartCancel = () => {
        setShowStartPicker(false);
    }

    const handleEndConfirm = (date) => {
        setEndDate(date);
        setShowEndPicker(false);
        setEndChange(true);
    };

    const handleEndCancel = () => {
        setShowEndPicker(false);
    }

    function dateFormat(date){
        const isoString = date.toISOString();
        const datePart = isoString.split('T')[0];
        const timePart = isoString.split('T')[1].split('.')[0];
        return `${datePart} ${timePart}`;

    }

    async function addToDB() {
        // For now we'll put in dummy values, add checks later 
        // DO NOT DO MORE THAN ONE UNNAMED TRIP, DB REQUIRES UNIQUE NAMES

        // Add Checkbox for DateSet, for now defaults to current time]
        // Add Checkbox for Accomodations too

        await addTrip(db, tripName, destination, dateFormat(startDate),  
        dateFormat(endDate), lodgingType, lodgingName, address);

        console.log('done');
        navigation.navigate('Landing');
    }

    return (
        <View>
            <Text style={styles.label}>
                Trip Name:
            </Text>
            <TextInput
                style={styles.value}
                onChangeText={newName => setTripName(newName)}
            />

            <Text style={styles.label}>
                Destination:
            </Text>
            <TextInput
                style={styles.value}
                onChangeText={newDest => setDestination(newDest)}
            />

            <SafeAreaView>
                <Button
                title = "Select Start Date" 
                onPress={setShowStartPicker}
                />
                <DateTimePickerModal
                isVisible={showStartPicker}
                mode="datetime"
                date = {startDate}
                onConfirm={handleStartConfirm}
                onCancel={handleStartCancel}
                />
                <Text style={styles.label}> Start Date and Time: {startDate.toLocaleString()}</Text>
            </SafeAreaView>

            <SafeAreaView>
            <Button
                title = "Select End Date" 
                onPress={setShowEndPicker}
                />
                <DateTimePickerModal
                isVisible={showEndPicker}
                mode="datetime"
                date = {endDate}
                onConfirm={handleEndConfirm}
                onCancel={handleEndCancel}
                />
                <Text style={styles.label}> End Date and Time: {endDate.toLocaleString()}</Text>
            </SafeAreaView>

            <Text style={styles.label}>
                Accomodation Type:
            </Text>
            <TextInput
                style={styles.value}
                onChangeText={newLT => setLodgingType(newLT)}
            />

            <Text style={styles.label}>
                Accomodation Name:
            </Text>
            <TextInput
                style={styles.value}
                onChangeText={newLN => setLodgingName(newLN)}
            />

            <Text style={styles.label}>
                Address:
            </Text>
            <TextInput
                style={styles.value}
                onChangeText={newAdd => setAddress(newAdd)}
            />

            <TouchableOpacity onPress={() => addToDB()} >
                <Text>Save Trip</Text>
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