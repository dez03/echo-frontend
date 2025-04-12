import { db } from "./firebase";
import { collection, getDocs, query } from "firebase/firestore";

/**
 * Gets all the doccuments from any given firebase collection
 * @param {string} collectionName - The name of the firebase collection
 * @returns {JSON} Returns an array containing all the data within the collection [{id: document id, data: document data}].
 */
export default async function getData(collectionName) {
	try {
		let data = [];
		const q = query(collection(db, collectionName));
		const querySnapshot = await getDocs(q);
		querySnapshot.forEach((doc) => {
			data.push({ id: doc.id, data: doc.data() });
		});
		console.log("Documents Recieved");

		return data;
	} catch (e) {
		console.error("Error adding document: ", e);
		return [];
	}
}
