import * as FileSystem from 'expo-file-system';
import * as SQLite from 'expo-sqlite';
import { Asset } from 'expo-asset';
import {useSQLiteContext} from "expo-sqlite/next"

export const loadDB = async () => {
  const dbName = "AdventureDataV21.db";
  const dbAsset = require('../assets/AdventureDataV21.db');
  const dbUri = Asset.fromModule(dbAsset).uri;
  const dbFilePath = `${FileSystem.documentDirectory}SQLite/${dbName}`;

  const fileInfo = await FileSystem.getInfoAsync(dbFilePath);
  //console.log("URI:", dbUri);
  if(!fileInfo.exists){
    console.log("Not Located");
    await FileSystem.makeDirectoryAsync(
      `${FileSystem.documentDirectory}SQLite`,
      {intermediates: true}
    );
    await FileSystem.downloadAsync(dbUri, dbFilePath);
  }
}

export async function getDestinations(db){
  const result = await db.getAllAsync("SELECT tripName FROM trips;");
  return result;
}

export async function getItinerary(db, currentTrip){
  const statement = await db.prepareAsync("SELECT * FROM trips WHERE tripName = ?;");
  const result = await statement.executeAsync([currentTrip]);
  const firstRow = await result.getFirstAsync();
  return firstRow;
}

export async function editTrip(db, field, data, currentTrip){
  const statement = await db.prepareAsync("UPDATE trips SET ? = ?, WHERE tripName = ?");
  await statement.executeAsync([field, data, currentTrip]);
  console.log ("Edit Successful");
}

