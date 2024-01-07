import { $host } from ".";
import { jwtDecode } from "jwt-decode";

export const registration = async (login, password, status, clientName, clientPhone, companyName, companyPhone) => {
    try {
        console.log("отправка запроса на регистрацию . . , данные запроса:");
        console.log(login, password, status, clientName, clientPhone, companyName, companyPhone)
        const { data } = await $host.post("api/registrationdata/registration", {
            login,
            password,
            status,
            clientName,
            clientPhone,
            companyName,
            companyPhone,
        });

        localStorage.setItem('token', data.token);
        console.log("токен установлен" + data.token);
        localStorage.setItem('isAuth', true);
        console.log("isAuth установлен");

        return jwtDecode(data.token);
    } catch (error) {
        // Handle registration error
        console.error('Registration error:', error);
        throw error;
    }
};

export const login = async (login, password) => {
    try {
        console.log("отправка запроса на логин");
        const { data } = await $host.post("api/registrationdata/login", { login, password });

        localStorage.setItem('token', data.token);        
        console.log("токен установлен" + data.token);
        localStorage.setItem('isAuth', true);        
        console.log("isAuth установлен");

        return jwtDecode(data.token);
    } catch (error) {
        // Handle login error
        console.error('Login error:', error);
        throw error;
    }
};

export const check = async () => {
    try {
        const response = await $host.post('/registrationdata/auth');

        localStorage.setItem('token', response.data);
        return response;
    } catch (error) {
        // Handle check error
        console.error('Check error:', error);
        throw error;
    }
};

// Add other functions as needed, adjusting the paths accordingly
// ...

// Example:
export const getAllUserFeedbacks = async (id) => {
    try {
        const { data } = await $host.get('/feedbacks/all/user/' + id);
        return data;
    } catch (error) {
        // Handle error
        console.error('Error getting user feedbacks:', error);
        throw error;
    }
};
