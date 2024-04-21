import { React, useState, useContext, useEffect } from "react";
import { useSQLiteContext } from "expo-sqlite/next";
import { useNavigation, useRoute } from "@react-navigation/native";
import { editTrip } from "../database/dbAccess";
import { StyleSheet, Button, View, Text, TextInput, SafeAreaView, TouchableOpacity } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';


export default function EditTripPage() {

    const route = useRoute();
    const navigation = useNavigation();

    const db = useSQLiteContext();
    const currentTrip = route.params;

    const [tripName, setTripName] = useState();
    const [destination, setDestination] = useState();
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [lodgingType, setLodgingType] = useState();
    const [lodgingName, setLodgingName] = useState();
    const [address, setAddress] = useState();
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    useEffect(() => {
        navigation.setOptions({ title: `Edit Details: ${currentTrip}` })
    })

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setShow(false);
        if (start) {
            setStartDate(currentDate);
        }
        else {
            setEndDate(currentDate);
        }
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const showTimepicker = () => {
        showMode('time');
    };

    async function updateDB() {
        if (tripName != null) {
            console.log(1);
            await editTrip(db, "tripName", tripName, currentTrip);
            currentTrip = tripName;
        }
        if (destination != null) {
            console.log(2);
            await editTrip(db, "destination", destination, currentTrip);
        }
        if (startDate != null) {
            console.log(3);
            await editTrip(db, "startDate", startDate, currentTrip);
        }
        if (endDate != null) {
            console.log(4);
            await editTrip(db, "endDate", endDate, currentTrip);
        }
        if (lodgingType != null) {
            console.log(5);
            await editTrip(db, "lodgingType", lodgingType, currentTrip);
        }
        if (lodgingName != null) {
            console.log(6);
            await editTrip(db, "lodgingName", lodgingName, currentTrip);
        }
        if (address != null) {
            console.log(7);
            await editTrip(db, "address", address, currentTrip);
        }

        console.log('done');
        navigation.navigate('TripPage', { currentTrip: currentTrip })
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
                <Button onPress={showDatepicker} title="Start Date" />
                <Button onPress={showTimepicker} title="Start Time" />
                {/* <Text style={styles.label}> Start Date and Time: {startDate.toLocaleString()}</Text> */}
                {show && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={startDate}
                        mode={mode}
                        is24Hour={true}
                        onChange={onChange}
                    />
                )}
            </SafeAreaView>

            <SafeAreaView>
                <Button onPress={showDatepicker} title="Start Date" />
                <Button onPress={showTimepicker} title="Start Time" />
                {/* <Text style={styles.label}> End Date and Time: {endDate.toLocaleString()}</Text> */}
                {show && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={endDate}
                        mode={mode}
                        is24Hour={true}
                        onChange={onChange}
                    />
                )}
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
                onChangeText={newAdd => setDestination(newAdd)}
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