import database, { firebase } from "@react-native-firebase/database";

const databaseRef = firebase.database().ref();

export { firebase, databaseRef };
