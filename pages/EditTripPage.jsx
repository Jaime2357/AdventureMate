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

    const [tripName, setTripName] = useState(null);
    const [destination, setDestination] = useState(null);
    const [startDate, setStartDate] = useState(new Date());
    const [startDateControl, setStartDateControl] = useState(new Date());
    const [changeStart, setChangeStart] = useState(false);
    const [endDate, setEndDate] = useState(new Date());
    const [endDateControl, setEndDateControl] = useState(new Date());
    const [changeEnd, setChangeEnd] = useState(false);
    const [lodgingType, setLodgingType] = useState(null);
    const [lodgingName, setLodgingName] = useState(null);
    const [address, setAddress] = useState(null);
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    useEffect(() => {
        navigation.setOptions({ title: `Edit Details: ${currentTrip.currentTrip}` })
    })

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setShow(false);
        if (start) {
            setStartDate(currentDate);
            setChangeStart(true);
        }
        else {
            setEndDate(currentDate);
            setChangeEnd(true);
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

        var targetTrip = currentTrip.currentTrip;

        if (tripName != null) {
            console.log(1);
            targetTrip = tripName;
            await editTrip(db, "tripName", tripName, currentTrip.currentTrip);
        }

        console.log("Original: ", currentTrip.currentTrip);
        console.log("Trip to Update: ", targetTrip);

        if (destination != null) {
            console.log(2);
            await editTrip(db, "destination", destination, targetTrip);
        }
        if (setChangeStart == setStartDateControl) {
            console.log(3);
            await editTrip(db, "startDate", startDate, targetTrip);
        }
        if (setChangeEnd == setEndDateControl) {
            console.log(4);
            await editTrip(db, "endDate", endDate, targetTrip);
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