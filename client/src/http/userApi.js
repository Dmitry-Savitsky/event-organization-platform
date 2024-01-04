import { $authHost, $host } from ".";
import { jwtDecode } from "jwt-decode";

export const registration = async (email, password, first_name, last_name, phone_number) => {
    const { data } = await $host.post("api/users/signup", { role: 'client', first_name, last_name, password, email, phone_number })
    localStorage.setItem('token', data.token)
    localStorage.setItem('isAuth', true)
    return jwtDecode(data.token)
}

export const login = async (email, password) => {
    const { data } = await $host.post("api/users/login", { email, password })
    localStorage.setItem('token', data.token)
    localStorage.setItem('isAuth', true)
    return jwtDecode(data.token)
}

export const check = async () => {
    const response = await $authHost.post('api/users/check')
    localStorage.setItem('token', response.data)
    return response
}

export const getAllUserFeedbacks = async (id) => {
    const {data} = await $authHost.get('api/feedbacks/all/user/' + id)
    return data
}

export const deleteOneFeedback = async (id) => {
    const {data} = await $authHost.delete('api/feedbacks/' + id)
    return data
}

export const getUserInfo = async (id) => {
    const {data} = await $authHost.get('api/clients/' + id)
    return data
}