import { React, useState, useContext, useEffect } from "react";
import { useSQLiteContext } from "expo-sqlite/next";
import { useNavigation, useRoute } from "@react-navigation/native";
import { editTrip } from "../database/dbAccess";
import { StyleSheet, Button, View, Text, TextInput, SafeAreaView, TouchableOpacity } from "react-native";
import DateTimePickerModal from 'react-native-modal-datetime-picker';


export default function EditTripPage() {

    const route = useRoute();
    const navigation = useNavigation();

    const db = useSQLiteContext();
    const currentTrip = route.params;

    const [tripName, setTripName] = useState(null);
    const [destination, setDestination] = useState(null);
    const [startDate, setStartDate] = useState(new Date());
    const [showStartPicker, setShowStartPicker] = useState(false);
    const [startChange, setStartChange] = useState(false);
    const [endDate, setEndDate] = useState(new Date());
    const [showEndPicker, setShowEndPicker] = useState(false);
    const [endChange, setEndChange] = useState(false);
    const [lodgingType, setLodgingType] = useState(null);
    const [lodgingName, setLodgingName] = useState(null);
    const [address, setAddress] = useState(null);
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    useEffect(() => {
        navigation.setOptions({ title: `Edit Details: ${currentTrip.currentTrip}` })
    })

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

    async function updateDB() {

        var targetTrip = currentTrip.currentTrip;

        if (tripName != null) {
            console.log(1);
            targetTrip = tripName;
            await editTrip(db, "tripName", tripName, currentTrip.currentTrip);
        }

        console.log("Original: ", currentTrip.currentTrip);
        console.log("Trip to Update: ", targetTrip);
        console.log("Start: ", startChange);
        console.log("End: ", endChange);


        if (destination != null) {
            console.log(2);
            await editTrip(db, "destination", destination, targetTrip);
        }
        if (startChange) {
            console.log(3);
            await editTrip(db, "startDate", dateFormat(startDate), targetTrip);
        }
        if (endChange) {
            console.log(4);
            await editTrip(db, "endDate", dateFormat(endDate), targetTrip);
        }
        if (lodgingType != null) {
            console.log(5);
            await editTrip(db, "lodgingType", lodgingType, targetTrip);
        }
        if (lodgingName != null) {
            console.log(6);
            await editTrip(db, "lodgingName", lodgingName, targetTrip);
        }
        if (address != null) {
            console.log(7);
            await editTrip(db, "address", address, targetTrip);
        }

        console.log('done');
        navigation.navigate('TripPage', { currentTrip: targetTrip })
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

            <TouchableOpacity onPress={() => updateDB()} >
                <Text>Update Trip</Text>
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