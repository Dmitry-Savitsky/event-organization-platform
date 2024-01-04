// import { $authHost, $host } from ".";
// import { jwtDecode } from "jwt-decode";

// export const registration = async (login, password, status, clientName, clientPhone, companyName, companyPhone, companyAddress) => {
//     try {
//         const { data } = await $host.post("/registration", {
//             login,
//             password,
//             status,
//             clientName,
//             clientPhone,
//             companyName,
//             companyPhone,
//             companyAddress,
//         });

//         localStorage.setItem('token', data.token);
//         localStorage.setItem('isAuth', true);

//         return jwtDecode(data.token);
//     } catch (error) {
//         // Handle registration error
//         console.error('Registration error:', error);
//         throw error;
//     }
// };

// export const login = async (login, password) => {
//     try {
//         const { data } = await $host.post("/login", { login, password });

//         localStorage.setItem('token', data.token);
//         localStorage.setItem('isAuth', true);

//         return jwtDecode(data.token);
//     } catch (error) {
//         // Handle login error
//         console.error('Login error:', error);
//         throw error;
//     }
// };

// export const check = async () => {
//     try {
//         const response = await $authHost.get('/auth');

//         localStorage.setItem('token', response.data);
//         return response;
//     } catch (error) {
//         // Handle check error
//         console.error('Check error:', error);
//         throw error;
//     }
// };

// export const getAllUserFeedbacks = async (id) => {
//     try {
//         const { data } = await $authHost.get(`/feedbacks/all/user/${id}`);
//         return data;
//     } catch (error) {
//         // Handle error
//         console.error('Error getting user feedbacks:', error);
//         throw error;
//     }
// };

// export const deleteOneFeedback = async (id) => {
//     try {
//         const { data } = await $authHost.delete(`/feedbacks/${id}`);
//         return data;
//     } catch (error) {
//         // Handle error
//         console.error('Error deleting feedback:', error);
//         throw error;
//     }
// };

// export const getUserInfo = async (id) => {
//     try {
//         const { data } = await $authHost.get(`/clients/${id}`);
//         return data;
//     } catch (error) {
//         // Handle error
//         console.error('Error getting user info:', error);
//         throw error;
//     }
// };
