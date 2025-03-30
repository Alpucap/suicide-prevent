import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

const api = axios.create({
    baseURL: API_BASE_URL,
});

// Contoh penggunaan nih service w kasih di components

// //Contoh fungsi GET
// export const fetchData = async () => {
//     try {
//         const response = await api.get("/data"); //misal endpoint /data
//         return response.data;
//     } catch (error) {
//         console.error("Error fetching data:", error);
//         throw error;
//     }
// };

// //Contoh fungsi POST
// export const postData = async (payload) => {
//     try {
//         const response = await api.post("/data", payload);
//         return response.data;
//     } catch (error) {
//         console.error("Error posting data:", error);
//         throw error;
//     }
// };
