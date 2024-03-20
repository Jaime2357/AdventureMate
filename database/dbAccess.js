import * as SQLite from 'expo-sqlite';

// Open or create the database
const db = SQLite.openDatabase('AdventureData.db');

export default db;