import axios from "axios";

const url = "http://localhost:3000/";

const fetchCollections = async collections => {
	const data = axios.get(`${url}${collections}`);
	const result = await data;
	return result.data;
};

const fetchCollection = async slug => {
	const data = axios.get(`${url}animes?slug=${slug}`);
	const result = await data;
	return result.data;
};

const updateCollection = async (id, updatedData) => {
	const options = {
		method: "PATCH",
		url: `${url}animes/${id}`,
		headers: { "Content-Type": "application/json" },
		data: updatedData
	};

	try {
		let r = await axios.request(options);
		return r.data;
	} catch (error) {
		console.error("Error updating anime data:", error);
		throw error;
	}
};

const deleteCollection = async id => {
	const options = {
		method: "DELETE",
		url: `${url}animes/${id}`
	};
	try {
		await axios.request(options);
		return "COLLECTION DELETED";
	} catch (error) {
		console.error("Error updating anime data:", error);
		throw error;
	}
};

export {
	fetchCollections,
	fetchCollection,
	updateCollection,
	deleteCollection
};
