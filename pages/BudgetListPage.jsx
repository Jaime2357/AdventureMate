import { React, useState, useContext, useEffect } from "react";
import { useSQLiteContext } from "expo-sqlite/next";
import { useNavigation, useRoute, useIsFocused} from "@react-navigation/native";
import { AlphabetList } from "react-native-section-alphabet-list";
import { getBudgets } from "../database/dbAccess";
import { StyleSheet, Button, View, Text, TextInput, SafeAreaView, TouchableOpacity } from "react-native";

export default function BudgetListPage(){

    const [budgets, setBudgets] = useState([]);
    const [listLoaded, loadList] = useState(false);
    const navigation = useNavigation();
    const route = useRoute();
    const isFocused = useIsFocused();

    const currentTrip = route.params;
    const db = useSQLiteContext();


    useEffect(() => {
        console.log("DB: ", db);
        db.withTransactionAsync(async () => {
          var budgetsResult = await getBudgets(db, currentTrip);
          //console.log("Budget Results: ", budgetsResult);
          const formattedBudgets = budgetsResult.map(item => ({ value: item.budgetName }));
          setBudgets(formattedBudgets)
          loadList(true);
        })
      }, [isFocused]);

      const handleClick = (item) => {
        // console.log("Item: ", item);
        // navigation.navigate('TripPage', { currentTrip: item });
        console.log("Clicked");
      }
    
    //   const newButton = () => {
    //     navigation.navigate('NewTripPage');
    // }

    if (!listLoaded) {
        return < Text> Loading... </Text>
    
      }
      else {
        console.log(budgets);
        return (
        <View>
    
          <AlphabetList
            data={budgets}
            renderCustomItem={(item) => (
              <TouchableOpacity onPress={() => handleClick(item.value)} >
                <Text>
                  {item.value}
                </Text>
              </TouchableOpacity>
            )}
          //style = {styles.alphaList}
          // indexLetterStyle={{
          //   color: 'blue',
          //   fontSize: 50,
          //   backgroundColor: '#f5f5f5', // Light gray background
          //   padding: 5, // Add padding for better spacing
          // }}
          // renderCustomItem={(item) => (
          //   <View style={styles.listItemContainer}>
          //     <Text style={styles.listItemLabel}>{item.value}</Text>
          //   </View>
          // )}
          />
    
            <TouchableOpacity onPress={() => newButton()} >
              <Text>New Budget</Text>
            </TouchableOpacity>
    
          </View>
        );
      }
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
  