import { $host } from ".";
// import { jwtDecode } from "jwt-decode";

export const getAllServices = async () => {
    const { data } = await $host.get('api/service/get')
    return data
}

export const getOneService = async (id) => {
    const { data } = await $host.get('api/service/' + id)
    return data
}

export const deleteService = async (id) => {
    const { data } = await $host.delete('api/service/' + id)
    return data
}