import * as FileSystem from 'expo-file-system';
import * as SQLite from 'expo-sqlite';
import { Asset } from 'expo-asset';
import { useSQLiteContext } from "expo-sqlite/next"

export const loadDB = async () => {
  const dbName = "AdventureDataV301.db";
  const dbAsset = require('../assets/AdventureDataV301.db');
  const dbUri = Asset.fromModule(dbAsset).uri;
  const dbFilePath = `${FileSystem.documentDirectory}SQLite/${dbName}`;

  const fileInfo = await FileSystem.getInfoAsync(dbFilePath);
  //console.log("URI:", dbUri);
  if (!fileInfo.exists) {
    console.log("Not Located");
    await FileSystem.makeDirectoryAsync(
      `${FileSystem.documentDirectory}SQLite`,
      { intermediates: true, readOnly: false }
    );
    await FileSystem.downloadAsync(dbUri, dbFilePath);
  }
}

export async function getDestinations(db) {
  const result = await db.getAllAsync("SELECT tripName FROM trips;");
  return result;
}

export async function getItinerary(db, currentTrip) {
  const statement = await db.prepareAsync("SELECT * FROM trips WHERE tripName = ?;");
  const result = await statement.executeAsync([currentTrip]);
  const firstRow = await result.getFirstAsync();
  await statement.finalizeAsync();

  return firstRow;
}

export async function editTrip(db, field, data, currentTrip) {
  console.log("Processing: ", field, data, currentTrip);
  try {
    await db.runAsync(`UPDATE trips SET ${field} = ? WHERE tripName = ?;`, [data, currentTrip]);

  } catch (error) {
    console.error('Error updating trip:', error);
  }
}

export async function addTrip(db, name, destination, start, end, lodgingType, lodgingName, address) {
  console.log(
    "Processing: ", 
    name, ",", 
    destination, ",", 
    start, ",", 
    end, ",", 
    lodgingType, ",", 
    lodgingName, ",", 
    address);

  try {
    await db.runAsync(
      `INSERT INTO trips (tripName, destination, startDate, endDate, lodgingType, lodgingName, address) 
      VALUES (?, ?, ?, ?, ?, ?, ?);`, 
      [name, destination, start, end, lodgingType, lodgingName, address]);
  } catch (error) {
    console.error('Error adding trip:', error);
  }
}

export async function deleteTrip(db, currentTrip) {
  try {
    console.log("Deleting: ", currentTrip);
    await db.runAsync(`DELETE FROM trips WHERE tripName = ?;`, [currentTrip]);
    console.log("Deletion Complete");

  } catch (error) {
    console.error('Error deleting trip:', error);
  }
}

export async function getBudgets(db, currentTrip) {

  try{
    const statement = await db.prepareAsync(`SELECT budgetName FROM budgets WHERE tripName = ?;`);
    const result = await statement.executeAsync([currentTrip.currentTrip]);
    const output = await result.getAllAsync();
    await statement.finalizeAsync();

    console.log("Budgets Found: ", output);
    return output;

  } catch (error) {
    console.error(`Error getting budgets: `, error);
  }
  

  // const result = await db.runAsync(`SELECT budgetName FROM budgets WHERE tripName = ${currentTrip};`);
}

