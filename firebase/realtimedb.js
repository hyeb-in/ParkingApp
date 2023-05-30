import database from "@react-native-firebase/database";

const databaseRef = database().ref(`records`);

export { databaseRef };
