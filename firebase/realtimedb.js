import database from "@react-native-firebase/database";

const databaseRef = database().ref(`records`);
const reviewRef = database().ref("reviews");
export { databaseRef, reviewRef };
