import { db } from "./firebase";
import { addDoc, collection } from "firebase/firestore";
import { query, where, getDocs } from "firebase/firestore";
/**
 * Gets all the documents from any given firebase collection
 * @param {string} collectionName - The name of the firebase collection
 * @param {JSON} data - The json to be uploaded
 */
export async function addData(collectionName, data) {
	try {
		const docRef = await addDoc(collection(db, collectionName), data);
		console.log("Document written with ID: ", docRef.id);
	} catch (e) {
		console.error("Error adding document: ", e);
	}
}

/**
 * Checks if an email already exists in a firrestore collection
 * @param {string} collectionName  - the name of the firebase collection
 * @param {string} email - the email to be checked
 * @returns {boolean} - returns true if the email exists, false otherwise
 */

export async function getData(collectionName, email) {
	try {
		const userRef = collection(db, collectionName);
		const q = query(userRef, where("email", "==", email));
		const querySnapshot = await getDocs(q);

		return !querySnapshot.empty;
	} catch (e) {
		console.error("Error checking email: ", e);
		return false;
	}
}